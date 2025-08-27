class CombatSystem {
  constructor() {
    this.criticalChance = 0.1; // Base 10% crit chance
    this.criticalMultiplier = 1.5;
    this.dodgeBaseChance = 0.15; // Base 15% dodge chance
  }

  // Calculate attack damage
  calculateDamage(attacker, defender, ability = null) {
    let damage = this.getBaseDamage(attacker);

    // Apply ability modifiers
    if (ability) {
      damage *= ability.damageMultiplier || 1;
    }

    // Check for critical hit
    const critRoll = Math.random();
    const critChance = this.criticalChance + attacker.stats.combat * 0.01;
    const isCritical = critRoll <= critChance;

    if (isCritical) {
      damage *= this.criticalMultiplier;
    }

    // Apply defense
    const defense = this.calculateDefense(defender);
    damage = Math.max(1, damage - defense);

    return {
      damage: Math.floor(damage),
      isCritical,
      wasBlocked: false,
      wasDodged: false,
    };
  }

  // Get base damage from stats and equipment
  getBaseDamage(attacker) {
    let baseDamage = attacker.stats.combat * 2;

    // Add weapon damage
    const weapon = attacker.inventory.find(
      (item) => item.equipped && item.type === "weapon"
    );
    if (weapon) {
      baseDamage += weapon.damage || 0;
    }

    // Add cybernetic bonuses
    const combatCybernetics = attacker.cybernetics.filter(
      (c) => c.statModifiers && c.statModifiers.combat
    );
    const cyberBonus = combatCybernetics.reduce(
      (sum, cyber) => sum + (cyber.statModifiers.combat || 0),
      0
    );

    baseDamage += cyberBonus;

    return baseDamage;
  }

  // Calculate defense value
  calculateDefense(defender) {
    let defense = defender.stats.combat;

    // Add armor
    const armor = defender.inventory.filter(
      (item) => item.equipped && item.type === "armor"
    );
    const armorValue = armor.reduce(
      (sum, item) => sum + (item.defense || 0),
      0
    );

    defense += armorValue;

    return defense;
  }

  // Check if attack is dodged
  checkDodge(attacker, defender) {
    const dodgeChance =
      this.dodgeBaseChance +
      defender.stats.stealth * 0.02 -
      attacker.stats.combat * 0.01;

    return Math.random() <= Math.min(0.75, dodgeChance); // Cap at 75%
  }

  // Process a full combat round
  processCombatRound(attacker, defender, ability = null) {
    // Check for dodge
    if (this.checkDodge(attacker, defender)) {
      return {
        damage: 0,
        isCritical: false,
        wasBlocked: false,
        wasDodged: true,
        message: `${defender.name} dodged the attack!`,
      };
    }

    // Calculate and apply damage
    const result = this.calculateDamage(attacker, defender, ability);
    defender.takeDamage(result.damage);

    // Generate combat message
    let message = `${attacker.name} attacks ${defender.name} for ${result.damage} damage`;
    if (result.isCritical) {
      message += " (Critical Hit!)";
    }

    return {
      ...result,
      message,
    };
  }

  // Process special ability use
  processAbility(user, target, abilityName) {
    const ability = user.abilities.find((a) => a.name === abilityName);
    if (!ability) {
      return {
        success: false,
        message: "Ability not found",
      };
    }

    const useResult = user.useAbility(abilityName, target);
    if (!useResult.success) {
      return useResult;
    }

    // Different ability types
    switch (ability.type) {
      case "attack":
        return this.processAttackAbility(user, target, ability);
      case "hack":
        return this.processHackAbility(user, target, ability);
      case "buff":
        return this.processBuffAbility(user, target, ability);
      case "heal":
        return this.processHealAbility(user, target, ability);
      default:
        return {
          success: false,
          message: "Unknown ability type",
        };
    }
  }

  // Process attack abilities
  processAttackAbility(user, target, ability) {
    const result = this.processCombatRound(user, target, ability);
    return {
      success: true,
      ...result,
      message: `${user.name} uses ${ability.name}! ${result.message}`,
    };
  }

  // Process hacking abilities
  processHackAbility(user, target, ability) {
    const hackSuccess =
      Math.random() < user.stats.hack * 0.1 - target.stats.tech * 0.05;

    if (hackSuccess) {
      const damage = Math.floor(user.stats.hack * ability.powerMultiplier);
      target.takeDamage(damage);

      return {
        success: true,
        damage,
        message: `${user.name} successfully hacks ${target.name} for ${damage} damage!`,
      };
    }

    return {
      success: false,
      damage: 0,
      message: `${target.name} resisted the hack attempt!`,
    };
  }

  // Process buff abilities
  processBuffAbility(user, target, ability) {
    const buff = {
      stat: ability.buffStat,
      amount: ability.buffAmount,
      duration: ability.duration,
    };

    target.addStatusEffect(buff);

    return {
      success: true,
      message: `${user.name} buffs ${target.name}'s ${buff.stat}!`,
    };
  }

  // Process healing abilities
  processHealAbility(user, target, ability) {
    const healAmount = Math.floor(user.stats.tech * ability.healMultiplier);

    const oldHp = target.hp;
    target.heal(healAmount);
    const actualHeal = target.hp - oldHp;

    return {
      success: true,
      healAmount: actualHeal,
      message: `${user.name} heals ${target.name} for ${actualHeal} HP!`,
    };
  }

  // Check if combat should end
  checkCombatEnd(participants) {
    const alive = participants.filter((p) => p.hp > 0);
    if (alive.length <= 1) {
      return {
        ended: true,
        winner: alive[0],
        losers: participants.filter((p) => p.hp <= 0),
      };
    }
    return { ended: false };
  }

  // Generate combat rewards
  generateRewards(winner, losers) {
    const baseCredits = 25;
    const creditsMultiplier = 1 + winner.level * 0.1;
    const levelDifference = Math.max(
      0,
      Math.max(...losers.map((l) => l.level)) - winner.level
    );

    return {
      credits: Math.floor(
        baseCredits * creditsMultiplier * (1 + levelDifference * 0.2)
      ),
      experience: Math.floor(30 * (1 + levelDifference * 0.5)),
    };
  }

  // Penalty calculation methods
  calculateInitialFleePenalty(enemy) {
    return enemy.level * 5;
  }

  calculateCombatFleePenalty(enemy, combatRounds) {
    const basePenalty = enemy.level * 10;
    const durationMultiplier = 1 + combatRounds * 0.1;
    return Math.floor(basePenalty * durationMultiplier);
  }

  calculateDefeatPenalty(enemy, combatRounds) {
    const basePenalty = enemy.level * 10;
    const durationMultiplier = 1 + combatRounds * 0.15;
    return Math.floor(basePenalty * durationMultiplier);
  }

  getEnemyTypeBonus(enemy) {
    const typeBonuses = {
      Yakuza: 0.3, // 30% extra penalty
      Corporate: 0.25, // 25% extra penalty
      Assassin: 0.2, // 20% extra penalty
      Heavy: 0.15, // 15% extra penalty
      Thug: 0.0, // No bonus penalty
      Hacker: 0.1, // 10% extra penalty
    };

    return typeBonuses[enemy.type] || 0.0;
  }

  getPenaltyFlavorText(penaltyType, enemy, amount) {
    // Handle case where player has no credits to lose
    if (amount === 0) {
      const brokeTexts = [
        "You're already broke, so there's nothing left to take.",
        "Your pockets are empty - they can't squeeze blood from a stone.",
        "You have no credits to lose, which is somehow worse than losing some.",
        "They search your pockets but find nothing worth stealing.",
      ];
      return brokeTexts[Math.floor(Math.random() * brokeTexts.length)];
    }

    const initialFleeTexts = [
      `You slip away quietly, but drop ${amount} credits in your haste.`,
      `A small bribe of ${amount} credits ensures they don't follow.`,
      `You lose ${amount} credits worth of pocket change while escaping.`,
    ];

    const combatFleeTexts = [
      `You scatter ${amount} credits as you flee, hoping it distracts them.`,
      `Emergency extraction costs ${amount} credits.`,
      `You pay ${amount} credits to buy your escape.`,
    ];

    const defeatTexts = [
      `You wake up in a black clinic, ${amount} credits lighter for the privilege.`,
      `Your gear took a beating. Repair costs: ${amount} credits.`,
      `The local cops want ${amount} credits to look the other way.`,
    ];

    switch (penaltyType) {
      case "initialFlee":
        return initialFleeTexts[
          Math.floor(Math.random() * initialFleeTexts.length)
        ];
      case "combatFlee":
        return combatFleeTexts[
          Math.floor(Math.random() * combatFleeTexts.length)
        ];
      case "defeat":
        return defeatTexts[Math.floor(Math.random() * defeatTexts.length)];
      default:
        return `You lose ${amount} credits.`;
    }
  }
}

module.exports = CombatSystem;

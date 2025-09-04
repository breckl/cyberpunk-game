class CombatSystem {
  constructor() {
    this.criticalChance = 0.1; // Base 10% crit chance
    this.criticalMultiplier = 1.5;
  }

  // Calculate attack damage
  calculateDamage(attacker, defender) {
    let damage = this.getBaseDamage(attacker);

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

  // Process a full combat round
  processCombatRound(attacker, defender) {
    // Calculate and apply damage
    const result = this.calculateDamage(attacker, defender);
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
    const baseCredits = 30;
    const baseExperience = 30;
    const creditsMultiplier = 1 + winner.level * 0.2;

    // Get the highest level enemy for scaling
    const enemyLevel = Math.max(...losers.map((l) => l.level));
    const levelDifference = Math.max(0, enemyLevel - winner.level);

    // Base scaling based on enemy level (higher level enemies = more base rewards)
    const enemyLevelCreditsBonus = 1 + enemyLevel * 0.3; // 30% more credits per enemy level
    const enemyLevelExperienceBonus = 1 + enemyLevel * 0.5; // 50% more XP per enemy level

    // Much more aggressive scaling for higher level enemies (level difference bonus)
    const levelDifferenceBonus =
      levelDifference > 0 ? Math.pow(1.5, levelDifference) : 1;
    const creditsLevelBonus = 1 + levelDifference * 0.6; // 60% per level difference
    const experienceLevelBonus = 1 + levelDifference * 0.6; // 60% per level difference

    return {
      credits: Math.floor(
        baseCredits *
          creditsMultiplier *
          enemyLevelCreditsBonus *
          creditsLevelBonus *
          levelDifferenceBonus
      ),
      experience: Math.floor(
        baseExperience *
          enemyLevelExperienceBonus *
          experienceLevelBonus *
          levelDifferenceBonus
      ),
    };
  }

  // Penalty calculation methods
  calculateInitialFleePenalty(playerLevel = 1) {
    if (playerLevel > 1) {
      return playerLevel * 10;
    }
    return 5;
  }

  calculateCombatPenalty(enemy, combatRounds) {
    const basePenalty = enemy.level * 5;
    const durationMultiplier = 1 + combatRounds * 0.2;
    return Math.floor(basePenalty * durationMultiplier);
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

export default CombatSystem;

import {
  generateRewards,
  calculateInitialFleePenalty,
  calculateCombatPenalty,
} from "../../config/gameBalance.js";

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
    return generateRewards(winner, losers);
  }

  // Penalty calculation methods
  calculateInitialFleePenalty(playerLevel = 1) {
    // This method is kept for backward compatibility
    // The actual calculation is now in the config file
    return calculateInitialFleePenalty(playerLevel * 100); // Convert level to approximate credits
  }

  calculateCombatPenalty(enemy, combatRounds) {
    return calculateCombatPenalty(enemy, combatRounds);
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

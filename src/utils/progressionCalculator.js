/**
 * Progression Calculator - Handles all mathematical formulas for balanced game progression
 * Ensures weapons, armor, enemies, and prices scale appropriately with player level
 */

// Removed imports - other files should import directly from gameBalance.js

export class ProgressionCalculator {
  // Base progression formulas
  static calculatePlayerStats(level) {
    return {
      hp: Math.round(25 + level * 8),
      attack: Math.round((2 + level * 1.5) * 10) / 10,
      defense: Math.round((1 + level * 1.2) * 10) / 10,
      hacking: Math.round(4 + level * 2),
    };
  }

  /*static calculateEnemyStats(level, enemyType = "Thug") {
    const baseStats = this.calculatePlayerStats(level);

    // Enemy scaling relative to player stats
    const healthMultiplier = 0.8 + level * 0.1;
    const attackMultiplier = 0.9 + level * 0.15;
    const defenseMultiplier = 0.7 + level * 0.2;

    // Type-specific modifiers
    const typeModifiers = {
      Light: { health: 1.0, attack: 0.5, defense: 1.0 },
      Medium: { health: 1.3, attack: 1.1, defense: 1.2 },
      Heavy: { health: 0.9, attack: 1.3, defense: 0.8 },
    };

    const modifier = typeModifiers[enemyType] || typeModifiers["Thug"];

    return {
      health: Math.round(baseStats.hp * healthMultiplier * modifier.health),
      attack:
        Math.round(baseStats.attack * attackMultiplier * modifier.attack * 10) /
        10,
      defense:
        Math.round(
          baseStats.defense * defenseMultiplier * modifier.defense * 10
        ) / 10,
      expReward: Math.round(15 + level * 8),
      creditReward: Math.round(20 + level * 15),
    };
  }*/

  // Note: calculateWeaponDamage, calculateArmorDefense, calculatePriceWithDamage,
  // and calculateArmorPriceWithDefense are now available directly from gameBalance.js
  // Other files should import them directly instead of using this class
}

export default ProgressionCalculator;

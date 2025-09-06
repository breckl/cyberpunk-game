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

  static calculateEnemyStats(level, enemyType = "Thug") {
    const baseStats = this.calculatePlayerStats(level);

    // Enemy scaling relative to player stats
    const healthMultiplier = 0.8 + level * 0.1;
    const attackMultiplier = 0.9 + level * 0.15;
    const defenseMultiplier = 0.7 + level * 0.2;

    // Type-specific modifiers
    const typeModifiers = {
      Thug: { health: 1.0, attack: 0.5, defense: 1.0 },
      Heavy: { health: 1.3, attack: 1.1, defense: 1.2 },
      Assassin: { health: 0.9, attack: 1.3, defense: 0.8 },
      Hacker: { health: 0.8, attack: 0.9, defense: 0.7 },
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
  }

  static calculateWeaponDamage(level, weaponType = "Light") {
    // Reduced base damage scaling from 1.5 to 1.0 per level
    const baseDamage = 1 + level * 0.7;

    const typeMultipliers = {
      Light: 1, // Baseline - standard melee weapons
      Medium: 1.25, // 10% stronger - electronic advantage
      Heavy: 1.5, // 15% stronger - energy weapons
    };

    // Round to exactly 2 decimal places
    return Math.round(baseDamage * typeMultipliers[weaponType] * 100) / 100;
  }

  static calculateArmorDefense(level, armorType = "Light") {
    const baseDefense = 0.3 + level * 1.2;

    const typeMultipliers = {
      Light: 1,
      Medium: 1.25,
      Heavy: 1.5,
    };

    // Round to exactly 2 decimal places
    return Math.round(baseDefense * typeMultipliers[armorType] * 100) / 100;
  }

  static calculatePrice(basePrice, level) {
    const levelMultiplier = Math.pow(1.4, level - 1);
    return Math.round(basePrice * levelMultiplier);
  }

  // Note: calculatePriceWithDamage and calculateArmorPriceWithDefense
  // are now available directly from gameBalance.js
  // Other files should import them directly instead of using this class

  static calculateCombatBalance(
    playerLevel,
    enemyLevel,
    playerWeapon,
    playerArmor
  ) {
    const player = this.calculatePlayerStats(playerLevel);
    const enemy = this.calculateEnemyStats(enemyLevel);

    // Add equipment bonuses
    const playerTotalAttack = player.attack + (playerWeapon?.damage || 0);

    // Combat calculations with accuracy modifiers
    const playerDamagePerRound = playerTotalAttack * 0.8; // 80% accuracy
    const enemyDamagePerRound = enemy.attack * 0.75; // 75% accuracy

    const roundsToKillEnemy = Math.ceil(enemy.health / playerDamagePerRound);
    const roundsToKillPlayer = Math.ceil(player.hp / enemyDamagePerRound);

    return {
      playerDamagePerRound: Math.round(playerDamagePerRound * 10) / 10,
      enemyDamagePerRound: Math.round(enemyDamagePerRound * 10) / 10,
      roundsToKillEnemy,
      roundsToKillPlayer,
      isBalanced:
        roundsToKillEnemy >= 3 &&
        roundsToKillEnemy <= 5 &&
        roundsToKillPlayer >= 3 &&
        roundsToKillPlayer <= 5,
      difficulty: this.calculateDifficulty(
        roundsToKillEnemy,
        roundsToKillPlayer
      ),
    };
  }

  static calculateDifficulty(roundsToKillEnemy, roundsToKillPlayer) {
    if (roundsToKillEnemy <= 2 && roundsToKillPlayer >= 4) return "Too Easy";
    if (roundsToKillEnemy >= 6 && roundsToKillPlayer <= 3) return "Too Hard";
    if (
      roundsToKillEnemy >= 3 &&
      roundsToKillEnemy <= 5 &&
      roundsToKillPlayer >= 3 &&
      roundsToKillPlayer <= 5
    )
      return "Balanced";
    return "Needs Adjustment";
  }

  // Weapon tier definitions
  static getWeaponTiers() {
    return {
      1: { min: 1, max: 3, priceRange: [50, 200], rarity: "common" },
      2: { min: 3, max: 6, priceRange: [200, 600], rarity: "uncommon" },
      3: { min: 6, max: 10, priceRange: [600, 1500], rarity: "uncommon" },
      4: { min: 10, max: 15, priceRange: [1500, 4000], rarity: "rare" },
      5: { min: 15, max: 22, priceRange: [4000, 10000], rarity: "epic" },
      6: { min: 22, max: 30, priceRange: [10000, 25000], rarity: "legendary" },
    };
  }

  // Armor tier definitions
  static getArmorTiers() {
    return {
      1: { min: 0.5, max: 2.5, priceRange: [50, 150], rarity: "common" },
      2: { min: 2.5, max: 5, priceRange: [150, 400], rarity: "uncommon" },
      3: { min: 5, max: 8, priceRange: [400, 800], rarity: "uncommon" },
      4: { min: 8, max: 12, priceRange: [800, 1500], rarity: "rare" },
      5: { min: 12, max: 18, priceRange: [1500, 3000], rarity: "epic" },
      6: { min: 18, max: 25, priceRange: [3000, 6000], rarity: "legendary" },
    };
  }

  // Generate balanced market items
  static generateWeapon(level, weaponType = "Power", rarity = null) {
    const damage = this.calculateWeaponDamage(level, weaponType);
    const basePrice = 100 + level * 50;
    const finalRarity =
      rarity || this.getWeaponTiers()[level]?.rarity || "common";
    const price = this.calculatePrice(basePrice, level, finalRarity);

    return {
      level,
      damage,
      price,
      rarity: finalRarity,
      type: weaponType,
    };
  }

  static generateArmor(level, armorType = "Light", rarity = null) {
    const defense = this.calculateArmorDefense(level, armorType);
    const basePrice = 75 + level * 40;
    const finalRarity =
      rarity || this.getArmorTiers()[level]?.rarity || "common";
    const price = this.calculatePrice(basePrice, level, finalRarity);

    return {
      level,
      defense,
      price,
      rarity: finalRarity,
      type: armorType,
    };
  }
}

export default ProgressionCalculator;

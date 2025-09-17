/**
 * Calculate weapon damage based on level and type
 * @param {number} level - Weapon level
 * @param {string} weaponType - Weapon type (Light, Medium, Heavy)
 * @returns {number} - Calculated damage
 */
export const calculateWeaponDamage = (level, weaponType = "Light") => {
  const weaponBaseDamage = 1; // Base damage at level 1
  const weaponDamagePerLevel = 0.75; // Damage increase per level
  const weaponTypeMultipliers = {
    Light: 1,
    Medium: 1.15,
    Heavy: 1.25,
  };

  const baseDamage = weaponBaseDamage + level * weaponDamagePerLevel;
  const typeMultiplier = weaponTypeMultipliers[weaponType] || 1.0;

  // Round to exactly 2 decimal places
  return Math.round(baseDamage * typeMultiplier * 100) / 100;
};

/**
 * Calculate price with damage scaling using exponential growth
 * @param {number} damage - Damage value
 * @param {number} level - Item level
 * @param {string} weaponType - Weapon type (Light, Medium, Heavy)
 * @returns {number} - Calculated price
 */
export const calculatePriceWithDamage = (
  damage,
  level = 1,
  weaponType = "Light"
) => {
  const damagePriceMultiplier = 35; // Base price per damage point
  const exponentialBase = 1.5; // Exponential growth base (1.8x per level)

  // Calculate exponential level multiplier
  // Level 1: 1.0, Level 2: 1.8, Level 3: 3.24, Level 4: 5.83, etc.
  const levelPriceMultiplier = Math.pow(exponentialBase, level - 1);

  const weaponTypeMultipliers = {
    Light: 1,
    Medium: 1.05,
    Heavy: 1.1,
  };

  const typeMultiplier = weaponTypeMultipliers[weaponType] || 1.0;
  return Math.round(
    damage * levelPriceMultiplier * damagePriceMultiplier * typeMultiplier
  );
};

/**
 * Calculate armor defense based on level and type
 * @param {number} level - Armor level
 * @param {string} armorType - Armor type (Light, Medium, Heavy)
 * @returns {number} - Calculated defense percentage
 */
export const calculateArmorDefense = (level, armorType = "Light") => {
  const armorBaseDefense = 0; // Base defense at level 1
  const armorDefensePerLevel = 2.5; // Defense increase per level
  const armorTypeMultipliers = {
    Light: 1,
    Medium: 1.25,
    Heavy: 1.5,
  };

  const baseDefense = armorBaseDefense + level * armorDefensePerLevel;
  const typeMultiplier = armorTypeMultipliers[armorType] || 1.0;

  // Round to exactly 2 decimal places
  return Math.round(baseDefense * typeMultiplier * 100) / 100;
};

/**
 * Calculate armor price with defense scaling using exponential growth
 * @param {number} defense - Defense percentage
 * @param {number} level - Item level
 * @param {string} armorType - Armor type (Light, Medium, Heavy)
 * @returns {number} - Calculated price
 */
export const calculateArmorPriceWithDefense = (
  defense,
  level = 1,
  armorType = "Light"
) => {
  const defensePriceMultiplier = 25; // Base price per defense percentage
  const exponentialBase = 1.5; // Exponential growth base (1.5x per level for armor)

  // Calculate exponential level multiplier
  // Level 1: 1.0, Level 2: 1.5, Level 3: 2.25, Level 4: 3.38, etc.
  const levelMultiplier = Math.pow(exponentialBase, level - 1);

  const typeMultiplier = {
    Light: 1,
    Medium: 1.05,
    Heavy: 1.1,
  };

  return Math.round(
    defense *
      defensePriceMultiplier *
      levelMultiplier *
      typeMultiplier[armorType]
  );
};

/**
 * Generate rewards based on enemy level
 * @param {Object} winner - Winner object with level
 * @param {Array} enemies - Array of defeated enemies
 * @returns {Object} - Rewards object with credits and experience
 */
export const generateRewards = (winner, enemies) => {
  // Base rewards per enemy level (Level 1: $15-30, Level 2: $25-45, Level 3: $40-60)
  const baseCredits = {
    1: 15, // Midpoint of $15-30 range
    2: 30, // Midpoint of $25-45 range
    3: 45, // Midpoint of $40-60 range
    4: 60, // Midpoint of $40-60 range
    5: 75, // Midpoint of $40-60 range
    6: 90, // Midpoint of $40-60 range
    7: 105, // Midpoint of $40-60 range
    8: 120, // Midpoint of $40-60 range
    9: 135, // Midpoint of $40-60 range
    10: 150, // Midpoint of $40-60 range
  };

  // Base XP per enemy level (Level 1: ~30, Level 2: ~50, Level 3: ~80)
  const baseExp = {
    1: 20,
    2: 40,
    3: 65,
    4: 80,
    5: 95,
    6: 110,
    7: 125,
    8: 140,
    9: 155,
    10: 170,
  };

  // Scaling for levels beyond 3
  const creditsScaling = 1.4; // +40% per level above 3
  const expScaling = 1.3; // +30% per level above 3
  const variance = 0.15; // ±15% variance

  // Calculate total rewards from all defeated enemies
  let totalCredits = 0;
  let totalExp = 0;

  enemies.forEach((enemy) => {
    const enemyLevel = enemy.level || 1;

    // Get base rewards for this enemy level
    let credits =
      baseCredits[enemyLevel] ||
      baseCredits[3] * Math.pow(creditsScaling, enemyLevel - 3);
    let experience =
      baseExp[enemyLevel] || baseExp[3] * Math.pow(expScaling, enemyLevel - 3);

    // Add ±15% variance
    const creditsVariance = (Math.random() - 0.5) * 2 * variance; // -15% to +15%
    const expVariance = (Math.random() - 0.5) * 2 * variance; // -15% to +15%

    credits = credits * (1 + creditsVariance);
    experience = experience * (1 + expVariance);

    totalCredits += credits;
    totalExp += experience;
  });

  return {
    credits: Math.round(totalCredits),
    experience: Math.round(totalExp),
  };
};

/**
 * Calculate unified combat penalty (replaces both flee and combat penalties)
 * @param {number} playerLevel - Player's level
 * @param {Object} enemy - Enemy object with level
 * @param {number} combatRounds - Number of combat rounds fought
 * @param {number} playerFinalHp - Player's HP at end of fight
 * @param {number} playerMaxHp - Player's maximum HP
 * @param {number} enemyFinalHp - Enemy's HP at end of fight
 * @param {number} enemyMaxHp - Enemy's maximum HP
 * @returns {number} - Penalty amount in credits
 */
export const calculateCombatPenalty = (playerLevel, enemy, combatRounds) => {
  // All players who run before fighting don't lose any credits
  if (combatRounds === 0) {
    return 0;
  }

  // Base penalty scales with player level (Level 1: $10, Level 2: $17.5, Level 3: $25)
  const basePenalty = 3 + (playerLevel - 1) * 7.5; // $10 base, +$7.5 per level

  // Time-based progression (not round-specific)
  let roundMultiplier = 1.0;
  if (combatRounds >= 1 && combatRounds <= 3)
    roundMultiplier = 1.0; // Early fight
  else if (combatRounds >= 4 && combatRounds <= 6)
    roundMultiplier = 1.5; // Mid fight
  else if (combatRounds >= 7) roundMultiplier = 2.0; // Long fight (cap)

  // Level difference modifier (reward fighting higher level enemies)
  const enemyLevel = enemy.level || 1;
  let levelDifferenceModifier = 1.0; // Same level
  if (enemyLevel >= playerLevel + 2)
    levelDifferenceModifier = 0.5; // Enemy 2+ levels higher
  else if (enemyLevel === playerLevel + 1)
    levelDifferenceModifier = 0.7; // Enemy 1 level higher
  else if (enemyLevel < playerLevel) levelDifferenceModifier = 1.2; // Enemy lower level

  // Calculate final penalty with all modifiers (simplified - no fight quality modifier)
  let finalPenalty = basePenalty * roundMultiplier * levelDifferenceModifier;

  // Add ±10% random variance to make penalties feel dynamic
  const variance = (Math.random() - 0.5) * 0.2; // -10% to +10%
  finalPenalty = finalPenalty * (1 + variance);

  // Apply maximum penalty cap (5x base penalty for that level)
  const maxPenalty = basePenalty * 5;
  if (finalPenalty > maxPenalty) finalPenalty = maxPenalty;

  // Round to nearest credit
  return Math.round(finalPenalty);
};

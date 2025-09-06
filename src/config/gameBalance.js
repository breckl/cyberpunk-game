/**
 * Game Balance Configuration
 * Centralized place to adjust all game modifiers and balance values
 */

// ===== ECONOMY MODIFIERS =====

// Price calculation modifiers
export const PRICE_MODIFIERS = {
  // Weapon price calculation based on damage
  DAMAGE_PRICE_MULTIPLIER: 50, // Base price per damage point
  DAMAGE_PRICE_EXPONENT: 1.2, // Exponential scaling factor

  // Armor price calculation based on defense
  DEFENSE_PRICE_MULTIPLIER: 100, // Base price per defense percentage
  DEFENSE_PRICE_EXPONENT: 1.3, // Exponential scaling factor

  // Level-based price scaling
  LEVEL_PRICE_MULTIPLIER: 1.5, // Price multiplier per level above 1

  // Sell price as percentage of purchase price
  SELL_PRICE_PERCENTAGE: 0.1, // 10% of purchase price (Inventory)
  MARKET_SELL_PRICE_PERCENTAGE: 0.1, // 25% of purchase price (Market)

  // Note: Weapon and armor type multipliers moved to COMBAT_MODIFIERS
};

// ===== REWARD MODIFIERS =====

export const REWARD_MODIFIERS = {
  // Base rewards per enemy level
  BASE_CREDITS_PER_LEVEL: 25,
  BASE_EXP_PER_LEVEL: 25,

  // Reward scaling factors
  CREDITS_SCALING: 1.2, // Multiplier for each level above 1
  EXP_SCALING: 1.15, // Multiplier for each level above 1

  // Minimum rewards (even at level 1)
  MIN_CREDITS: 25,
  MIN_EXP: 15,

  // Maximum rewards (caps)
  MAX_CREDITS: 3000,
  MAX_EXP: 3000,
};

// ===== PENALTY MODIFIERS =====

export const PENALTY_MODIFIERS = {
  // Initial flee penalty (when running from combat)
  INITIAL_FLEE_PENALTY: 0.05, // 5% of current credits

  // Combat penalty scaling
  COMBAT_PENALTY_BASE: 0.1, // 10% base penalty
  COMBAT_PENALTY_PER_ROUND: 0.02, // Additional 2% per combat round
  COMBAT_PENALTY_MAX: 0.5, // Maximum 50% penalty

  // Minimum penalties (even for easy fights)
  MIN_FLEE_PENALTY: 10,
  MIN_COMBAT_PENALTY: 20,
};

// ===== COMBAT MODIFIERS =====

export const COMBAT_MODIFIERS = {
  // Damage calculation
  BASE_DAMAGE_MULTIPLIER: 1.0,
  CRITICAL_HIT_MULTIPLIER: 1.5,
  CRITICAL_HIT_CHANCE: 0.1, // 10% chance

  // Defense calculation
  DEFENSE_REDUCTION_CAP: 0.8, // Maximum 80% damage reduction
  DEFENSE_SCALING: 1.0, // Linear scaling for defense

  // Level-based stat scaling
  STAT_SCALING_PER_LEVEL: 0.2, // 20% increase per level

  // Weapon damage calculation
  WEAPON_BASE_DAMAGE: 1, // Base damage at level 1
  WEAPON_DAMAGE_PER_LEVEL: 0.7, // Damage increase per level
  WEAPON_TYPE_MULTIPLIERS: {
    Light: 0.5, // Standard melee weapons
    Medium: 0.75, // Electronic weapons
    Heavy: 1, // Energy weapons
  },

  // Armor defense calculation
  ARMOR_BASE_DEFENSE: 0.3, // Base defense at level 1
  ARMOR_DEFENSE_PER_LEVEL: 1.2, // Defense increase per level
  ARMOR_TYPE_MULTIPLIERS: {
    Light: 0.5,
    Medium: 0.75,
    Heavy: 1,
  },
};

// ===== LEVEL PROGRESSION MODIFIERS =====

export const LEVEL_MODIFIERS = {
  // XP requirements scaling
  XP_BASE: 100, // XP needed for level 2
  XP_SCALING: 1.5, // Multiplier for each level

  // Stat increases per level
  HP_INCREASE_PER_LEVEL: 10,
  ATTACK_INCREASE_PER_LEVEL: 0.5,
  DEFENSE_INCREASE_PER_LEVEL: 0.3,
};

// ===== MARKET MODIFIERS =====

export const MARKET_MODIFIERS = {
  // Item availability
  ITEMS_PER_LEVEL: 3, // Number of items available per level

  // Price variation
  PRICE_VARIATION: 0.1, // ±10% price variation

  // Level requirements
  LEVEL_REQUIREMENT_OFFSET: 0, // Items available at character level + offset
};

// ===== UI/UX MODIFIERS =====

export const UI_MODIFIERS = {
  // Animation durations (in milliseconds)
  SCANNING_DURATION: 1000,
  COMBAT_MESSAGE_DELAY: 100,
  LEVEL_UP_ANIMATION_DURATION: 2000,

  // Sound volumes
  DEFAULT_SOUND_VOLUME: 0.4,
  MUSIC_VOLUME: 0.3,
  COMBAT_SOUND_VOLUME: 0.6,
};

// ===== DEBUGGING MODIFIERS =====

export const DEBUG_MODIFIERS = {
  // Enable/disable features
  ENABLE_CONSOLE_LOGGING: true,
  ENABLE_PERFORMANCE_LOGGING: false,

  // Test values
  TEST_LEVEL: 5,
  TEST_CREDITS: 1000,
  TEST_EXP: 500,
};

// ===== HELPER FUNCTIONS =====

/**
 * Calculate weapon damage based on level and type
 * @param {number} level - Weapon level
 * @param {string} weaponType - Weapon type (Light, Medium, Heavy)
 * @returns {number} - Calculated damage
 */
export const calculateWeaponDamage = (level, weaponType = "Light") => {
  const {
    WEAPON_BASE_DAMAGE,
    WEAPON_DAMAGE_PER_LEVEL,
    WEAPON_TYPE_MULTIPLIERS,
  } = COMBAT_MODIFIERS;

  const baseDamage = WEAPON_BASE_DAMAGE + level * WEAPON_DAMAGE_PER_LEVEL;
  const typeMultiplier = WEAPON_TYPE_MULTIPLIERS[weaponType] || 1.0;

  // Round to exactly 2 decimal places
  return Math.round(baseDamage * typeMultiplier * 100) / 100;
};

/**
 * Calculate armor defense based on level and type
 * @param {number} level - Armor level
 * @param {string} armorType - Armor type (Light, Medium, Heavy)
 * @returns {number} - Calculated defense percentage
 */
export const calculateArmorDefense = (level, armorType = "Light") => {
  const {
    ARMOR_BASE_DEFENSE,
    ARMOR_DEFENSE_PER_LEVEL,
    ARMOR_TYPE_MULTIPLIERS,
  } = COMBAT_MODIFIERS;

  const baseDefense = ARMOR_BASE_DEFENSE + level * ARMOR_DEFENSE_PER_LEVEL;
  const typeMultiplier = ARMOR_TYPE_MULTIPLIERS[armorType] || 1.0;

  // Round to exactly 2 decimal places
  return Math.round(baseDefense * typeMultiplier * 100) / 100;
};

/**
 * Calculate price with damage scaling
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
  const {
    DAMAGE_PRICE_MULTIPLIER,
    DAMAGE_PRICE_EXPONENT,
    LEVEL_PRICE_MULTIPLIER,
  } = PRICE_MODIFIERS;

  const { WEAPON_TYPE_MULTIPLIERS } = COMBAT_MODIFIERS;

  const basePrice =
    Math.pow(damage, DAMAGE_PRICE_EXPONENT) * DAMAGE_PRICE_MULTIPLIER;
  const levelMultiplier = Math.pow(LEVEL_PRICE_MULTIPLIER, level - 1);
  const typeMultiplier = WEAPON_TYPE_MULTIPLIERS[weaponType] || 1.0;

  return Math.round(basePrice * levelMultiplier * typeMultiplier);
};

/**
 * Calculate armor price with defense scaling
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
  const {
    DEFENSE_PRICE_MULTIPLIER,
    DEFENSE_PRICE_EXPONENT,
    LEVEL_PRICE_MULTIPLIER,
  } = PRICE_MODIFIERS;

  const { ARMOR_TYPE_MULTIPLIERS } = COMBAT_MODIFIERS;

  const basePrice =
    Math.pow(defense, DEFENSE_PRICE_EXPONENT) * DEFENSE_PRICE_MULTIPLIER;
  const levelMultiplier = Math.pow(LEVEL_PRICE_MULTIPLIER, level - 1);
  const typeMultiplier = ARMOR_TYPE_MULTIPLIERS[armorType] || 1.0;

  return Math.round(basePrice * levelMultiplier * typeMultiplier);
};

/**
 * Generate rewards based on enemy level
 * @param {Object} winner - Winner object with level
 * @param {Array} enemies - Array of defeated enemies
 * @returns {Object} - Rewards object with credits and experience
 */
export const generateRewards = (winner, enemies) => {
  const {
    BASE_CREDITS_PER_LEVEL,
    BASE_EXP_PER_LEVEL,
    CREDITS_SCALING,
    EXP_SCALING,
    MIN_CREDITS,
    MIN_EXP,
    MAX_CREDITS,
    MAX_EXP,
  } = REWARD_MODIFIERS;

  const level = winner.level || 1;

  // Calculate base rewards
  let credits = BASE_CREDITS_PER_LEVEL * Math.pow(CREDITS_SCALING, level - 1);
  let experience = BASE_EXP_PER_LEVEL * Math.pow(EXP_SCALING, level - 1);

  // Apply minimums and maximums
  credits = Math.max(MIN_CREDITS, Math.min(MAX_CREDITS, Math.round(credits)));
  experience = Math.max(MIN_EXP, Math.min(MAX_EXP, Math.round(experience)));

  return { credits, experience };
};

/**
 * Calculate initial flee penalty
 * @param {number} currentCredits - Player's current credits
 * @returns {number} - Penalty amount
 */
export const calculateInitialFleePenalty = (currentCredits) => {
  const { INITIAL_FLEE_PENALTY, MIN_FLEE_PENALTY } = PENALTY_MODIFIERS;

  const percentagePenalty = currentCredits * INITIAL_FLEE_PENALTY;
  return Math.max(MIN_FLEE_PENALTY, Math.round(percentagePenalty));
};

/**
 * Calculate combat penalty based on rounds
 * @param {Object} enemy - Enemy object
 * @param {number} combatRounds - Number of combat rounds
 * @returns {number} - Penalty amount
 */
export const calculateCombatPenalty = (enemy, combatRounds) => {
  const {
    COMBAT_PENALTY_BASE,
    COMBAT_PENALTY_PER_ROUND,
    COMBAT_PENALTY_MAX,
    MIN_COMBAT_PENALTY,
  } = PENALTY_MODIFIERS;

  const enemyLevel = enemy.level || 1;
  const basePenalty = enemyLevel * 10; // Base penalty per enemy level

  // Calculate percentage penalty
  const percentagePenalty = Math.min(
    COMBAT_PENALTY_MAX,
    COMBAT_PENALTY_BASE + combatRounds * COMBAT_PENALTY_PER_ROUND
  );

  const totalPenalty = basePenalty * (1 + percentagePenalty);
  return Math.max(MIN_COMBAT_PENALTY, Math.round(totalPenalty));
};

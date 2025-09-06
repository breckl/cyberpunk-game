# Game Balance Configuration

This directory contains centralized configuration files for game balance and modifiers.

## Files

- `gameBalance.js` - Main configuration file with all game balance modifiers

## How Rewards Work (Simple Explanation)

### Combat Rewards - The Easy Way

When you win a fight, you get **credits** and **XP** based on the enemy's level. Here's how it works:

**The Simple Formula:**

- **Level 1 enemy**: You get 25 credits + 25 XP
- **Level 2 enemy**: You get 30 credits + 28 XP
- **Level 3 enemy**: You get 36 credits + 33 XP
- **Level 5 enemy**: You get 52 credits + 44 XP

**What Controls This:**

- `BASE_CREDITS_PER_LEVEL: 25` = How many credits you get for a Level 1 enemy
- `BASE_EXP_PER_LEVEL: 25` = How many XP you get for a Level 1 enemy
- `CREDITS_SCALING: 1.2` = How much more credits you get per level (20% more each level)
- `EXP_SCALING: 1.15` = How much more XP you get per level (15% more each level)

**To Make It Simpler:**

- **Want more money?** Increase `BASE_CREDITS_PER_LEVEL` (try 50 for double rewards)
- **Want more XP?** Increase `BASE_EXP_PER_LEVEL` (try 50 for double XP)
- **Want rewards to grow faster?** Increase the scaling numbers (try 1.5 for 50% growth per level)
- **Want rewards to grow slower?** Decrease the scaling numbers (try 1.1 for 10% growth per level)

**Example - Double All Rewards:**

```javascript
BASE_CREDITS_PER_LEVEL: 50,  // Was 25
BASE_EXP_PER_LEVEL: 50,      // Was 25
```

**Example - Make Rewards Grow Faster:**

```javascript
CREDITS_SCALING: 1.5,  // Was 1.2 (50% more per level instead of 20%)
EXP_SCALING: 1.3,      // Was 1.15 (30% more per level instead of 15%)
```

## Usage

### Quick Tweaks

To adjust game balance, simply modify the values in `src/config/gameBalance.js`:

```javascript
// Make weapons more expensive
PRICE_MODIFIERS.DAMAGE_PRICE_MULTIPLIER = 75; // Was 50

// Make rewards more generous
REWARD_MODIFIERS.BASE_CREDITS_PER_LEVEL = 75; // Was 50

// Reduce combat penalties
PENALTY_MODIFIERS.COMBAT_PENALTY_BASE = 0.05; // Was 0.1 (5% instead of 10%)
```

### Key Modifiers

#### Economy

- `DAMAGE_PRICE_MULTIPLIER` - Base price per damage point
- `DEFENSE_PRICE_MULTIPLIER` - Base price per defense percentage
- `SELL_PRICE_PERCENTAGE` - What percentage of purchase price you get when selling
- `WEAPON_TYPE_MULTIPLIERS` - Price multipliers for different weapon types (Light, Medium, Heavy)
- `ARMOR_TYPE_MULTIPLIERS` - Price multipliers for different armor types (Light, Medium, Heavy)

#### Combat Stats

- `calculateWeaponDamage(level, weaponType)` - Calculate weapon damage based on level and type
- `calculateArmorDefense(level, armorType)` - Calculate armor defense based on level and type

#### Rewards

- `BASE_CREDITS_PER_LEVEL` - Base credits earned per enemy level
- `BASE_EXP_PER_LEVEL` - Base experience earned per enemy level
- `CREDITS_SCALING` - How much rewards increase per level

#### Penalties

- `INITIAL_FLEE_PENALTY` - Percentage of credits lost when fleeing
- `COMBAT_PENALTY_BASE` - Base penalty percentage for losing combat
- `COMBAT_PENALTY_PER_ROUND` - Additional penalty per combat round

#### Combat

- `CRITICAL_HIT_CHANCE` - Chance for critical hits (0.1 = 10%)
- `CRITICAL_HIT_MULTIPLIER` - Damage multiplier for critical hits
- `DEFENSE_REDUCTION_CAP` - Maximum damage reduction from armor (0.8 = 80%)

### Example: Making the Game Easier

```javascript
// In gameBalance.js
export const REWARD_MODIFIERS = {
  BASE_CREDITS_PER_LEVEL: 100, // Double the credits
  BASE_EXP_PER_LEVEL: 50, // Double the experience
  // ... rest unchanged
};

export const PENALTY_MODIFIERS = {
  INITIAL_FLEE_PENALTY: 0.02, // Half the flee penalty
  COMBAT_PENALTY_BASE: 0.05, // Half the combat penalty
  // ... rest unchanged
};
```

### Example: Making the Game Harder

```javascript
// In gameBalance.js
export const PRICE_MODIFIERS = {
  DAMAGE_PRICE_MULTIPLIER: 100, // Double weapon prices
  DEFENSE_PRICE_MULTIPLIER: 200, // Double armor prices
  // ... rest unchanged
};

export const REWARD_MODIFIERS = {
  BASE_CREDITS_PER_LEVEL: 25, // Half the credits
  BASE_EXP_PER_LEVEL: 15, // Half the experience
  // ... rest unchanged
};
```

### Example: Adjusting Type Multipliers

```javascript
// Make Heavy weapons much more expensive
PRICE_MODIFIERS.WEAPON_TYPE_MULTIPLIERS = {
  Light: 1.0, // Standard melee weapons
  Medium: 1.5, // Electronic weapons (was 1.25)
  Heavy: 2.0, // Energy weapons (was 1.5)
};

// Make Heavy armor more expensive but Light armor cheaper
PRICE_MODIFIERS.ARMOR_TYPE_MULTIPLIERS = {
  Light: 0.8, // Standard clothing (was 1.0)
  Medium: 1.2, // Reinforced clothing (unchanged)
  Heavy: 1.8, // Body armor (was 1.4)
};
```

### Example: Adjusting Weapon/Armor Stats

```javascript
// In the calculateWeaponDamage function, you can modify:
const baseDamage = 1 + level * 0.7; // Change 0.7 to adjust damage scaling

const typeMultipliers = {
  Light: 1, // Standard melee weapons
  Medium: 1.25, // Electronic weapons (25% stronger)
  Heavy: 1.5, // Energy weapons (50% stronger)
};

// In the calculateArmorDefense function, you can modify:
const baseDefense = 0.3 + level * 1.2; // Change 1.2 to adjust defense scaling

const typeMultipliers = {
  Light: 1, // Standard clothing
  Medium: 1.25, // Reinforced clothing (25% stronger)
  Heavy: 1.5, // Body armor (50% stronger)
};
```

## Integration

The configuration is automatically used by:

- `CombatSystem.js` - For rewards and penalties
- `market.js` - For all weapon and armor pricing and stats
- All other systems that import from this config

**Note:** `ProgressionCalculator.js` no longer contains the pricing functions - they've been moved to `gameBalance.js` for centralized management.

No code changes needed - just modify the values and restart the game!

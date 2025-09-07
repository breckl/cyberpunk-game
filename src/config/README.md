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

## Weapon Prices - The Easy Way

Weapons cost money based on their **damage** and **type**. Here's how it works:

**The Simple Formula:**

- **Light Weapon Level 1**: 50 credits (1 damage × 50 × 1.0)
- **Medium Weapon Level 1**: 62 credits (1 damage × 50 × 1.25)
- **Heavy Weapon Level 1**: 75 credits (1 damage × 50 × 1.5)
- **Light Weapon Level 5**: 250 credits (5 damage × 50 × 1.0)

**What Controls This:**

- `DAMAGE_PRICE_MULTIPLIER: 50` = Base price per damage point
- `WEAPON_TYPE_MULTIPLIERS` = Price multipliers for each type:
  - Light: 1.0 (normal price)
  - Medium: 1.25 (25% more expensive)
  - Heavy: 1.5 (50% more expensive)

**To Make It Simpler:**

- **Want cheaper weapons?** Lower `DAMAGE_PRICE_MULTIPLIER` (try 25 for half price)
- **Want expensive weapons?** Raise `DAMAGE_PRICE_MULTIPLIER` (try 100 for double price)
- **Want Heavy weapons cheaper?** Lower Heavy multiplier (try 1.2 instead of 1.5)

## Weapon Damage - The Easy Way

Weapon damage increases with level and varies by type. Here's how it works:

**The Simple Formula:**

- **Light Weapon Level 1**: 1 damage
- **Medium Weapon Level 1**: 1.25 damage (25% stronger)
- **Heavy Weapon Level 1**: 1.5 damage (50% stronger)
- **Light Weapon Level 5**: 4.5 damage

**What Controls This:**

- `WEAPON_BASE_DAMAGE: 1` = Starting damage at level 1
- `WEAPON_DAMAGE_PER_LEVEL: 0.7` = How much damage increases per level
- `WEAPON_TYPE_MULTIPLIERS` = Damage multipliers for each type

**To Make It Simpler:**

- **Want stronger weapons?** Increase `WEAPON_DAMAGE_PER_LEVEL` (try 1.0 for more damage)
- **Want weaker weapons?** Decrease `WEAPON_DAMAGE_PER_LEVEL` (try 0.5 for less damage)
- **Want Heavy weapons much stronger?** Increase Heavy multiplier (try 2.0 instead of 1.5)

## Armor Prices - The Easy Way

Armor costs money based on its **defense** and **type**. Here's how it works:

**The Simple Formula:**

- **Light Armor Level 1**: 50 credits (1 defense × 50 × 1.0)
- **Medium Armor Level 1**: 62 credits (1 defense × 50 × 1.25)
- **Heavy Armor Level 1**: 75 credits (1 defense × 50 × 1.5)
- **Light Armor Level 5**: 250 credits (5 defense × 50 × 1.0)

**What Controls This:**

- `DEFENSE_PRICE_MULTIPLIER: 50` = Base price per defense point
- `ARMOR_TYPE_MULTIPLIERS` = Price multipliers for each type (same as weapons)

**To Make It Simpler:**

- **Want cheaper armor?** Lower `DEFENSE_PRICE_MULTIPLIER` (try 25 for half price)
- **Want expensive armor?** Raise `DEFENSE_PRICE_MULTIPLIER` (try 100 for double price)

## Armor Defense - The Easy Way

Armor defense increases with level and varies by type. Here's how it works:

**The Simple Formula:**

- **Light Armor Level 1**: 1.5% damage reduction
- **Medium Armor Level 1**: 1.875% damage reduction (25% better)
- **Heavy Armor Level 1**: 2.25% damage reduction (50% better)
- **Light Armor Level 5**: 6.3% damage reduction

**What Controls This:**

- `ARMOR_BASE_DEFENSE: 0.3` = Starting defense at level 1
- `ARMOR_DEFENSE_PER_LEVEL: 1.2` = How much defense increases per level
- `ARMOR_TYPE_MULTIPLIERS` = Defense multipliers for each type

**To Make It Simpler:**

- **Want stronger armor?** Increase `ARMOR_DEFENSE_PER_LEVEL` (try 1.5 for more defense)
- **Want weaker armor?** Decrease `ARMOR_DEFENSE_PER_LEVEL` (try 0.8 for less defense)

## Defeat Penalties - The Easy Way

When you lose a fight, you lose money. Here's how it works:

**The Simple Formula:**

- **Quick Loss (1 round)**: Lose 10% of your credits
- **Long Fight (5 rounds)**: Lose 20% of your credits (10% + 2% per round)
- **Maximum Loss**: Never lose more than 50% of your credits

**What Controls This:**

- `COMBAT_PENALTY_BASE: 0.1` = Base penalty (10% of credits)
- `COMBAT_PENALTY_PER_ROUND: 0.02` = Extra penalty per round (2% per round)
- `COMBAT_PENALTY_MAX: 0.5` = Maximum penalty (50% of credits)
- `MIN_COMBAT_PENALTY: 20` = Minimum credits lost (even if percentage is lower)

**To Make It Simpler:**

- **Want lighter penalties?** Lower `COMBAT_PENALTY_BASE` (try 0.05 for 5% base)
- **Want harsher penalties?** Raise `COMBAT_PENALTY_BASE` (try 0.2 for 20% base)
- **Want no extra penalty for long fights?** Set `COMBAT_PENALTY_PER_ROUND` to 0

## Flee Penalties - The Easy Way

When you run from combat, you lose money. Here's how it works:

**The Simple Formula:**

- **First Time Fleeing**: Lose 5% of your credits (or minimum 10 credits)
- **Subsequent Fleeing**: Lose more based on how many times you've fled

**What Controls This:**

- `INITIAL_FLEE_PENALTY: 0.05` = First flee penalty (5% of credits)
- `MIN_FLEE_PENALTY: 10` = Minimum credits lost when fleeing

**To Make It Simpler:**

- **Want lighter flee penalty?** Lower `INITIAL_FLEE_PENALTY` (try 0.02 for 2%)
- **Want harsher flee penalty?** Raise `INITIAL_FLEE_PENALTY` (try 0.1 for 10%)

## Enemy Balance - The Easy Way

Enemies get stronger as their level increases. Here's how it works:

**The Simple Formula:**

- **Level 1 Enemy**: 1 damage weapon, 1.5% armor defense
- **Level 2 Enemy**: 1.7 damage weapon, 2.7% armor defense
- **Level 5 Enemy**: 4.5 damage weapon, 6.3% armor defense

**What Controls This:**

- Enemies use the same `calculateWeaponDamage()` and `calculateArmorDefense()` functions as players
- Enemy stats scale with their level using the same formulas

**To Make It Simpler:**

- **Want easier enemies?** Lower the damage/defense per level in the calculation functions
- **Want harder enemies?** Raise the damage/defense per level in the calculation functions
- **Want to check enemy balance?** Use the Combat Test tab in the debug tools

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

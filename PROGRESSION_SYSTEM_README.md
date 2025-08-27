# 🎯 Cyberpunk Text Game - Balanced Progression System

## Overview

This document describes the new balanced progression system that replaces the previous hardcoded values with mathematical formulas that scale predictably and maintain game balance.

## 🏗️ System Architecture

### Core Components

1. **ProgressionCalculator** (`src/utils/progressionCalculator.js`) - Main mathematical engine
2. **CombatBalanceTester** (`src/utils/combatBalanceTester.js`) - Testing and validation utility
3. **Updated Data Files** - Market, enemies, and levels now use calculated values
4. **Test Script** (`test_progression_system.js`) - Demonstrates the system

## 📊 Mathematical Formulas

### Player Stats

```javascript
HP = 25 + level * 8;
Attack = 2 + level * 1.5;
Defense = 1 + level * 1.2;
Hacking = 4 + level * 2;
```

### Weapon Damage

```javascript
Base Damage = 1 + (level * 1.5)
Type Multipliers:
- Power: 1.0x
- Tech: 1.2x
- Energy: 1.4x
- Heavy: 1.8x
```

### Armor Defense

```javascript
Base Defense = 0.5 + (level * 1.2)
Type Multipliers:
- Light: 1.0x
- Medium: 1.3x
- Heavy: 1.6x
- Powered: 2.0x
```

### Enemy Scaling

```javascript
Health = Player HP * (0.8 + level * 0.1)
Attack = Player Attack * (0.9 + level * 0.15)
Defense = Player Defense * (0.7 + level * 0.2)
```

### Price Scaling

```javascript
Price = Base Price * (1.4 ^ (level - 1)) * Rarity Multiplier
Rarity Multipliers:
- Common: 1.0x
- Uncommon: 1.5x
- Rare: 2.5x
- Epic: 4.0x
- Legendary: 8.0x
```

## 🎮 Combat Balance

### Target Metrics

- **Combat Duration**: 3-5 rounds for both player and enemy
- **Challenge Level**: Challenging but not overwhelming
- **Progression**: Each level feels like a meaningful upgrade

### Balance Formula

```javascript
Player Damage/Round = (Player Attack + Weapon Damage) * 0.8
Enemy Damage/Round = Enemy Attack * 0.75
Rounds to Kill = Ceiling(Enemy HP / Player Damage/Round)
```

## 🛠️ Usage Examples

### Basic Calculations

```javascript
import ProgressionCalculator from "./src/utils/progressionCalculator.js";

// Calculate player stats for level 3
const stats = ProgressionCalculator.calculatePlayerStats(3);
console.log(stats); // { hp: 49, attack: 6.5, defense: 4.6, hacking: 10 }

// Calculate weapon damage for level 4 Tech weapon
const damage = ProgressionCalculator.calculateWeaponDamage(4, "Tech");
console.log(damage); // 8.4

// Calculate armor defense for level 5 Heavy armor
const defense = ProgressionCalculator.calculateArmorDefense(5, "Heavy");
console.log(defense); // 11.2
```

### Combat Balance Testing

```javascript
import CombatBalanceTester from "./src/utils/combatBalanceTester.js";

// Test basic combat balance
const balance = CombatBalanceTester.testCombatBalance(3, 3);
console.log(balance.difficulty); // "Balanced"

// Test with equipment
const weapon = { name: "Katana", damage: 7, type: "Power" };
const armor = { name: "Kevlar Vest", defense: 6, type: "Medium" };
const balanceWithEquipment = CombatBalanceTester.testCombatBalance(
  3,
  3,
  weapon,
  armor
);
```

### Generate Balance Report

```javascript
const report = CombatBalanceTester.generateBalanceReport();
console.log(
  `Overall Balance: ${report.overallStats.balanced}/${report.overallStats.totalTests} tests are balanced`
);
```

## 📈 Level Progression Examples

### Level 1-6 Player Stats

```
Level 1: HP 33, Attack 3.5, Defense 2.2, Hacking 6
Level 2: HP 41, Attack 5.0, Defense 3.4, Hacking 8
Level 3: HP 49, Attack 6.5, Defense 4.6, Hacking 10
Level 4: HP 57, Attack 8.0, Defense 5.8, Hacking 12
Level 5: HP 65, Attack 9.5, Defense 7.0, Hacking 14
Level 6: HP 73, Attack 11.0, Defense 8.2, Hacking 16
```

### Weapon Damage Progression

```
Level 1 Power: 2.5 damage
Level 2 Power: 4.0 damage
Level 3 Power: 5.5 damage
Level 4 Power: 7.0 damage
Level 5 Power: 8.5 damage
Level 6 Power: 10.0 damage
```

### Armor Defense Progression

```
Level 1 Light: 1.7 defense
Level 2 Light: 2.9 defense
Level 3 Light: 4.1 defense
Level 4 Light: 5.3 defense
Level 5 Light: 6.5 defense
Level 6 Light: 7.7 defense
```

## 🔧 Customization

### Adjusting Difficulty

To make the game easier:

```javascript
// Reduce enemy scaling in ProgressionCalculator.calculateEnemyStats()
const healthMultiplier = 0.6 + level * 0.08; // Was 0.8 + level * 0.1
const attackMultiplier = 0.7 + level * 0.12; // Was 0.9 + level * 0.15
```

To make the game harder:

```javascript
// Increase enemy scaling
const healthMultiplier = 1.0 + level * 0.12; // Was 0.8 + level * 0.1
const attackMultiplier = 1.1 + level * 0.18; // Was 0.9 + level * 0.15
```

### Adjusting Progression Speed

To make progression faster:

```javascript
// Increase stat gains per level in ProgressionCalculator.calculatePlayerStats()
hp: 25 + (level * 10), // Was level * 8
attack: 2 + (level * 2), // Was level * 1.5
```

To make progression slower:

```javascript
// Decrease stat gains per level
hp: 25 + (level * 6), // Was level * 8
attack: 2 + (level * 1.2), // Was level * 1.5
```

## 🧪 Testing

### Run the Test Script

```bash
node test_progression_system.js
```

### Test Specific Scenarios

```javascript
// Test level 5 player vs level 6 enemy
CombatBalanceTester.quickBalanceCheck(5, 6);

// Test equipment combinations
const equipmentTest = CombatBalanceTester.testEquipmentCombinations(4, 4);

// Test enemy type balance
const enemyBalance = CombatBalanceTester.testEnemyTypeBalance(3, 3);
```

## 📊 Balance Metrics

### Target Percentages

- **Balanced**: 60-80% of tests
- **Too Easy**: <20% of tests
- **Too Hard**: <20% of tests
- **Needs Adjustment**: <10% of tests

### Current Performance

The system is designed to achieve:

- Combat lasting 3-5 rounds
- Meaningful upgrades every 1-2 levels
- Reasonable price scaling
- Consistent challenge progression

## 🚀 Benefits

1. **Predictable**: Players know what to expect at each level
2. **Balanced**: Combat is challenging but fair
3. **Scalable**: Easy to add new levels and content
4. **Maintainable**: Change one formula to adjust entire progression
5. **Testable**: Comprehensive testing tools included
6. **Flexible**: Easy to customize for different difficulty preferences

## 🔮 Future Enhancements

### Planned Features

- Dynamic difficulty adjustment based on player performance
- Seasonal balance updates
- Player feedback integration
- Advanced combat mechanics (status effects, combos)
- Equipment set bonuses
- Skill tree progression

### Integration Points

- Combat system
- Inventory management
- Quest rewards
- Shop pricing
- Enemy spawning
- Level design

## 📝 Maintenance

### Regular Tasks

- Run balance tests after major changes
- Monitor player feedback on difficulty
- Adjust formulas based on gameplay data
- Update enemy and equipment data as needed

### Troubleshooting

- If combat is too easy: reduce enemy stats or increase player progression
- If combat is too hard: increase player stats or reduce enemy progression
- If progression feels slow: increase stat gains per level
- If progression feels fast: decrease stat gains per level

---

**Note**: This system replaces all hardcoded values in the original data files. All market items, enemies, and player stats now use calculated values for consistent balance.

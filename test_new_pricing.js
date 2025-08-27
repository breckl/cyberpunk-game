/**
 * Test Script for the New Damage-Based Pricing System
 * Shows how prices now correlate directly with stats
 */

import ProgressionCalculator from './src/utils/progressionCalculator.js';

console.log('💰 Testing New Damage-Based Pricing System\n');

// Test 1: Weapon Damage vs Price Correlation
console.log('⚔️ Weapon Damage vs Price Correlation:');
console.log('Level 1 Weapons:');
const level1Power = ProgressionCalculator.calculateWeaponDamage(1, "Power");
const level1Tech = ProgressionCalculator.calculateWeaponDamage(1, "Tech");
const level1Energy = ProgressionCalculator.calculateWeaponDamage(1, "Energy");
const level1Heavy = ProgressionCalculator.calculateWeaponDamage(1, "Heavy");

console.log(`  Power Weapon: ${level1Power} damage = ${ProgressionCalculator.calculatePriceWithDamage(level1Power, 1, "common", "Power")} credits`);
console.log(`  Tech Weapon: ${level1Tech} damage = ${ProgressionCalculator.calculatePriceWithDamage(level1Tech, 1, "common", "Tech")} credits`);
console.log(`  Energy Weapon: ${level1Energy} damage = ${ProgressionCalculator.calculatePriceWithDamage(level1Energy, 1, "common", "Energy")} credits`);
console.log(`  Heavy Weapon: ${level1Heavy} damage = ${ProgressionCalculator.calculatePriceWithDamage(level1Heavy, 1, "common", "Heavy")} credits`);

console.log('\nLevel 3 Weapons:');
const level3Power = ProgressionCalculator.calculateWeaponDamage(3, "Power");
const level3Tech = ProgressionCalculator.calculateWeaponDamage(3, "Tech");
const level3Energy = ProgressionCalculator.calculateWeaponDamage(3, "Energy");
const level3Heavy = ProgressionCalculator.calculateWeaponDamage(3, "Heavy");

console.log(`  Power Weapon: ${level3Power} damage = ${ProgressionCalculator.calculatePriceWithDamage(level3Power, 3, "uncommon", "Power")} credits`);
console.log(`  Tech Weapon: ${level3Tech} damage = ${ProgressionCalculator.calculatePriceWithDamage(level3Tech, 3, "uncommon", "Tech")} credits`);
console.log(`  Energy Weapon: ${level3Energy} damage = ${ProgressionCalculator.calculatePriceWithDamage(level3Energy, 3, "rare", "Energy")} credits`);
console.log(`  Heavy Weapon: ${level3Heavy} damage = ${ProgressionCalculator.calculatePriceWithDamage(level3Heavy, 3, "rare", "Heavy")} credits`);

// Test 2: Armor Defense vs Price Correlation
console.log('\n🛡️ Armor Defense vs Price Correlation:');
console.log('Level 1 Armor:');
const level1Light = ProgressionCalculator.calculateArmorDefense(1, "Light");
const level1Medium = ProgressionCalculator.calculateArmorDefense(1, "Medium");
const level1Heavy = ProgressionCalculator.calculateArmorDefense(1, "Heavy");
const level1Powered = ProgressionCalculator.calculateArmorDefense(1, "Powered");

console.log(`  Light Armor: ${level1Light} defense = ${ProgressionCalculator.calculateArmorPriceWithDefense(level1Light, 1, "common", "Light")} credits`);
console.log(`  Medium Armor: ${level1Medium} defense = ${ProgressionCalculator.calculateArmorPriceWithDefense(level1Medium, 1, "common", "Medium")} credits`);
console.log(`  Heavy Armor: ${level1Heavy} defense = ${ProgressionCalculator.calculateArmorPriceWithDefense(level1Heavy, 1, "common", "Heavy")} credits`);
console.log(`  Powered Armor: ${level1Powered} defense = ${ProgressionCalculator.calculateArmorPriceWithDefense(level1Powered, 1, "common", "Powered")} credits`);

console.log('\nLevel 3 Armor:');
const level3Light = ProgressionCalculator.calculateArmorDefense(3, "Light");
const level3Medium = ProgressionCalculator.calculateArmorDefense(3, "Medium");
const level3Heavy = ProgressionCalculator.calculateArmorDefense(3, "Heavy");
const level3Powered = ProgressionCalculator.calculateArmorDefense(3, "Powered");

console.log(`  Light Armor: ${level3Light} defense = ${ProgressionCalculator.calculateArmorPriceWithDefense(level3Light, 3, "uncommon", "Light")} credits`);
console.log(`  Medium Armor: ${level3Medium} defense = ${ProgressionCalculator.calculateArmorPriceWithDefense(level3Medium, 3, "uncommon", "Medium")} credits`);
console.log(`  Heavy Armor: ${level3Heavy} defense = ${ProgressionCalculator.calculateArmorPriceWithDefense(level3Heavy, 3, "uncommon", "Heavy")} credits`);
console.log(`  Powered Armor: ${level3Powered} defense = ${ProgressionCalculator.calculateArmorPriceWithDefense(level3Powered, 3, "uncommon", "Powered")} credits`);

// Test 3: Rarity Impact on Pricing
console.log('\n💎 Rarity Impact on Pricing:');
const baseDamage = 5;
const baseDefense = 4;
console.log(`Base Weapon (5 damage):`);
console.log(`  Common: ${ProgressionCalculator.calculatePriceWithDamage(baseDamage, 3, "common", "Power")} credits`);
console.log(`  Uncommon: ${ProgressionCalculator.calculatePriceWithDamage(baseDamage, 3, "uncommon", "Power")} credits`);
console.log(`  Rare: ${ProgressionCalculator.calculatePriceWithDamage(baseDamage, 3, "rare", "Power")} credits`);
console.log(`  Epic: ${ProgressionCalculator.calculatePriceWithDamage(baseDamage, 3, "epic", "Power")} credits`);
console.log(`  Legendary: ${ProgressionCalculator.calculatePriceWithDamage(baseDamage, 3, "legendary", "Power")} credits`);

console.log(`\nBase Armor (4 defense):`);
console.log(`  Common: ${ProgressionCalculator.calculateArmorPriceWithDefense(baseDefense, 3, "common", "Medium")} credits`);
console.log(`  Uncommon: ${ProgressionCalculator.calculateArmorPriceWithDefense(baseDefense, 3, "uncommon", "Medium")} credits`);
console.log(`  Rare: ${ProgressionCalculator.calculateArmorPriceWithDefense(baseDefense, 3, "rare", "Medium")} credits`);
console.log(`  Epic: ${ProgressionCalculator.calculateArmorPriceWithDefense(baseDefense, 3, "epic", "Medium")} credits`);
console.log(`  Legendary: ${ProgressionCalculator.calculateArmorPriceWithDefense(baseDefense, 3, "legendary", "Medium")} credits`);

// Test 4: Level Scaling Impact
console.log('\n📈 Level Scaling Impact:');
const weaponDamage = 6;
const armorDefense = 5;
console.log(`Weapon (6 damage) at different levels:`);
for (let level = 1; level <= 5; level++) {
  const price = ProgressionCalculator.calculatePriceWithDamage(weaponDamage, level, "uncommon", "Power");
  console.log(`  Level ${level}: ${price} credits`);
}

console.log(`\nArmor (5 defense) at different levels:`);
for (let level = 1; level <= 5; level++) {
  const price = ProgressionCalculator.calculateArmorPriceWithDefense(armorDefense, level, "uncommon", "Medium");
  console.log(`  Level ${level}: ${price} credits`);
}

// Test 5: Price per Point Analysis
console.log('\n📊 Price per Point Analysis:');
console.log('Weapons:');
for (let level = 1; level <= 3; level++) {
  const damage = ProgressionCalculator.calculateWeaponDamage(level, "Power");
  const price = ProgressionCalculator.calculatePriceWithDamage(damage, level, "common", "Power");
  const pricePerPoint = (price / damage).toFixed(1);
  console.log(`  Level ${level}: ${price} credits / ${damage} damage = ${pricePerPoint} credits per damage point`);
}

console.log('\nArmor:');
for (let level = 1; level <= 3; level++) {
  const defense = ProgressionCalculator.calculateArmorDefense(level, "Medium");
  const price = ProgressionCalculator.calculateArmorPriceWithDefense(defense, level, "common", "Medium");
  const pricePerPoint = (price / defense).toFixed(1);
  console.log(`  Level ${level}: ${price} credits / ${defense} defense = ${pricePerPoint} credits per defense point`);
}

console.log('\n✅ New Pricing System Test Complete!');
console.log('\nKey Benefits:');
console.log('1. Prices now directly correlate with damage/defense values');
console.log('2. Higher damage weapons cost more (more intuitive)');
console.log('3. Better armor costs more (logical progression)');
console.log('4. Rarity still affects price but doesn\'t override stat correlation');
console.log('5. Level scaling is more reasonable (1.3x instead of 1.4x)');
console.log('6. Weapon type affects price but doesn\'t break damage correlation');

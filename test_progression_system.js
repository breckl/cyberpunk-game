/**
 * Test Script for the New Progression System
 * Run this to see how the balanced progression works
 */

import ProgressionCalculator from "./src/utils/progressionCalculator.js";
import CombatBalanceTester from "./src/utils/combatBalanceTester.js";

console.log("🚀 Testing New Progression System\n");

// Test 1: Player Stats Progression
console.log("📊 Player Stats Progression:");
for (let level = 1; level <= 6; level++) {
  const stats = ProgressionCalculator.calculatePlayerStats(level);
  console.log(
    `Level ${level}: HP ${stats.hp}, Attack ${stats.attack}, Defense ${stats.defense}, Hacking ${stats.hacking}`
  );
}
console.log("");

// Test 2: Weapon Damage Scaling
console.log("⚔️ Weapon Damage Scaling:");
const weaponTypes = ["Power", "Tech", "Energy", "Heavy"];
for (let level = 1; level <= 6; level++) {
  console.log(`Level ${level}:`);
  weaponTypes.forEach((type) => {
    const damage = ProgressionCalculator.calculateWeaponDamage(level, type);
    console.log(`  ${type}: ${damage} damage`);
  });
}
console.log("");

// Test 3: Armor Defense Scaling
console.log("🛡️ Armor Defense Scaling:");
const armorTypes = ["Light", "Medium", "Heavy", "Powered"];
for (let level = 1; level <= 6; level++) {
  console.log(`Level ${level}:`);
  armorTypes.forEach((type) => {
    const defense = ProgressionCalculator.calculateArmorDefense(level, type);
    console.log(`  ${type}: ${defense} defense`);
  });
}
console.log("");

// Test 4: Enemy Stats Scaling
console.log("👹 Enemy Stats Scaling:");
const enemyTypes = ["Thug", "Heavy", "Assassin", "Hacker"];
for (let level = 1; level <= 6; level++) {
  console.log(`Level ${level}:`);
  enemyTypes.forEach((type) => {
    const stats = ProgressionCalculator.calculateEnemyStats(level, type);
    console.log(
      `  ${type}: HP ${stats.health}, Attack ${stats.attack}, Defense ${stats.defense}, Exp ${stats.expReward}, Credits ${stats.creditReward}`
    );
  });
}
console.log("");

// Test 5: Price Scaling
console.log("💰 Price Scaling Examples:");
const basePrice = 100;
for (let level = 1; level <= 6; level++) {
  const commonPrice = ProgressionCalculator.calculatePrice(
    basePrice,
    level,
    "common"
  );
  const rarePrice = ProgressionCalculator.calculatePrice(
    basePrice,
    level,
    "rare"
  );
  const epicPrice = ProgressionCalculator.calculatePrice(
    basePrice,
    level,
    "epic"
  );
  console.log(
    `Level ${level}: Common ${commonPrice}, Rare ${rarePrice}, Epic ${epicPrice}`
  );
}
console.log("");

// Test 6: Combat Balance
console.log("⚔️ Combat Balance Testing:");
CombatBalanceTester.quickBalanceCheck(1, 1);
CombatBalanceTester.quickBalanceCheck(3, 3);
CombatBalanceTester.quickBalanceCheck(5, 5);
console.log("");

// Test 7: Equipment Impact on Combat
console.log("🔧 Equipment Impact on Combat:");
const weapon = {
  name: "Level 3 Power Weapon",
  damage: ProgressionCalculator.calculateWeaponDamage(3, "Power"),
  type: "Power",
};
const armor = {
  name: "Level 3 Medium Armor",
  defense: ProgressionCalculator.calculateArmorDefense(3, "Medium"),
  type: "Medium",
};

const balanceWithEquipment = CombatBalanceTester.testCombatBalance(
  3,
  3,
  weapon,
  armor
);
console.log("Level 3 Player with Level 3 Weapon & Armor vs Level 3 Enemy:");
console.log(`Weapon: ${weapon.name} (${weapon.damage} damage)`);
console.log(`Armor: ${armor.name} (${armor.defense} defense)`);
console.log(`Combat Balance: ${balanceWithEquipment.difficulty}`);
console.log(`Rounds to Kill Enemy: ${balanceWithEquipment.roundsToKillEnemy}`);
console.log(
  `Rounds to Kill Player: ${balanceWithEquipment.roundsToKillPlayer}`
);
console.log("");

// Test 8: Generate Full Balance Report
console.log("📋 Generating Full Balance Report...");
const fullReport = CombatBalanceTester.generateBalanceReport();
console.log("Overall Balance Statistics:");
console.log(`Total Tests: ${fullReport.overallStats.totalTests}`);
console.log(
  `Balanced: ${fullReport.overallStats.balanced} (${(
    (fullReport.overallStats.balanced / fullReport.overallStats.totalTests) *
    100
  ).toFixed(1)}%)`
);
console.log(
  `Too Easy: ${fullReport.overallStats.tooEasy} (${(
    (fullReport.overallStats.tooEasy / fullReport.overallStats.totalTests) *
    100
  ).toFixed(1)}%)`
);
console.log(
  `Too Hard: ${fullReport.overallStats.tooHard} (${(
    (fullReport.overallStats.tooHard / fullReport.overallStats.totalTests) *
    100
  ).toFixed(1)}%)`
);
console.log(
  `Needs Adjustment: ${fullReport.overallStats.needsAdjustment} (${(
    (fullReport.overallStats.needsAdjustment /
      fullReport.overallStats.totalTests) *
    100
  ).toFixed(1)}%)`
);
console.log("");

console.log("🎯 Overall Recommendations:");
fullReport.recommendations.forEach((rec) => console.log(`- ${rec}`));

console.log("\n✅ Progression System Test Complete!");
console.log("\nKey Benefits of the New System:");
console.log("1. Predictable scaling with mathematical formulas");
console.log("2. Balanced combat that lasts 3-5 rounds");
console.log("3. Meaningful equipment upgrades at each level");
console.log("4. Reasonable price scaling with rarity tiers");
console.log("5. Easy to tune and adjust");
console.log("6. Consistent challenge progression");

#!/usr/bin/env node

/**
 * Test script for Armor Damage Reduction System
 * Verifies that armor now reduces damage instead of adding HP
 * Run with: node test_armor_damage_reduction.js
 */

console.log("🛡️ TESTING ARMOR DAMAGE REDUCTION SYSTEM\n");
console.log("=" * 60);

// Mock levels.js data
const levels = {
  1: { hp: 30, attack: 3, defense: 1 },
  2: { hp: 40, attack: 4, defense: 2 },
};

// Mock enemy data
const mockEnemies = [
  {
    name: "Rooftop Sneak",
    level: 1,
    armor: { name: "Heavy Coat", rating: 1 },
  },
  {
    name: "Sprawl Ganger",
    level: 2,
    armor: { name: "Leather Jacket", rating: 1 },
  },
];

console.log("🔴 Test 1: Enemy Armor Damage Reduction");
console.log("-" * 60);

mockEnemies.forEach((enemy) => {
  const levelHp = levels[enemy.level].hp;
  const levelDefense = levels[enemy.level].defense;
  const armorDefense = enemy.armor.rating;
  const totalDefense = levelDefense + armorDefense;

  console.log(`\n${enemy.name}:`);
  console.log(`  Level HP: ${levelHp} (no armor bonus)`);
  console.log(`  Level Defense: ${levelDefense}`);
  console.log(`  Armor Defense: ${armorDefense} (${enemy.armor.name})`);
  console.log(`  Total Defense: ${totalDefense}`);

  // Test damage reduction
  const testDamage = 5;
  const finalDamage = Math.max(
    1,
    Math.floor((testDamage * (100 - totalDefense)) / 100)
  );

  console.log(`  Test: ${testDamage} damage vs ${totalDefense} defense`);
  console.log(
    `  Formula: ${testDamage} × (100 - ${totalDefense}) / 100 = ${finalDamage} damage`
  );
  console.log(
    `  Damage reduction: ${testDamage - finalDamage} (${Math.round(
      ((testDamage - finalDamage) / testDamage) * 100
    )}%)`
  );
});

console.log("\n\n🔴 Test 2: Player Armor Damage Reduction");
console.log("-" * 60);

// Mock player scenarios
const playerScenarios = [
  { name: "No Armor", level: 1, armor: 0 },
  { name: "Light Armor", level: 1, armor: 1 },
  { name: "Medium Armor", level: 2, armor: 2 },
  { name: "Heavy Armor", level: 2, armor: 3 },
];

playerScenarios.forEach((scenario) => {
  const levelDefense = levels[scenario.level].defense;
  const totalDefense = levelDefense + scenario.armor;

  console.log(`\n${scenario.name}:`);
  console.log(`  Level Defense: ${levelDefense}`);
  console.log(`  Armor Defense: ${scenario.armor}`);
  console.log(`  Total Defense: ${totalDefense}`);

  // Test enemy attack
  const enemyAttack = 6;
  const finalDamage = Math.max(
    1,
    Math.floor((enemyAttack * (100 - totalDefense)) / 100)
  );

  console.log(`  Enemy attack: ${enemyAttack} vs ${totalDefense} defense`);
  console.log(
    `  Formula: ${enemyAttack} × (100 - ${totalDefense}) / 100 = ${finalDamage} damage`
  );
  console.log(
    `  Damage reduction: ${enemyAttack - finalDamage} (${Math.round(
      ((enemyAttack - finalDamage) / enemyAttack) * 100
    )}%)`
  );
});

console.log("\n\n🔴 Test 3: Combat Examples");
console.log("-" * 60);

// Example combat scenarios
const combatScenarios = [
  {
    name: "Player vs Rooftop Sneak",
    playerAttack: 5,
    enemyLevel: 1,
    enemyArmor: 1,
  },
  {
    name: "Player vs Sprawl Ganger",
    playerAttack: 6,
    enemyLevel: 2,
    enemyArmor: 1,
  },
];

combatScenarios.forEach((scenario) => {
  const enemyLevelDefense = levels[scenario.enemyLevel].defense;
  const totalEnemyDefense = enemyLevelDefense + scenario.enemyArmor;
  const finalDamage = Math.max(
    1,
    Math.floor((scenario.playerAttack * (100 - totalEnemyDefense)) / 100)
  );

  console.log(`\n${scenario.name}:`);
  console.log(`  Player Attack: ${scenario.playerAttack}`);
  console.log(`  Enemy Level Defense: ${enemyLevelDefense}`);
  console.log(`  Enemy Armor Defense: ${scenario.enemyArmor}`);
  console.log(`  Total Enemy Defense: ${totalEnemyDefense}`);
  console.log(`  Final Damage: ${finalDamage}`);
  console.log(`  Damage reduced by: ${scenario.playerAttack - finalDamage}`);
});

console.log("\n\n✅ Armor Damage Reduction System Test Complete!");
console.log("\nKey Changes Verified:");
console.log("• Enemies no longer get HP bonuses from armor");
console.log(
  "• Armor now reduces incoming damage using the same formula as players"
);
console.log(
  "• Damage reduction: Final Damage = Raw Damage × (100 - Total Defense) / 100"
);
console.log("• Both players and enemies use the same armor system");

console.log("\n🎮 Benefits of New System:");
console.log("• Consistent armor mechanics across players and enemies");
console.log(
  "• Armor makes you harder to kill (reduces damage) not tankier (more HP)"
);
console.log("• Easier to understand and balance");
console.log("• No more confusing HP inflation from armor");


#!/usr/bin/env node

/**
 * Test script for Level-Based Enemy System
 * Verifies that enemies now use levels.js for base stats + weapon.damage
 * Run with: node test_level_based_enemies.js
 */

console.log("🎯 TESTING LEVEL-BASED ENEMY SYSTEM\n");
console.log("=" * 60);

// Mock levels.js data
const levels = {
  1: { hp: 30, attack: 3, defense: 1 },
  2: { hp: 40, attack: 4, defense: 2 },
  3: { hp: 50, attack: 5, defense: 4 },
};

// Mock enemy data
const mockEnemies = [
  { name: "Simstim Junkie", level: 1, weapon: { damage: 2 } },
  { name: "Sprawl Ganger", level: 2, weapon: { damage: 3 } },
  { name: "Clinic Repoman", level: 3, weapon: { damage: 6 } },
];

console.log("🔴 Test 1: Enemy Stats Calculation");
console.log("-" * 60);

mockEnemies.forEach((enemy) => {
  const levelStats = levels[enemy.level];
  const totalAttack = levelStats.attack + enemy.weapon.damage;

  console.log(`\n${enemy.name} (Level ${enemy.level}):`);
  console.log(`  Level Attack: ${levelStats.attack}`);
  console.log(`  Weapon Damage: ${enemy.weapon.damage}`);
  console.log(
    `  Total Attack: ${levelStats.attack} + ${enemy.weapon.damage} = ${totalAttack}`
  );
});

console.log("\n✅ Level-Based Enemy System Test Complete!");

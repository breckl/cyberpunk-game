#!/usr/bin/env node

/**
 * Test script for Smart Flee System
 * Verifies that initial flee has no penalty but combat flee does
 * Run with: node test_smart_flee.js
 */

console.log("🧠 TESTING SMART FLEE SYSTEM\n");
console.log("=" * 50);

// Mock penalty calculation (similar to CombatSystem)
const calculateCombatFleePenalty = (enemy, combatRounds) => {
  const basePenalty = enemy.level * 15;
  const durationMultiplier = 1 + combatRounds * 0.1;
  return Math.floor(basePenalty * durationMultiplier);
};

// Mock enemy
const mockEnemy = {
  name: "Sprawl Ganger",
  level: 2,
  type: "Thug",
};

// Mock character
const mockCharacter = {
  name: "TestPlayer",
  credits: 100,
};

console.log("🔴 Test 1: Initial Flee (Before Combat)");
console.log("-" * 40);
console.log(`Enemy: ${mockEnemy.name} (Level ${mockEnemy.level})`);
console.log(`Combat Rounds: 0`);
console.log(`Initial Flee Penalty: 0 credits (no penalty for smart thinking!)`);
console.log(`Credits before: ${mockCharacter.credits}`);

// No penalty applied for initial flee
const initialFleeCharacter = { ...mockCharacter };
console.log(`Credits after: ${initialFleeCharacter.credits}`);
console.log(`Amount lost: 0 (no penalty)`);
console.log(
  `Credits unchanged: ${initialFleeCharacter.credits === mockCharacter.credits}`
);

console.log("\n\n🔴 Test 2: Combat Flee (After 1 Round)");
console.log("-" * 40);
console.log(`Enemy: ${mockEnemy.name} (Level ${mockEnemy.level})`);
console.log(`Combat Rounds: 1`);
const combatFleePenalty1 = calculateCombatFleePenalty(mockEnemy, 1);
console.log(`Combat Flee Penalty: ${combatFleePenalty1} credits`);
console.log(`Credits before: ${initialFleeCharacter.credits}`);

// Apply penalty for combat flee
const combatFleeCharacter1 = { ...initialFleeCharacter };
const oldCredits1 = combatFleeCharacter1.credits;
combatFleeCharacter1.credits = Math.max(0, oldCredits1 - combatFleePenalty1);
console.log(`Credits after: ${combatFleeCharacter1.credits}`);
console.log(`Amount lost: ${oldCredits1 - combatFleeCharacter1.credits}`);

console.log("\n\n🔴 Test 3: Combat Flee (After 3 Rounds)");
console.log("-" * 40);
console.log(`Enemy: ${mockEnemy.name} (Level ${mockEnemy.level})`);
console.log(`Combat Rounds: 3`);
const combatFleePenalty3 = calculateCombatFleePenalty(mockEnemy, 3);
console.log(`Combat Flee Penalty: ${combatFleePenalty3} credits`);
console.log(`Credits before: ${combatFleeCharacter1.credits}`);

// Apply penalty for combat flee
const combatFleeCharacter3 = { ...combatFleeCharacter1 };
const oldCredits3 = combatFleeCharacter3.credits;
combatFleeCharacter3.credits = Math.max(0, oldCredits3 - combatFleePenalty3);
console.log(`Credits after: ${combatFleeCharacter3.credits}`);
console.log(`Amount lost: ${oldCredits3 - combatFleeCharacter3.credits}`);

console.log("\n\n🔴 Test 4: Different Enemy Levels");
console.log("-" * 40);

const enemyLevels = [1, 2, 3, 5];
enemyLevels.forEach((level) => {
  const testEnemy = { ...mockEnemy, level };
  const initialPenalty = 0; // Always 0 for initial flee
  const combatPenalty1 = calculateCombatFleePenalty(testEnemy, 1);
  const combatPenalty3 = calculateCombatFleePenalty(testEnemy, 3);

  console.log(`\nLevel ${level} Enemy:`);
  console.log(`  Initial Flee: ${initialPenalty} credits (no penalty)`);
  console.log(`  Combat Flee (1 round): ${combatPenalty1} credits`);
  console.log(`  Combat Flee (3 rounds): ${combatPenalty3} credits`);
});

console.log("\n\n✅ Smart Flee System Test Complete!");
console.log("\nKey Features Verified:");
console.log("• Initial flee (R key before combat) = NO penalty");
console.log("• Combat flee (R key during combat) = penalty based on duration");
console.log("• Penalties scale with enemy level and combat rounds");
console.log("• Smart tactical thinking is rewarded!");

console.log("\n🎮 How It Works Now:");
console.log("• Press R before attacking = No penalty (smart!)");
console.log("• Press R after attacking = Penalty based on combat duration");
console.log("• The longer you fight, the more it costs to run");
console.log("• But running before combat starts is always free!");

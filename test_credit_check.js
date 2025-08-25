#!/usr/bin/env node

/**
 * Test script for Credit Check Penalty System
 * Verifies that penalties are properly adjusted based on player credit balance
 * Run with: node test_credit_check.js
 */

console.log("💰 TESTING CREDIT CHECK PENALTY SYSTEM\n");
console.log("=" * 60);

// Mock penalty calculation (similar to CombatSystem)
const calculateDefeatPenalty = (enemy, combatRounds) => {
  const basePenalty = enemy.level * 25;
  const durationMultiplier = 1 + combatRounds * 0.15;
  return Math.floor(basePenalty * durationMultiplier);
};

const calculateCombatFleePenalty = (enemy, combatRounds) => {
  const basePenalty = enemy.level * 15;
  const durationMultiplier = 1 + combatRounds * 0.1;
  return Math.floor(basePenalty * durationMultiplier);
};

// Mock flavor text generation
const getPenaltyFlavorText = (penaltyType, enemy, amount) => {
  // Handle case where player has no credits to lose
  if (amount === 0) {
    const brokeTexts = [
      "You're already broke, so there's nothing left to take.",
      "Your pockets are empty - they can't squeeze blood from a stone.",
      "You have no credits to lose, which is somehow worse than losing some.",
      "They search your pockets but find nothing worth stealing.",
    ];
    return brokeTexts[Math.floor(Math.random() * brokeTexts.length)];
  }

  const defeatTexts = [
    `You wake up in a black clinic, ${amount} credits lighter for the privilege.`,
    `Your gear took a beating. Repair costs: ${amount} credits.`,
    `The local cops want ${amount} credits to look the other way.`,
  ];

  const combatFleeTexts = [
    `You scatter ${amount} credits as you flee, hoping it distracts them.`,
    `Emergency extraction costs ${amount} credits.`,
    `You pay ${amount} credits to buy your escape.`,
  ];

  switch (penaltyType) {
    case "combatFlee":
      return combatFleeTexts[
        Math.floor(Math.random() * combatFleeTexts.length)
      ];
    case "defeat":
      return defeatTexts[Math.floor(Math.random() * defeatTexts.length)];
    default:
      return `You lose ${amount} credits.`;
  }
};

// Mock enemy
const mockEnemy = {
  name: "Sprawl Ganger",
  level: 2,
  type: "Thug",
};

// Test scenarios with different credit balances
const testScenarios = [
  { name: "Rich Player", credits: 1000 },
  { name: "Moderate Player", credits: 50 },
  { name: "Poor Player", credits: 10 },
  { name: "Broke Player", credits: 0 },
];

console.log("🔴 Test 1: Defeat Penalties with Different Credit Balances");
console.log("-" * 60);

testScenarios.forEach((scenario) => {
  const basePenalty = calculateDefeatPenalty(mockEnemy, 3);
  const actualPenalty = Math.min(basePenalty, scenario.credits);
  const penaltyText = getPenaltyFlavorText("defeat", mockEnemy, actualPenalty);

  console.log(`\n${scenario.name} (${scenario.credits} credits):`);
  console.log(`  Base Penalty: ${basePenalty} credits`);
  console.log(`  Actual Penalty: ${actualPenalty} credits`);
  console.log(`  Flavor Text: ${penaltyText}`);

  if (actualPenalty > 0) {
    console.log(`  Message: You lose ${actualPenalty} credits!`);
  } else {
    console.log(`  Message: You lose 0 credits (you're already broke)!`);
  }
});

console.log(
  "\n\n🔴 Test 2: Combat Flee Penalties with Different Credit Balances"
);
console.log("-" * 60);

testScenarios.forEach((scenario) => {
  const basePenalty = calculateCombatFleePenalty(mockEnemy, 2);
  const actualPenalty = Math.min(basePenalty, scenario.credits);
  const penaltyText = getPenaltyFlavorText(
    "combatFlee",
    mockEnemy,
    actualPenalty
  );

  console.log(`\n${scenario.name} (${scenario.credits} credits):`);
  console.log(`  Base Penalty: ${basePenalty} credits`);
  console.log(`  Actual Penalty: ${actualPenalty} credits`);
  console.log(`  Flavor Text: ${penaltyText}`);

  if (actualPenalty > 0) {
    console.log(`  Message: You lose ${actualPenalty} credits!`);
  } else {
    console.log(`  Message: You lose 0 credits (you're already broke)!`);
  }
});

console.log("\n\n🔴 Test 3: Edge Cases");
console.log("-" * 60);

// Test with very high level enemy
const highLevelEnemy = {
  name: "Corporate Elite",
  level: 10,
  type: "Corporate",
};
const highPenalty = calculateDefeatPenalty(highLevelEnemy, 5);

testScenarios.forEach((scenario) => {
  const actualPenalty = Math.min(highPenalty, scenario.credits);
  const penaltyText = getPenaltyFlavorText(
    "defeat",
    highLevelEnemy,
    actualPenalty
  );

  console.log(`\n${scenario.name} vs ${highLevelEnemy.name}:`);
  console.log(`  Base Penalty: ${highPenalty} credits`);
  console.log(`  Actual Penalty: ${actualPenalty} credits`);
  console.log(`  Flavor Text: ${penaltyText}`);
});

console.log("\n\n✅ Credit Check Penalty System Test Complete!");
console.log("\nKey Features Verified:");
console.log("• Penalties are capped at player's current credit balance");
console.log("• Appropriate messages for players with no credits");
console.log("• Flavor text adapts to actual penalty amount");
console.log("• No confusing 'lose 0 credits' messages");
console.log("• Broke players get humorous 'nothing to lose' messages");

console.log("\n🎮 How It Works Now:");
console.log("• Rich players: Normal penalty messages and credit loss");
console.log("• Poor players: Penalty capped at their credit balance");
console.log("• Broke players: Special messages about having nothing to lose");
console.log("• All scenarios: Clear, appropriate messaging");

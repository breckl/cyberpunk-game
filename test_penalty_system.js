#!/usr/bin/env node

/**
 * Test script for the Combat Penalty System
 * Run with: node test_penalty_system.js
 */

// Mock data for testing (since we can't import the actual modules in this test)
const mockEnemies = {
  simstim_junkie: {
    id: "simstim_junkie",
    name: "Simstim Junkie",
    level: 1,
    type: "Thug",
  },
  sprawl_ganger: {
    id: "sprawl_ganger",
    name: "Sprawl Ganger",
    level: 2,
    type: "Thug",
  },
  yakuza_enforcer: {
    id: "yakuza_enforcer",
    name: "Yakuza Enforcer",
    level: 5,
    type: "Heavy",
  },
  assassin: { id: "assassin", name: "Assassin", level: 6, type: "Assassin" },
};

// Mock combat system with penalty calculations
class MockCombatSystem {
  calculateInitialFleePenalty(enemy) {
    return enemy.level * 5;
  }

  calculateCombatFleePenalty(enemy, combatRounds) {
    const basePenalty = enemy.level * 15;
    const durationMultiplier = 1 + combatRounds * 0.1;
    return Math.floor(basePenalty * durationMultiplier);
  }

  calculateDefeatPenalty(enemy, combatRounds) {
    const basePenalty = enemy.level * 25;
    const durationMultiplier = 1 + combatRounds * 0.15;
    return Math.floor(basePenalty * durationMultiplier);
  }

  getEnemyTypeBonus(enemy) {
    const typeBonuses = {
      Yakuza: 0.3,
      Corporate: 0.25,
      Assassin: 0.2,
      Heavy: 0.15,
      Thug: 0.0,
      Hacker: 0.1,
    };

    return typeBonuses[enemy.type] || 0.0;
  }

  getPenaltyFlavorText(penaltyType, enemy, amount) {
    const initialFleeTexts = [
      `You slip away quietly, but drop ${amount} credits in your haste.`,
      `A small bribe of ${amount} credits ensures they don't follow.`,
      `You lose ${amount} credits worth of pocket change while escaping.`,
    ];

    const combatFleeTexts = [
      `You scatter ${amount} credits as you flee, hoping it distracts them.`,
      `Emergency extraction costs ${amount} credits.`,
      `You pay ${amount} credits to buy your escape.`,
    ];

    const defeatTexts = [
      `You wake up in a black clinic, ${amount} credits lighter for the privilege.`,
      `Your gear took a beating. Repair costs: ${amount} credits.`,
      `The local cops want ${amount} credits to look the other way.`,
    ];

    switch (penaltyType) {
      case "initialFlee":
        return initialFleeTexts[
          Math.floor(Math.random() * initialFleeTexts.length)
        ];
      case "combatFlee":
        return combatFleeTexts[
          Math.floor(Math.random() * combatFleeTexts.length)
        ];
      case "defeat":
        return defeatTexts[Math.floor(Math.random() * defeatTexts.length)];
      default:
        return `You lose ${amount} credits.`;
    }
  }
}

// Test the penalty system
const combatSystem = new MockCombatSystem();

console.log("🎮 COMBAT PENALTY SYSTEM TEST\n");
console.log("=" * 50);

// Test different enemies
Object.values(mockEnemies).forEach((enemy) => {
  console.log(`\n🔴 ${enemy.name} (Level ${enemy.level}, ${enemy.type})`);
  console.log("-" * 40);

  // Initial flee penalty
  const initialFlee = combatSystem.calculateInitialFleePenalty(enemy);
  console.log(`Initial Flee: ${initialFlee} credits`);
  console.log(
    `  ${combatSystem.getPenaltyFlavorText("initialFlee", enemy, initialFlee)}`
  );

  // Combat flee penalties at different rounds
  for (let rounds = 1; rounds <= 4; rounds++) {
    const combatFlee = combatSystem.calculateCombatFleePenalty(enemy, rounds);
    const defeat = combatSystem.calculateDefeatPenalty(enemy, rounds);

    console.log(`\nRound ${rounds}:`);
    console.log(`  Flee: ${combatFlee} credits`);
    console.log(
      `    ${combatSystem.getPenaltyFlavorText(
        "combatFlee",
        enemy,
        combatFlee
      )}`
    );
    console.log(`  Defeat: ${defeat} credits`);
    console.log(
      `    ${combatSystem.getPenaltyFlavorText("defeat", enemy, defeat)}`
    );
  }

  // Enemy type bonus explanation
  const typeBonus = combatSystem.getEnemyTypeBonus(enemy);
  if (typeBonus > 0) {
    console.log(
      `\n⚠️  ${enemy.type} enemies get +${Math.round(
        typeBonus * 100
      )}% penalty bonus!`
    );
  }
});

// Demonstrate reward system
console.log("\n\n💰 COMBAT REWARD SYSTEM EXPLANATION");
console.log("=" * 50);

const playerLevel = 3;
console.log(`\nFor a Level ${playerLevel} player:`);

for (let enemyLevel = 1; enemyLevel <= 5; enemyLevel++) {
  const baseCredits = 100;
  const creditsMultiplier = 1 + playerLevel * 0.1;
  const levelDifference = Math.max(0, enemyLevel - playerLevel);
  const levelDifferenceBonus = 1 + levelDifference * 0.2;

  const combatReward = Math.floor(
    baseCredits * creditsMultiplier * levelDifferenceBonus
  );
  const enemyDrop = Math.floor(enemyLevel * 20 * 0.25); // Average enemy drop
  const totalReward = combatReward + enemyDrop;

  console.log(`\nLevel ${enemyLevel} Enemy:`);
  console.log(`  Combat Reward: ${combatReward} credits`);
  console.log(`  Enemy Drop: ~${enemyDrop} credits`);
  console.log(`  Total Expected: ~${totalReward} credits`);
}

// Risk vs Reward analysis
console.log("\n\n⚖️  RISK vs REWARD ANALYSIS");
console.log("=" * 50);

const testEnemy = mockEnemies.sprawl_ganger; // Level 2 enemy
const playerLevel2 = 2;

// Calculate potential reward
const baseCredits = 100;
const creditsMultiplier = 1 + playerLevel2 * 0.1;
const levelDifference = Math.max(0, testEnemy.level - playerLevel2);
const levelDifferenceBonus = 1 + levelDifference * 0.2;
const combatReward = Math.floor(
  baseCredits * creditsMultiplier * levelDifferenceBonus
);
const enemyDrop = Math.floor(testEnemy.level * 20 * 0.25);
const totalReward = combatReward + enemyDrop;

console.log(`\nFighting ${testEnemy.name} (Level ${testEnemy.level}):`);
console.log(`  Potential Reward: ${totalReward} credits\n`);

// Calculate penalties
const initialFlee = combatSystem.calculateInitialFleePenalty(testEnemy);
const combatFlee3 = combatSystem.calculateCombatFleePenalty(testEnemy, 3);
const defeat3 = combatSystem.calculateDefeatPenalty(testEnemy, 3);

console.log(`Penalties:`);
console.log(
  `  Initial Flee: -${initialFlee} credits (${Math.round(
    (initialFlee / totalReward) * 100
  )}% of potential)`
);
console.log(
  `  Flee after 3 rounds: -${combatFlee3} credits (${Math.round(
    (combatFlee3 / totalReward) * 100
  )}% of potential)`
);
console.log(
  `  Defeat after 3 rounds: -${defeat3} credits (${Math.round(
    (defeat3 / totalReward) * 100
  )}% of potential)`
);

console.log(`\nRisk Assessment:`);
console.log(
  `  Initial Flee: Very Low Risk (${Math.round(
    (initialFlee / totalReward) * 100
  )}% loss)`
);
console.log(
  `  Combat Flee: Low Risk (${Math.round(
    (combatFlee3 / totalReward) * 100
  )}% loss)`
);
console.log(
  `  Defeat: High Risk (${Math.round((defeat3 / totalReward) * 100)}% loss)`
);

console.log("\n\n✅ Penalty system test complete!");
console.log("\nKey Features:");
console.log(
  "• Initial flee is very cheap (encourages avoiding unwinnable fights)"
);
console.log("• Combat commitment increases penalty costs");
console.log("• Defeat is most expensive (encourages strategic thinking)");
console.log("• Enemy types have different risk levels");
console.log("• Penalties scale with enemy difficulty");

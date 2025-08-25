/**
 * Combat Penalty System Examples and Documentation
 *
 * This file demonstrates how the penalty system works and explains the reward system.
 * It's for reference and testing purposes.
 */

import CombatSystem from "./CombatSystem.js";
import { getEnemyById } from "../../data/enemies.js";

// Initialize combat system
const combatSystem = new CombatSystem();

/**
 * REWARD SYSTEM EXPLANATION
 *
 * When you WIN a combat, you get:
 *
 * 1. BASE COMBAT REWARD:
 *    - Base: 100 credits
 *    - Level Multiplier: 1 + (your_level × 0.1)
 *    - Level Difference Bonus: 1 + (enemy_level - your_level) × 0.2
 *
 * 2. ENEMY LOOT:
 *    - Enemy's carried credits (random 0-50% drop)
 *    - Equipped items (30% drop chance)
 *
 * Example: Level 3 player vs Level 2 enemy
 * - Base: 100
 * - Level Multiplier: 1 + (3 × 0.1) = 1.3
 * - Level Difference: 1 + (2 - 3) × 0.2 = 1 + (-1 × 0.2) = 0.8
 * - Combat Reward: 100 × 1.3 × 0.8 = 104 credits
 * - Enemy Drop: ~15-20 credits (random)
 * - Total: ~119-124 credits
 */

/**
 * PENALTY SYSTEM EXPLANATION
 *
 * When you LOSE or FLEE, you lose credits based on:
 *
 * 1. INITIAL FLEE (no combat): Enemy Level × 5
 * 2. COMBAT FLEE: Enemy Level × 15 × (1 + rounds × 0.1)
 * 3. DEFEAT: Enemy Level × 25 × (1 + rounds × 0.15)
 *
 * Enemy Type Bonuses (extra penalties):
 * - Yakuza: +30%
 * - Corporate: +25%
 * - Assassin: +20%
 * - Heavy: +15%
 * - Thug: +0%
 * - Hacker: +10%
 */

// Example calculations
export const demonstratePenaltySystem = () => {
  console.log("=== COMBAT PENALTY SYSTEM EXAMPLES ===\n");

  // Get some example enemies
  const simstimJunkie = getEnemyById("simstim_junkie"); // Level 1, Thug
  const sprawlGanger = getEnemyById("sprawl_ganger"); // Level 2, Thug
  const yakuzaEnforcer = getEnemyById("yakuza_enforcer"); // Level 5, Heavy
  const assassin = getEnemyById("assassin"); // Level 6, Assassin

  const enemies = [simstimJunkie, sprawlGanger, yakuzaEnforcer, assassin];

  enemies.forEach((enemy) => {
    console.log(
      `\n--- ${enemy.name} (Level ${enemy.level}, ${enemy.type}) ---`
    );

    // Initial flee penalty
    const initialFlee = combatSystem.calculateInitialFleePenalty(enemy);
    console.log(`Initial Flee: ${initialFlee} credits`);

    // Combat flee penalties at different rounds
    for (let rounds = 1; rounds <= 4; rounds++) {
      const combatFlee = combatSystem.calculateCombatFleePenalty(enemy, rounds);
      const defeat = combatSystem.calculateDefeatPenalty(enemy, rounds);

      console.log(`Round ${rounds}:`);
      console.log(`  Flee: ${combatFlee} credits`);
      console.log(`  Defeat: ${defeat} credits`);
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
};

// Example reward calculations
export const demonstrateRewardSystem = () => {
  console.log("\n\n=== COMBAT REWARD SYSTEM EXAMPLES ===\n");

  // Example: Level 3 player vs different enemies
  const playerLevel = 3;

  for (let enemyLevel = 1; enemyLevel <= 5; enemyLevel++) {
    const baseCredits = 100;
    const creditsMultiplier = 1 + playerLevel * 0.1;
    const levelDifference = Math.max(0, enemyLevel - playerLevel);
    const levelDifferenceBonus = 1 + levelDifference * 0.2;

    const combatReward = Math.floor(
      baseCredits * creditsMultiplier * levelDifferenceBonus
    );

    console.log(`Level ${playerLevel} Player vs Level ${enemyLevel} Enemy:`);
    console.log(`  Base: ${baseCredits}`);
    console.log(`  Level Multiplier: ${creditsMultiplier.toFixed(1)}`);
    console.log(`  Level Difference Bonus: ${levelDifferenceBonus.toFixed(1)}`);
    console.log(`  Combat Reward: ${combatReward} credits`);

    // Estimate enemy drop (average of 0-50% of enemy credits)
    const enemyCredits = enemyLevel * 20; // Rough estimate
    const avgDrop = Math.floor(enemyCredits * 0.25);
    console.log(`  Enemy Drop (avg): ~${avgDrop} credits`);
    console.log(`  Total Expected: ~${combatReward + avgDrop} credits\n`);
  }
};

// Risk vs Reward analysis
export const demonstrateRiskReward = () => {
  console.log("\n=== RISK vs REWARD ANALYSIS ===\n");

  const enemy = getEnemyById("sprawl_ganger"); // Level 2 enemy
  const playerLevel = 2;

  // Calculate potential reward
  const baseCredits = 100;
  const creditsMultiplier = 1 + playerLevel * 0.1;
  const levelDifference = Math.max(0, enemy.level - playerLevel);
  const levelDifferenceBonus = 1 + levelDifference * 0.2;
  const combatReward = Math.floor(
    baseCredits * creditsMultiplier * levelDifferenceBonus
  );
  const enemyDrop = Math.floor(enemy.credits * 0.25); // Average drop
  const totalReward = combatReward + enemyDrop;

  console.log(`Fighting ${enemy.name} (Level ${enemy.level}):`);
  console.log(`  Potential Reward: ${totalReward} credits\n`);

  // Calculate penalties
  const initialFlee = combatSystem.calculateInitialFleePenalty(enemy);
  const combatFlee3 = combatSystem.calculateCombatFleePenalty(enemy, 3);
  const defeat3 = combatSystem.calculateDefeatPenalty(enemy, 3);

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
};

// Run examples
if (typeof window === "undefined") {
  // Node.js environment
  demonstratePenaltySystem();
  demonstrateRewardSystem();
  demonstrateRiskReward();
}

export default {
  demonstratePenaltySystem,
  demonstrateRewardSystem,
  demonstrateRiskReward,
};

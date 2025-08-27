/**
 * Combat Balance Tester - Tests the balance of the new progression system
 * Helps validate that combat encounters are appropriately challenging
 */

import ProgressionCalculator from "./progressionCalculator.js";

export class CombatBalanceTester {
  // Test combat balance between player and enemy
  static testCombatBalance(
    playerLevel,
    enemyLevel,
    playerWeapon = null,
    playerArmor = null
  ) {
    const balance = ProgressionCalculator.calculateCombatBalance(
      playerLevel,
      enemyLevel,
      playerWeapon,
      playerArmor
    );

    return {
      playerLevel,
      enemyLevel,
      playerWeapon: playerWeapon?.name || "None",
      playerArmor: playerArmor?.name || "None",
      ...balance,
      recommendations: this.getBalanceRecommendations(balance),
    };
  }

  // Test multiple level combinations
  static testLevelProgression(minLevel = 1, maxLevel = 6) {
    const results = [];

    for (let playerLevel = minLevel; playerLevel <= maxLevel; playerLevel++) {
      for (
        let enemyLevel = Math.max(1, playerLevel - 1);
        enemyLevel <= Math.min(maxLevel, playerLevel + 2);
        enemyLevel++
      ) {
        const result = this.testCombatBalance(playerLevel, enemyLevel);
        results.push(result);
      }
    }

    return results;
  }

  // Test with different weapon/armor combinations
  static testEquipmentCombinations(playerLevel, enemyLevel) {
    const weaponTypes = ["Power", "Tech", "Energy", "Heavy"];
    const armorTypes = ["Light", "Medium", "Heavy", "Powered"];

    const results = [];

    for (const weaponType of weaponTypes) {
      for (const armorType of armorTypes) {
        const weapon = {
          name: `Level ${playerLevel} ${weaponType} Weapon`,
          damage: ProgressionCalculator.calculateWeaponDamage(
            playerLevel,
            weaponType
          ),
          type: weaponType,
        };

        const armor = {
          name: `Level ${playerLevel} ${armorType} Armor`,
          defense: ProgressionCalculator.calculateArmorDefense(
            playerLevel,
            armorType
          ),
          type: armorType,
        };

        const result = this.testCombatBalance(
          playerLevel,
          enemyLevel,
          weapon,
          armor
        );
        results.push({
          ...result,
          weaponType,
          armorType,
        });
      }
    }

    return results;
  }

  // Generate balance report
  static generateBalanceReport() {
    const progressionTest = this.testLevelProgression(1, 6);
    const equipmentTest = this.testEquipmentCombinations(3, 3);

    const overallStats = {
      totalTests: progressionTest.length + equipmentTest.length,
      balanced: 0,
      tooEasy: 0,
      tooHard: 0,
      needsAdjustment: 0,
    };

    [...progressionTest, ...equipmentTest].forEach((test) => {
      switch (test.difficulty) {
        case "Balanced":
          overallStats.balanced++;
          break;
        case "Too Easy":
          overallStats.tooEasy++;
          break;
        case "Too Hard":
          overallStats.tooHard++;
          break;
        default:
          overallStats.needsAdjustment++;
      }
    });

    return {
      overallStats,
      progressionTest,
      equipmentTest,
      recommendations: this.getOverallRecommendations(overallStats),
    };
  }

  // Get specific balance recommendations
  static getBalanceRecommendations(balance) {
    const recommendations = [];

    if (balance.roundsToKillEnemy < 3) {
      recommendations.push(
        "Enemy dies too quickly - consider increasing enemy HP or reducing player damage"
      );
    }

    if (balance.roundsToKillEnemy > 5) {
      recommendations.push(
        "Enemy takes too long to kill - consider decreasing enemy HP or increasing player damage"
      );
    }

    if (balance.roundsToKillPlayer < 3) {
      recommendations.push(
        "Player dies too quickly - consider increasing player HP or reducing enemy damage"
      );
    }

    if (balance.roundsToKillPlayer > 5) {
      recommendations.push(
        "Player takes too long to die - consider decreasing player HP or increasing enemy damage"
      );
    }

    if (recommendations.length === 0) {
      recommendations.push("Combat balance looks good!");
    }

    return recommendations;
  }

  // Get overall system recommendations
  static getOverallRecommendations(stats) {
    const recommendations = [];
    const totalTests = stats.totalTests;

    const balancedPercentage = (stats.balanced / totalTests) * 100;
    const tooEasyPercentage = (stats.tooEasy / totalTests) * 100;
    const tooHardPercentage = (stats.tooHard / totalTests) * 100;

    if (balancedPercentage < 60) {
      recommendations.push(
        `Only ${balancedPercentage.toFixed(
          1
        )}% of tests are balanced. Consider adjusting progression formulas.`
      );
    }

    if (tooEasyPercentage > 30) {
      recommendations.push(
        `${tooEasyPercentage.toFixed(
          1
        )}% of tests are too easy. Consider increasing enemy stats or reducing player progression.`
      );
    }

    if (tooHardPercentage > 30) {
      recommendations.push(
        `${tooHardPercentage.toFixed(
          1
        )}% of tests are too hard. Consider decreasing enemy stats or increasing player progression.`
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "Overall balance looks good! Most encounters are appropriately challenging."
      );
    }

    return recommendations;
  }

  // Test specific enemy types
  static testEnemyTypeBalance(playerLevel, enemyLevel) {
    const enemyTypes = ["Thug", "Heavy", "Assassin", "Hacker"];
    const results = [];

    for (const enemyType of enemyTypes) {
      const result = ProgressionCalculator.calculateEnemyStats(
        enemyLevel,
        enemyType
      );
      const balance = this.testCombatBalance(playerLevel, enemyLevel);

      results.push({
        enemyType,
        enemyStats: result,
        combatBalance: balance,
        difficulty: balance.difficulty,
      });
    }

    return results;
  }

  // Export test results to console
  static logTestResults(results) {
    console.group("🎯 Combat Balance Test Results");

    if (Array.isArray(results)) {
      results.forEach((result, index) => {
        console.group(
          `Test ${index + 1}: Level ${result.playerLevel} vs Level ${
            result.enemyLevel
          }`
        );
        console.log(`Weapon: ${result.playerWeapon}`);
        console.log(`Armor: ${result.playerArmor}`);
        console.log(`Player Damage/Round: ${result.playerDamagePerRound}`);
        console.log(`Enemy Damage/Round: ${result.enemyDamagePerRound}`);
        console.log(`Rounds to Kill Enemy: ${result.roundsToKillEnemy}`);
        console.log(`Rounds to Kill Player: ${result.roundsToKillPlayer}`);
        console.log(`Difficulty: ${result.difficulty}`);
        console.log(`Recommendations:`, result.recommendations);
        console.groupEnd();
      });
    } else {
      console.log("Single Test Result:", results);
    }

    console.groupEnd();
  }

  // Quick balance check
  static quickBalanceCheck(playerLevel, enemyLevel) {
    const result = this.testCombatBalance(playerLevel, enemyLevel);
    console.log(
      `🎯 Quick Balance Check: Level ${playerLevel} vs Level ${enemyLevel}`
    );
    console.log(`Difficulty: ${result.difficulty}`);
    console.log(
      `Rounds: ${result.roundsToKillEnemy} vs ${result.roundsToKillPlayer}`
    );
    return result;
  }
}

export default CombatBalanceTester;

import React, { useState, useRef, useEffect } from "react";
import "../styles/CombatScreen.css";
import { getCombatEnemies } from "../data/enemies.js";
import levels, { getCurrentLevel } from "../data/levels.js";
import market from "../data/market.js";
import CombatSystem from "../game/combat/CombatSystem.js";

function CombatScreen({ character, onCombatEnd, onUpdateCharacter }) {
  const combatLogRef = useRef(null);
  const combatSystem = new CombatSystem();
  const [combatRounds, setCombatRounds] = useState(0);

  // Calculate total HP including armor based on character's current level
  const currentLevel = getCurrentLevel(character.experience);
  const levelInfo = levels[currentLevel];
  const playerTotalHp = levelInfo?.hp || 30; // Use level-based HP, fallback to 30

  // Find equipped weapon from inventory
  const equippedWeapon = character.inventory?.find(
    (item) => item.type === "weapon" && item.equipped === true
  );

  // Use equipped weapon or default to unarmed combat
  const playerWeapon = equippedWeapon
    ? {
        name: equippedWeapon.name,
        damage: equippedWeapon.damage || 0, // Use weapon damage or 0 if undefined
      }
    : {
        name: "Unarmed Combat",
        damage: 0, // Unarmed combat adds no bonus damage
      };

  // Calculate total attack power for display
  const totalAttack = (levelInfo?.attack || 0) + playerWeapon.damage;

  const combatOptions = `(<span class="key">A</span>)ttack (<span class="key">R</span>)un`;

  const menuOptions = `<span class="menu-item">(<span class="key">C</span>)ontinue Fighting <span class="menu-item"></span>(<span class="key">L</span>)eave Streets</span></span>`;

  // Get random unarmed action
  const getRandomUnarmedAction = () => {
    const unarmedActions = market.unarmed;
    if (!unarmedActions || unarmedActions.length === 0) {
      // Fallback actions if market.unarmed is not available
      const fallbackActions = [
        "swing a right hook",
        "throw an uppercut",
        "jab with your left",
        "swing a roundhouse kick",
        "deliver a straight punch",
      ];
      return fallbackActions[
        Math.floor(Math.random() * fallbackActions.length)
      ];
    }
    return unarmedActions[Math.floor(Math.random() * unarmedActions.length)];
  };

  // Debug: Log the entire inventory to see structure
  console.log("Debug inventory structure:", character.inventory);
  console.log("Debug equipped weapon found:", equippedWeapon);

  // Get player weapon action description or random unarmed action
  const getPlayerActionDescription = () => {
    console.log("Debug weapon data:", {
      equippedWeapon,
      equipped: equippedWeapon?.equipped,
      actionDescription: equippedWeapon?.actionDescription,
    });

    if (
      equippedWeapon &&
      equippedWeapon.equipped &&
      equippedWeapon.actionDescription
    ) {
      console.log("Using weapon action:", equippedWeapon.actionDescription);
      return equippedWeapon.actionDescription;
    }
    console.log("Using unarmed action");
    return getRandomUnarmedAction();
  };

  // Shared function to setup combat with a given enemy
  const setupCombat = (enemyData) => {
    // Calculate armor bonus (each point = 10% HP bonus)
    const enemyArmorBonus = Math.floor(
      enemyData.baseHp * (enemyData.armor.rating * 0.1)
    );
    const enemyTotalHp = enemyData.baseHp + enemyArmorBonus;

    // Debug: Log enemy data
    console.log("Setup combat for enemy:", enemyData.name);
    console.log("Enemy description:", enemyData.description);

    const newCombatLog = [
      `<span class="stats-header">**** COMBAT *****</span>`,
      `You have encountered <strong>${enemyData.name}</strong>!!`,
      `<em>${enemyData.description}</em>`,
      combatOptions,
      `--------------------------------`,
    ];

    return { enemyData, enemyTotalHp, newCombatLog };
  };

  const [enemy, setEnemy] = useState(() => {
    const randomEnemy = getCombatEnemies("ninsei-streets"); // Default to Ninsei Streets
    const { enemyData, enemyTotalHp } = setupCombat(randomEnemy);
    return enemyData;
  });

  const [combatLog, setCombatLog] = useState(() => {
    const randomEnemy = getCombatEnemies("ninsei-streets");
    const { newCombatLog } = setupCombat(randomEnemy);
    return newCombatLog;
  });

  const [playerHp, setPlayerHp] = useState(playerTotalHp);
  const [enemyHp, setEnemyHp] = useState(() => {
    const enemyArmorBonus = Math.floor(
      enemy.baseHp * (enemy.armor.rating * 0.1)
    );
    return enemy.baseHp + enemyArmorBonus;
  });

  // Update enemy HP when enemy changes
  useEffect(() => {
    const enemyArmorBonus = Math.floor(
      enemy.baseHp * (enemy.armor.rating * 0.1)
    );
    const newEnemyTotalHp = enemy.baseHp + enemyArmorBonus;
    setEnemyHp(newEnemyTotalHp);
  }, [enemy]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [combatEnded, setCombatEnded] = useState(false);
  const [endResult, setEndResult] = useState(null);

  // Auto-scroll combat log when it updates
  useEffect(() => {
    if (combatLogRef.current) {
      combatLogRef.current.scrollTop = combatLogRef.current.scrollHeight;
    }
  }, [combatLog]);

  // Hide scrollbar for webkit browsers
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .combat-log::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const restartCombat = () => {
    // Choose a random enemy
    const newEnemy = getCombatEnemies("ninsei-streets"); // Default to Ninsei Streets

    // Use shared setup function
    const { enemyData, enemyTotalHp, newCombatLog } = setupCombat(newEnemy);

    // Update enemy state
    setEnemy(enemyData);

    // Reset combat state
    setPlayerHp(playerTotalHp);
    setEnemyHp(enemyTotalHp);
    setIsPlayerTurn(true);
    setCombatEnded(false);
    setEndResult(null);
    setCombatRounds(0); // Reset combat rounds

    // Update combat log
    setCombatLog(newCombatLog);
  };

  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      // Handle C key (restart combat) regardless of state
      if (key === "C") {
        restartCombat();
        return;
      }

      // Handle L key (leave page) regardless of state
      if (key === "L") {
        onCombatEnd("leave", null);
        return;
      }

      if (combatEnded) {
        if (e.key === "Enter") {
          onCombatEnd(endResult.type, endResult.rewards);
        }
        return;
      }

      if (!isPlayerTurn) return;

      switch (key) {
        case "A":
          handleAttack();
          break;
        case "R":
          handleRun();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    combatEnded,
    isPlayerTurn,
    playerHp,
    enemyHp,
    combatLog,
    endResult,
    onCombatEnd,
    onUpdateCharacter,
    enemy,
    restartCombat,
    combatRounds,
  ]);

  const handleAttack = () => {
    // Increment combat rounds
    setCombatRounds((prev) => prev + 1);

    // Player's attack - damage is based on level attack + weapon damage ±2
    const currentLevel = getCurrentLevel(character.experience);
    const levelInfo = levels[currentLevel];
    const baseAttack = levelInfo?.attack || 0;

    // Use the already found equipped weapon from the component state
    const weaponBonus = equippedWeapon?.damage || 0; // Default to 0 damage for unarmed combat
    const totalAttack = baseAttack + weaponBonus;

    const minDamage = Math.max(1, totalAttack - 2); // Ensure minimum 1 damage
    const maxDamage = totalAttack + 2;
    const rawDamage =
      Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

    // Apply enemy defense as percentage reduction
    const enemyDefense = enemy.defense || 0;
    const finalDamage = Math.max(
      1,
      Math.floor((rawDamage * (100 - enemyDefense)) / 100)
    );

    const newEnemyHp = Math.max(0, enemyHp - finalDamage);
    setEnemyHp(newEnemyHp);

    const newLog = [
      ...combatLog,
      `You <em>${getPlayerActionDescription()}</em> and hit <strong>${
        enemy.name
      }</strong> for ${finalDamage} damage!`,
    ];

    if (newEnemyHp <= 0) {
      // Enemy defeated
      newLog.push(
        `<span class="win-message">You have defeated <strong>${enemy.name}</strong></span>!`
      );
      newLog.push(
        `<span class="reward-message">You receive ${enemy.credits} credits and ${enemy.exp} experience!</span>`
      );
      newLog.push("");
      newLog.push(menuOptions);
      setCombatLog(newLog);
      setCombatEnded(true);
      const rewards = { credits: enemy.credits, exp: enemy.exp };
      setEndResult({
        type: "victory",
        rewards: rewards,
      });

      // Update character immediately with rewards
      if (onUpdateCharacter) {
        const updatedCharacter = {
          ...character,
          experience: character.experience + rewards.exp,
          credits: character.credits + rewards.credits,
        };

        onUpdateCharacter(updatedCharacter);
      }

      return;
    }

    // Enemy's attack with weapon damage ±2 variance
    const weaponVariance = Math.floor(Math.random() * 5) - 3; // -2 to +2
    const enemyRawDamage = enemy.attack + weaponVariance;

    // Apply player defense as percentage reduction using damage reduction formula
    const currentLevelPlayer = getCurrentLevel(character.experience);
    const levelInfoPlayer = levels[currentLevelPlayer];
    const baseDefense = levelInfoPlayer?.defense || 0;

    // Find equipped armor
    const equippedArmor = character.inventory?.find(
      (item) => item.type === "armor" && item.equipped
    );
    const armorBonus = equippedArmor?.defense || 0;
    const totalDefense = baseDefense + armorBonus;

    // Apply damage reduction formula: Final Damage = Attack Damage × (100 - Armor) / 100
    const enemyFinalDamage = Math.floor(
      (enemyRawDamage * (100 - totalDefense)) / 100
    );

    const newPlayerHp = Math.max(0, playerHp - enemyFinalDamage);
    setPlayerHp(newPlayerHp);

    const attackText =
      enemy.weapon.attacks[
        Math.floor(Math.random() * enemy.weapon.attacks.length)
      ];
    newLog.push(
      `<span class="red">**</span> <strong>${enemy.name}</strong> <em>${attackText}</em> for <span class="red">${enemyFinalDamage}</span> damage! <span class="red">**</span>`
    );
    newLog.push("");
    //newLog.push(`Your Hitpoints: <strong>${newPlayerHp}</strong>`);
    //newLog.push(`${enemy.name}'s Hitpoints: <strong>${newEnemyHp}</strong>`);
    newLog.push(combatOptions);
    newLog.push("--------------------------------");

    setCombatLog(newLog);

    if (newPlayerHp <= 0) {
      // Player defeated - apply penalty
      const defeatPenalty = combatSystem.calculateDefeatPenalty(
        enemy,
        combatRounds
      );

      // Check if player has credits to lose
      const actualPenalty = Math.min(defeatPenalty, character.credits);
      const penaltyText = combatSystem.getPenaltyFlavorText(
        "defeat",
        enemy,
        actualPenalty
      );

      newLog.push(`You have been defeated by <strong>${enemy.name}</strong>!`);
      newLog.push(`<span class="red">${penaltyText}</span>`);

      if (actualPenalty > 0) {
        newLog.push(
          `<span class="red">You lose ${actualPenalty} credits!</span>`
        );
      } else {
        newLog.push(
          `<span class="red">You lose 0 credits (you're already broke)!</span>`
        );
      }

      newLog.push("");
      newLog.push(menuOptions);

      setCombatLog(newLog);
      setCombatEnded(true);
      setEndResult({ type: "defeat", penalty: actualPenalty });

      // Apply penalty to character
      if (onUpdateCharacter) {
        const updatedCharacter = { ...character };

        // Apply penalty directly to credits
        const oldCredits = updatedCharacter.credits;
        updatedCharacter.credits = Math.max(0, oldCredits - actualPenalty);

        // Update character state
        onUpdateCharacter(updatedCharacter);
      }

      return;
    }
  };

  const handleRun = () => {
    // Check if this is initial flee (before combat) or combat flee (during combat)
    if (combatRounds === 0) {
      // Initial flee - no penalty before any combat
      const newLog = [
        ...combatLog,
        `<span class="win-message">You slip away before combat begins!</span>`,
        `No penalty for smart tactical thinking.`,
        "",
        menuOptions,
      ];
      setCombatLog(newLog);
      setCombatEnded(true);
      setEndResult({ type: "initialFlee" });

      // No penalty applied - just update character state
      if (onUpdateCharacter) {
        onUpdateCharacter(character);
      }
    } else {
      // Combat flee - apply penalty based on combat duration
      const escapePenalty = combatSystem.calculateCombatFleePenalty(
        enemy,
        combatRounds
      );

      // Check if player has credits to lose
      const actualPenalty = Math.min(escapePenalty, character.credits);
      const penaltyText = combatSystem.getPenaltyFlavorText(
        "combatFlee",
        enemy,
        actualPenalty
      );

      const newLog = [
        ...combatLog,
        `<span class="win-message">You manage to escape!</span>`,
        `<span class="red">${penaltyText}</span>`,
      ];

      if (actualPenalty > 0) {
        newLog.push(
          `<span class="red">You lose ${actualPenalty} credits!</span>`
        );
      } else {
        newLog.push(
          `<span class="red">You lose 0 credits (you're already broke)!</span>`
        );
      }

      newLog.push("", menuOptions);

      setCombatLog(newLog);
      setCombatEnded(true);
      setEndResult({ type: "escape", penalty: actualPenalty });

      // Apply penalty to character
      if (onUpdateCharacter) {
        const updatedCharacter = { ...character };

        // Apply penalty directly to credits
        const oldCredits = updatedCharacter.credits;
        updatedCharacter.credits = Math.max(0, oldCredits - actualPenalty);

        // Update character state
        onUpdateCharacter(updatedCharacter);
      }
    }
  };

  const renderMessage = (message) => {
    return <div dangerouslySetInnerHTML={{ __html: message }} />;
  };

  return (
    <div className="combat-screen">
      <div className="combat-layout">
        {/* Left Stats Panel */}
        <div className="combat-stats-panel">
          {/* Player Stats */}
          <div className="player-stats">
            <h3 className="stats-header">YOUR STATS</h3>
            <div className="stat-row">
              <span className="stat-label">Name:</span>
              <span className="stat-value">{character.name}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Level:</span>
              <span className="stat-value">{currentLevel}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Weapon:</span>
              <span className="stat-value">{playerWeapon.name}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Attack Power:</span>
              <span className="stat-value">{totalAttack} ±2</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">HP:</span>
              <span className="stat-value">
                {playerHp}/{playerTotalHp}
              </span>
            </div>
            <div className="hp-bar-container">
              <div className="hp-bar player-hp-bar">
                <div
                  className="hp-fill player-hp-fill"
                  style={{ width: `${(playerHp / playerTotalHp) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Enemy Stats */}
          <div className="enemy-stats">
            <h3 className="stats-header">{enemy.name.toUpperCase()}</h3>
            <div className="stat-row">
              <span className="stat-label">Level:</span>
              <span className="stat-value">{enemy.level}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Weapon:</span>
              <span className="stat-value">{enemy.weapon.name}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Damage:</span>
              <span className="stat-value">{enemy.weapon.damage} ±2</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Armor:</span>
              <span className="stat-value">{enemy.armor.name}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">HP:</span>
              <span className="stat-value">
                {enemyHp}/
                {enemy.baseHp +
                  Math.floor(enemy.baseHp * (enemy.armor.rating * 0.1))}
              </span>
            </div>
            <div className="hp-bar-container">
              <div className="hp-bar enemy-hp-bar">
                <div
                  className="hp-fill enemy-hp-fill"
                  style={{
                    width: `${
                      (enemyHp /
                        (enemy.baseHp +
                          Math.floor(
                            enemy.baseHp * (enemy.armor.rating * 0.1)
                          ))) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Combat Log */}
        <div
          className="combat-log"
          ref={combatLogRef}
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
            overflowY: "auto",
          }}
        >
          {combatLog.map((message, index) => (
            <div key={index} className="combat-message">
              {renderMessage(message)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CombatScreen;

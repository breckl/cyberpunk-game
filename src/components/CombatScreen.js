import React, { useState, useEffect, useCallback, useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";
import "../styles/CombatScreen.css";
import { getLevelBasedEnemy } from "../data/enemies.js";
import levels, { getCurrentLevel } from "../data/levels.js";
import market from "../data/market.js";
import CombatSystem from "../game/combat/CombatSystem.js";
import LevelUpOverlay from "./LevelUpOverlay.js";
import DailyLimitOverlay from "./DailyLimitOverlay.js";
import { playVictorySound, playDefeatSound } from "../utils/soundUtils.js";
import {
  incrementFightCount,
  isDailyLimitExceeded,
  getCurrentFightCount,
  getDailyFightLimit,
} from "../utils/dailyFightTracker.js";

function CombatScreen({ character, onCombatEnd, onUpdateCharacter }) {
  const combatSystem = useMemo(() => new CombatSystem(), []);
  const [combatRounds, setCombatRounds] = useState(0);

  // Combat sequence states
  const [sequencePhase, setSequencePhase] = useState("scanning"); // scanning, stats, combat, results
  const [scanProgress, setScanProgress] = useState(0);
  const [combatModeFlashing, setCombatModeFlashing] = useState(true);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showCombatOptions, setShowCombatOptions] = useState(false);
  const [isRevealingMessages, setIsRevealingMessages] = useState(false);

  // Calculate total HP including armor based on character's current level
  const currentLevel = getCurrentLevel(character.experience);

  // Testing popup states
  const [showTestPopup, setShowTestPopup] = useState(false);
  const [testTab, setTestTab] = useState("stats"); // "stats" or "combat"
  const [testLevel, setTestLevel] = useState(currentLevel);
  const [testXP, setTestXP] = useState(character.experience);
  const [testCredits, setTestCredits] = useState(character.credits);

  // Combat testing states
  const [testPlayerLevel, setTestPlayerLevel] = useState(currentLevel);
  const [testPlayerAttack, setTestPlayerAttack] = useState(5);
  const [testPlayerDefense, setTestPlayerDefense] = useState(3);
  const [testResults, setTestResults] = useState(null);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testProgression, setTestProgression] = useState(true);
  const levelInfo = levels[currentLevel];
  const playerTotalHp = levelInfo?.hp || 30;

  // Level-up overlay states
  const [showLevelUpOverlay, setShowLevelUpOverlay] = useState(false);
  const [newLevel, setNewLevel] = useState(null);
  const [previousLevel, setPreviousLevel] = useState(currentLevel);

  // Daily fight limit states
  const [showDailyLimitOverlay, setShowDailyLimitOverlay] = useState(false);
  const [currentFightCount, setCurrentFightCount] = useState(0);

  // Store the selected enemy description for the current fight
  const [selectedEnemyDescription, setSelectedEnemyDescription] =
    useState(null);

  // Helper function to render combat mode header
  const renderCombatModeHeader = () => (
    <div className="combat-mode-header" onClick={handleTestPopupOpen}>
      <h2>
        <span className="combat-mode-flash">COMBAT MODE ACTIVE</span>
      </h2>
    </div>
  );

  // Helper function to render credits display
  const renderCreditsDisplay = () => (
    <div className="combat-credits-display" style={{ cursor: "pointer" }}>
      <span className="stat-label">Credits </span>
      <span className="stat-value">${character.credits}</span>
    </div>
  );

  // Helper function to get random description
  const getRandomDescription = (descriptions) => {
    if (!descriptions || descriptions.length === 0) return "A mysterious enemy";
    if (Array.isArray(descriptions)) {
      return descriptions[Math.floor(Math.random() * descriptions.length)];
    }
    return descriptions; // Fallback for non-array descriptions
  };

  // Helper function to render player stats
  const renderPlayerStats = () => (
    <div className="player-stats mobile-hide-weapon">
      <h3 className="stats-header">YOUR STATS</h3>
      <div className="stat-row">
        <span className="stat-label">Level</span>
        <span className="stat-value">{currentLevel}</span>
      </div>
      <div className="stat-row">
        <span className="stat-label">Weapon</span>
        <span className="stat-value">{playerWeapon.name}</span>
      </div>
      <div className="stat-row">
        <span className="stat-label">Attack</span>
        <span className="stat-value">{totalAttack.toFixed(1)} ±2</span>
      </div>
      <div className="stat-row">
        <span className="stat-label">Armor</span>
        <span className="stat-value">
          {equippedArmor ? equippedArmor.name : "None"}
        </span>
      </div>
      <div className="stat-row">
        <span className="stat-label">Defense</span>
        <span className="stat-value">{totalDefense.toFixed(1)}</span>
      </div>
      <div className="stat-row">
        <span className="stat-label">HP</span>
        <span className="stat-value">
          {Math.round(playerHp)}/{playerTotalHp}
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
  );

  // Helper function to render enemy stats
  const renderEnemyStats = (withAnimations = false, isScanning = false) => (
    <div className="enemy-stats mobile-hide-weapon">
      {isScanning ? (
        <div className="enemy-stats-blackout">
          <div className="scanning-overlay">
            <div className="scanning-text">{Math.round(scanProgress)}%</div>
          </div>
        </div>
      ) : (
        <>
          <h3 className="stats-header">
            {withAnimations ? (
              <TypeAnimation
                sequence={[enemy.name.toUpperCase()]}
                wrapper="span"
                speed={50}
                cursor={false}
              />
            ) : (
              enemy.name.toUpperCase()
            )}
          </h3>
          <div
            className={`stat-row ${withAnimations ? "fade-in" : ""}`}
            style={withAnimations ? { animationDelay: "0.3s" } : {}}
          >
            <span className="stat-label">Level</span>
            <span className="stat-value">{enemy.level}</span>
          </div>
          <div
            className={`stat-row ${withAnimations ? "fade-in" : ""}`}
            style={withAnimations ? { animationDelay: "0.3" } : {}}
          >
            <span className="stat-label">Weapon</span>
            <span className="stat-value">{enemy.weapon.name}</span>
          </div>
          <div
            className={`stat-row ${withAnimations ? "fade-in" : ""}`}
            style={withAnimations ? { animationDelay: "0.6s" } : {}}
          >
            <span className="stat-label">Attack</span>
            <span className="stat-value">
              {(
                (levels[enemy.level]?.attack || 0) + enemy.weapon.damage
              ).toFixed(1)}{" "}
              ±2
            </span>
          </div>
          <div
            className={`stat-row ${withAnimations ? "fade-in" : ""}`}
            style={withAnimations ? { animationDelay: "0.9s" } : {}}
          >
            <span className="stat-label">Armor</span>
            <span className="stat-value">{enemy.armor.name}</span>
          </div>
          <div
            className={`stat-row ${withAnimations ? "fade-in" : ""}`}
            style={withAnimations ? { animationDelay: "1.2s" } : {}}
          >
            <span className="stat-label">Defense</span>
            <span className="stat-value">
              {(levels[enemy.level]?.defense || 0).toFixed(1)}
            </span>
          </div>
          <div
            className={`stat-row ${withAnimations ? "fade-in" : ""}`}
            style={withAnimations ? { animationDelay: "1.5s" } : {}}
          >
            <span className="stat-label">HP</span>
            <span className="stat-value">
              {Math.round(enemyHp)}/{levels[enemy.level]?.hp || 30}
            </span>
          </div>
          <div
            className={`hp-bar-container ${withAnimations ? "fade-in" : ""}`}
            style={withAnimations ? { animationDelay: "1.8s" } : {}}
          >
            <div className="hp-bar enemy-hp-bar">
              <div
                className="hp-fill enemy-hp-fill"
                style={{
                  width: `${
                    (enemyHp / (levels[enemy.level]?.hp || 30)) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // Counter animation for XP earned
  const [xpCounter, setXpCounter] = useState(0);

  // Helper function to render results display
  const renderResultsDisplay = () => {
    const xpProgress = endResult ? getXPProgress() : null;

    return (
      <div className="results-display">
        <h3 className="stats-header">COMBAT RESULTS</h3>
        <div className="result-message">
          {endResult?.type === "victory" && (
            <>
              <span className="win-message">VICTORY!</span>
              {xpProgress && (
                <div className="xp-display">
                  <div className="xp-earned">+{xpCounter} XP</div>
                  <div className="stat-bar">
                    <div className="bar">
                      <div
                        className="fill"
                        style={{
                          width: `${Math.min(xpProgress.progress, 100)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="value">
                      {xpProgress.currentXP - xpProgress.currentLevelXP}/
                      {xpProgress.nextLevelXP - xpProgress.currentLevelXP}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {endResult?.type === "defeat" && (
            <span className="lose-message">DEFEAT!</span>
          )}
          {endResult?.type === "escape" && (
            <span className="escape-message">ESCAPED!</span>
          )}
          {endResult?.type === "initialFlee" && (
            <span className="escape-message">ESCAPED!</span>
          )}
        </div>
      </div>
    );
  };

  // Helper function to render unified combat stats panel
  const renderCombatStatsPanel = (phase) => (
    <div className="combat-stats-panel">
      {/* Stats Row - Player and Enemy/Results side by side */}
      <div className="stats-row">
        {/* Player Stats */}
        {renderPlayerStats()}

        {/* Right side content based on phase */}
        {phase === "results"
          ? renderResultsDisplay()
          : renderEnemyStats(phase === "stats", phase === "scanning")}
      </div>

      {/* Credits Display - Full width row */}
      {renderCreditsDisplay()}
    </div>
  );

  // Helper function to render unified combat layout
  const renderCombatLayout = (phase, combatLogContent) => (
    <div className="combat-screen">
      <div className="combat-layout">
        {/* Combat Mode Header */}
        {renderCombatModeHeader()}

        {/* Stats Panel at Top */}
        {renderCombatStatsPanel(phase)}

        {/* Combat Log Below Stats */}
        <div className="combat-log">{combatLogContent}</div>
      </div>
    </div>
  );

  // Find equipped weapon from inventory
  const equippedWeapon = character.inventory?.find(
    (item) => item.type === "weapon" && item.equipped === true
  );

  // Find equipped armor from inventory
  const equippedArmor = character.inventory?.find(
    (item) => item.type === "armor" && item.equipped === true
  );

  // Use equipped weapon or default to unarmed combat
  const playerWeapon = equippedWeapon
    ? {
        name: equippedWeapon.name,
        damage: equippedWeapon.damage || 0,
      }
    : {
        name: "Unarmed Combat",
        damage: 0,
      };

  // Calculate total attack power for display
  const totalAttack = (levelInfo?.attack || 0) + playerWeapon.damage;

  // Calculate total defense for display
  const totalDefense =
    (levelInfo?.defense || 0) + (equippedArmor?.defense || 0);

  // Get random unarmed action
  const getRandomUnarmedAction = () => {
    const unarmedActions = market.unarmed;
    if (!unarmedActions || unarmedActions.length === 0) {
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

  // Get player weapon action description or random unarmed action
  const getPlayerActionDescription = useCallback(() => {
    if (
      equippedWeapon &&
      equippedWeapon.equipped &&
      equippedWeapon.actionDescription
    ) {
      return equippedWeapon.actionDescription;
    }
    return getRandomUnarmedAction();
  }, [equippedWeapon]);

  // Initialize enemy
  const [enemy, setEnemy] = useState(() => {
    // Check daily limit before initializing first fight
    if (isDailyLimitExceeded()) {
      return null; // Will be handled by the daily limit overlay
    }

    // Increment fight count for initial fight
    incrementFightCount();
    const randomEnemy = getLevelBasedEnemy(currentLevel);
    return randomEnemy;
  });

  // Initialize selected enemy description
  useEffect(() => {
    if (enemy) {
      setSelectedEnemyDescription(getRandomDescription(enemy.description));
    }
  }, [enemy]);

  // Check daily fight limit on component mount
  useEffect(() => {
    const fightCount = getCurrentFightCount();
    setCurrentFightCount(fightCount);

    if (isDailyLimitExceeded()) {
      setShowDailyLimitOverlay(true);
    }
  }, []);

  const [playerHp, setPlayerHp] = useState(
    parseFloat(playerTotalHp.toFixed(2))
  );

  // Initialize enemy HP after enemy is set
  const [enemyHp, setEnemyHp] = useState(() => {
    if (!enemy) return 0;
    const enemyLevelHp = levels[enemy.level]?.hp || 30;
    return parseFloat(enemyLevelHp.toFixed(2));
  });

  // Update enemy HP when enemy changes
  useEffect(() => {
    if (enemy) {
      const enemyLevelHp = levels[enemy.level]?.hp || 30;
      setEnemyHp(parseFloat(enemyLevelHp.toFixed(2)));
    }
  }, [enemy]);

  // Update test values when character changes
  useEffect(() => {
    setTestLevel(currentLevel);
    setTestXP(character.experience);
    setTestCredits(character.credits);
  }, [currentLevel, character.experience, character.credits]);

  // Detect level-up and show overlay
  useEffect(() => {
    if (currentLevel > previousLevel) {
      setNewLevel(currentLevel);
      setShowLevelUpOverlay(true);
    }
    setPreviousLevel(currentLevel);
  }, [currentLevel, previousLevel]);

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [combatEnded, setCombatEnded] = useState(false);
  const [endResult, setEndResult] = useState(null);

  // Calculate XP progress for victory display
  const getXPProgress = useCallback(() => {
    if (!endResult || endResult.type !== "victory" || !endResult.rewards)
      return null;

    const currentXP = character.experience;
    const earnedXP = endResult.rewards.experience;
    const newXP = currentXP + earnedXP;
    const currentLevel = getCurrentLevel(currentXP);
    const nextLevel = currentLevel + 1;
    const currentLevelXP = levels[currentLevel]?.xp || 0;
    const nextLevelXP = levels[nextLevel]?.xp || 0;

    return {
      earnedXP,
      currentXP: newXP,
      currentLevelXP,
      nextLevelXP,
      progress:
        ((newXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100,
    };
  }, [endResult, character.experience]);

  // Start XP counter animation when victory occurs
  useEffect(() => {
    const xpProgress = endResult ? getXPProgress() : null;

    if (xpProgress && endResult?.type === "victory") {
      setXpCounter(0);

      const duration = 1000; // 1 second
      const steps = xpProgress.earnedXP;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setXpCounter(currentStep);

        if (currentStep >= xpProgress.earnedXP) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [endResult, getXPProgress]);

  // Combat Mode Active flashing effect
  useEffect(() => {
    if (combatModeFlashing) {
      const interval = setInterval(() => {
        setCombatModeFlashing((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [combatModeFlashing]);

  // Scanning phase
  useEffect(() => {
    if (sequencePhase === "scanning") {
      const duration = 1000; // 2 seconds
      const interval = 30; // Update every 30ms for smooth animation
      const increment = (100 * interval) / duration;

      const timer = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            // Move to stats phase after scanning completes
            setTimeout(() => {
              setSequencePhase("stats");
              setCombatModeFlashing(false);
            }, 500);
            return 100;
          }
          return Math.min(prev + increment, 100);
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [sequencePhase]);

  // Define restartCombat function before it's used in useEffect
  const restartCombat = useCallback(() => {
    // Check daily limit before starting a new fight
    if (isDailyLimitExceeded()) {
      setShowDailyLimitOverlay(true);
      return;
    }

    // Increment fight count
    const newFightCount = incrementFightCount();
    setCurrentFightCount(newFightCount);

    const newEnemy = getLevelBasedEnemy(currentLevel);
    setEnemy(newEnemy);
    setSelectedEnemyDescription(getRandomDescription(newEnemy.description));
    setPlayerHp(parseFloat(playerTotalHp.toFixed(2)));
    setEnemyHp(parseFloat((levels[newEnemy.level]?.hp || 30).toFixed(2)));
    setIsPlayerTurn(true);
    setCombatEnded(false);
    setEndResult(null);
    setCombatRounds(0);
    setSequencePhase("scanning");
    setScanProgress(0);
    setCombatModeFlashing(true);
    setVisibleMessages([]);
    setShowCombatOptions(false);
    setIsRevealingMessages(false);
  }, [currentLevel, playerTotalHp]);

  // Function to reveal combat messages one at a time with 0.5s delay between each
  const revealCombatMessages = (messages, onComplete = null) => {
    console.log("DEBUG - revealCombatMessages called with:", messages);

    // Clear previous messages and start revealing process
    setVisibleMessages([]);
    setIsRevealingMessages(true);
    setShowCombatOptions(false);

    // Reveal messages one at a time with 0.5s delay
    messages.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, message]);

        // If this is the last message, wait a bit then complete
        if (index === messages.length - 1) {
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            } else {
              // Show combat options again for normal combat rounds
              setIsRevealingMessages(false);
              setShowCombatOptions(true);
            }
          }, 200); // Wait 0.5s after last message before completing
        }
      }, index * 200); // 0.5s delay between each message
    });
  };

  const handleAttack = useCallback(() => {
    setCombatRounds((prev) => prev + 1);

    // Player's attack
    const currentLevel = getCurrentLevel(character.experience);
    const levelInfo = levels[currentLevel];
    const baseAttack = levelInfo?.attack || 0;
    const weaponBonus = equippedWeapon?.damage || 0;
    const totalAttack = baseAttack + weaponBonus;

    const minDamage = Math.max(1, totalAttack - 2);
    const maxDamage = totalAttack + 2;
    const rawDamage =
      Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

    // Apply enemy defense
    const enemyLevelDefense = levels[enemy.level]?.defense || 0;
    const enemyArmorDefense = enemy.armor.rating || 0;
    const totalEnemyDefense = enemyLevelDefense + enemyArmorDefense;

    const damageWithDefense = parseFloat(
      ((rawDamage * (100 - totalEnemyDefense)) / 100).toFixed(2)
    );
    const finalDamage = Math.max(0.01, damageWithDefense);
    const finalDamageRounded = Math.ceil(finalDamage);

    const newEnemyHp = parseFloat((enemyHp - finalDamage).toFixed(2));
    setEnemyHp(newEnemyHp);

    // Prepare combat messages
    const playerAction = getPlayerActionDescription();
    const playerMessage = `You ${playerAction}!`;
    console.log("DEBUG - playerAction:", playerAction);
    console.log("DEBUG - playerMessage:", playerMessage);

    if (newEnemyHp <= 0.01) {
      // Enemy defeated
      const winner = { level: currentLevel };
      const calculatedRewards = combatSystem.generateRewards(winner, [enemy]);

      const victoryMessages = [
        playerMessage,
        `>> ${finalDamageRounded} DAMAGE`,
        `You have defeated ${enemy.name}!`,
        `You receive ${calculatedRewards.credits} credits and ${calculatedRewards.experience} experience!`,
      ];

      // Play random victory sound
      playVictorySound();

      revealCombatMessages(victoryMessages, () => {
        setCombatEnded(true);
        setEndResult({
          type: "victory",
          rewards: calculatedRewards,
        });
        setSequencePhase("results");
      });

      setEnemyHp(0);

      if (onUpdateCharacter) {
        const updatedCharacter = {
          ...character,
          experience: character.experience + calculatedRewards.experience,
          credits: character.credits + calculatedRewards.credits,
        };
        onUpdateCharacter(updatedCharacter);
      }
      return;
    }

    // Enemy's attack
    const weaponVariance = Math.floor(Math.random() * 5) - 3;
    const enemyLevelAttack = levels[enemy.level]?.attack || 0;
    const enemyRawDamage =
      enemyLevelAttack + enemy.weapon.damage + weaponVariance;

    const currentLevelPlayer = getCurrentLevel(character.experience);
    const levelInfoPlayer = levels[currentLevelPlayer];
    const baseDefense = levelInfoPlayer?.defense || 0;
    const armorBonus = equippedArmor?.defense || 0;
    const totalDefense = baseDefense + armorBonus;

    const enemyDamageWithDefense = parseFloat(
      ((enemyRawDamage * (100 - totalDefense)) / 100).toFixed(2)
    );
    const enemyFinalDamage = Math.max(0.01, enemyDamageWithDefense);
    const enemyFinalDamageRounded = Math.ceil(enemyFinalDamage);

    const newPlayerHp = parseFloat((playerHp - enemyFinalDamage).toFixed(2));
    setPlayerHp(newPlayerHp);

    // Safety check for enemy weapon attacks
    let attackText = "attacks you";
    if (
      enemy.weapon &&
      enemy.weapon.attacks &&
      enemy.weapon.attacks.length > 0
    ) {
      attackText =
        enemy.weapon.attacks[
          Math.floor(Math.random() * enemy.weapon.attacks.length)
        ];
    }

    const enemyMessage = `${enemy.name} ${attackText}!`;

    if (newPlayerHp <= 0.01) {
      // Player defeated
      const currentLevel = getCurrentLevel(character.experience);
      const playerMaxHp = playerTotalHp;
      const enemyMaxHp = levels[enemy.level]?.hp || 30;
      const defeatPenalty = combatSystem.calculateCombatPenalty(
        currentLevel,
        enemy,
        combatRounds,
        newPlayerHp,
        playerMaxHp,
        enemyHp,
        enemyMaxHp
      );
      const actualPenalty = Math.min(defeatPenalty, character.credits);

      const defeatMessages = [
        playerMessage,
        `>> ${finalDamageRounded} DAMAGE`,
        enemyMessage,
        `>> ${enemyFinalDamageRounded} DAMAGE`,
        combatSystem.getPenaltyFlavorText("defeat", enemy, actualPenalty),
      ];

      // Play random defeat sound
      playDefeatSound();

      revealCombatMessages(defeatMessages, () => {
        setCombatEnded(true);
        setEndResult({ type: "defeat", penalty: actualPenalty });
        setSequencePhase("results");
      });

      setPlayerHp(0);

      if (onUpdateCharacter) {
        const updatedCharacter = { ...character };
        updatedCharacter.credits = Math.max(
          0,
          updatedCharacter.credits - actualPenalty
        );
        onUpdateCharacter(updatedCharacter);
      }
      return;
    }

    // Normal combat round - reveal messages
    const roundMessages = [
      playerMessage,
      `>> ${finalDamageRounded} DAMAGE`,
      enemyMessage,
      `>> ${enemyFinalDamageRounded} DAMAGE`,
    ];
    console.log("DEBUG - roundMessages:", roundMessages);
    revealCombatMessages(roundMessages);
  }, [
    character,
    enemy,
    playerHp,
    enemyHp,
    playerTotalHp,
    combatRounds,
    onUpdateCharacter,
    equippedWeapon,
    equippedArmor,
    combatSystem,
    getPlayerActionDescription,
  ]);

  const handleRun = useCallback(() => {
    // Clear previous combat messages
    setVisibleMessages([]);

    if (combatRounds === 0) {
      // Initial flee - use unified penalty system
      const currentLevel = getCurrentLevel(character.experience);
      const playerMaxHp = playerTotalHp;
      const enemyMaxHp = levels[enemy.level]?.hp || 30;
      const fleePenalty = combatSystem.calculateCombatPenalty(
        currentLevel,
        enemy,
        0, // 0 rounds for initial flee
        playerHp,
        playerMaxHp,
        enemyHp,
        enemyMaxHp
      );
      const actualPenalty = Math.min(fleePenalty, character.credits);

      const fleeMessages = [
        "You slip away before combat begins!",
        combatSystem.getPenaltyFlavorText("initialFlee", enemy, actualPenalty),
      ];
      revealCombatMessages(fleeMessages, () => {
        setCombatEnded(true);
        setEndResult({ type: "initialFlee", penalty: actualPenalty });
        setSequencePhase("results");
      });

      if (onUpdateCharacter) {
        const updatedCharacter = { ...character };
        updatedCharacter.credits = Math.max(
          0,
          updatedCharacter.credits - actualPenalty
        );
        onUpdateCharacter(updatedCharacter);
      }
    } else {
      // Combat flee
      const currentLevel = getCurrentLevel(character.experience);
      const playerMaxHp = playerTotalHp;
      const enemyMaxHp = levels[enemy.level]?.hp || 30;
      const escapePenalty = combatSystem.calculateCombatPenalty(
        currentLevel,
        enemy,
        combatRounds,
        playerHp,
        playerMaxHp,
        enemyHp,
        enemyMaxHp
      );
      const actualPenalty = Math.min(escapePenalty, character.credits);

      const fleeMessages = [
        combatSystem.getPenaltyFlavorText("combatFlee", enemy, actualPenalty),
      ];

      revealCombatMessages(fleeMessages, () => {
        setCombatEnded(true);
        setEndResult({ type: "escape", penalty: actualPenalty });
        setSequencePhase("results");
      });

      if (onUpdateCharacter) {
        const updatedCharacter = { ...character };
        updatedCharacter.credits = Math.max(
          0,
          updatedCharacter.credits - actualPenalty
        );
        onUpdateCharacter(updatedCharacter);
      }
    }
  }, [
    combatRounds,
    character,
    enemy,
    playerHp,
    enemyHp,
    playerTotalHp,
    onUpdateCharacter,
    combatSystem,
  ]);

  // Test popup handlers
  const handleTestPopupOpen = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Test popup opened!");
      setTestLevel(currentLevel);
      setTestXP(character.experience);
      setTestCredits(character.credits);
      setTestPlayerLevel(1); // Always start test at level 1
      setTestPlayerAttack(5);
      setTestPlayerDefense(3);
      setTestProgression(true); // Default to progression testing
      setTestResults(null);
      setShowTestPopup(true);
    },
    [currentLevel, character.experience, character.credits]
  );

  const handleTestPopupSave = useCallback(() => {
    if (onUpdateCharacter) {
      // Convert string inputs to numbers
      const levelNum = parseFloat(testLevel) || 1;
      const xpNum = parseFloat(testXP) || 0;
      const creditsNum = parseFloat(testCredits) || 0;

      // Use provided XP or default to level's starting XP
      const selectedLevelInfo = levels[levelNum];
      const levelStartingXP = selectedLevelInfo ? selectedLevelInfo.xp : 0;
      const newXP = xpNum || levelStartingXP;

      const updatedCharacter = {
        ...character,
        experience: newXP,
        credits: creditsNum,
      };
      onUpdateCharacter(updatedCharacter);
    }
    setShowTestPopup(false);
  }, [character, testLevel, testXP, testCredits, onUpdateCharacter]);

  const handleTestPopupCancel = useCallback(() => {
    setTestLevel(currentLevel);
    setTestXP(character.experience);
    setTestCredits(character.credits);
    setShowTestPopup(false);
  }, [currentLevel, character.experience, character.credits]);

  // Handle level-up overlay completion
  const handleLevelUpComplete = useCallback(() => {
    setShowLevelUpOverlay(false);
    setNewLevel(null);
  }, []);

  // Combat simulation function
  const runCombatSimulation = useCallback(() => {
    setIsRunningTest(true);
    setTestResults(null);

    // Convert string inputs to numbers
    const playerLevel = parseFloat(testPlayerLevel) || 1;
    const playerAttack = parseFloat(testPlayerAttack) || 1;
    const playerDefense = parseFloat(testPlayerDefense) || 0;

    // Simulate 100 fights
    const results = {
      wins: 0,
      losses: 0,
      totalXP: 0,
      totalCredits: 0,
      creditsEarned: 0,
      creditsLost: 0,
      enemyLevels: {},
      fightsToNextLevel: 0,
      currentXP: 0,
    };

    // Calculate starting XP for the test level
    const startingXP = levels[playerLevel]?.xp || 0;
    let currentXP = startingXP;
    let currentLevel = playerLevel;

    for (let i = 0; i < 100; i++) {
      // Get random enemy
      const enemy = getLevelBasedEnemy(currentLevel);
      results.enemyLevels[enemy.level] =
        (results.enemyLevels[enemy.level] || 0) + 1;

      // Debug: Log first 10 enemies to see what's happening
      if (i < 10) {
        console.log(
          `Fight ${i + 1}: Player Level ${currentLevel} -> Enemy Level ${
            enemy.level
          } (${enemy.name})`
        );
      }

      // Simulate combat
      const playerHp = levels[currentLevel]?.hp || 30;
      const enemyHp = levels[enemy.level]?.hp || 30;

      // Simple combat simulation (player attacks first)
      let playerCurrentHp = playerHp;
      let enemyCurrentHp = enemyHp;
      let rounds = 0;
      const maxRounds = 20; // Prevent infinite loops

      while (playerCurrentHp > 0 && enemyCurrentHp > 0 && rounds < maxRounds) {
        rounds++;

        // Player attack
        const playerDamage = Math.max(
          1,
          playerAttack - 2 + Math.floor(Math.random() * 5)
        );
        const enemyDefense =
          (levels[enemy.level]?.defense || 0) + (enemy.armor?.rating || 0);
        const actualPlayerDamage = Math.max(
          0.01,
          (playerDamage * (100 - enemyDefense)) / 100
        );
        enemyCurrentHp -= actualPlayerDamage;

        if (enemyCurrentHp <= 0) {
          results.wins++;
          const rewards = combatSystem.generateRewards(
            { level: currentLevel },
            [enemy]
          );
          results.totalXP += rewards.experience;
          results.totalCredits += rewards.credits;
          results.creditsEarned += rewards.credits;
          currentXP += rewards.experience;

          // Check for level up (only if progression testing is enabled)
          if (testProgression) {
            const newLevel = getCurrentLevel(currentXP);
            if (newLevel > currentLevel) {
              results.fightsToNextLevel = i + 1;
              currentLevel = newLevel;
            }
          }
          break;
        }

        // Enemy attack
        const enemyDamage = Math.max(
          1,
          (levels[enemy.level]?.attack || 0) +
            (enemy.weapon?.damage || 0) -
            2 +
            Math.floor(Math.random() * 5)
        );
        const actualEnemyDamage = Math.max(
          0.01,
          (enemyDamage * (100 - playerDefense)) / 100
        );
        playerCurrentHp -= actualEnemyDamage;

        if (playerCurrentHp <= 0) {
          results.losses++;
          // Calculate combat penalty for defeat
          const playerMaxHp = levels[currentLevel]?.hp || 30;
          const enemyMaxHp = levels[enemy.level]?.hp || 30;
          const penalty = combatSystem.calculateCombatPenalty(
            currentLevel,
            enemy,
            rounds,
            playerCurrentHp,
            playerMaxHp,
            enemyCurrentHp,
            enemyMaxHp
          );
          results.creditsLost += penalty;
          break;
        }
      }

      // If we hit max rounds, count as loss
      if (rounds >= maxRounds) {
        results.losses++;
        // Calculate combat penalty for max rounds loss
        const playerMaxHp = levels[currentLevel]?.hp || 30;
        const enemyMaxHp = levels[enemy.level]?.hp || 30;
        const penalty = combatSystem.calculateCombatPenalty(
          currentLevel,
          enemy,
          rounds,
          playerCurrentHp,
          playerMaxHp,
          enemyCurrentHp,
          enemyMaxHp
        );
        results.creditsLost += penalty;
      }
    }

    results.currentXP = currentXP;
    setTestResults(results);
    setIsRunningTest(false);
  }, [
    testPlayerLevel,
    testPlayerAttack,
    testPlayerDefense,
    testProgression,
    combatSystem,
  ]);

  // Stats reveal sequence
  useEffect(() => {
    if (sequencePhase === "stats") {
      const timer = setTimeout(() => {
        setShowCombatOptions(true);
        setSequencePhase("combat");
      }, 2000); // Wait for all stats to be revealed + typewriter effects

      return () => clearTimeout(timer);
    }
  }, [sequencePhase]);

  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      // Handle N key (next fight) regardless of state
      if (key === "N") {
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

      if (!isPlayerTurn || sequencePhase !== "combat") return;

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
    sequencePhase,
    playerHp,
    enemyHp,
    endResult,
    onCombatEnd,
    onUpdateCharacter,
    enemy,
    restartCombat,
    combatRounds,
    handleAttack,
    handleRun,
  ]);

  // Render test popup first (highest priority)
  if (showTestPopup) {
    return (
      <div className="test-popup-overlay">
        <div className="test-popup">
          <h3>Debug Tools</h3>

          {/* Tab Navigation */}
          <div className="test-tabs">
            <button
              className={`test-tab ${testTab === "stats" ? "active" : ""}`}
              onClick={() => setTestTab("stats")}
            >
              Player Stats
            </button>
            <button
              className={`test-tab ${testTab === "combat" ? "active" : ""}`}
              onClick={() => setTestTab("combat")}
            >
              Combat Test
            </button>
          </div>

          {/* Stats Tab */}
          {testTab === "stats" && (
            <div className="test-form">
              <div className="form-group">
                <label htmlFor="test-level">Level:</label>
                <input
                  id="test-level"
                  type="text"
                  value={testLevel}
                  onChange={(e) => setTestLevel(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="test-xp">
                  XP (leave blank for level's starting XP):
                </label>
                <input
                  id="test-xp"
                  type="text"
                  value={testXP}
                  onChange={(e) => setTestXP(e.target.value)}
                  placeholder={`Level ${testLevel} starts at ${
                    levels[testLevel]?.xp || 0
                  } XP`}
                />
              </div>
              <div className="form-group">
                <label htmlFor="test-credits">Credits:</label>
                <input
                  id="test-credits"
                  type="text"
                  value={testCredits}
                  onChange={(e) => setTestCredits(e.target.value)}
                />
              </div>
              <div className="form-actions">
                <button className="save-button" onClick={handleTestPopupSave}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={handleTestPopupCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Combat Test Tab */}
          {testTab === "combat" && (
            <div className="test-form">
              <div className="form-group">
                <label htmlFor="test-player-level">Player Level:</label>
                <input
                  id="test-player-level"
                  type="text"
                  value={testPlayerLevel}
                  onChange={(e) => setTestPlayerLevel(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="test-player-attack">Attack Power:</label>
                <input
                  id="test-player-attack"
                  type="text"
                  value={testPlayerAttack}
                  onChange={(e) => setTestPlayerAttack(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="test-player-defense">Defense:</label>
                <input
                  id="test-player-defense"
                  type="text"
                  value={testPlayerDefense}
                  onChange={(e) => setTestPlayerDefense(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={testProgression}
                    onChange={(e) => setTestProgression(e.target.checked)}
                  />
                  Test Progression (player levels up during test)
                </label>
              </div>
              <div className="form-actions">
                <button
                  className="save-button"
                  onClick={runCombatSimulation}
                  disabled={isRunningTest}
                >
                  {isRunningTest ? "Running Test..." : "Run 100 Fights"}
                </button>
                <button
                  className="cancel-button"
                  onClick={handleTestPopupCancel}
                >
                  Close
                </button>
              </div>

              {/* Test Results */}
              {testResults && (
                <div className="test-results">
                  <h4>Combat Test Results (100 Fights)</h4>
                  <div className="results-grid">
                    <div className="result-item">
                      <span className="result-label">Wins:</span>
                      <span className="result-value">{testResults.wins}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Losses:</span>
                      <span className="result-value">{testResults.losses}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Win Rate:</span>
                      <span className="result-value">
                        {((testResults.wins / 100) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Total XP Gained:</span>
                      <span className="result-value">
                        {testResults.totalXP}
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Total Credits:</span>
                      <span className="result-value">
                        {testResults.totalCredits}
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Avg Credits per Win:</span>
                      <span className="result-value">
                        {testResults.wins > 0
                          ? (
                              testResults.creditsEarned / testResults.wins
                            ).toFixed(1)
                          : "0"}
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">
                        Avg Credits per Loss:
                      </span>
                      <span className="result-value">
                        {testResults.losses > 0
                          ? (
                              testResults.creditsLost / testResults.losses
                            ).toFixed(1)
                          : "0"}
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">
                        Fights to Next Level:
                      </span>
                      <span className="result-value">
                        {testResults.fightsToNextLevel || "Didn't level up"}
                      </span>
                    </div>
                  </div>

                  <div className="enemy-level-distribution">
                    <h5>Enemy Level Distribution:</h5>
                    <div className="distribution-chart">
                      {Object.entries(testResults.enemyLevels)
                        .sort(([a], [b]) => parseInt(a) - parseInt(b))
                        .map(([level, count]) => (
                          <div key={level} className="distribution-item">
                            <span className="level-label">Level {level}:</span>
                            <span className="level-count">
                              {count} fights ({((count / 100) * 100).toFixed(1)}
                              %)
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render level-up overlay (second highest priority)
  if (showLevelUpOverlay && newLevel) {
    return (
      <LevelUpOverlay level={newLevel} onComplete={handleLevelUpComplete} />
    );
  }

  // Show daily limit overlay if exceeded
  if (showDailyLimitOverlay) {
    return (
      <DailyLimitOverlay
        fightCount={currentFightCount}
        dailyLimit={getDailyFightLimit()}
      />
    );
  }

  // If no enemy (due to daily limit), don't render combat content
  if (!enemy) {
    return null;
  }

  // Render scanning phase
  if (sequencePhase === "scanning") {
    return renderCombatLayout(
      "scanning",
      <div className="combat-message">
        <div className="scanning-status">
          SCANNING {Math.round(scanProgress)}%
        </div>
        <div className="scan-progress-bar">
          <div
            className="scan-progress-fill"
            style={{ width: `${scanProgress}%` }}
          ></div>
        </div>
      </div>
    );
  }

  // Render stats phase
  if (sequencePhase === "stats") {
    return renderCombatLayout(
      "stats",
      <>
        <div className="combat-message">
          You have encountered <strong>{enemy.name}</strong>!
        </div>
        <div className="enemy-description white-text">
          <TypeAnimation
            sequence={[selectedEnemyDescription || "A mysterious enemy"]}
            wrapper="em"
            speed={90}
            cursor={false}
            style={{ animationDelay: "3s" }}
          />
        </div>
      </>
    );
  }

  // Render combat phase
  if (sequencePhase === "combat") {
    return renderCombatLayout(
      "combat",
      <>
        <div className="combat-message">
          You have encountered <strong>{enemy.name}</strong>!
        </div>
        <div className="enemy-description white-text">
          <em>{selectedEnemyDescription || "A mysterious enemy"}</em>
        </div>
        {visibleMessages.map((message, index) => {
          // Safety check for undefined messages
          if (!message) {
            return null;
          }

          // Check if this is a damage message (starts with >>)
          if (message.startsWith(">>")) {
            const damageText = message.substring(2); // Remove the ">>" prefix
            return (
              <div key={index} className="combat-message">
                <span className="damage-message">
                  <FaArrowRight className="damage-icon" />
                  {damageText}
                </span>
              </div>
            );
          }

          // Check if this is a player attack message (starts with "YOU")
          if (message.startsWith("You")) {
            return (
              <div key={index} className="combat-message">
                <div className="player-attack">
                  <span className="player-name">You</span>
                  <span className="action-text">
                    {" " + message.substring(4)}
                  </span>
                </div>
              </div>
            );
          }

          // Check if this is an enemy attack message (contains enemy name)
          if (message.includes(enemy.name)) {
            const enemyNameEnd =
              message.indexOf(enemy.name) + enemy.name.length;
            const actionText = message.substring(enemyNameEnd);
            return (
              <div key={index} className="combat-message">
                <div className="enemy-attack">
                  <span className="enemy-name">{enemy.name}</span>
                  <span className="action-text">{actionText}</span>
                </div>
              </div>
            );
          }

          // Default message styling
          return (
            <div key={index} className="combat-message">
              <span className="action-text">{message}</span>
            </div>
          );
        })}

        {/* Combat Options at the bottom */}
        {showCombatOptions && !isRevealingMessages && (
          <div className="combat-message">
            <div className="combat-options">
              <div
                className="combat-button attack-button"
                onClick={handleAttack}
              >
                ATTACK
              </div>
              <div className="combat-button run-button" onClick={handleRun}>
                RUN
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Render results phase
  if (sequencePhase === "results") {
    return renderCombatLayout(
      "results",
      <>
        <div className="combat-message">
          You have encountered <strong>{enemy.name}</strong>!
        </div>
        <div className="enemy-description white-text">
          <em>{selectedEnemyDescription || "A mysterious enemy"}</em>
        </div>
        {visibleMessages.map((message, index) => {
          // Safety check for undefined messages
          if (!message) {
            return null;
          }

          // Check if this is a damage message (starts with >>)
          if (message.startsWith(">>")) {
            const damageText = message.substring(2); // Remove the ">>" prefix
            return (
              <div key={index} className="combat-message">
                <span className="damage-message">
                  <FaArrowRight className="damage-icon" />
                  {damageText}
                </span>
              </div>
            );
          }

          // Check if this is a player attack message (starts with "YOU")
          if (message.startsWith("You")) {
            return (
              <div key={index} className="combat-message">
                <div className="player-attack">
                  <span className="player-name">You </span>
                  <span className="action-text">{message.substring(4)}</span>
                </div>
              </div>
            );
          }

          // Check if this is an enemy attack message (contains enemy name)
          if (message.includes(enemy.name)) {
            const enemyNameEnd =
              message.indexOf(enemy.name) + enemy.name.length;
            const actionText = message.substring(enemyNameEnd);
            return (
              <div key={index} className="combat-message">
                <div className="enemy-attack">
                  <span className="enemy-name">{enemy.name}</span>
                  <span className="action-text">{actionText}</span>
                </div>
              </div>
            );
          }

          // Default message styling
          return (
            <div key={index} className="combat-message">
              <span className="action-text">{message}</span>
            </div>
          );
        })}
        <div className="combat-message">
          <div className="combat-options">
            <div
              className="combat-button attack-button"
              onClick={() => restartCombat()}
            >
              NEXT FIGHT
            </div>
            <div
              className="combat-button leave-button"
              onClick={() => onCombatEnd("leave", null)}
            >
              LEAVE COMBAT
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}

export default CombatScreen;

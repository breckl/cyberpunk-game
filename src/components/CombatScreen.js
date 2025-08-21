import React, { useState, useRef, useEffect } from "react";
import "../styles/CombatScreen.css";

const enemies = [
  {
    name: "Street Thug",
    baseHp: 25,
    armor: {
      name: "No Armor",
      rating: 0, // 0 = no bonus
    },
    weapon: {
      name: "Rusty Blade",
      damage: 5, // ±2 variance applied in combat
      attacks: [
        "slashes wildly with their rusty blade",
        "makes a desperate thrust",
        "swings their blade in an arc",
      ],
    },
    credits: 50,
    exp: 2,
  },
  {
    name: "Rogue Netrunner",
    baseHp: 35,
    armor: {
      name: "Mesh Weave",
      rating: 1, // 1 = 10% bonus
    },
    weapon: {
      name: "Neural Disruptor",
      damage: 7,
      attacks: [
        "launches a neural spike",
        "overloads your cyberware",
        "sends shock feedback",
      ],
    },
    credits: 75,
    exp: 3,
  },
  {
    name: "Corp Security",
    baseHp: 55,
    armor: {
      name: "Militech Combat Armor",
      rating: 2, // 2 = 20% bonus
    },
    weapon: {
      name: "Pulse Rifle",
      damage: 10,
      attacks: [
        "fires a burst from their pulse rifle",
        "takes aim with military precision",
        "unleashes a barrage of plasma",
      ],
    },
    credits: 100,
    exp: 4,
  },
];

function CombatScreen({ character, onCombatEnd }) {
  const combatLogRef = useRef(null);

  // Calculate total HP including armor
  const playerTotalHp = 40; // Base HP
  const playerWeapon = {
    name: "Basic Pistol",
    damage: 5, // ±2 variance applied in combat
  };

  const combatOptions = `(<span class="menu-item"><span class="key">A</span>)ttack (<span class="key">S</span>)tats (<span class="key">R</span>)un</span>`;

  const menuOptions = `<span class="menu-item">(<span class="key">C</span>)ontinue <span class="menu-item"></span>(<span class="key">L</span>)eave</span></span>`;

  // Shared function to setup combat with a given enemy
  const setupCombat = (enemyData) => {
    // Calculate armor bonus (each point = 10% HP bonus)
    const enemyArmorBonus = Math.floor(
      enemyData.baseHp * (enemyData.armor.rating * 0.1)
    );
    const enemyTotalHp = enemyData.baseHp + enemyArmorBonus;

    const newCombatLog = [
      `<span class="stats-header">**** COMBAT *****</span>`,
      `You have encountered <strong>${enemyData.name}</strong>!!`,
      ``,
      combatOptions,
      `--------------------------------`,
    ];

    return { enemyData, enemyTotalHp, newCombatLog };
  };

  const [enemy, setEnemy] = useState(() => {
    const randomEnemy = {
      ...enemies[Math.floor(Math.random() * enemies.length)],
    };
    const { enemyData, enemyTotalHp } = setupCombat(randomEnemy);
    return enemyData;
  });

  const [combatLog, setCombatLog] = useState(() => {
    const { newCombatLog } = setupCombat(enemy);
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

  const restartCombat = () => {
    console.log("Restarting combat..."); // Debug log
    // Choose a random enemy
    const newEnemy = {
      ...enemies[Math.floor(Math.random() * enemies.length)],
    };

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

    // Update combat log
    setCombatLog(newCombatLog);
    console.log("Combat restarted with:", enemyData.name); // Debug log
  };

  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      // Handle C key (restart combat) regardless of state
      if (key === "C") {
        console.log("C key pressed, calling restartCombat"); // Debug log
        restartCombat();
        return;
      }

      // Handle L key (leave page) regardless of state
      if (key === "L") {
        console.log("L key pressed, leaving page"); // Debug log
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
        case "S":
          // Show current stats
          const enemyArmorBonus = Math.floor(
            enemy.baseHp * (enemy.armor.rating * 0.1)
          );
          const enemyTotalHp = enemy.baseHp + enemyArmorBonus;
          const statsLog = [
            `<span class="stats-header">YOUR STATS:</span>`,
            `Current HP: <strong>${playerHp}</strong>/${playerTotalHp}`,
            `Armor: None (0% bonus)`,
            `Weapon: <strong>${playerWeapon.name}</strong> (${playerWeapon.damage} ±2 damage)`,
            ``,
            `<span class="stats-header">${enemy.name.toUpperCase()}'S STATS:</span>`,
            `Current HP: <strong>${enemyHp}</strong>/${enemyTotalHp}`,
            `Armor: <strong>${enemy.armor.name}</strong> (${
              enemy.armor.rating * 10
            }% bonus = +${enemyArmorBonus} HP)`,
            `Weapon: <strong>${enemy.weapon.name}</strong> (${enemy.weapon.damage} ±2 damage)`,
            ``,
            combatOptions,
            `--------------------------------`,
          ];
          setCombatLog([...combatLog, ...statsLog]);
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
    enemy,
    restartCombat,
  ]);

  const handleAttack = () => {
    // Player's attack - damage is combat stat ±3
    const minDamage = Math.max(1, character.stats.combat - 3); // Ensure minimum 1 damage
    const maxDamage = character.stats.combat + 3;
    const damage =
      Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    const newEnemyHp = Math.max(0, enemyHp - damage);
    setEnemyHp(newEnemyHp);

    const newLog = [
      ...combatLog,
      `You hit <strong>${enemy.name}</strong> for ${damage} damage!`,
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
      //newLog.push('<span class="enter-prompt">&lt;ENTER&gt;</span>');
      newLog.push(menuOptions);
      setCombatLog(newLog);
      setCombatEnded(true);
      setEndResult({
        type: "victory",
        rewards: { credits: enemy.credits, exp: enemy.exp },
      });
      return;
    }

    // Enemy's attack with weapon damage ±2 variance
    const weaponVariance = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const enemyDamage = enemy.weapon.damage + weaponVariance;
    const newPlayerHp = Math.max(0, playerHp - enemyDamage);
    setPlayerHp(newPlayerHp);

    const attackText =
      enemy.weapon.attacks[
        Math.floor(Math.random() * enemy.weapon.attacks.length)
      ];
    newLog.push(
      `<span class="red">**</span> <strong>${enemy.name}</strong> <em>${attackText}</em> for <span class="red">${enemyDamage}</span> damage! <span class="red">**</span>`
    );
    newLog.push("");
    //newLog.push(`Your Hitpoints: <strong>${newPlayerHp}</strong>`);
    //newLog.push(`${enemy.name}'s Hitpoints: <strong>${newEnemyHp}</strong>`);
    newLog.push(combatOptions);
    newLog.push("--------------------------------");

    setCombatLog(newLog);

    if (newPlayerHp <= 0) {
      // Player defeated
      newLog.push(`You have been defeated by <strong>${enemy.name}</strong>!`);
      newLog.push("");
      newLog.push(menuOptions);
      //newLog.push('<span class="enter-prompt">&lt;ENTER&gt;</span>');
      setCombatLog(newLog);
      setCombatEnded(true);
      setEndResult({ type: "defeat" });
      return;
    }
  };

  const handleRun = () => {
    const runChance = Math.random();
    if (runChance > 0.5) {
      const newLog = [
        ...combatLog,
        `<span class="win-message">You manage to escape!</span>`,
        "",
        menuOptions,
        //`<span class="enter-prompt">&lt;ENTER&gt;</span>`,
      ];
      setCombatLog(newLog);
      setCombatEnded(true);
      setEndResult({ type: "escape" });
    } else {
      const newLog = [...combatLog, "You failed to escape!"];
      setCombatLog(newLog);
      // Enemy gets a free attack
      handleAttack();
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
              <span className="stat-label">Weapon:</span>
              <span className="stat-value">{playerWeapon.name}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Damage:</span>
              <span className="stat-value">{playerWeapon.damage} ±2</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">HP:</span>
              <span className="stat-value">
                {playerHp}/{playerTotalHp}
              </span>
            </div>
            <div className="hp-bar-container">
              <div className="hp-bar">
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
              <div className="hp-bar">
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

          {/* Combat Controls */}
          <div className="combat-controls">
            <h3 className="stats-header">COMBAT CONTROLS</h3>
            <div className="control-row">
              <span className="key">A</span>ttack
            </div>
            <div className="control-row">
              <span className="key">S</span>tats
            </div>
            <div className="control-row">
              <span className="key">R</span>un
            </div>
            <div className="control-row">
              <span className="key">C</span>ontinue
            </div>
            <div className="control-row">
              <span className="key">L</span>eave
            </div>
          </div>
        </div>

        {/* Right Combat Log */}
        <div className="combat-log" ref={combatLogRef}>
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

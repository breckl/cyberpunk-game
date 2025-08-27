import React, { useState } from "react";
import "../styles/StatsPanel.css";
import levels, {
  getCurrentLevel,
  getNextLevelXP,
  getXPProgress,
  getLevelUpRewards,
} from "../data/levels.js";

function StatsPanel({ character, onUpdateCharacter }) {
  const [tooltip, setTooltip] = useState({
    show: false,
    item: null,
    x: 0,
    y: 0,
  });
  const [buttonFillState, setButtonFillState] = useState({
    isFilling: false,
    isFilled: false,
    fillProgress: 0,
  });
  const [isHovering, setIsHovering] = useState(false);

  if (!character) return null;

  // Helper function to clear localStorage and reset character
  const clearCharacterData = () => {
    if (
      window.confirm("This will clear all saved character data. Are you sure?")
    ) {
      // Clear the main character data
      localStorage.removeItem("cyberpunk_character");

      // Also clear any other potential old data keys
      const keysToRemove = [
        "cyberpunk_character",
        "cyberpunk_save",
        "character_data",
        "game_state",
      ];

      keysToRemove.forEach((key) => {
        if (localStorage.getItem(key)) {
          localStorage.removeItem(key);
        }
      });

      alert("Character data cleared! The game will now reload.");
      window.location.reload();
    }
  };

  // Helper function to calculate XP display
  const getXPDisplay = () => {
    const currentLevel = getCurrentLevel(character.experience);
    const currentLevelXP = levels[currentLevel]?.xp || 0;
    const nextLevelXP = getNextLevelXP(currentLevel);
    const xpInCurrentLevel = character.experience - currentLevelXP;
    const xpNeededForNextLevel = nextLevelXP ? nextLevelXP - currentLevelXP : 0;
    return `${xpInCurrentLevel}/${xpNeededForNextLevel}`;
  };

  // Helper function to calculate total stats with equipment
  const getTotalStats = () => {
    // Get base stats from levels system
    const currentLevel = getCurrentLevel(character.experience);
    const levelInfo = levels[currentLevel];

    const baseAttack = levelInfo?.attack || 0;
    const baseDefense = levelInfo?.defense || 0;

    // Find equipped items
    const equippedWeapon = character.inventory?.find(
      (item) => item.type === "weapon" && item.equipped
    );
    const equippedArmor = character.inventory?.find(
      (item) => item.type === "armor" && item.equipped
    );

    // Get bonuses from equipped items
    const weaponBonus = equippedWeapon?.damage || 0;
    const armorBonus = equippedArmor?.defense || 0;

    return {
      attack: {
        total: baseAttack + weaponBonus,
        base: baseAttack,
        weapon: weaponBonus,
        weaponName: equippedWeapon?.name || null,
      },
      defense: {
        total: baseDefense + armorBonus,
        base: baseDefense,
        armor: armorBonus,
        armorName: equippedArmor?.name || null,
      },
    };
  };

  // Tooltip functions
  const showTooltip = (event, item) => {
    setTooltip({
      show: true,
      item: item,
      x: event.clientX - 220, // Position tooltip so right edge is to the left of mouse
      y: event.clientY - 10,
    });
  };

  const hideTooltip = () => {
    setTooltip({ show: false, item: null, x: 0, y: 0 });
  };

  // Get current level info
  const currentLevel = getCurrentLevel(character.experience);
  const levelInfo = levels[currentLevel];
  const totalStats = getTotalStats();

  return (
    <div className="stats-panel">
      <div className="character-info">
        <h2>{character.name}</h2>
        <div className="class-info">{character.class}</div>
        <div className="level-info">Level {currentLevel}</div>

        {/* XP Progress Bar */}
        <div className="xp-progress">
          <label>Experience</label>
          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${getXPProgress(character.experience, currentLevel)}%`,
              }}
            ></div>
          </div>
          <span className="value">{getXPDisplay()}</span>
        </div>
      </div>

      <div className="level-stats">
        <h3>Level {currentLevel} Stats</h3>
        <div className="stat">
          <label>HP</label>
          <span>{levelInfo?.hp || 0}</span>
        </div>
        <div className="stat">
          <label>Attack</label>
          <span
            className="stat-with-tooltip"
            onMouseEnter={(e) => {
              const attackStats = totalStats.attack;
              const tooltipData = {
                type: "attack",
                base: attackStats.base,
                bonus: attackStats.weapon,
                total: attackStats.total,
                itemName: attackStats.weaponName,
              };
              showTooltip(e, tooltipData);
            }}
            onMouseLeave={hideTooltip}
          >
            {totalStats.attack.total.toFixed(1)}
          </span>
        </div>
        <div className="stat">
          <label>Defense</label>
          <span
            className="stat-with-tooltip"
            onMouseEnter={(e) => {
              const defenseStats = totalStats.defense;
              const tooltipData = {
                type: "defense",
                base: defenseStats.base,
                bonus: defenseStats.armor,
                total: defenseStats.total,
                itemName: defenseStats.armorName,
                damageReduction: defenseStats.total, // Add damage reduction percentage
              };
              showTooltip(e, tooltipData);
            }}
            onMouseLeave={hideTooltip}
          >
            {totalStats.defense.total.toFixed(1)}
          </span>
        </div>
        {/*<div className="stat">
          <label>Hacking</label>
          <span>{levelInfo?.hacking || 0}</span>
        </div>*/}
      </div>

      <div className="equipped-items">
        <h3>Equipped Items</h3>
        <div className="stat">
          <label>Armor</label>
          <span
            className="equipped-item"
            onMouseEnter={(e) => {
              const item = character.inventory?.find(
                (item) => item.type === "armor" && item.equipped
              );
              if (item) showTooltip(e, item);
            }}
            onMouseLeave={hideTooltip}
          >
            {character.inventory?.find(
              (item) => item.type === "armor" && item.equipped
            )?.name || "(None)"}
          </span>
        </div>
        <div className="stat">
          <label>Weapon</label>
          <span
            className="equipped-item"
            onMouseEnter={(e) => {
              const item = character.inventory?.find(
                (item) => item.type === "weapon" && item.equipped
              );
              if (item) showTooltip(e, item);
            }}
            onMouseLeave={hideTooltip}
          >
            {character.inventory?.find(
              (item) => item.type === "weapon" && item.equipped
            )?.name || "(None)"}
          </span>
        </div>
        {/*<div className="stat">
          <label>Cyberware</label>
          <span
            className="equipped-item"
            onMouseEnter={(e) => {
              const item = character.inventory?.find(
                (item) => item.type === "cyberware" && item.equipped
              );
              if (item) showTooltip(e, item);
            }}
            onMouseLeave={hideTooltip}
          >
            {character.inventory?.find(
              (item) => item.type === "cyberware" && item.equipped
            )?.name || "(None)"}
          </span>
        </div>*/}
      </div>

      <div className="credits">
        <label>Credits</label>
        <span>${character.credits}</span>
      </div>

      {/* Debug/Reset Button */}
      <div className="debug-section">
        <button
          className="reset-button"
          onClick={clearCharacterData}
          title="Clear saved character data and reset"
        >
          Reset Character Data
        </button>
      </div>

      {/* Tooltip */}
      {tooltip.show && tooltip.item && (
        <div
          className="item-tooltip"
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            zIndex: 1000,
          }}
        >
          {tooltip.item.type === "attack" || tooltip.item.type === "defense" ? (
            // Stat calculation tooltip
            <>
              <div className="tooltip-header">
                {tooltip.item.type === "attack" ? "Attack" : "Defense"}{" "}
                Calculation
              </div>
              <div className="tooltip-calculation">
                <div className="tooltip-base">Base: {tooltip.item.base}</div>
                {tooltip.item.bonus > 0 && tooltip.item.itemName && (
                  <div className="tooltip-bonus">
                    +{tooltip.item.bonus} from {tooltip.item.itemName}
                  </div>
                )}
                <div className="tooltip-total">
                  Total: {tooltip.item.total.toFixed(1)}
                </div>
                {tooltip.item.type === "defense" && (
                  <div className="tooltip-damage-reduction">
                    Reduces incoming damage by {tooltip.item.damageReduction}%
                  </div>
                )}
              </div>
            </>
          ) : (
            // Item tooltip
            <>
              <div className="tooltip-header">{tooltip.item.name}</div>
              <div className="tooltip-type">Type: {tooltip.item.type}</div>
              {tooltip.item.damage && (
                <div className="tooltip-stat">
                  Damage: {tooltip.item.damage}
                </div>
              )}
              {tooltip.item.defense && (
                <div className="tooltip-stat">
                  Defense: {tooltip.item.defense}
                </div>
              )}
              {/*{tooltip.item.hacking && (
                <div className="tooltip-stat">
                  Hacking: {tooltip.item.hacking}
                </div>
              )}
              {tooltip.item.description && (
                <div className="tooltip-description">
                  {tooltip.item.description}
                </div>
              )}*/}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default StatsPanel;

import React, { useState } from "react";
import "../styles/StatsPanel.css";
import levels, {
  getCurrentLevel,
  getNextLevelXP,
  getXPProgress,
  getLevelUpRewards,
} from "../data/levels.js";

function StatsPanel({ character }) {
  const [tooltip, setTooltip] = useState({
    show: false,
    item: null,
    x: 0,
    y: 0,
  });

  if (!character) return null;

  // Helper function to calculate XP display
  const getXPDisplay = () => {
    const currentLevel = getCurrentLevel(character.experience);
    const currentLevelXP = levels[currentLevel]?.xp || 0;
    const nextLevelXP = getNextLevelXP(currentLevel);
    const xpInCurrentLevel = character.experience - currentLevelXP;
    const xpNeededForNextLevel = nextLevelXP ? nextLevelXP - currentLevelXP : 0;
    return `${xpInCurrentLevel}/${xpNeededForNextLevel}`;
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
          <span>{levelInfo.hp}</span>
        </div>
        <div className="stat">
          <label>Attack</label>
          <span>{levelInfo.attack}</span>
        </div>
        <div className="stat">
          <label>Defense</label>
          <span>{levelInfo.defense}</span>
        </div>
        <div className="stat">
          <label>Hacking</label>
          <span>{levelInfo.hacking}</span>
        </div>
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
        <div className="stat">
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
        </div>
      </div>

      <div className="credits">
        <label>Credits</label>
        <span>{character.credits}¥</span>
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
          <div className="tooltip-header">{tooltip.item.name}</div>
          <div className="tooltip-type">Type: {tooltip.item.type}</div>
          {tooltip.item.damage && (
            <div className="tooltip-stat">Damage: {tooltip.item.damage}</div>
          )}
          {tooltip.item.defense && (
            <div className="tooltip-stat">Defense: {tooltip.item.defense}</div>
          )}
          {tooltip.item.hacking && (
            <div className="tooltip-stat">Hacking: {tooltip.item.hacking}</div>
          )}
          {tooltip.item.description && (
            <div className="tooltip-description">
              {tooltip.item.description}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StatsPanel;

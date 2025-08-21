import React from "react";
import "../styles/StatsPanel.css";

function StatsPanel({ character }) {
  if (!character) return null;

  return (
    <div className="stats-panel">
      <div className="character-info">
        <h2>{character.name}</h2>
        <div className="class-info">{character.class}</div>
        <div className="level-info">Level {character.level}</div>
      </div>

      {/*} <div className="vital-stats">
        <div className="stat-bar health">
          <label>Health</label>
          <div className="bar">
            <div
              className="fill"
              style={{ width: `${(character.health / 100) * 100}%` }}
            ></div>
          </div>
          <span className="value">{character.health}/100</span>
        </div>

        <div className="stat-bar energy">
          <label>Energy</label>
          <div className="bar">
            <div
              className="fill"
              style={{ width: `${(character.energy / 100) * 100}%` }}
            ></div>
          </div>
          <span className="value">{character.energy}/100</span>
        </div>
      </div>

      <div className="base-stats">
        <div className="stat">
          <label>Hack</label>
          <span>{character.stats.hack}</span>
        </div>
        <div className="stat">
          <label>Combat</label>
          <span>{character.stats.combat}</span>
        </div>
        <div className="stat">
          <label>Stealth</label>
          <span>{character.stats.stealth}</span>
        </div>
        <div className="stat">
          <label>Tech</label>
          <span>{character.stats.tech}</span>
        </div>
      </div>*/}

      <div className="credits">
        <label>Credits</label>
        <span>{character.credits}¥</span>
      </div>
    </div>
  );
}

export default StatsPanel;

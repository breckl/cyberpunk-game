import React from "react";
import "../styles/MainMenu.css";

function MainMenu({ onStartGame }) {
  return (
    <div className="main-menu">
      <div className="title-container">
        <h1 className="game-title">NEON NIGHTS</h1>
        <div className="subtitle">A Cyberpunk Text RPG</div>
      </div>

      <div className="menu-options">
        <button className="menu-button" onClick={onStartGame}>
          NEW GAME
        </button>
        <button className="menu-button" disabled>
          LOAD GAME
        </button>
        <button
          className="menu-button"
          onClick={() =>
            window.open("https://github.com/yourusername/neon-nights", "_blank")
          }
        >
          GITHUB
        </button>
      </div>

      <div className="version-info">v1.0.0 Alpha</div>
    </div>
  );
}

export default MainMenu;

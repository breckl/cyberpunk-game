import React, { useEffect } from "react";
import "../styles/MainMenu.css";
import { playSound } from "../utils/soundUtils.js";

function MainMenu({ onStartGame }) {
  useEffect(() => {
    // Play background music when main menu loads
    playSound("/sfx/music-1.mp3", 0.3); // Lower volume for background music
  }, []);

  return (
    <div className="main-menu">
      <div className="title-container">
        <h1 className="game-title">Burning Chrome</h1>
        <div className="subtitle">
          <div className="key" style={{ marginBottom: "10px" }}>
            “The sky above the port was the color of television, tuned to a dead
            channel.”
          </div>
          ~Neuromancer, William Gibson
        </div>
      </div>

      <div className="menu-options">
        <button className="menu-button" onClick={onStartGame}>
          START GAME
        </button>
      </div>

      <div className="version-info">v1.0.0 Alpha</div>
    </div>
  );
}

export default MainMenu;

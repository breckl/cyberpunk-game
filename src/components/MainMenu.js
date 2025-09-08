import React, { useEffect, useState } from "react";
import "../styles/MainMenu.css";
import { playSound } from "../utils/soundUtils.js";
import TextReveal from "./TextReveal";

function MainMenu({ onStartGame }) {
  const [showTitle, setShowTitle] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);

  useEffect(() => {
    // Play background music when main menu loads
    playSound("/sfx/music-1.mp3", 0.3); // Lower volume for background music

    // Start both title fade-in and quote typewriter at the same time
    const startTimer = setTimeout(() => {
      setShowTitle(true);
      setShowQuote(true);
    }, 500);

    return () => {
      clearTimeout(startTimer);
    };
  }, []);

  // Handle author fade-in when quote completes
  const handleQuoteComplete = () => {
    setShowAuthor(true);
  };

  return (
    <div className="main-menu">
      <div className="title-container">
        <h1 className={`game-title ${showTitle ? "fade-in" : ""}`}>
          Burning Chrome
        </h1>
        <div className="subtitle">
          {showQuote && (
            <div className="key" style={{ marginBottom: "10px" }}>
              <TextReveal
                text="The sky above the port was the color of television, tuned to a dead channel."
                speed={30}
                className="quote-text"
                onComplete={handleQuoteComplete}
              />
            </div>
          )}
          {showAuthor && (
            <div className={`author-text ${showAuthor ? "fade-in" : ""}`}>
              ~Neuromancer, William Gibson
            </div>
          )}
        </div>
      </div>

      <div className="menu-options">
        <button className="menu-button" onClick={onStartGame}>
          <span>START GAME</span>
        </button>
      </div>

      <div className="version-info">v1.0.0 Alpha</div>
    </div>
  );
}

export default MainMenu;

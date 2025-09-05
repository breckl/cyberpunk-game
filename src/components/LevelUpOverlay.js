import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import "../styles/LevelUpOverlay.css";
import { playLevelUpSound } from "../utils/soundUtils.js";

function LevelUpOverlay({ level, onComplete }) {
  const [showLevelNumber, setShowLevelNumber] = useState(false);
  const [showUpgrading, setShowUpgrading] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show level number after typewriter effect completes
    const timer1 = setTimeout(() => {
      setShowLevelNumber(true);
      // Play level up sound when level number appears
      playLevelUpSound();
    }, 2000); // After "NEW LEVEL UNLOCKED" completes

    // Show upgrading text after level number
    const timer2 = setTimeout(() => {
      setShowUpgrading(true);
    }, 4000); // 2 seconds after level number

    // Show progress bar after upgrading text
    const timer3 = setTimeout(() => {
      setShowProgressBar(true);
    }, 6000); // 2 seconds after upgrading text

    // Animate progress bar
    const timer4 = setTimeout(() => {
      const duration = 2000; // 2 seconds for progress bar
      const interval = 50; // Update every 50ms
      const increment = (100 * interval) / duration;

      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            // Complete after progress bar finishes
            setTimeout(() => {
              onComplete();
            }, 500);
            return 100;
          }
          return Math.min(prev + increment, 100);
        });
      }, interval);
    }, 7000); // 1 second after progress bar appears

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="level-up-overlay">
      <div className="level-up-content">
        {/* NEW LEVEL UNLOCKED with typewriter effect */}
        <div className="level-up-title">
          <TypeAnimation
            sequence={["NEXT LEVEL UNLOCKED!"]}
            wrapper="span"
            speed={50}
            cursor={false}
          />
        </div>

        {/* Level number in large text */}
        {showLevelNumber && <div className="level-number">{level}</div>}

        {/* Upgrading text with flashing effect */}
        {showUpgrading && (
          <div className="upgrading-text">UPGRADING SOFTWARE...</div>
        )}

        {/* Progress bar */}
        {showProgressBar && (
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LevelUpOverlay;

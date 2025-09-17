import React from "react";
import "../styles/WelcomeDialog.css";

function WelcomeDialog({ onClose }) {
  return (
    <div className="welcome-dialog-overlay">
      <div className="welcome-dialog">
        <div className="welcome-header">
          <h2>Welcome to Night City!</h2>
        </div>

        <div className="welcome-content">
          <div className="tips-section">
            <h3>Quick Tips:</h3>
            <ul className="tips-list">
              <li>
                Use the <strong>Black Market</strong> to find a weapon
              </li>
              <li>
                During combat, you can <strong>run</strong> if an enemy is more
                powerful
              </li>
              <li>
                <strong>Upgrade</strong> your weapons and armor as soon as you
                can!
              </li>
            </ul>
          </div>

          <p className="welcome-outro">
            Good luck, choom. The streets are waiting.
          </p>
        </div>

        <div className="welcome-footer">
          <button className="welcome-close-btn" onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeDialog;

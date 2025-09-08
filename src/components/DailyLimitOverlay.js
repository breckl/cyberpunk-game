import React from "react";
import "../styles/DailyLimitOverlay.css";

function DailyLimitOverlay({ fightCount, dailyLimit }) {
  return (
    <div className="daily-limit-overlay">
      <div className="daily-limit-container">
        <div className="daily-limit-content">
          <h1 className="daily-limit-title">DAILY LIMIT EXCEEDED</h1>

          <div className="daily-limit-message">
            <p className="limit-text">
              You have exceeded your daily fight limit of{" "}
              <span className="highlight">{dailyLimit.toLocaleString()}</span>{" "}
              fights.
            </p>
            <p className="current-fights">
              Fights today:{" "}
              <span className="highlight">{fightCount.toLocaleString()}</span>
            </p>
            <p className="reset-text">
              Your fight counter will reset tomorrow. Please return to continue
              your journey in Night City.
            </p>
          </div>

          <div className="daily-limit-footer">
            <div className="neon-border"></div>
            <p className="footer-text">Access denied until next day</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyLimitOverlay;

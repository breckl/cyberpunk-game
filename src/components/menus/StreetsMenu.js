import React, { useState, useEffect } from "react";
import { playClickSound } from "../../utils/soundUtils.js";
import { hasSeenWelcome, markWelcomeAsSeen } from "../../utils/localStorage.js";
import WelcomeDialog from "../WelcomeDialog.js";

function StreetsMenu({
  character,
  onNavigate,
  onShowInventory,
  onToggleMobileStats,
  showMobileStats,
}) {
  const [showWelcome, setShowWelcome] = useState(false);

  // Check if this is the first visit to streets
  useEffect(() => {
    if (!hasSeenWelcome()) {
      setShowWelcome(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    markWelcomeAsSeen();
  };

  const location = {
    name: "Night City Streets",
    description:
      "The neon-drenched streets of Night City stretch before you. The air is thick with the hum of hover vehicles and the chatter of street merchants. Holographic advertisements paint the smog in shifting colors.",
    options: [
      { key: "combat", label: "Combat Zone" },
      { key: "market", label: "Black Market" },
      { key: "inventory", label: "Inventory" },
      // { key: "travel", label: "Travel" },
      { key: "help", label: "Help" },
    ],
  };

  return (
    <>
      {showWelcome && <WelcomeDialog onClose={handleCloseWelcome} />}

      <div className="location-screen">
        <div className="location-header">
          <h2>{location.name}</h2>
        </div>

        <div className="location-description">{location.description}</div>

        <div className="options-grid">
          {location.options.map((option) => (
            <div key={option.key} className="option-row">
              <button
                className="menu-button"
                onClick={() => {
                  playClickSound();
                  onNavigate(option.key);
                }}
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StreetsMenu;

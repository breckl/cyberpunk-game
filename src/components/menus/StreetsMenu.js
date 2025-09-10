import React from "react";
import { playClickSound } from "../../utils/soundUtils.js";

function StreetsMenu({
  character,
  onNavigate,
  onShowInventory,
  onToggleMobileStats,
  showMobileStats,
}) {
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
  );
}

export default StreetsMenu;

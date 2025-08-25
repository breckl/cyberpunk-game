import React from "react";

function StreetsMenu({ character, onNavigate, onShowInventory, onShowHelp }) {
  const location = {
    name: "Night City Streets",
    description:
      "The neon-drenched streets of Night City stretch before you. The air is thick with the hum of hover vehicles and the chatter of street merchants. Holographic advertisements paint the smog in shifting colors.",
    options: [
      { key: "inventory", label: "Inventory" },
      { key: "market", label: "Market" },
      { key: "travel", label: "Travel" },
      { key: "combat", label: "Combat Zone" },
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
            <span
              className="menu-item clickable"
              onClick={() => {
                if (option.key === "help") {
                  onShowHelp();
                } else {
                  onNavigate(option.key);
                }
              }}
            >
              {option.label}
            </span>
          </div>
        ))}
      </div>

      <div className="global-menu-hint">
        Press <span className="key">Esc</span> for quick access to Inventory,
        Market, Travel, and more
      </div>
    </div>
  );
}

export default StreetsMenu;

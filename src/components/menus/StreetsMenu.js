import React, { useEffect } from "react";

function StreetsMenu({ character, onNavigate, onShowInventory, onShowHelp }) {
  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      switch (key) {
        case "I":
          onNavigate("inventory");
          break;
        case "M":
          onNavigate("market");
          break;
        case "T":
          onNavigate("travel");
          break;
        case "C":
          onNavigate("combat");
          break;
        case "H":
          onShowHelp();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNavigate, onShowInventory, onShowHelp]);

  const location = {
    name: "Night City Streets",
    description:
      "The neon-drenched streets of Night City stretch before you. The air is thick with the hum of hover vehicles and the chatter of street merchants. Holographic advertisements paint the smog in shifting colors.",
    options: [
      { key: "I", label: "nventory" },
      { key: "M", label: "arket" },
      { key: "T", label: "ravel" },
      { key: "C", label: "ombat Zone" },
      { key: "H", label: "elp" },
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
            <span className="menu-item">
              <span className="key">({option.key})</span>
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

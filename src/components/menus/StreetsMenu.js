import React, { useEffect } from "react";

function StreetsMenu({
  character,
  onNavigate,
  onShowInventory,
  onShowMessages,
  onShowPlayers,
  onShowHelp,
}) {
  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      switch (key) {
        case "N":
          onNavigate("nightmarket");
          break;
        case "C":
          onNavigate("combat");
          break;
        case "T":
          onNavigate("travel");
          break;
        case "I":
          onNavigate("inventory");
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
  }, [onNavigate, onShowInventory, onShowMessages, onShowPlayers, onShowHelp]);

  const location = {
    name: "Night City Streets",
    description:
      "The neon-drenched streets of Night City stretch before you. The air is thick with the hum of hover vehicles and the chatter of street merchants. Holographic advertisements paint the smog in shifting colors.",
    options: [
      { key: "N", label: "ight Market" },
      { key: "C", label: "ombat Zone" },
      { key: "T", label: "ravel" },
      { key: "I", label: "nventory" },
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
    </div>
  );
}

export default StreetsMenu;

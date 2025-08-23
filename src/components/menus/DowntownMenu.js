import React, { useEffect } from "react";

function DowntownMenu({ character, onNavigate, onShowInventory }) {
  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      switch (key) {
        case "M":
          onNavigate("market-district");
          break;
        case "C":
          onNavigate("clinic");
          break;
        case "G":
          onNavigate("combat");
          break;
        case "I":
          onNavigate("inventory");
          break;
        case "B":
          onNavigate("travel");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNavigate, onShowInventory]);

  const location = {
    name: "Downtown",
    description:
      "A tangle of rusted scaffolds, cracked pavement, and flickering neon signs. The air stinks of fried noodles, coolant leaks, and desperation. Gangs mark their turf with glowing paint, and shadows stretch long under the streetlights that work—when they feel like it. Survival here is a daily hustle.",
    options: [
      { key: "M", label: "arket District" },
      { key: "C", label: "linic" },
      { key: "G", label: "ang Territory" },
      { key: "I", label: "nventory" },
      { key: "B", label: "ack to Travel" },
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

export default DowntownMenu;

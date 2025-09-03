import React from "react";

function DowntownMenu({ character, onNavigate, onShowInventory }) {
  const location = {
    name: "Downtown",
    description:
      "A tangle of rusted scaffolds, cracked pavement, and flickering neon signs. The air stinks of fried noodles, coolant leaks, and desperation. Gangs mark their turf with glowing paint, and shadows stretch long under the streetlights that work—when they feel like it. Survival here is a daily hustle.",
    options: [
      { key: "market-district", label: "Market District" },
      { key: "clinic", label: "Clinic" },
      { key: "combat", label: "Gang Territory" },
      { key: "inventory", label: "Inventory" },
      { key: "travel", label: "Back to Travel" },
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
                if (option.key === "inventory") {
                  onShowInventory();
                } else {
                  onNavigate(option.key);
                }
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

export default DowntownMenu;

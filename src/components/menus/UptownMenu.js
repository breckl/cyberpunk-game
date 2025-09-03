import React from "react";

function UptownMenu({ character, onNavigate, onShowInventory }) {
  const location = {
    name: "Uptown",
    description:
      "Clean streets, polished chrome, and the hum of corporate power. Here, the elite live in glass towers that pierce the smog, their wealth evident in every detail. Security drones patrol the area, and the air is noticeably cleaner than the streets below.",
    options: [
      { key: "corporate-towers", label: "Corporate Towers" },
      { key: "shopping-district", label: "Shopping District" },
      { key: "residential", label: "Residential Area" },
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

export default UptownMenu;

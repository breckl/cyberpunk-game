import React, { useEffect } from "react";

function UptownMenu({ character, onNavigate, onShowStats, onShowInventory }) {
  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      switch (key) {
        case "C":
          onNavigate("corporate-towers");
          break;
        case "S":
          onNavigate("shopping-district");
          break;
        case "R":
          onNavigate("residential");
          break;
        case "V":
          onShowStats();
          break;
        case "I":
          onNavigate("inventory");
          break;
        case "Q":
          onNavigate("travel");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNavigate, onShowStats, onShowInventory]);

  const location = {
    name: "Uptown",
    description:
      "Clean streets, polished chrome, and the hum of corporate power. Here, the elite live in glass towers that pierce the smog, their wealth evident in every detail. Security drones patrol the area, and the air is noticeably cleaner than the streets below.",
    options: [
      { key: "C", label: "orporate Towers" },
      { key: "S", label: "hopping District" },
      { key: "R", label: "esidential Area" },
      { key: "V", label: "iew Stats" },
      { key: "I", label: "nventory" },
      { key: "Q", label: "uit to Travel" },
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

export default UptownMenu;

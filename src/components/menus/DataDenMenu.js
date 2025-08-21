import React, { useEffect } from "react";

function DataDenMenu({ character, onNavigate, onShowStats }) {
  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      switch (key) {
        case "H":
          onNavigate("hacking-station");
          break;
        case "S":
          onNavigate("security-systems");
          break;
        case "D":
          onNavigate("data-vaults");
          break;
        case "V":
          onShowStats();
          break;
        case "Q":
          onNavigate("streets");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNavigate, onShowStats]);

  const location = {
    name: "Data Den",
    description:
      "A dimly lit underground facility where hackers and data brokers ply their trade. The air hums with the constant whir of cooling systems and the glow of countless screens. Here, information flows like water, and secrets are bought and sold.",
    options: [
      { key: "H", label: "acking Station" },
      { key: "S", label: "ecurity Systems" },
      { key: "D", label: "ata Vaults" },
      { key: "V", label: "iew Stats" },
      { key: "B", label: "ack to Streets" },
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

export default DataDenMenu;

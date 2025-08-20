import React, { useEffect } from "react";

function CorporateMenu({ character, onNavigate, onShowStats }) {
  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      switch (key) {
        case "H":
          onNavigate("headquarters");
          break;
        case "L":
          onNavigate("labs");
          break;
        case "S":
          onNavigate("security");
          break;
        case "V":
          onShowStats();
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
  }, [onNavigate, onShowStats]);

  const location = {
    name: "Corporate District",
    description:
      "A maze of gleaming skyscrapers where the world's most powerful corporations make their decisions. The streets are patrolled by heavily armed security, and every building is a fortress of wealth and influence. Here, information is currency and loyalty is bought.",
    options: [
      { key: "H", label: "eadquarters" },
      { key: "L", label: "aboratories" },
      { key: "S", label: "ecurity Complex" },
      { key: "V", label: "iew Stats" },
      { key: "Q", label: "uit to Travel" },
    ],
  };

  return (
    <div className="location-screen">
      <div className="location-header">
        <h2>{location.name}</h2>
        <div className="neon-line"></div>
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

      <div className="command-prompt">
        <div className="neon-line"></div>
        <div className="prompt-text">
          Your command, {character?.name}? [{new Date().toLocaleTimeString()}] :
        </div>
      </div>
    </div>
  );
}

export default CorporateMenu;

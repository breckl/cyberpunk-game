import React, { useEffect } from "react";

function StreetsMenu({
  character,
  onNavigate,
  onShowStats,
  onShowInventory,
  onShowMessages,
  onShowPlayers,
  onShowHelp,
  onQuickSave,
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
        case "D":
          onNavigate("dataden");
          break;
        case "T":
          onNavigate("travel");
          break;
        case "V":
          onShowStats();
          break;
        case "I":
          onNavigate("inventory");
          break;
        case "H":
          onShowHelp();
          break;
        case "Q":
          onQuickSave();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    onNavigate,
    onShowStats,
    onShowInventory,
    onShowMessages,
    onShowPlayers,
    onShowHelp,
    onQuickSave,
  ]);

  const location = {
    name: "Night City Streets",
    description:
      "The neon-drenched streets of Night City stretch before you. The air is thick with the hum of hover vehicles and the chatter of street merchants. Holographic advertisements paint the smog in shifting colors.",
    options: [
      { key: "N", label: "ight Market" },
      { key: "C", label: "ombat Zone" },
      { key: "D", label: "ata Den" },
      { key: "T", label: "ravel" },
      { key: "V", label: "iew Stats" },
      { key: "I", label: "nventory" },
      { key: "H", label: "elp" },
      { key: "Q", label: "uick Save" },
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

export default StreetsMenu;

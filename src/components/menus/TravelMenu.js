import React, { useEffect } from "react";

function TravelMenu({ character, onNavigate }) {
  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      switch (key) {
        case "U":
          onNavigate("uptown");
          break;
        case "D":
          onNavigate("downtown");
          break;
        case "C":
          onNavigate("corporate");
          break;
        case "N":
          onNavigate("netherworld");
          break;
        case "B":
          onNavigate("streets");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNavigate]);

  const location = {
    name: "Travel - Choose Your Destination",
    description: "Where would you like to go in Night City?",
    options: [
      { key: "U", label: "ptown" },
      { key: "D", label: "owntown" },
      { key: "C", label: "orporate District" },
      { key: "N", label: "etherworld" },
      { key: "B", label: "ack to Streets" },
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
          Your destination, {character?.name}? [
          {new Date().toLocaleTimeString()}] :
        </div>
      </div>
    </div>
  );
}

export default TravelMenu;

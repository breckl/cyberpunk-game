import React, { useEffect } from "react";

function NetherworldMenu({ character, onNavigate }) {
  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();

      switch (key) {
        case "C":
          onNavigate("cyber-clubs");
          break;
        case "B":
          onNavigate("black-markets");
          break;
        case "F":
          onNavigate("fight-clubs");
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
  }, [onNavigate]);

  const location = {
    name: "Netherworld",
    description:
      "The underground heart of Night City's criminal empire. Neon-lit tunnels and hidden chambers where the city's most dangerous elements gather. Here, deals are made in the shadows, and survival depends on your wits and your weapons.",
    options: [
      { key: "C", label: "yber Clubs" },
      { key: "B", label: "lack Markets" },
      { key: "F", label: "ight Clubs" },
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

export default NetherworldMenu;

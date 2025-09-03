import React from "react";

function NetherworldMenu({ character, onNavigate }) {
  const location = {
    name: "Netherworld",
    description:
      "The underground heart of Night City's criminal empire. Neon-lit tunnels and hidden chambers where the city's most dangerous elements gather. Here, deals are made in the shadows, and survival depends on your wits and your weapons.",
    options: [
      { key: "cyber-clubs", label: "Cyber Clubs" },
      { key: "black-markets", label: "Black Markets" },
      { key: "fight-clubs", label: "Fight Clubs" },
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
              onClick={() => onNavigate(option.key)}
            >
              {option.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NetherworldMenu;

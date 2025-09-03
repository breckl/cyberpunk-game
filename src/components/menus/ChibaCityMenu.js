import React from "react";

function ChibaCityMenu({ character, onNavigate }) {
  const location = {
    name: "Chiba City",
    description:
      "Chiba City rises from the bay like circuitry gone feral—stacked neon, rusted steel, arcologies glowing against a static sky. Its streets splice clinics, pachinko dens, and noodle stalls, bound by the hum of generators and the chatter of hustlers in a dozen tongues. Credits change hands faster than cigarettes burn, biosofts traded in paper cups, surgeons hawking reflexes under flickering bulbs. Beyond the docks, water lies black with oil and waste. Chiba isn't home, it's interface—an entry point to the trade of bodies, dreams, and futures, where every deal is a gamble and the city always collects.",
    quote:
      "The sky above the port was the color of television, tuned to a dead channel.",
    options: [
      { key: "ninsei-strip", label: "Ninsei Strip" },
      { key: "corporate-district", label: "Corporate District" },
      { key: "divider", label: "divider" },
      { key: "travel", label: "Back to Travel" },
    ],
  };

  return (
    <div className="location-screen">
      <div className="location-header">
        <h2>{location.name}</h2>
      </div>

      <div className="location-description">{location.description}</div>

      <div className="location-quote">
        <em>"{location.quote}"</em>
      </div>

      <div className="options-grid">
        {location.options.map((option) => (
          <div key={option.key} className="option-row">
            {option.key === "divider" ? (
              <div className="option-divider"></div>
            ) : (
              <button
                className="menu-button"
                onClick={() => onNavigate(option.key)}
              >
                {option.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChibaCityMenu;

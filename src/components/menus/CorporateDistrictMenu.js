import React from "react";

function CorporateDistrictMenu({ character, onNavigate }) {
  const location = {
    name: "Corporate District",
    description:
      "The Corporate District rises above the sprawl like a fortress of glass and steel. Here, the air is filtered, the streets are clean, and security is omnipresent. Drones patrol the skies, biometric scanners guard every entrance, and the corporate logos blaze like beacons of power against the night sky. This is where the real money flows, where deals that shape the city are made behind closed doors. The contrast with the streets below couldn't be more stark—this is the world of the haves, while the have-nots struggle in the shadows below.",
    options: [
      { key: "corporate-black-clinic", label: "Black Clinic" },
      { key: "mega-corp-towers", label: "Mega Corp Towers" },
      { key: "hosaka-facility", label: "Hosaka Corporate Facility" },
      { key: "corporate-streets", label: "Streets (Combat Zone)" },
      { key: "corporate-market", label: "Market" },
      { key: "chiba-city", label: "Back to Chiba City" },
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
            <span
              className="menu-item clickable"
              onClick={() => onNavigate(option.key)}
            >
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CorporateDistrictMenu;

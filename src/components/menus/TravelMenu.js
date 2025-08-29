import React from "react";

function TravelMenu({ character, onNavigate }) {
  const location = {
    name: "Travel",
    description: "Where would you like to go in Night City?",
    options: [
      { key: "chiba-city", label: "Chiba City" },
      /*{ key: "uptown", label: "Uptown" },
      { key: "downtown", label: "Downtown" },
      { key: "corporate", label: "Corporate District" },*/
      { key: "divider", label: "divider" },
      { key: "streets", label: "Back to Streets" },
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
            {option.key === "divider" ? (
              <div className="option-divider"></div>
            ) : (
              <span
                className="menu-item clickable"
                onClick={() => onNavigate(option.key)}
              >
                {option.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravelMenu;

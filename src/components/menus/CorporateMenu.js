import React from "react";

function CorporateMenu({ character, onNavigate, onShowInventory }) {
  const location = {
    name: "Corporate District",
    description:
      "A maze of gleaming skyscrapers where the world's most powerful corporations make their decisions. The streets are patrolled by heavily armed security, and every building is a fortress of wealth and influence. Here, information is currency and loyalty is bought.",
    options: [
      { key: "headquarters", label: "Headquarters" },
      { key: "labs", label: "Laboratories" },
      { key: "security", label: "Security Complex" },
      { key: "inventory", label: "Inventory" },
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
            <span
              className="menu-item clickable"
              onClick={() => {
                if (option.key === "inventory") {
                  onShowInventory();
                } else {
                  onNavigate(option.key);
                }
              }}
            >
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CorporateMenu;

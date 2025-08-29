import React from "react";

function NinseiStripMenu({ character, onNavigate }) {
  const location = {
    name: "Ninsei Strip",
    description:
      "Ninsei hits you like static. Neon kanji gutters in the rain, sodium halos smoking off puddles that smell of fry oil and coolant. Black-clinic signs wink from stacked warrens above yakitori smoke, promising faster hands, sharper eyes, credit on approval. Pachinko chatter, simstim billboards, a dozen languages guttered into street slang. The Chatsubo throws a warm rectangle onto wet concrete; expats and console cowboys drift in and out like ghosts with tabs. Yakuza coats glitter at the cuff where chrome meets flesh. Somewhere a portable deck squeals, somewhere a cutter laughs. You count cameras without meaning to. This is the strip: buy speed, sell tomorrow.",
    quote:
      "Get just wasted enough, find yourself in some desperate but strangely arbitrary kind of trouble, and it was possible to see Ninsei as a field of data. [...] Then you could throw yourself into a highspeed drift and skid, totally engaged but set apart from it all, and all around you the dance of biz, information interacting, data made flesh in the mazes of the black market... ~William Gibson, Neuromancer",
    options: [
      { key: "black-clinic", label: "Black Clinic" },
      { key: "chatsubo", label: "The Chatsubo" },
      { key: "chiba-docks", label: "Chiba Docks" },
      { key: "jarre-de-the", label: "Jarre de Thé" },
      { key: "cheap-hotel", label: "Cheap Hotel" },
      { key: "ninsei-streets", label: "Streets (Combat Zone)" },
      { key: "market", label: "Market" },
      { key: "divider", label: "divider" },
      { key: "chiba-city", label: "Back to Chiba City" },
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

export default NinseiStripMenu;

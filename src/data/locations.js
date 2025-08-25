// Location data structure with enemy probabilities and types
const locations = {
  "chiba-city": {
    name: "Chiba City",
    type: "city",
    description:
      "Chiba City rises from the bay like circuitry gone feral—stacked neon, rusted steel, arcologies glowing against a static sky. Its streets splice clinics, pachinko dens, and noodle stalls, bound by the hum of generators and the chatter of hustlers in a dozen tongues. Credits change hands faster than cigarettes burn, biosofts traded in paper cups, surgeons hawking reflexes under flickering bulbs. Beyond the docks, water lies black with oil and waste. Chiba isn't home, it's interface—an entry point to the trade of bodies, dreams, and futures, where every deal is a gamble and the city always collects.",
    quote:
      "The sky above the port was the color of television, tuned to a dead channel.",
    regions: ["ninsei-strip", "corporate-district"],
  },

  "ninsei-strip": {
    name: "Ninsei Strip",
    type: "region",
    description:
      "Ninsei hits you like static. Neon kanji gutters in the rain, sodium halos smoking off puddles that smell of fry oil and coolant. Black-clinic signs wink from stacked warrens above yakitori smoke, promising faster hands, sharper eyes, credit on approval. Pachinko chatter, simstim billboards, a dozen languages guttered into street slang. The Chatsubo throws a warm rectangle onto wet concrete; expats and console cowboys drift in and out like ghosts with tabs. Yakuza coats glitter at the cuff where chrome meets flesh. Somewhere a portable deck squeals, somewhere a cutter laughs. You count cameras without meaning to. This is the strip: buy speed, sell tomorrow.",
    quote:
      "Get just wasted enough, find yourself in some desperate but strangely arbitrary kind of trouble, and it was possible to see Ninsei as a field of data. [...] Then you could throw yourself into a highspeed drift and skid, totally engaged but set apart from it all, and all around you the dance of biz, information interacting, data made flesh in the mazes of the black market... ~William Gibson, Neuromancer",
    locations: [
      "black-clinic",
      "chatsubo",
      "chiba-docks",
      "jarre-de-the",
      "cheap-hotel",
      "ninsei-streets",
      "ninsei-market",
    ],
  },

  "corporate-district": {
    name: "Corporate District",
    type: "region",
    description:
      "The Corporate District rises above the sprawl like a fortress of glass and steel. Here, the air is filtered, the streets are clean, and security is omnipresent. Drones patrol the skies, biometric scanners guard every entrance, and the corporate logos blaze like beacons of power against the night sky. This is where the real money flows, where deals that shape the city are made behind closed doors. The contrast with the streets below couldn't be more stark—this is the world of the haves, while the have-nots struggle in the shadows below.",
    locations: [
      "corporate-black-clinic",
      "mega-corp-towers",
      "hosaka-facility",
      "corporate-streets",
      "corporate-market",
    ],
  },

  // Specific locations within regions
  "black-clinic": {
    name: "Black Clinic",
    type: "clinic",
    description:
      "The infamous cluster on Chiba's Ninsei strip, where illegal cybernetic surgery thrives (Ratz the bartender sends Case to one)",
    parent: "ninsei-strip",
  },

  chatsubo: {
    name: "The Chatsubo",
    type: "bar",
    description:
      "Inside, the air tastes of soy and cigarettes, screens stutter simstim loops behind rows of bottles, and Ratz leans on the bar with his Soviet prosthetic ticking. Console cowboys, hustlers, and drifters crowd the shadows, swapping chips and stolen decks under the throb of broken Eurobeat. Deals are whispered, eyes linger too long, and everything feels like it could turn quick.",
    quote:
      "The Chatsubo was a bar for professional expatriates; you could drink there for a week and never hear two words in Japanese. Ratz was tending bar, his prosthetic arm jerking monotonously as he filled a tray of glasses with draft Kirin. ~William Gibson, Neuromancer",
    parent: "ninsei-strip",
  },

  "chiba-docks": {
    name: "Chiba Docks",
    type: "docks",
    description:
      "The Chiba docks burn all night under quartz-halogen floods, cranes swinging like steel giants over the bay. Tokyo Bay lies black and slick with waste, gulls skimming the surface while hover-tugs cough smoke into the rain. Containers shift, heavy with contraband biosofts and chrome, bound inland for the clinics. Fixers linger in the sodium light, deals whispered in Russian, Japanese, Sprawl slang. Every shadow promises work or trouble, and the air tastes like oil, salt, and change. This is the edge—where you arrive raw, and where the city begins to remake you.",
    quote:
      "The docks... quartz‑halogen floodlights that illuminate the docks all night like vast stages. Tokyo Bay lies as a black expanse with drifting shoals of waste…",
    parent: "ninsei-strip",
  },

  "jarre-de-the": {
    name: "Jarre de Thé",
    type: "cafe",
    description:
      "Two blocks west of the pastel decay of the Chatsubo, the Jarre de Thé stands compressed between neon glare and fog. Inside, red‑neon frames encase mirrored walls that refract every cigarette glow and twitch of motion. The décor: a pale, retro fusion of Japanese minimalism and Milanese plastics—everything coated in a film of longing. Case orders a double espresso with his cheap Brazilian dex, the cup's hiss echoing in the hush. There's a weight to the place, like a wound that won't heal, the scent of grounds thick in the air. For a moment, you forget the street outside—that constant pressure of failing systems and broken deals. The Jarre is where time stores its breath, waiting to exhale.",
    quote: "The Jarre was walled with mirrors, each panel framed in red neon.",
    parent: "ninsei-strip",
  },

  "cheap-hotel": {
    name: "Cheap Hotel",
    type: "hotel",
    description:
      "The Cheap Hotel slumps over Ninsei, paint flaking, hallways sour with mildew and stale smoke. Rooms are coffin-sized, just enough space for a bunk and the hum of tired fluorescents. Blinds hang crooked, neon bleeding through every crack, turning the walls into restless color. Tenants drift like shadows between doors that barely latch, the whole place groaning with the weight of lives on pause. It isn't safety—just a cheap box to shut your eyes while the city keeps breathing outside.",
    parent: "ninsei-strip",
  },

  "ninsei-streets": {
    name: "The Streets",
    type: "combat-zone",
    description:
      "Ninsei Strip hums with rain and neon, smoke from stalls mixing with ozone off cheap grids. Signs for clinics stutter promises in kanji, while hustlers and drunks drift through the glow. Gangers watch from shadowed doorways, knives or chrome ready. Every step feels wired—like the street itself is waiting to cut.",
    parent: "ninsei-strip",
    enemyProbabilities: {
      1: 30, // Level 1: 30%
      2: 30, // Level 2: 30%
      3: 20, // Level 3: 20%
      4: 10, // Level 4: 10%
      5: 10, // Level 5: 10%
    },
    enemyIds: [
      // Level 1 enemies
      "simstim_junkie",
      "street_punk",
      "neon_jackal",
      "noodle_thief",
      "bar_brawler",
      "data_rat",
      "rooftop_sneak",
      "drunken_chiba_port_sailor",
      "chatsubo_drunk",
      "simstim_burnout",
      "neon_hawker",
      // Level 2 enemies
      "sprawl_ganger",
      "alley_scav",
      "clinic_bouncer",
      "ninsei_strip_hustler",
      "pachinko_ganger",
      "chatsubo_bouncer",
      "street_snatcher",
      // Level 3 enemies
      "clinic_repoman",
      "syndicate_runner",
      "black_clinic_security",
      "biosoft_heavy",
      // Level 4 enemies
      "razorgirl",
      "pit_fighter",
      // Level 5 enemies
      "yakuza_enforcer",
      "mercenary",
    ],
  },

  "ninsei-market": {
    name: "Night Market",
    type: "market",
    description: "This links to the Market",
    parent: "ninsei-strip",
    linksTo: "market",
  },

  "corporate-black-clinic": {
    name: "Black Clinic",
    type: "clinic",
    description:
      "More slick and polished and expensive than other clinics. The corporate version offers premium cybernetic enhancements with corporate backing, sterile environments, and top-tier surgeons. The prices reflect the quality, but so does the risk—corporate clinics have their own agendas.",
    parent: "corporate-district",
  },

  "mega-corp-towers": {
    name: "Mega Corp Towers",
    type: "corporate",
    description:
      "MegaCorp Towers rise like obsidian monoliths, sheer glass reflecting neon sprawl below. Floodlit perimeters and drones guard their bases, keeping streets away. Inside, climate-sealed corridors smell of ozone, silence broken by server hum and executive whispers. Lives unfold within—housing, clinics, markets—sealed ecosystems owned outright. At night their logos blaze like corporate gods, dominion in light. From street level, they seem untouchable, as though the very air rejects the city's chaos.",
    parent: "corporate-district",
  },

  "hosaka-facility": {
    name: "Hosaka Corporate Facility",
    type: "corporate",
    description:
      "Hosaka Headquarters is an engine, a fortress of glass and steel in the corporate grid. Security saturates the place—biometric gates, drones, men in suits with dead smiles. Inside, offices and data vaults pulse with research, deals, and black code. Executives pass like packets, insulated and unknowable. Outside, the logo glows sterile against dark, a beacon of inevitability. Hosaka doesn't just occupy space—it colonizes it, shaping each breath into corporate property.",
    parent: "corporate-district",
  },

  "corporate-streets": {
    name: "The Streets",
    type: "combat-zone",
    description:
      "Corporate District streets are clean, well-lit, and heavily patrolled. Security drones hover overhead, and corporate security forces maintain order. The streets here are safer than the sprawl below, but crossing the wrong corporate entity can have serious consequences.",
    parent: "corporate-district",
    enemyProbabilities: {
      3: 40, // Level 3: 40%
      4: 35, // Level 4: 35%
      5: 20, // Level 5: 20%
      6: 5, // Level 6: 5%
    },
    enemyIds: [
      // Level 3+ enemies only for corporate areas
      "clinic_repoman",
      "syndicate_runner",
      "black_clinic_security",
      "biosoft_heavy",
      "razorgirl",
      "pit_fighter",
      "yakuza_enforcer",
      "mercenary",
      "bodyguard",
      "assassin",
    ],
  },

  "corporate-market": {
    name: "Market",
    type: "market",
    description: "This links to the Market",
    parent: "corporate-district",
    linksTo: "market",
  },
};

// Helper functions
export const getLocation = (locationId) => {
  return locations[locationId] || null;
};

export const getLocationEnemies = (locationId) => {
  const location = locations[locationId];
  if (!location || !location.enemyProbabilities || !location.enemyIds) {
    return null;
  }

  return {
    probabilities: location.enemyProbabilities,
    enemyIds: location.enemyIds,
  };
};

export const getLocationType = (locationId) => {
  const location = locations[locationId];
  return location ? location.type : null;
};

export default locations;

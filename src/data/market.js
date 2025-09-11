import {
  calculatePriceWithDamage,
  calculateArmorPriceWithDefense,
  calculateWeaponDamage,
  calculateArmorDefense,
} from "../config/gameBalance.js";

const market = {
  armor: [
    {
      id: "street_hoodie",
      name: "Worn Trench Coat",
      description: "Ragged trench coat, minimal protection",
      brand: "Ravenlock Apparel",
      level: 1,
      defense: calculateArmorDefense(1, "Light"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(1, "Light"),
        1,
        "Light"
      ),
      type: "Light",
    },
    {
      id: "leather_jacket",
      name: "Leather Jacket",
      description: "Classic ganger look, light padding",
      brand: "Ravenlock Apparel",
      level: 1,
      defense: calculateArmorDefense(1, "Medium"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(1, "Medium"),
        1,
        "Medium"
      ),
      type: "Medium",
    },
    {
      id: "padded_vest",
      name: "Padded Vest",
      description: "Cheap foam-padded vest",
      brand: "Ravenlock Apparel",
      level: 1,
      defense: calculateArmorDefense(1, "Heavy"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(1, "Heavy"),
        1,
        "Heavy"
      ),
      type: "Heavy",
    },
    {
      id: "kevlar_liner",
      name: "Kevlar Liner",
      description: "Entry-level bullet resistant liner",
      brand: "Orchid Dynamics",
      level: 2,
      defense: calculateArmorDefense(2, "Light"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(2, "Light"),
        2,
        "Light"
      ),
      type: "Light",
    },
    {
      id: "riot_vest",
      name: "Riot Vest",
      description: "Discount police surplus armor",
      brand: "Ironjaw Arsenal",
      level: 2,
      defense: calculateArmorDefense(2, "Medium"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(2, "Medium"),
        2,
        "Medium"
      ),
      type: "Medium",
    },
    {
      id: "reinforced_leather_armor",
      name: "Reinforced Leather Armor",
      description: "Heavy stitched jacket with inserts",
      brand: "Ravenlock Apparel",
      level: 2,
      defense: calculateArmorDefense(2, "Heavy"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(2, "Heavy"),
        2,
        "Heavy"
      ),
      type: "Heavy",
    },
    {
      id: "street_combat_pads",
      name: "Street Combat Pads",
      description: "Strap-on polymer pads, knee/elbow",
      brand: "NeuroForge",
      level: 3,
      defense: calculateArmorDefense(3, "Light"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(3, "Light"),
        3,
        "Light"
      ),
      type: "Light",
    },
    {
      id: "scrap_plating_rig",
      name: "Scrap Plating Rig",
      description: "Bolted metal plates, crude and heavy",
      brand: "Czarov Ballistics",
      level: 3,
      defense: calculateArmorDefense(3, "Medium"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(3, "Medium"),
        3,
        "Medium"
      ),
      type: "Medium",
    },
    {
      id: "tactical_vest",
      name: "Tactical Vest",
      description: "Standard PMC body armor",
      brand: "Atlas Defense Corp",
      level: 3,
      defense: calculateArmorDefense(3, "Heavy"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(3, "Heavy"),
        3,
        "Heavy"
      ),
      type: "Heavy",
    },
    {
      id: "light_kevlar_suit",
      name: "Kevlar Suit",
      description: "Sleek corp-grade protection",
      brand: "Orchid Dynamics",
      level: 4,
      defense: calculateArmorDefense(4, "Light"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(4, "Light"),
        4,
        "Light"
      ),
      type: "Light",
    },
    {
      id: "ballistic_harness",
      name: "Ballistic Harness",
      description: "Military webbing with plates",
      brand: "TitanForge Munitions",
      level: 4,
      defense: calculateArmorDefense(4, "Medium"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(4, "Medium"),
        4,
        "Medium"
      ),
      type: "Medium",
    },
    {
      id: "composite_vest",
      name: "Composite Vest",
      description: "Mid-grade synthetic blend vest",
      brand: "Pharos OpticWorks",
      level: 4,
      defense: calculateArmorDefense(4, "Heavy"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(4, "Heavy"),
        4,
        "Heavy"
      ),
      type: "Heavy",
    },
    {
      id: "urban_tactical_suit",
      name: "Urban Tactical Suit",
      description: "Blends business suit + hidden plates",
      brand: "Orchid Dynamics",
      level: 5,
      defense: calculateArmorDefense(5, "Light"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(5, "Light"),
        5,
        "Light"
      ),
      type: "Light",
    },
    {
      id: "kevlar_mesh_armor",
      name: "Kevlar Mesh Armor",
      description: "Advanced flexible armor mesh",
      brand: "Spectra Interface",
      level: 5,
      defense: calculateArmorDefense(5, "Medium"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(5, "Medium"),
        5,
        "Medium"
      ),
      type: "Medium",
    },
    {
      id: "dermal_mesh_i",
      name: "Dermal Mesh I",
      description: "First-gen subdermal implant mesh",
      brand: "NeuroForge",
      level: 5,
      defense: calculateArmorDefense(5, "Heavy"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(5, "Heavy"),
        5,
        "Heavy"
      ),
      type: "Heavy",
    },
    {
      id: "composite_tactical_armor",
      name: "Composite Tactical Armor",
      description: "Full-body composite weave",
      brand: "Atlas Defense Corp",
      level: 6,
      defense: calculateArmorDefense(6, "Light"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(6, "Light"),
        6,
        "Light"
      ),
      type: "Light",
    },
    {
      id: "tactical_armor_suit",
      name: "Tactical Armor Suit",
      description: "High-end PMC protection suit",
      brand: "Atlas Defense Corp",
      level: 6,
      defense: calculateArmorDefense(6, "Medium"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(6, "Medium"),
        6,
        "Medium"
      ),
      type: "Medium",
    },
    {
      id: "dermal_mesh_ii",
      name: "Dermal Mesh II",
      description: "Improved dermal implant plating",
      brand: "NeuroForge",
      level: 6,
      defense: calculateArmorDefense(6, "Heavy"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(6, "Heavy"),
        6,
        "Heavy"
      ),
      type: "Heavy",
    },
    {
      id: "advanced_riot_suit",
      name: "Advanced Riot Suit",
      description: "Full body police riot armor",
      brand: "Ironjaw Arsenal",
      level: 7,
      defense: calculateArmorDefense(7, "Light"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(7, "Light"),
        7,
        "Light"
      ),
      type: "Light",
    },
    {
      id: "composite_armor",
      name: "Composite Armor",
      description: "Military composite body armor",
      brand: "Atlas Defense Corp",
      level: 7,
      defense: calculateArmorDefense(7, "Medium"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(7, "Medium"),
        7,
        "Medium"
      ),
      type: "Medium",
    },
    {
      id: "tactical_exo_suit",
      name: "Tactical Exo-Suit",
      description: "Powered exo-assisted combat suit",
      brand: "TitanForge Munitions",
      level: 7,
      defense: calculateArmorDefense(7, "Heavy"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(7, "Heavy"),
        7,
        "Heavy"
      ),
      type: "Heavy",
    },
    {
      id: "tactical_exo_armor",
      name: "Tactical Exo-Armor",
      description: "Enhanced powered armor suit",
      brand: "Atlas Defense Corp",
      level: 8,
      defense: calculateArmorDefense(8, "Medium"),
      price: calculateArmorPriceWithDefense(
        calculateArmorDefense(8, "Medium"),
        8,
        "Medium"
      ),
      type: "Medium",
    },
  ],

  weapons: [
    // LEVEL 1 - Light
    {
      id: "w1",
      name: "Rusty Knife",
      description: "Cracked blade scavenged from junk",
      actionDescription: "stab",
      damage: calculateWeaponDamage(1, "Light") * 0.95,
      price: calculatePriceWithDamage(
        calculateWeaponDamage(1, "Light") * 0.95,
        1,
        "Light"
      ),
      level: 1,
      type: "Light",
    },
    {
      id: "w6",
      name: "Brass Knuckles",
      description: "Boosts melee punches",
      actionDescription: "punch",
      damage: calculateWeaponDamage(1, "Light") * 1.05,
      price: calculatePriceWithDamage(
        calculateWeaponDamage(1, "Light") * 1.05,
        1,
        "Light"
      ),
      level: 1,
      type: "Light",
    },
    {
      id: "w2",
      name: "Switchblade",
      description: "Fold-out knife, fast but fragile",
      actionDescription: "slash",
      damage: calculateWeaponDamage(1, "Medium"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(1, "Medium"),
        1,
        "Medium"
      ),
      level: 1,
      type: "Medium",
    },
    {
      id: "w4",
      name: "Polymer Pistol",
      description: "Mass-market sidearm, easily concealed",
      actionDescription: "take a shot",
      damage: calculateWeaponDamage(1, "Heavy") * 1.02,
      price: calculatePriceWithDamage(
        calculateWeaponDamage(1, "Heavy") * 1.02,
        1,
        "Heavy"
      ),
      level: 1,
      type: "Heavy",
    },

    // LEVEL 2
    {
      id: "w5",
      name: "Rusty Katana",
      description: "Worn but still deadly blade, scavenged from the ruins",
      actionDescription: "slash",
      damage: calculateWeaponDamage(2, "Light"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(2, "Light"),
        2,
        "Light"
      ),
      level: 2,
      type: "Light",
    },
    {
      id: "wt3",
      name: "Flechette Pistole",
      description: "Needle pistol, early model",
      actionDescription: "fire",
      damage: calculateWeaponDamage(2, "Medium") * 1.02,
      price: calculatePriceWithDamage(
        calculateWeaponDamage(2, "Medium") * 1.02,
        2,
        "Medium"
      ),
      level: 2,
      type: "Medium",
    },
    {
      id: "wt4",
      name: "Ravenlock Arms .45",
      description: "Advanced pistol with integrated targeting systems",
      actionDescription: "fire",
      damage: calculateWeaponDamage(2, "Medium"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(2, "Medium"),
        2,
        "Medium"
      ),
      level: 2,
      type: "Medium",
    },
    {
      id: "w8",
      name: "NYPD Tactical 9mm",
      description: "Standard police-issue sidearm, sturdy",
      actionDescription: "fire",
      damage: calculateWeaponDamage(2, "Heavy"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(2, "Heavy"),
        2,
        "Heavy"
      ),
      level: 2,
      type: "Heavy",
    },
    {
      id: "w11",
      name: "Basic Katana",
      description: "Traditional Japanese sword, sharp and reliable",
      actionDescription: "slash",
      damage: calculateWeaponDamage(3, "Light"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(3, "Light"),
        3,
        "Light"
      ),
      level: 3,
      type: "Light",
    },
    {
      id: "w14",
      name: "Bamboo Bow with Razor Arrows",
      description: "Traditional bow, enhanced arrows",
      actionDescription: "loose an arrow",
      damage: calculateWeaponDamage(3, "Light") * 1.05,
      price: calculatePriceWithDamage(
        calculateWeaponDamage(3, "Light") * 1.05,
        3,
        "Light"
      ),
      level: 3,
      type: "Light",
    },
    {
      id: "w15",
      name: "Heckler & Koch SMG",
      description: "German-made submachine gun, reliable",
      actionDescription: "fire a short burst",
      damage: calculateWeaponDamage(3, "Medium") * 1.02,
      price: calculatePriceWithDamage(
        calculateWeaponDamage(3, "Medium") * 1.02,
        3,
        "Light"
      ),
      level: 3,
      type: "Light",
    },
    // LEVEL 3 - Medium
    {
      id: "w12",
      name: "Kobayashi Tech Pistol",
      description: "High-quality sidearm with enhanced ergonomics",
      actionDescription: "fire",
      damage: calculateWeaponDamage(3, "Medium"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(3, "Medium"),
        3,
        "Medium"
      ),
      level: 3,
      type: "Medium",
    },
    {
      id: "wt7",
      name: "Bamboo Bow with Explosive Arrows",
      description: "Bamboo bow upgrade, arrowheads explode",
      actionDescription: "loose an explosive arrow",
      damage: calculateWeaponDamage(3, "Medium") * 1.05,
      price: calculatePriceWithDamage(
        calculateWeaponDamage(3, "Medium") * 1.05,
        3,
        "Medium"
      ),
      level: 3,
      type: "Medium",
    },
    {
      id: "w16",
      name: "Double-Barrel Shotgun",
      description: "Street brawler's favorite, brutal close-range",
      actionDescription: "fire",
      damage: calculateWeaponDamage(3, "Heavy"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(3, "Heavy"),
        3,
        "Heavy"
      ),
      level: 3,
      type: "Heavy",
    },
    {
      id: "we1",
      name: "Steiner-Optic Scoped Rifle",
      description: "Precision rifle with advanced optics",
      damage: calculateWeaponDamage(3, "Heavy") * 1.02,
      price: calculatePriceWithDamage(
        calculateWeaponDamage(3, "Heavy") * 1.02,
        3,
        "Heavy"
      ),
      level: 3,
      type: "Heavy",
    },

    // LEVEL 4
    {
      id: "w19",
      name: "Heckler & Koch AR-19",
      description: "Advanced assault rifle with modular design",
      actionDescription: "fire a burst",
      damage: calculateWeaponDamage(4, "Light"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(4, "Light"),
        4,
        "Light"
      ),
      level: 4,
      type: "Light",
    },
    {
      id: "wt8",
      name: "Razor Claws",
      description: "Retractable nail blades, iconic cybermod",
      actionDescription: "slash",
      damage: calculateWeaponDamage(4, "Medium"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(4, "Medium"),
        4,
        "Medium"
      ),
      level: 4,
      type: "Medium",
    },
    {
      id: "wt9",
      name: "Icarus Systems Laser Rifle",
      description: "Advanced laser weapon with precision targeting",
      actionDescription: "fire",
      damage: calculateWeaponDamage(4, "Medium") * 0.9,
      price: calculatePriceWithDamage(
        calculateWeaponDamage(4, "Medium") * 0.9,
        4,
        "Medium"
      ),
      level: 4,
      type: "Medium",
    },

    // LEVEL 4
    {
      id: "w18",
      name: "Railgun",
      description: "Electromagnetic projectile launcher, devastating power",
      actionDescription: "fire",
      damage: calculateWeaponDamage(4, "Heavy") * 1.15,
      price: calculatePriceWithDamage(
        calculateWeaponDamage(4, "Heavy") * 1.15,
        4,
        "Heavy"
      ),
      level: 4,
      type: "Heavy",
    },
    {
      id: "w20",
      name: "Pharos SMG",
      description: "High-capacity submachine gun with rapid fire",
      actionDescription: "fire a rapid burst",
      damage: calculateWeaponDamage(5, "Light"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(5, "Medium"),
        5,
        "Medium"
      ),
      level: 5,
      type: "Medium",
    },
    {
      id: "wt10",
      name: "Spectra Neural Stunner",
      description: "Cybernetic pulse device, disrupts nerves",
      damage: calculateWeaponDamage(5, "Medium"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(5, "Medium"),
        5,
        "Medium"
      ),
      level: 5,
      type: "Medium",
    },

    // LEVEL 5 - Heavy
    {
      id: "w21",
      name: "Icarus Tech Pistol",
      description: "High-caliber sidearm, reliable firepower",
      actionDescription: "fire",
      damage: calculateWeaponDamage(5, "Heavy"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(5, "Heavy"),
        5,
        "Heavy"
      ),
      level: 5,
      type: "Heavy",
    },

    // LEVEL 6 - Light
    {
      id: "w22",
      name: "Blackline Scoped Rifle",
      description: "Long-range, high-precision weapon",
      actionDescription: "take a shot",
      damage: calculateWeaponDamage(6, "Light"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(6, "Light"),
        6,
        "Light"
      ),
      level: 6,
      type: "Light",
    },

    // LEVEL 6 - Medium
    {
      id: "wt11",
      name: "Monofilament Wire",
      description: "Nearly invisible garrote, slices steel",
      damage: calculateWeaponDamage(6, "Medium"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(6, "Medium"),
        6,
        "Medium"
      ),
      level: 6,
      type: "Medium",
    },
    {
      id: "wt12",
      name: "Helix Tech Pistol",
      description: "AI-assisted targeting sidearm",
      damage: calculateWeaponDamage(6, "Medium"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(6, "Medium"),
        6,
        "Medium"
      ),
      level: 6,
      type: "Medium",
    },

    // LEVEL 6 - Heavy
    {
      id: "wh4",
      name: "Grenade Launcher",
      description: "40mm grenade launcher",
      actionDescription: "fire",
      damage: calculateWeaponDamage(6, "Heavy"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(6, "Heavy"),
        6,
        "Heavy"
      ),
      level: 6,
      type: "Heavy",
    },

    // LEVEL 7 - Medium
    {
      id: "wt13",
      name: "Vibro-Katana",
      description: "Enhanced blade with ultrasonic edge",
      damage: calculateWeaponDamage(7, "Medium"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(7, "Medium"),
        7,
        "Medium"
      ),
      level: 7,
      type: "Medium",
    },

    // LEVEL 7 - Heavy
    {
      id: "we2",
      name: "Helix Pulse Rifle",
      description: "Corporate energy rifle with devastating output",
      damage: calculateWeaponDamage(7, "Heavy"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(7, "Heavy"),
        7,
        "Heavy"
      ),
      level: 7,
      type: "Heavy",
    },
    {
      id: "wh2",
      name: "Heavy Machine Gun",
      description: "Belt-fed heavy weapon system",
      actionDescription: "fire",
      damage: calculateWeaponDamage(7, "Heavy"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(7, "Heavy"),
        7,
        "Heavy"
      ),
      level: 7,
      type: "Heavy",
    },

    // LEVEL 8 - Medium
    {
      id: "wt15",
      name: "High-Frequency Katana",
      description: "Top-tier sword vibrating at sonic edge",
      damage: calculateWeaponDamage(8, "Medium"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(8, "Medium"),
        8,
        "Medium"
      ),
      level: 8,
      type: "Medium",
    },

    // LEVEL 8 - Heavy
    {
      id: "we3",
      name: "Plasma Cannon",
      description: "High-energy plasma weapon",
      actionDescription: "fire",
      damage: calculateWeaponDamage(8, "Heavy"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(8, "Heavy"),
        8,
        "Heavy"
      ),
      level: 8,
      type: "Heavy",
    },
    {
      id: "wh3",
      name: "Rocket Launcher",
      description: "Anti-tank rocket system",
      actionDescription: "fire",
      damage: calculateWeaponDamage(8, "Heavy"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(8, "Heavy"),
        8,
        "Heavy"
      ),
      level: 8,
      type: "Heavy",
    },

    // LEVEL 9 - Medium
    {
      id: "wt16",
      name: "ICE Lance",
      description: "Black ICE program, neural spear in VR",
      damage: calculateWeaponDamage(9, "Medium"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(9, "Medium"),
        9,
        "Medium"
      ),
      level: 9,
      type: "Medium",
    },

    // LEVEL 9 - Heavy
    {
      id: "w23",
      name: "ZetaTech Rotary Cannon",
      description: "Heavy rotating machinegun, tank-tier firepower",
      actionDescription: "unleash a devastating burst",
      damage: calculateWeaponDamage(9, "Heavy"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(9, "Heavy"),
        9,
        "Heavy"
      ),
      level: 9,
      type: "Heavy",
    },
    {
      id: "we4",
      name: "Quantum Rifle",
      description: "Experimental quantum energy weapon",
      actionDescription: "fire",
      damage: calculateWeaponDamage(9, "Heavy"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(9, "Heavy"),
        9,
        "Heavy"
      ),
      level: 9,
      type: "Heavy",
    },
    {
      id: "wh1",
      name: "ZetaTech Rotary Cannon",
      description: "Heavy rotating machinegun, tank-tier firepower",
      actionDescription: "unleash a devastating burst",
      damage: calculateWeaponDamage(9, "Heavy"),
      price: calculatePriceWithDamage(
        calculateWeaponDamage(9, "Heavy"),
        9,
        "Heavy"
      ),
      level: 9,
      type: "Heavy",
    },
  ],

  // Unarmed combat actions for when player has no weapon
  unarmed: [
    "swing a right hook",
    "throw an uppercut",
    "jab with your left",
    "swing a roundhouse kick",
    "deliver a straight punch",
    "launch a flying knee",
    "throw a spinning back kick",
    "execute a palm strike",
    "deliver a hammer fist",
    "throw a side kick",
    "launch a front kick",
    "execute a backhand strike",
  ],
};

export default market;

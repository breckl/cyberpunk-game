import ProgressionCalculator from "../utils/progressionCalculator.js";

const market = {
  armor: [
    {
      id: "street_hoodie",
      name: "Street Hoodie",
      description: "Ragged hoodie, minimal protection",
      brand: "Ravenlock Apparel",
      level: 1,
      defense: ProgressionCalculator.calculateArmorDefense(1, "Light"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(1, "Light"),
        1,
        "common",
        "Light"
      ),
      rarity: "common",
      type: "Light",
    },
    {
      id: "leather_jacket",
      name: "Leather Jacket",
      description: "Classic ganger look, light padding",
      brand: "Ravenlock Apparel",
      level: 1,
      defense: ProgressionCalculator.calculateArmorDefense(1, "Light"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(1, "Light"),
        1,
        "common",
        "Light"
      ),
      rarity: "common",
      type: "Light",
    },
    {
      id: "padded_vest",
      name: "Padded Vest",
      description: "Cheap foam-padded vest",
      brand: "Ravenlock Apparel",
      level: 1,
      defense: ProgressionCalculator.calculateArmorDefense(1, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(1, "Medium"),
        1,
        "common",
        "Medium"
      ),
      rarity: "common",
      type: "Medium",
    },
    {
      id: "scav_scrap_pads",
      name: "Scav Scrap Pads",
      description: "Homemade plates tied with wire",
      brand: "Czarov Ballistics",
      level: 1,
      defense: ProgressionCalculator.calculateArmorDefense(1, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(1, "Medium"),
        1,
        "uncommon",
        "Medium"
      ),
      rarity: "uncommon",
      type: "Medium",
    },
    {
      id: "denim_reinforced_jacket",
      name: "Denim Reinforced Jacket",
      description: "Street mod with hidden plates",
      brand: "Orchid Dynamics",
      level: 1,
      defense: ProgressionCalculator.calculateArmorDefense(1, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(1, "Medium"),
        1,
        "uncommon",
        "Medium"
      ),
      rarity: "uncommon",
      type: "Medium",
    },
    {
      id: "kevlar_liner",
      name: "Kevlar Liner",
      description: "Entry-level bullet resistant liner",
      brand: "Orchid Dynamics",
      level: 2,
      defense: ProgressionCalculator.calculateArmorDefense(2, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(2, "Medium"),
        2,
        "uncommon",
        "Medium"
      ),
      rarity: "uncommon",
      type: "Medium",
    },
    {
      id: "riot_vest",
      name: "Riot Vest",
      description: "Discount police surplus armor",
      brand: "Ironjaw Arsenal",
      level: 2,
      defense: ProgressionCalculator.calculateArmorDefense(2, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(2, "Medium"),
        2,
        "uncommon",
        "Medium"
      ),
      rarity: "uncommon",
      type: "Medium",
    },
    {
      id: "combat_hoodie",
      name: "Combat Hoodie",
      description: "Hoodie lined with woven composites",
      brand: "GhostTek Industries",
      level: 2,
      defense: ProgressionCalculator.calculateArmorDefense(2, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(2, "Medium"),
        2,
        "uncommon",
        "Medium"
      ),
      rarity: "uncommon",
      type: "Medium",
    },
    {
      id: "reinforced_leather_armor",
      name: "Reinforced Leather Armor",
      description: "Heavy stitched jacket with inserts",
      brand: "Ravenlock Apparel",
      level: 2,
      defense: ProgressionCalculator.calculateArmorDefense(2, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(2, "Heavy"),
        2,
        "uncommon",
        "Heavy"
      ),
      rarity: "uncommon",
      type: "Heavy",
    },
    {
      id: "padded_riot_jacket",
      name: "Padded Riot Jacket",
      description: "Common security gear, blunt-resistant",
      brand: "Spectra Interface",
      level: 2,
      defense: ProgressionCalculator.calculateArmorDefense(2, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(2, "Heavy"),
        2,
        "uncommon",
        "Heavy"
      ),
      rarity: "uncommon",
      type: "Heavy",
    },
    {
      id: "street_combat_pads",
      name: "Street Combat Pads",
      description: "Strap-on polymer pads, knee/elbow",
      brand: "NeuroForge",
      level: 3,
      defense: ProgressionCalculator.calculateArmorDefense(3, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(3, "Medium"),
        3,
        "uncommon",
        "Medium"
      ),
      rarity: "uncommon",
      type: "Medium",
    },
    {
      id: "scrap_plating_rig",
      name: "Scrap Plating Rig",
      description: "Bolted metal plates, crude and heavy",
      brand: "Czarov Ballistics",
      level: 3,
      defense: ProgressionCalculator.calculateArmorDefense(3, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(3, "Heavy"),
        3,
        "uncommon",
        "Heavy"
      ),
      rarity: "uncommon",
      type: "Heavy",
    },
    {
      id: "tactical_vest",
      name: "Tactical Vest",
      description: "Standard PMC body armor",
      brand: "Atlas Defense Corp",
      level: 3,
      defense: ProgressionCalculator.calculateArmorDefense(3, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(3, "Medium"),
        3,
        "uncommon",
        "Medium"
      ),
      rarity: "uncommon",
      type: "Medium",
    },
    {
      id: "armored_trenchcoat",
      name: "Armored Trenchcoat",
      description: "Longcoat with built-in plating",
      brand: "Ravenlock Apparel",
      level: 3,
      defense: ProgressionCalculator.calculateArmorDefense(3, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(3, "Medium"),
        3,
        "uncommon",
        "Medium"
      ),
      rarity: "uncommon",
      type: "Medium",
    },
    {
      id: "police_surplus_jacket",
      name: "Police Surplus Jacket",
      description: "Outdated but reliable cop issue",
      brand: "Ironjaw Arsenal",
      level: 3,
      defense: ProgressionCalculator.calculateArmorDefense(3, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(3, "Medium"),
        3,
        "uncommon",
        "Medium"
      ),
      rarity: "uncommon",
      type: "Medium",
    },
    {
      id: "light_kevlar_suit",
      name: "Light Kevlar Suit",
      description: "Sleek corp-grade protection",
      brand: "Orchid Dynamics",
      level: 4,
      defense: ProgressionCalculator.calculateArmorDefense(4, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(4, "Medium"),
        4,
        "rare",
        "Medium"
      ),
      rarity: "rare",
      type: "Medium",
    },
    {
      id: "ballistic_harness",
      name: "Ballistic Harness",
      description: "Military webbing with plates",
      brand: "TitanForge Munitions",
      level: 4,
      defense: ProgressionCalculator.calculateArmorDefense(4, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(4, "Heavy"),
        4,
        "rare",
        "Heavy"
      ),
      rarity: "rare",
      type: "Heavy",
    },
    {
      id: "armored_biker_jacket",
      name: "Armored Biker Jacket",
      description: "Reinforced leather, chrome inserts",
      brand: "Ravenlock Apparel",
      level: 4,
      defense: ProgressionCalculator.calculateArmorDefense(4, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(4, "Heavy"),
        4,
        "rare",
        "Heavy"
      ),
      rarity: "rare",
      type: "Heavy",
    },
    {
      id: "riot_guard_pads",
      name: "Riot Guard Pads",
      description: "Full forearm/shin guards, heavy",
      brand: "Ironjaw Arsenal",
      level: 4,
      defense: ProgressionCalculator.calculateArmorDefense(4, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(4, "Heavy"),
        4,
        "rare",
        "Heavy"
      ),
      rarity: "rare",
      type: "Heavy",
    },
    {
      id: "composite_vest",
      name: "Composite Vest",
      description: "Mid-grade synthetic blend vest",
      brand: "Pharos OpticWorks",
      level: 4,
      defense: ProgressionCalculator.calculateArmorDefense(4, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(4, "Medium"),
        4,
        "rare",
        "Medium"
      ),
      rarity: "rare",
      type: "Medium",
    },
    {
      id: "urban_tactical_suit",
      name: "Urban Tactical Suit",
      description: "Blends business suit + hidden plates",
      brand: "Orchid Dynamics",
      level: 5,
      defense: ProgressionCalculator.calculateArmorDefense(5, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(5, "Medium"),
        5,
        "epic",
        "Medium"
      ),
      rarity: "epic",
      type: "Medium",
    },
    {
      id: "kevlar_mesh_armor",
      name: "Kevlar Mesh Armor",
      description: "Advanced flexible armor mesh",
      brand: "Spectra Interface",
      level: 5,
      defense: ProgressionCalculator.calculateArmorDefense(5, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(5, "Medium"),
        5,
        "epic",
        "Medium"
      ),
      rarity: "epic",
      type: "Medium",
    },
    {
      id: "military_flak_vest",
      name: "Military Flak Vest",
      description: "Standard soldier armor",
      brand: "Atlas Defense Corp",
      level: 5,
      defense: ProgressionCalculator.calculateArmorDefense(5, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(5, "Heavy"),
        5,
        "epic",
        "Heavy"
      ),
      rarity: "epic",
      type: "Heavy",
    },
    {
      id: "dermal_mesh_i",
      name: "Dermal Mesh I",
      description: "First-gen subdermal implant mesh",
      brand: "NeuroForge",
      level: 5,
      defense: ProgressionCalculator.calculateArmorDefense(5, "Powered"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(5, "Powered"),
        5,
        "epic",
        "Powered"
      ),
      rarity: "epic",
      type: "Powered",
    },
    {
      id: "riot_exo_pads",
      name: "Riot Exo Pads",
      description: "Enhanced riot gear with exo-braces",
      brand: "Ironjaw Arsenal",
      level: 5,
      defense: ProgressionCalculator.calculateArmorDefense(5, "Powered"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(5, "Powered"),
        5,
        "epic",
        "Powered"
      ),
      rarity: "epic",
      type: "Powered",
    },
    {
      id: "composite_tactical_armor",
      name: "Composite Tactical Armor",
      description: "Full-body composite weave",
      brand: "Atlas Defense Corp",
      level: 6,
      defense: ProgressionCalculator.calculateArmorDefense(6, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(6, "Heavy"),
        6,
        "epic",
        "Heavy"
      ),
      rarity: "epic",
      type: "Heavy",
    },
    {
      id: "kevlar_mesh_ii",
      name: "Kevlar Mesh II",
      description: "Improved mesh armor, flexible",
      brand: "Spectra Interface",
      level: 6,
      defense: ProgressionCalculator.calculateArmorDefense(6, "Medium"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(6, "Medium"),
        6,
        "epic",
        "Medium"
      ),
      rarity: "epic",
      type: "Medium",
    },
    {
      id: "ceramic_plating",
      name: "Ceramic Plating",
      description: "Reinforced ceramic military plates",
      brand: "TitanForge Munitions",
      level: 6,
      defense: ProgressionCalculator.calculateArmorDefense(6, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(6, "Heavy"),
        6,
        "epic",
        "Heavy"
      ),
      rarity: "epic",
      type: "Heavy",
    },
    {
      id: "tactical_armor_suit",
      name: "Tactical Armor Suit",
      description: "High-end PMC protection suit",
      brand: "Atlas Defense Corp",
      level: 6,
      defense: ProgressionCalculator.calculateArmorDefense(6, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(6, "Heavy"),
        6,
        "epic",
        "Heavy"
      ),
      rarity: "epic",
      type: "Heavy",
    },
    {
      id: "dermal_mesh_ii",
      name: "Dermal Mesh II",
      description: "Improved dermal implant plating",
      brand: "NeuroForge",
      level: 6,
      defense: ProgressionCalculator.calculateArmorDefense(6, "Powered"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(6, "Powered"),
        6,
        "epic",
        "Powered"
      ),
      rarity: "epic",
      type: "Powered",
    },
    {
      id: "advanced_riot_suit",
      name: "Advanced Riot Suit",
      description: "Full body police riot armor",
      brand: "Ironjaw Arsenal",
      level: 7,
      defense: ProgressionCalculator.calculateArmorDefense(7, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(7, "Heavy"),
        7,
        "legendary",
        "Heavy"
      ),
      rarity: "legendary",
      type: "Heavy",
    },
    {
      id: "composite_armor",
      name: "Composite Armor",
      description: "Military composite body armor",
      brand: "Atlas Defense Corp",
      level: 7,
      defense: ProgressionCalculator.calculateArmorDefense(7, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(7, "Heavy"),
        7,
        "legendary",
        "Heavy"
      ),
      rarity: "legendary",
      type: "Heavy",
    },
    {
      id: "tactical_exo_suit",
      name: "Tactical Exo-Suit",
      description: "Powered exo-assisted combat suit",
      brand: "TitanForge Munitions",
      level: 7,
      defense: ProgressionCalculator.calculateArmorDefense(7, "Powered"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(7, "Powered"),
        7,
        "legendary",
        "Powered"
      ),
      rarity: "legendary",
      type: "Powered",
    },
    {
      id: "ceramic_armor_ii",
      name: "Ceramic Armor II",
      description: "Advanced ceramic plating",
      brand: "TitanForge Munitions",
      level: 8,
      defense: ProgressionCalculator.calculateArmorDefense(8, "Heavy"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(8, "Heavy"),
        8,
        "legendary",
        "Heavy"
      ),
      rarity: "legendary",
      type: "Heavy",
    },
    {
      id: "tactical_exo_armor",
      name: "Tactical Exo-Armor",
      description: "Enhanced powered armor suit",
      brand: "Atlas Defense Corp",
      level: 8,
      defense: ProgressionCalculator.calculateArmorDefense(8, "Powered"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(8, "Powered"),
        8,
        "legendary",
        "Powered"
      ),
      rarity: "legendary",
      type: "Powered",
    },
    {
      id: "plated_combat_exo_suit",
      name: "Plated Combat Exo-Suit",
      description: "Heavy corp military exo-suit",
      brand: "TitanForge Munitions",
      level: 9,
      defense: ProgressionCalculator.calculateArmorDefense(9, "Powered"),
      price: ProgressionCalculator.calculateArmorPriceWithDefense(
        ProgressionCalculator.calculateArmorDefense(9, "Powered"),
        9,
        "legendary",
        "Powered"
      ),
      rarity: "legendary",
      type: "Powered",
    },
  ],

  weapons: {
    power: [
      {
        id: "w1",
        name: "Rusty Knife",
        description: "Cracked blade scavenged from junk",
        actionDescription: "stab",
        damage: ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.8,
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.8,
          1,
          "common",
          "Power"
        ),
        level: 1,
        type: "Power",
        rarity: "common",
      },
      {
        id: "w2",
        name: "Switchblade",
        description: "Fold-out knife, fast but fragile",
        actionDescription: "slash",
        damage: ProgressionCalculator.calculateWeaponDamage(1, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(1, "Power"),
          1,
          "common",
          "Power"
        ),
        level: 1,
        type: "Power",
        rarity: "common",
      },
      {
        id: "w3",
        name: "Stun Rod",
        description: "Extended taser staff, disabling strikes",
        actionDescription: "jab",
        damage: ProgressionCalculator.calculateWeaponDamage(1, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(1, "Tech"),
          1,
          "common",
          "Tech"
        ),
        level: 1,
        type: "Tech",
        rarity: "common",
      },
      {
        id: "w4",
        name: "Polymer Pistol",
        description: "Mass-market sidearm, easily concealed",
        actionDescription: "take a shot",
        damage: ProgressionCalculator.calculateWeaponDamage(1, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(1, "Power"),
          1,
          "common",
          "Power"
        ),
        level: 1,
        type: "Power",
        rarity: "common",
      },
      {
        id: "w5",
        name: "Rusty Katana",
        description: "Worn but still deadly blade, scavenged from the ruins",
        actionDescription: "slash",
        damage: ProgressionCalculator.calculateWeaponDamage(2, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(2, "Power"),
          2,
          "uncommon",
          "Power"
        ),
        level: 2,
        type: "Power",
        rarity: "uncommon",
      },
      {
        id: "w6",
        name: "Brass Knuckles",
        description: "Boosts melee punches",
        actionDescription: "punch",
        damage: ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.6,
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(1, "Power") * 0.6,
          1,
          "common",
          "Power"
        ),
        level: 1,
        type: "Power",
        rarity: "common",
      },
      {
        id: "w7",
        name: "Smith & Wesson .38",
        description: "Classic revolver, cheap and common",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(2, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(2, "Power"),
          2,
          "uncommon",
          "Power"
        ),
        level: 2,
        type: "Power",
        rarity: "uncommon",
      },
      {
        id: "w8",
        name: "NYPD Tactical 9mm",
        description: "Standard police-issue sidearm, sturdy",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(2, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(2, "Power"),
          2,
          "uncommon",
          "Power"
        ),
        level: 2,
        type: "Power",
        rarity: "uncommon",
      },
      {
        id: "w9",
        name: "Fabrique Nationale 5.7mm",
        description: "Sleek Belgian pistol, high velocity",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(2, "Power") * 1.2,
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(2, "Power") * 1.2,
          2,
          "rare",
          "Power"
        ),
        level: 2,
        type: "Power",
        rarity: "rare",
      },
      {
        id: "w10",
        name: "Combat Knife",
        description: "Military-grade fighting blade, balanced and deadly",
        actionDescription: "stab",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Power"),
          3,
          "uncommon",
          "Power"
        ),
        level: 3,
        type: "Power",
        rarity: "uncommon",
      },
      {
        id: "w11",
        name: "Basic Katana",
        description: "Traditional Japanese sword, sharp and reliable",
        actionDescription: "slash",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Power"),
          3,
          "uncommon",
          "Power"
        ),
        level: 3,
        type: "Power",
        rarity: "uncommon",
      },
      {
        id: "w12",
        name: "Kobayashi Tech Pistol",
        description: "High-quality sidearm with enhanced ergonomics",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Power"),
          3,
          "uncommon",
          "Power"
        ),
        level: 3,
        type: "Power",
        rarity: "uncommon",
      },
      {
        id: "w13",
        name: "Remington Shotgun",
        description: "Pump-action shotgun, close-quarters blast",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Power"),
          3,
          "uncommon",
          "Power"
        ),
        level: 3,
        type: "Power",
        rarity: "uncommon",
      },
      {
        id: "w14",
        name: "Bamboo Bow with Razor Arrows",
        description: "Traditional bow, enhanced arrows",
        actionDescription: "loose an arrow",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Power") * 0.9,
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Power") * 0.9,
          3,
          "uncommon",
          "Power"
        ),
        level: 3,
        type: "Power",
        rarity: "uncommon",
      },
      {
        id: "w15",
        name: "Heckler & Koch SMG",
        description: "German-made submachine gun, reliable",
        actionDescription: "fire a short burst",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Power"),
          3,
          "uncommon",
          "Power"
        ),
        level: 3,
        type: "Power",
        rarity: "uncommon",
      },
      {
        id: "w16",
        name: "Double-Barrel Shotgun",
        description: "Street brawler's favorite, brutal close-range",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Power") * 1.1,
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Power") * 1.1,
          3,
          "rare",
          "Power"
        ),
        level: 3,
        type: "Power",
        rarity: "rare",
      },
      {
        id: "w17",
        name: "Fabrique Nationale Carbine",
        description: "Lightweight rifle, accurate and fast",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Power") * 1.1,
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Power") * 1.1,
          3,
          "rare",
          "Power"
        ),
        level: 3,
        type: "Power",
        rarity: "rare",
      },
      {
        id: "w18",
        name: "Railgun",
        description: "Electromagnetic projectile launcher, devastating power",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(4, "Heavy"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(4, "Heavy"),
          4,
          "epic",
          "Heavy"
        ),
        level: 4,
        type: "Heavy",
        rarity: "epic",
      },
      {
        id: "w19",
        name: "Heckler & Koch AR-19",
        description: "Advanced assault rifle with modular design",
        actionDescription: "fire a burst",
        damage: ProgressionCalculator.calculateWeaponDamage(4, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(4, "Power"),
          4,
          "rare",
          "Power"
        ),
        level: 4,
        type: "Power",
        rarity: "rare",
      },
      {
        id: "w20",
        name: "Pharos SMG",
        description: "High-capacity submachine gun with rapid fire",
        actionDescription: "fire a rapid burst",
        damage: ProgressionCalculator.calculateWeaponDamage(5, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(5, "Power"),
          5,
          "epic",
          "Power"
        ),
        level: 5,
        type: "Power",
        rarity: "epic",
      },
      {
        id: "w21",
        name: "Icarus Tech Pistol",
        description: "High-caliber sidearm, reliable firepower",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(5, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(5, "Power"),
          5,
          "epic",
          "Power"
        ),
        level: 5,
        type: "Power",
        rarity: "epic",
      },
      {
        id: "w22",
        name: "Blackline Scoped Rifle",
        description: "Long-range, high-precision weapon",
        actionDescription: "take a shot",
        damage: ProgressionCalculator.calculateWeaponDamage(6, "Power"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(6, "Power"),
          6,
          "epic",
          "Power"
        ),
        level: 6,
        type: "Power",
        rarity: "epic",
      },
      {
        id: "w23",
        name: "ZetaTech Rotary Cannon",
        description: "Heavy rotating machinegun, tank-tier firepower",
        actionDescription: "unleash a devastating burst",
        damage: ProgressionCalculator.calculateWeaponDamage(9, "Heavy"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(9, "Heavy"),
          9,
          "legendary",
          "Heavy"
        ),
        level: 9,
        type: "Heavy",
        rarity: "legendary",
      },
    ],
    tech: [
      {
        id: "wt1",
        name: "Stun Gun",
        description: "Handheld shock weapon, short range",
        actionDescription: "discharge",
        damage: ProgressionCalculator.calculateWeaponDamage(1, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(1, "Tech"),
          1,
          "common",
          "Tech"
        ),
        level: 1,
        type: "Tech",
        rarity: "common",
      },
      {
        id: "wt2",
        name: "Stun Gun",
        description: "Homemade neural stunner",
        actionDescription: "discharge",
        damage: ProgressionCalculator.calculateWeaponDamage(2, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(2, "Tech"),
          2,
          "common",
          "Tech"
        ),
        level: 2,
        type: "Tech",
        rarity: "common",
      },
      {
        id: "wt3",
        name: "Flechette Pistole (Mk I)",
        description: "Needle pistol, early model",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(2, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(2, "Tech"),
          2,
          "uncommon",
          "Tech"
        ),
        level: 2,
        type: "Tech",
        rarity: "uncommon",
      },
      {
        id: "wt4",
        name: "Ravenlock Arms .45",
        description: "Advanced pistol with integrated targeting systems",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(2, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(2, "Tech"),
          2,
          "rare",
          "Tech"
        ),
        level: 2,
        type: "Tech",
        rarity: "rare",
      },
      {
        id: "wt5",
        name: "Flechette Pistol",
        description: "Needle pistol, silent and deadly",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Tech"),
          3,
          "uncommon",
          "Tech"
        ),
        level: 3,
        type: "Tech",
        rarity: "uncommon",
      },
      {
        id: "wt6",
        name: "Flechette Pistole (Mk II)",
        description: "Upgraded needle pistol, better penetration",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Tech"),
          3,
          "uncommon",
          "Tech"
        ),
        level: 3,
        type: "Tech",
        rarity: "uncommon",
      },
      {
        id: "wt7",
        name: "Bamboo Bow with Explosive Arrows",
        description: "Bamboo bow upgrade, arrowheads explode",
        actionDescription: "loose an explosive arrow",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Tech"),
          3,
          "rare",
          "Tech"
        ),
        level: 3,
        type: "Tech",
        rarity: "rare",
      },
      {
        id: "wt8",
        name: "Razor Claws",
        description: "Retractable nail blades, iconic cybermod",
        actionDescription: "slash",
        damage: ProgressionCalculator.calculateWeaponDamage(4, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(4, "Tech"),
          4,
          "rare",
          "Tech"
        ),
        level: 4,
        type: "Tech",
        rarity: "rare",
      },
      {
        id: "wt9",
        name: "Icarus Systems Laser Rifle",
        description: "Advanced laser weapon with precision targeting",
        actionDescription: "fire",
        damage: ProgressionCalculator.calculateWeaponDamage(4, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(4, "Tech"),
          4,
          "rare",
          "Tech"
        ),
        level: 4,
        type: "Tech",
        rarity: "rare",
      },
      {
        id: "wt10",
        name: "Spectra Neural Stunner",
        description: "Cybernetic pulse device, disrupts nerves",
        damage: ProgressionCalculator.calculateWeaponDamage(5, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(5, "Tech"),
          5,
          "epic",
          "Tech"
        ),
        level: 5,
        type: "Tech",
        rarity: "epic",
      },
      {
        id: "wt11",
        name: "Monofilament Wire",
        description: "Nearly invisible garrote, slices steel",
        damage: ProgressionCalculator.calculateWeaponDamage(6, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(6, "Tech"),
          6,
          "epic",
          "Tech"
        ),
        level: 6,
        type: "Tech",
        rarity: "epic",
      },
      {
        id: "wt12",
        name: "Helix Tech Pistol",
        description: "AI-assisted targeting sidearm",
        damage: ProgressionCalculator.calculateWeaponDamage(6, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(6, "Tech"),
          6,
          "epic",
          "Tech"
        ),
        level: 6,
        type: "Tech",
        rarity: "epic",
      },
      {
        id: "wt13",
        name: "Vibro-Katana",
        description: "Enhanced blade with ultrasonic edge",
        damage: ProgressionCalculator.calculateWeaponDamage(7, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(7, "Tech"),
          7,
          "epic",
          "Tech"
        ),
        level: 7,
        type: "Tech",
        rarity: "epic",
      },
      {
        id: "wt14",
        name: "Ono-Sendai Holo Projector",
        description: "Creates deadly illusions and decoys",
        damage: ProgressionCalculator.calculateWeaponDamage(7, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(7, "Tech"),
          7,
          "epic",
          "Tech"
        ),
        level: 7,
        type: "Tech",
        rarity: "epic",
      },
      {
        id: "wt15",
        name: "High-Frequency Katana",
        description: "Top-tier sword vibrating at sonic edge",
        damage: ProgressionCalculator.calculateWeaponDamage(8, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(8, "Tech"),
          8,
          "legendary",
          "Tech"
        ),
        level: 8,
        type: "Tech",
        rarity: "legendary",
      },
      {
        id: "wt16",
        name: "ICE Lance",
        description: "Black ICE program, neural spear in VR",
        damage: ProgressionCalculator.calculateWeaponDamage(9, "Tech"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(9, "Tech"),
          9,
          "legendary",
          "Tech"
        ),
        level: 9,
        type: "Tech",
        rarity: "legendary",
      },
    ],
    energy: [
      {
        id: "we1",
        name: "Steiner-Optic Scoped Rifle",
        description: "Precision rifle with advanced optics",
        damage: ProgressionCalculator.calculateWeaponDamage(3, "Energy"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(3, "Energy"),
          3,
          "rare",
          "Energy"
        ),
        level: 3,
        type: "Energy",
        rarity: "rare",
      },
      {
        id: "we2",
        name: "Helix Pulse Rifle",
        description: "Corporate energy rifle with devastating output",
        damage: ProgressionCalculator.calculateWeaponDamage(7, "Energy"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(7, "Energy"),
          7,
          "epic",
          "Energy"
        ),
        level: 7,
        type: "Energy",
        rarity: "epic",
      },
    ],
    heavy: [
      {
        id: "wh1",
        name: "ZetaTech Rotary Cannon",
        description: "Heavy rotating machinegun, tank-tier firepower",
        actionDescription: "unleash a devastating burst",
        damage: ProgressionCalculator.calculateWeaponDamage(9, "Heavy"),
        price: ProgressionCalculator.calculatePriceWithDamage(
          ProgressionCalculator.calculateWeaponDamage(9, "Heavy"),
          9,
          "legendary",
          "Heavy"
        ),
        level: 9,
        type: "Heavy",
        rarity: "legendary",
      },
    ],
  },

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

  cyberware: [
    {
      id: "c1",
      name: "Mantis Blades",
      description: "Retractable arm blades for close combat.",
      damage: ProgressionCalculator.calculateWeaponDamage(5, "Tech"),
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(5, "Tech"),
        5,
        "epic",
        "Tech"
      ),
      level: 5,
      rarity: "epic",
    },
    {
      id: "c2",
      name: "Fist Cannon",
      description: "Integrated hand cannon with explosive rounds.",
      damage: ProgressionCalculator.calculateWeaponDamage(5, "Power"),
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(5, "Power"),
        5,
        "epic",
        "Power"
      ),
      level: 5,
      rarity: "epic",
    },
    {
      id: "c3",
      name: "Knuckle Rockets",
      description: "Micro-missile launchers in your knuckles.",
      damage: ProgressionCalculator.calculateWeaponDamage(6, "Heavy"),
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(6, "Heavy"),
        6,
        "epic",
        "Heavy"
      ),
      level: 6,
      rarity: "epic",
    },
    {
      id: "c4",
      name: "Monowire Whip",
      description: "Electrified mono-filament whip.",
      damage: ProgressionCalculator.calculateWeaponDamage(5, "Tech"),
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(5, "Tech"),
        5,
        "epic",
        "Tech"
      ),
      level: 5,
      rarity: "epic",
    },
    {
      id: "c5",
      name: "Shoulder Flamer",
      description: "Mounted flamethrower with auto-targeting.",
      damage: ProgressionCalculator.calculateWeaponDamage(6, "Heavy"),
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(6, "Heavy"),
        6,
        "epic",
        "Heavy"
      ),
      level: 6,
      rarity: "epic",
    },
    {
      id: "c6",
      name: "Kiroshi Eye Lasers",
      description: "Optical weapon system with thermal tracking.",
      damage: ProgressionCalculator.calculateWeaponDamage(5, "Tech"),
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(5, "Tech"),
        5,
        "legendary",
        "Tech"
      ),
      level: 5,
      rarity: "legendary",
    },
  ],

  netgear: [
    {
      id: "n1",
      name: "System Override",
      description: "Take control of enemy cybernetics.",
      damage: ProgressionCalculator.calculateWeaponDamage(4, "Tech"),
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(4, "Tech"),
        4,
        "rare",
        "Tech"
      ),
      level: 4,
      rarity: "rare",
    },
    {
      id: "n2",
      name: "Neural Reboot",
      description: "Force restart enemy cyber systems.",
      damage: ProgressionCalculator.calculateWeaponDamage(4, "Tech") * 0.8,
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(4, "Tech") * 0.8,
        4,
        "rare",
        "Tech"
      ),
      level: 4,
      rarity: "rare",
    },
    {
      id: "n3",
      name: "Brute Force",
      description: "Raw data assault on enemy ICE.",
      damage: ProgressionCalculator.calculateWeaponDamage(4, "Tech") * 1.2,
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(4, "Tech") * 1.2,
        4,
        "rare",
        "Tech"
      ),
      level: 4,
      rarity: "rare",
    },
    {
      id: "n4",
      name: "Malware Suite",
      description: "Inject viral code into enemy systems.",
      damage: ProgressionCalculator.calculateWeaponDamage(4, "Tech") * 0.6,
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(4, "Tech") * 0.6,
        4,
        "rare",
        "Tech"
      ),
      level: 4,
      rarity: "rare",
    },
    {
      id: "n5",
      name: "Optics Killer",
      description: "Disable enemy visual systems.",
      damage: ProgressionCalculator.calculateWeaponDamage(3, "Tech") * 0.4,
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(3, "Tech") * 0.4,
        3,
        "rare",
        "Tech"
      ),
      level: 3,
      rarity: "rare",
    },
    {
      id: "n6",
      name: "DoS Attack",
      description: "Overload enemy network connections.",
      damage: ProgressionCalculator.calculateWeaponDamage(3, "Tech") * 0.5,
      price: ProgressionCalculator.calculatePriceWithDamage(
        ProgressionCalculator.calculateWeaponDamage(3, "Tech") * 0.5,
        3,
        "rare",
        "Tech"
      ),
      level: 3,
      rarity: "rare",
    },
  ],
};

export default market;

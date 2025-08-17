import React, { useState, useRef } from "react";
import "../styles/GameScreen.css";
import StatsPanel from "./StatsPanel";
import CombatScreen from "./CombatScreen";
import NightMarket from "./NightMarket";

function GameScreen({ gameState, setGameState }) {
  const [currentLocation, setCurrentLocation] = useState("streets");
  const [inCombat, setInCombat] = useState(false);
  const [inNightMarket, setInNightMarket] = useState(false);
  const inputRef = useRef(null);

  // Initialize test character if none exists
  React.useEffect(() => {
    if (!gameState.character) {
      setGameState((prev) => ({
        ...prev,
        character: {
          name: "test",
          class: "Street Samurai",
          level: 1,
          experience: 0,
          hitpoints: 20,
          maxHitpoints: 20,
          energy: 100,
          maxEnergy: 100,
          credits: 1000,
          stats: {
            hack: 2,
            combat: 8,
            stealth: 4,
            tech: 5,
          },
          inventory: [],
        },
      }));
    }
  }, []);

  const locations = {
    streets: {
      name: "Night City Streets",
      description:
        "The neon-drenched streets of Night City stretch before you. The air is thick with the hum of hover vehicles and the chatter of street merchants. Holographic advertisements paint the smog in shifting colors.",
      options: [
        { key: "N", label: "ight Market" },
        { key: "C", label: "ombat Zone" },
        { key: "D", label: "ata Den" },
        { key: "T", label: "ravel" },
        { key: "V", label: "iew Stats" },
        { key: "I", label: "nventory" },
        { key: "M", label: "essages" },
        { key: "P", label: "layers Online" },
        { key: "H", label: "elp" },
        { key: "Q", label: "uick Save" },
      ],
    },
    travel: {
      name: "Travel - Choose Your Destination",
      description: "Where would you like to go in Night City?",
      options: [
        { key: "U", label: "ptown" },
        { key: "D", label: "owntown" },
        { key: "C", label: "orporate District" },
        { key: "N", label: "etherworld" },
        { key: "Q", label: "uit to Streets" },
      ],
    },
    downtown: {
      name: "Downtown",
      description:
        "A tangle of rusted scaffolds, cracked pavement, and flickering neon signs. The air stinks of fried noodles, coolant leaks, and desperation. Gangs mark their turf with glowing paint, and shadows stretch long under the streetlights that work—when they feel like it. Survival here is a daily hustle.",
      options: [
        { key: "M", label: "arket District" },
        { key: "B", label: "lack Clinic" },
        { key: "G", label: "ang Territory" },
        { key: "V", label: "iew Stats" },
        { key: "Q", label: "uit to Travel" },
      ],
    },
    // ... other locations remain the same
  };

  const handleKeyDown = (e) => {
    e.preventDefault();

    const key = e.key.toUpperCase();
    const location = locations[currentLocation];
    const option = location.options.find(
      (opt) => opt.key.toLowerCase() === key.toLowerCase()
    );

    if (!option) {
      return;
    }

    // Handle Gang Territory combat directly
    if (currentLocation === "downtown" && key === "G") {
      startCombat();
      return;
    }

    // Map option keys to actions
    const actionMap = {
      N:
        currentLocation === "streets"
          ? "NIGHTMARKET"
          : currentLocation === "travel"
          ? "NETHERWORLD"
          : null,
      C:
        currentLocation === "streets"
          ? "COMBAT"
          : currentLocation === "travel"
          ? "CORPORATE"
          : null,
      D:
        currentLocation === "streets"
          ? "DATADEN"
          : currentLocation === "travel"
          ? "DOWNTOWN"
          : null,
      T: "TRAVEL",
      U: "UPTOWN",
      V: "STATS",
      I: "INVENTORY",
      M: "MESSAGES",
      P: "PLAYERS",
      H: "HELP",
      Q:
        currentLocation === "streets"
          ? "SAVE"
          : currentLocation === "travel"
          ? "STREETS"
          : "TRAVEL",
    };

    const action = actionMap[key];
    if (action) {
      switch (action) {
        case "STREETS":
          setCurrentLocation("streets");
          break;
        case "TRAVEL":
          setCurrentLocation("travel");
          break;
        case "DOWNTOWN":
          setCurrentLocation("downtown");
          break;
        case "STATS":
          // Show stats modal
          break;
        case "NIGHTMARKET":
          setInNightMarket(true);
          break;
        default:
          console.log(`Action ${action} not implemented yet`);
      }
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCombatEnd = (result, rewards) => {
    setInCombat(false);
    if (result === "victory" && rewards) {
      setGameState((prev) => ({
        ...prev,
        character: {
          ...prev.character,
          credits: prev.character.credits + rewards.credits,
          experience: prev.character.experience + rewards.exp,
        },
      }));
    }
  };

  const startCombat = () => {
    setInCombat(true);
  };

  const handleNightMarketExit = () => {
    setInNightMarket(false);
  };

  const handleCharacterUpdate = (updatedCharacter) => {
    setGameState((prev) => ({
      ...prev,
      character: updatedCharacter,
    }));
  };

  const renderLocation = () => {
    if (inCombat) {
      return (
        <CombatScreen
          character={gameState.character}
          onCombatEnd={handleCombatEnd}
        />
      );
    }

    if (inNightMarket) {
      return (
        <NightMarket
          character={gameState.character}
          onExit={handleNightMarketExit}
          onUpdateCharacter={handleCharacterUpdate}
        />
      );
    }

    const location = locations[currentLocation];
    if (!location) return null;

    return (
      <div className="location-screen">
        <div className="location-header">
          <h2>{location.name}</h2>
          <div className="neon-line"></div>
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

        <div className="command-prompt">
          <div className="neon-line"></div>
          <div className="prompt-text">
            Your command, {gameState.character?.name}? [
            {new Date().toLocaleTimeString()}] :
          </div>
          <input
            ref={inputRef}
            type="text"
            onKeyDown={handleKeyDown}
            maxLength={1}
            autoFocus
            readOnly
            style={{ caretColor: "transparent" }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="game-screen">
      <div className="game-layout">
        <StatsPanel character={gameState.character} />
        <div className="main-content">{renderLocation()}</div>
      </div>
    </div>
  );
}

export default GameScreen;

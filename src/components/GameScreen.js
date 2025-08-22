import React, { useState, useEffect } from "react";
import "../styles/GameScreen.css";
import StatsPanel from "./StatsPanel";
import CombatScreen from "./CombatScreen";
import NightMarket from "./NightMarket";
import Inventory from "./Inventory";
import StreetsMenu from "./menus/StreetsMenu";
import TravelMenu from "./menus/TravelMenu";
import DowntownMenu from "./menus/DowntownMenu";
import UptownMenu from "./menus/UptownMenu";
import CorporateMenu from "./menus/CorporateMenu";
import NetherworldMenu from "./menus/NetherworldMenu";
import DataDenMenu from "./menus/DataDenMenu";

function GameScreen({ gameState, setGameState, onUpdateCharacter }) {
  // Single screen state instead of multiple booleans
  const [currentScreen, setCurrentScreen] = useState("streets");
  const [showStats, setShowStats] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

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
          credits: 5000,
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

  // Navigation handler
  const handleNavigate = (destination) => {
    setCurrentScreen(destination);
  };

  // Menu action handlers
  const handleShowStats = () => {
    setShowStats(!showStats);
  };

  const handleShowInventory = () => {
    setShowInventory(!showInventory);
  };

  const handleShowMessages = () => {
    setShowMessages(!showMessages);
  };

  const handleShowPlayers = () => {
    setShowPlayers(!showPlayers);
  };

  const handleShowHelp = () => {
    setShowHelp(!showHelp);
  };

  const handleQuickSave = () => {
    // Quick save functionality
    console.log("Quick save triggered");
  };

  const handleCombatEnd = (result, rewards) => {
    console.log("Combat ended with result:", result, "and rewards:", rewards);
    console.log(
      "Current character credits before update:",
      gameState.character?.credits
    );

    setCurrentScreen("streets");
    if (result === "victory" && rewards) {
      console.log("Processing victory rewards...");
      setGameState((prev) => {
        const updatedCharacter = {
          ...prev.character,
          credits: prev.character.credits + rewards.credits,
          experience: prev.character.experience + rewards.exp,
        };
        console.log("Updated character credits:", updatedCharacter.credits);
        console.log(
          "Updated character experience:",
          updatedCharacter.experience
        );
        return {
          ...prev,
          character: updatedCharacter,
        };
      });
    }
  };

  const handleCharacterUpdate = (updatedCharacter) => {
    // Use the passed onUpdateCharacter function to save to localStorage
    if (onUpdateCharacter) {
      onUpdateCharacter(updatedCharacter);
    }

    setGameState((prev) => ({
      ...prev,
      character: updatedCharacter,
    }));
  };

  const renderLocation = () => {
    switch (currentScreen) {
      case "combat":
        return (
          <CombatScreen
            character={gameState.character}
            onCombatEnd={handleCombatEnd}
            onUpdateCharacter={handleCharacterUpdate}
          />
        );

      case "nightmarket":
        return (
          <NightMarket
            character={gameState.character}
            onExit={() => handleNavigate("streets")}
            onUpdateCharacter={handleCharacterUpdate}
          />
        );

      case "inventory":
        return (
          <Inventory
            character={gameState.character}
            onExit={() => handleNavigate("streets")}
            onUpdateCharacter={handleCharacterUpdate}
          />
        );

      case "streets":
        return (
          <StreetsMenu
            character={gameState.character}
            onNavigate={handleNavigate}
            onShowStats={handleShowStats}
            onShowInventory={handleShowInventory}
            onShowMessages={handleShowMessages}
            onShowPlayers={handleShowPlayers}
            onShowHelp={handleShowHelp}
            onQuickSave={handleQuickSave}
          />
        );

      case "travel":
        return (
          <TravelMenu
            character={gameState.character}
            onNavigate={handleNavigate}
          />
        );

      case "downtown":
        return (
          <DowntownMenu
            character={gameState.character}
            onNavigate={handleNavigate}
            onShowStats={handleShowStats}
            onShowInventory={handleShowInventory}
          />
        );

      case "uptown":
        return (
          <UptownMenu
            character={gameState.character}
            onNavigate={handleNavigate}
            onShowStats={handleShowStats}
            onShowInventory={handleShowInventory}
          />
        );

      case "corporate":
        return (
          <CorporateMenu
            character={gameState.character}
            onNavigate={handleNavigate}
            onShowStats={handleShowStats}
            onShowInventory={handleShowInventory}
          />
        );

      case "netherworld":
        return (
          <NetherworldMenu
            character={gameState.character}
            onNavigate={handleNavigate}
            onShowStats={handleShowStats}
          />
        );

      case "dataden":
        return (
          <DataDenMenu
            character={gameState.character}
            onNavigate={handleNavigate}
            onShowStats={handleShowStats}
          />
        );

      default:
        return <div>Unknown screen: {currentScreen}</div>;
    }
  };

  return (
    <div className="game-screen">
      <div className="game-layout">
        <div className="main-content">{renderLocation()}</div>
        <StatsPanel character={gameState.character} />
      </div>
    </div>
  );
}

export default GameScreen;

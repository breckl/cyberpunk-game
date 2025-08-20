import React, { useState } from "react";
import "./styles/App.css";
import MainMenu from "./components/MainMenu";
import CharacterCreation from "./components/CharacterCreation";
import GameScreen from "./components/GameScreen";

function App() {
  const [gameState, setGameState] = useState({
    screen: "main-menu", // main-menu, character-creation, game
    character: null,
    location: "streets",
    gameLog: [],
  });

  const handleStartGame = () => {
    setGameState((prev) => ({
      ...prev,
      screen: "character-creation",
    }));
  };

  const handleCreateCharacter = (character) => {
    setGameState((prev) => ({
      ...prev,
      screen: "game",
      character: character,
      gameLog: [
        `Welcome to Night City, ${character.name}. Your journey begins...`,
      ],
    }));
  };

  const renderScreen = () => {
    switch (gameState.screen) {
      case "main-menu":
        return <MainMenu onStartGame={handleStartGame} />;
      case "character-creation":
        return <CharacterCreation onCreateCharacter={handleCreateCharacter} />;
      case "game":
        return <GameScreen gameState={gameState} setGameState={setGameState} />;
      default:
        return <MainMenu onStartGame={handleStartGame} />;
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;

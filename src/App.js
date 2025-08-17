import React, { useState } from "react";
import "./styles/App.css";
import GameScreen from "./components/GameScreen";

function App() {
  const [gameState, setGameState] = useState({
    screen: "game",
    character: {
      name: "test",
      class: "Street Samurai",
      level: 1,
      hitpoints: 40,
      maxHp: 40,
      energy: 100,
      maxEnergy: 100,
      credits: 5000,
      stats: { hack: 2, combat: 8, stealth: 4, tech: 5 },
      inventory: [],
    },
    location: "streets",
    gameLog: [`Welcome to Night City, test. Your journey begins...`],
  });

  return (
    <div className="App">
      <GameScreen gameState={gameState} setGameState={setGameState} />
    </div>
  );
}

export default App;

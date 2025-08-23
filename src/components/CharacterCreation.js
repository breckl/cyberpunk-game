import React, { useState, useEffect } from "react";
import "../styles/CharacterCreation.css";

const classes = {
  N: {
    key: "N",
    name: "Netrunner",
    description:
      "Elite hackers who specialize in breaching security systems and manipulating the digital world.",
  },
  S: {
    key: "S",
    name: "Street Samurai",
    description:
      "Cybernetically enhanced warriors who excel in combat and intimidation.",
  },
  T: {
    key: "T",
    name: "Tech Doctor",
    description:
      "Underground medical experts combining traditional medicine with cutting-edge technology.",
  },
  C: {
    key: "C",
    name: "Corporate Agent",
    description:
      "Ex-corporate operatives skilled in manipulation, stealth, and high-tech gadgets.",
  },
};

function CharacterCreation({ onCreateCharacter }) {
  const [step, setStep] = useState("class"); // class, name, confirm
  const [selectedClass, setSelectedClass] = useState(null);
  const [name, setName] = useState("");

  // Simple keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (step === "class") {
        const key = e.key.toUpperCase();
        if (classes[key]) {
          setSelectedClass(classes[key]);
          setStep("name");
        }
      } else if (step === "confirm") {
        const key = e.key.toUpperCase();
        if (key === "Y") {
          const character = {
            name: name.trim(),
            class: selectedClass.name,
            level: 1,
            experience: 0,
            credits: 5000,
            inventory: [],
          };
          onCreateCharacter(character);
        } else if (key === "N") {
          setStep("class");
          setSelectedClass(null);
          setName("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, selectedClass, name, onCreateCharacter]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setStep("confirm");
    }
  };

  const renderClassSelection = () => (
    <div className="creation-screen">
      <div className="screen-header">
        <h2>Choose Your Class</h2>
      </div>

      <div className="screen-description">
        Select your specialization in Night City. Each class offers unique
        advantages and challenges.
      </div>

      <div className="options-grid">
        {Object.values(classes).map((classInfo) => (
          <div key={classInfo.key} className="option-row">
            <span className="option-key">({classInfo.key})</span>
            <span className="option-label">{classInfo.name}</span>
          </div>
        ))}
      </div>

      <div className="command-prompt">
        <div className="prompt-text">
          Your choice? [{new Date().toLocaleTimeString()}] :
        </div>
      </div>
    </div>
  );

  const renderNameSelection = () => (
    <div className="creation-screen">
      <div className="screen-header">
        <h2>Choose Your Handle</h2>
      </div>

      <div className="screen-description">
        Selected Class: {selectedClass.name}
        <br />
        <br />
        {selectedClass.description}
      </div>

      <form onSubmit={handleNameSubmit} className="name-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your handle..."
          maxLength={20}
          autoFocus
        />
        <button type="submit">Confirm</button>
      </form>
    </div>
  );

  const renderConfirmation = () => (
    <div className="creation-screen">
      <div className="screen-header">
        <h2>Confirm Character</h2>
      </div>

      <div className="character-summary">
        <div className="summary-row">
          <span className="label">Handle:</span>
          <span className="value">{name}</span>
        </div>
        <div className="summary-row">
          <span className="label">Class:</span>
          <span className="value">{selectedClass.name}</span>
        </div>
        <div className="starting-info">
          <p>Starting Level: 1</p>
          <p>Starting Credits: 5000¥</p>
          <p>Base Stats: Attack 0, Defense 0, Hacking 4</p>
        </div>
      </div>

      <div className="options-grid">
        <div className="option-row">
          <span className="option-key">(Y)</span>
          <span className="option-label">Confirm Character</span>
        </div>
        <div className="option-row">
          <span className="option-key">(N)</span>
          <span className="option-label">Start Over</span>
        </div>
      </div>

      <div className="command-prompt">
        <div className="prompt-text">
          Confirm? (Y/N) [{new Date().toLocaleTimeString()}] :
        </div>
      </div>
    </div>
  );

  return (
    <div className="character-creation">
      {step === "class" && renderClassSelection()}
      {step === "name" && renderNameSelection()}
      {step === "confirm" && renderConfirmation()}
    </div>
  );
}

export default CharacterCreation;

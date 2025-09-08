import React, { useState, useCallback } from "react";
import "../styles/CharacterCreation.css";

const classes = {
  streetSamurai: {
    key: "streetSamurai",
    name: "Street Samurai",
    description: "Warriors who excel in combat and intimidation.",
  },
  consoleCowboy: {
    key: "consoleCowboy",
    name: "Console Cowboy",
    description: "Specialize in manipulating the digital world.",
  },
  corpoOperative: {
    key: "corpoOperative",
    name: "Corpo Operative",
    description: "Skilled in manipulation and high-tech gadgets.",
  },
  cyberBruiser: {
    key: "cyberBruiser",
    name: "Cyber Bruiser",
    description: "Physically augment and cybernetically enhanced heavies",
  },
};

function CharacterCreation({ onCreateCharacter }) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [name, setName] = useState("");

  // Handle class selection
  const handleClassSelect = (classInfo) => {
    setSelectedClass(classInfo);
  };

  // Handle name input
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle character creation
  const handleCreateCharacter = useCallback(() => {
    if (selectedClass && name.trim()) {
      const character = {
        name: name.trim(),
        class: selectedClass.name,
        level: 1,
        experience: 0,
        credits: 25,
        inventory: [],
      };
      onCreateCharacter(character);
    }
  }, [name, selectedClass, onCreateCharacter]);

  // Check if form is valid
  const isFormValid = selectedClass && name.trim().length > 0;

  return (
    <div className="character-creation">
      <div className="creation-screen">
        <h2>ENTER YOUR NAME</h2>

        {/* Name Input */}
        <div className="name-selection">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Type your name..."
            maxLength={20}
            className="name-input"
          />
        </div>

        {/* Class Selection */}
        <div className="class-selection">
          <h3>Choose Your Character</h3>
          <div className="options-grid">
            {Object.values(classes).map((classInfo) => (
              <div
                key={classInfo.key}
                className={`menu-item clickable class-option ${
                  selectedClass?.key === classInfo.key ? "selected" : ""
                }`}
                onClick={() => handleClassSelect(classInfo)}
              >
                <div className="class-name">{classInfo.name}</div>
                <div className="class-description">{classInfo.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Character Summary */}
        {selectedClass && (
          <div className="character-summary">
            <h3>Character Summary</h3>
            <div className="summary-info">
              <p>
                <strong>Name:</strong> {name || "Enter name above"}
              </p>
              <p>
                <strong>Profile:</strong> {selectedClass.name}
              </p>
              <p>
                <strong>Level:</strong> 1
              </p>
              <p>
                <strong>Starting Credits:</strong> $25
              </p>
            </div>
          </div>
        )}

        {/* Create Character Button */}
        <div className="create-button-container">
          <button
            className={`create-character-btn ${
              isFormValid ? "enabled" : "disabled"
            }`}
            onClick={handleCreateCharacter}
            disabled={!isFormValid}
          >
            Create Character
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterCreation;

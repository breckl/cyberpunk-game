import React from "react";
import "../styles/CommandInput.css";

function CommandInput({ value, onChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  return (
    <form className="command-input" onSubmit={handleSubmit}>
      <span className="prompt">&gt;</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a command..."
        autoFocus
      />
      <button type="submit" disabled={!value.trim()}>
        Enter
      </button>
    </form>
  );
}

export default CommandInput;

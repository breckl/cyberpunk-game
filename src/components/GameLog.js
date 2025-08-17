import React, { useEffect, useRef } from "react";
import "../styles/GameLog.css";

function GameLog({ messages }) {
  const logRef = useRef();

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="game-log" ref={logRef}>
      {messages.map((message, index) => (
        <div key={index} className="log-message">
          {message}
        </div>
      ))}
    </div>
  );
}

export default GameLog;

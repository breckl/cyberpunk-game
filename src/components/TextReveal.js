import React, { useState, useEffect } from "react";

const TextReveal = ({
  text,
  speed = 20, // milliseconds per letter (50ms = 20th of a second)
  className = "",
  onComplete = null,
}) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (visibleLetters < text.length) {
      const timer = setTimeout(() => {
        setVisibleLetters((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [visibleLetters, text.length, speed, isComplete, onComplete]);

  // Reset when text changes
  useEffect(() => {
    setVisibleLetters(0);
    setIsComplete(false);
  }, [text]);

  return (
    <span className={`text-reveal ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`letter ${index < visibleLetters ? "visible" : "hidden"}`}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default TextReveal;

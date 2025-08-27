import React, { useState } from "react";

function FillButton({
  item,
  isDisabled,
  disabledText,
  onFillComplete,
  fillDuration = 1000, // 1 second default
  buttonText = "BUY",
  hoverText = "HOLD TO BUY",
  completedText = "PURCHASED",
  className = "",
  style = {},
}) {
  const [fillState, setFillState] = useState({
    isFilling: false,
    isFilled: false,
    fillProgress: 0,
    intervalId: null,
  });

  const startFillAnimation = () => {
    if (isDisabled || fillState.isFilled) return;

    setFillState((prev) => ({ ...prev, isFilling: true }));

    const steps = 25; // 25 steps for smooth animation
    const stepDuration = fillDuration / steps;
    const progressIncrement = 100 / steps;

    const fillInterval = setInterval(() => {
      setFillState((prev) => {
        if (prev.fillProgress >= 100) {
          clearInterval(fillInterval);

          // Call the completion callback
          if (onFillComplete) {
            onFillComplete(item);
          }

          // Briefly show completed text then reset
          setTimeout(() => {
            setFillState({
              isFilling: false,
              isFilled: false,
              fillProgress: 0,
              intervalId: null,
            });
          }, 500);

          return {
            ...prev,
            isFilling: false,
            isFilled: true,
            fillProgress: 100,
            intervalId: null,
          };
        }

        return {
          ...prev,
          fillProgress: prev.fillProgress + progressIncrement,
          intervalId: fillInterval,
        };
      });
    }, stepDuration);
  };

  const stopFillAnimation = () => {
    if (fillState.intervalId) {
      clearInterval(fillState.intervalId);
    }
    setFillState((prev) => ({
      ...prev,
      isFilling: false,
      fillProgress: 0,
      intervalId: null,
    }));
  };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    stopFillAnimation();
  };

  const handleMouseDown = () => {
    if (!isDisabled && !fillState.isFilled) {
      startFillAnimation();
    }
  };

  const handleMouseUp = () => {
    if (!isDisabled && !fillState.isFilled) {
      stopFillAnimation();
    }
  };

  return (
    <button
      className={`fill-button ${isDisabled ? "disabled" : ""} ${className}`}
      disabled={isDisabled}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <span className="button-text">
        {fillState.isFilled
          ? completedText
          : isDisabled
          ? disabledText
          : fillState.isFilling
          ? hoverText
          : isHovering
          ? hoverText
          : buttonText}
      </span>
      <div
        className="fill-progress"
        style={{ width: `${fillState.fillProgress}%` }}
      ></div>
    </button>
  );
}

export default FillButton;

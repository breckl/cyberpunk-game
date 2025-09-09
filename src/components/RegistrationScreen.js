import React, { useState, useEffect } from "react";
import "../styles/RegistrationScreen.css";

function RegistrationScreen({ onRegistrationComplete }) {
  const [inviteCode, setInviteCode] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Pattern recognition captcha
  const [captchaSquares, setCaptchaSquares] = useState([]);
  const [correctSquareIndex, setCorrectSquareIndex] = useState(0);
  const [captchaInstructions, setCaptchaInstructions] = useState("");
  const [captchaCompleted, setCaptchaCompleted] = useState(false);

  // Four colors only
  const neonColors = [
    { name: "YELLOW", value: "var(--neon-yellow)", css: "#ffff00" },
    { name: "BLUE", value: "var(--neon-blue)", css: "#0099ff" },
    { name: "PINK", value: "var(--neon-pink)", css: "#ff00ff" },
    { name: "RED", value: "var(--neon-red)", css: "#ff0066" },
  ];

  // Generate new captcha
  const generateCaptcha = () => {
    // Always use all four colors, but shuffle their positions
    const shuffledColors = [...neonColors].sort(() => Math.random() - 0.5);
    const targetIndex = Math.floor(Math.random() * 4);
    const targetColor = shuffledColors[targetIndex];

    const squares = shuffledColors.map((color, index) => ({
      color: color,
      isTarget: index === targetIndex,
      clicked: false,
    }));

    setCaptchaSquares(squares);
    setCorrectSquareIndex(targetIndex);
    setCaptchaInstructions(`Click the ${targetColor.name} square`);
    setCaptchaCompleted(false);
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Handle square click
  const handleSquareClick = (index) => {
    if (captchaCompleted) return;

    const newSquares = [...captchaSquares];
    newSquares[index].clicked = true;
    setCaptchaSquares(newSquares);

    if (index === correctSquareIndex) {
      setCaptchaCompleted(true);
      setCaptchaAnswer("correct");
    } else {
      // Wrong square clicked, generate new captcha
      setTimeout(() => {
        generateCaptcha();
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      const normalizedCode = inviteCode.trim().toLowerCase();
      if (normalizedCode !== "3jane2025" && normalizedCode !== "lady3jane") {
        setError("Invalid invite code");
        setIsLoading(false);
        return;
      }

      if (captchaAnswer !== "correct") {
        setError("Please complete the security verification");
        setIsLoading(false);
        return;
      }

      // Registration successful
      localStorage.setItem("cyberpunk_registered", "true");
      onRegistrationComplete();
    }, 1000);
  };

  return (
    <div className="registration-screen">
      <div className="registration-container">
        <h1 className="registration-title">ACCESS REQUIRED</h1>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="inviteCode" className="form-label">
              INVITE CODE:
            </label>
            <input
              type="text"
              id="inviteCode"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="form-input"
              placeholder="Enter invite code"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">SECURITY VERIFICATION:</label>
            <div className="captcha-container">
              <div className="captcha-instructions">
                {captchaCompleted
                  ? "✓ Verification Complete"
                  : captchaInstructions}
              </div>
              <div className="captcha-squares">
                {captchaSquares.map((square, index) => (
                  <div
                    key={index}
                    className={`captcha-square ${
                      square.clicked ? "clicked" : ""
                    } ${captchaCompleted && square.isTarget ? "correct" : ""}`}
                    style={{
                      backgroundColor: square.color.css,
                    }}
                    onClick={() => handleSquareClick(index)}
                  />
                ))}
              </div>
              {!captchaCompleted && (
                <div className="captcha-hint">
                  Click the correct colored square
                </div>
              )}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "PROCESSING..." : "ENTER NIGHT CITY"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationScreen;

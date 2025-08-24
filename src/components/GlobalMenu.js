import React, { useEffect } from "react";
import "../styles/GlobalMenu.css";

function GlobalMenu({
  onNavigate,
  onShowInventory,
  onShowMarket,
  onShowTravel,
  onShowMainMenu,
  onBack,
  onClose,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log("GlobalMenu key pressed:", event.key.toUpperCase());
      switch (event.key.toUpperCase()) {
        case "I":
          console.log("Calling onShowInventory and onClose");
          onShowInventory();
          onClose();
          break;
        case "M":
          console.log("Calling onShowMarket and onClose");
          onShowMarket();
          onClose();
          break;
        case "T":
          console.log("Calling onShowTravel and onClose");
          onShowTravel();
          onClose();
          break;
        case "X":
          console.log("Calling onBack (Streets) and onClose");
          onBack();
          onClose();
          break;
        case "B":
          console.log("Calling onBack and onClose");
          onBack();
          onClose();
          break;
        case "ESCAPE":
          console.log("Calling onClose");
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    onShowInventory,
    onShowMarket,
    onShowTravel,
    onShowMainMenu,
    onBack,
    onClose,
  ]);

  return (
    <div className="global-menu-overlay" onClick={onClose}>
      <div className="global-menu" onClick={(e) => e.stopPropagation()}>
        <div className="global-menu-header">
          <h3>Quick Access</h3>
          <span className="close-hint">
            Press <span className="key">Esc</span> to close •{" "}
            <span className="key">X</span> goes to Streets
          </span>
        </div>

        <div className="global-menu-options">
          <div
            className="menu-option"
            onClick={() => {
              console.log("Inventory button clicked");
              onShowInventory();
              onClose();
            }}
          >
            <span className="key">(I)</span>
            <span className="label">nventory</span>
          </div>

          <div
            className="menu-option"
            onClick={() => {
              console.log("Market button clicked");
              onShowMarket();
              onClose();
            }}
          >
            <span className="key">(M)</span>
            <span className="label">arket</span>
          </div>

          <div
            className="menu-option"
            onClick={() => {
              onShowTravel();
              onClose();
            }}
          >
            <span className="key">(T)</span>
            <span className="label">ravel</span>
          </div>

          <div
            className="menu-option"
            onClick={() => {
              console.log("Streets button clicked");
              onBack();
              onClose();
            }}
          >
            <span className="key">(X)</span>
            <span className="label"> Streets</span>
          </div>

          <div
            className="menu-option"
            onClick={() => {
              onBack();
              onClose();
            }}
          >
            <span className="key">(B)</span>
            <span className="label">ack</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalMenu;

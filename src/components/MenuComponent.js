import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

const MenuComponent = forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState(false);
  const [lastKeyPress, setLastKeyPress] = useState(null);
  const keyHandlers = useRef(new Map());
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    registerKeyHandler: (key, handler) => {
      keyHandlers.current.set(key.toUpperCase(), handler);
    },
    unregisterKeyHandler: (key) => {
      keyHandlers.current.delete(key.toUpperCase());
    },
    clearKeyHandlers: () => {
      keyHandlers.current.clear();
    },
    focusInput: () => {
      if (inputRef.current && isActive) {
        inputRef.current.focus();
      }
    },
  }));

  useEffect(() => {
    setIsActive(true);
    setupEventListeners();
    focusInput();

    return () => {
      setIsActive(false);
      cleanupEventListeners();
    };
  }, []);

  const setupEventListeners = () => {
    // Setup keydown listener
    const handleKeyDown = (e) => {
      if (!isActive) return;

      e.preventDefault();
      e.stopPropagation();

      const key = e.key.toUpperCase();
      setLastKeyPress(key);

      // Call the specific key handler if it exists
      if (keyHandlers.current.has(key)) {
        keyHandlers.current.get(key)(e);
      }

      // Call the generic key handler
      if (props.onKeyPress) {
        props.onKeyPress(key, e);
      }

      focusInput();
    };

    // Setup click listener for the component
    const handleClick = (e) => {
      if (!isActive) return;

      // Check if click is within this component
      if (inputRef.current && inputRef.current.contains(e.target)) {
        focusInput();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("click", handleClick, true);

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("click", handleClick, true);
    };
  };

  const cleanupEventListeners = () => {
    // Event listeners are cleaned up in the useEffect cleanup
  };

  const focusInput = () => {
    if (inputRef.current && isActive) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`menu-component ${isActive ? "active" : ""}`}>
      {props.children}
      <input
        ref={inputRef}
        type="text"
        maxLength={1}
        autoFocus
        readOnly
        style={{
          position: "absolute",
          left: "-9999px",
          caretColor: "transparent",
          opacity: 0,
        }}
        onFocus={() => focusInput()}
      />
    </div>
  );
});

export default MenuComponent;

import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { EmojiPicker } from "./Emojis/EmojiPicker";

function App() {
  const [state, setState] = useState({
    height: 0,
    width: 0,
    background: "black",
  });

  useEffect(() => {
    let interval = setInterval(() => {
      setState({
        ...state,
        height: state.height + 0.5,
        width: state.width + 0.5,
      });

      if (state.height >= 100 || state.width >= 100) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  });

  function handleChange(name, value) {
    setState({ ...state, [name]: value });
  }

  const [emoji, setEmoji] = useState("");

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        left: 0,
        top: 0,
        flexDirection: "column",
      }}
    >
      <EmojiPicker
        width={state.width + "%"}
        height={state.height + "%"}
        visible
        background={state.background}
        handleClick={setEmoji}
      />

      <div>
        <label>Width</label>
        <input
          type="range"
          min="0"
          max="100"
          value={state.width}
          onChange={(e) => handleChange("width", e.target.value)}
        />
      </div>
      <div>
        <label>Height</label>
        <input
          type="range"
          min="0"
          max="100"
          value={state.height}
          onChange={(e) => handleChange("height", e.target.value)}
        />
      </div>
      <div>
        <label>Color</label>
        <input
          type="color"
          value={state.background}
          onChange={(e) => handleChange("background", e.target.value)}
        />
      </div>
      <div style={{ fontSize: "2rem" }}>{emoji}</div>
    </div>
  );
}

export default App;

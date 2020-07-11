import React, { useState, useEffect } from "react";
import emojis from "./emojis";

export function EmojiPicker({
  handleClick,
  height = "300px",
  width = "300px",
  visible,
  background = "black",
  emojiSize = "2rem",
}) {
  console.log(width);
  return (
    <div
      style={{
        display: visible ? "flex" : "none",
        top: "0",
        background,
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        height,
        fontSize: emojiSize,
        width,
        overflow: "auto",
        position: "relative",
        zIndex: 9999,
      }}
    >
      {!!emojis.length &&
        emojis.map((emoji, i) => (
          <span
            key={emoji}
            className={"emoji-picker"}
            style={{ cursor: "pointer" }}
            onClick={(e) => handleClick(emoji)}
          >
            {emoji}
          </span>
        ))}
    </div>
  );
}

export default function Thing({
  onChange,
  background = "black",
  defaultValue = "🙈",
  visible,
}) {
  const [chosenEmoji, setChosenEmoji] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!!chosenEmoji && !!onChange) onChange(chosenEmoji);
    //eslint-disable-next-line
  }, [chosenEmoji]);

  function togglePicker() {
    setOpen(!open);
  }

  function bordel(e) {
    if (open && e.target.className !== "emoji-picker") setOpen(false);
  }

  useEffect(() => {
    window.addEventListener("click", bordel);

    return () => window.removeEventListener("click", bordel);
  });

  useEffect(() => {
    setOpen(false);
  }, [chosenEmoji]);

  function handleClick(e) {
    setChosenEmoji(e.target.innerText);
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {chosenEmoji && (
        <div style={{ cursor: "pointer" }} onClick={togglePicker}>
          {chosenEmoji}
        </div>
      )}

      {open && (
        <div
          style={{
            display: open ? "flex" : "none",
            background,
            top: "0",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            height: "300px",
            fontSize: "2rem",
            width: "300px",
            overflow: "auto",
            position: "relative",
            zIndex: 9999,
          }}
        >
          <EmojiPicker handleClick={handleClick} />
        </div>
      )}
    </div>
  );
}

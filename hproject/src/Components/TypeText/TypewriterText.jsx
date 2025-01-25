import React, { useState, useEffect } from "react";
import "./TypewriterText.css";

const TypewriterText = ({ extractedText = "" }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!extractedText) return; // Prevent errors if extractedText is empty or null

    let index = 0;
    setDisplayedText(""); // Reset the displayed text when extractedText changes

    const interval = setInterval(() => {
      if (index < extractedText.length) {
        setDisplayedText((prev) => prev + extractedText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Typing speed in milliseconds

    return () => clearInterval(interval);
  }, [extractedText]);

  return (
    <div className="typewriter-container">
      <h2 className="typewriter-title">Extracted Text</h2>
      <div className="typewriter-box">
        <p className="typewriter-text">{displayedText}</p>
      </div>
    </div>
  );
};

export default TypewriterText;

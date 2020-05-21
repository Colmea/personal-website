import React, { useState, useEffect } from "react";

// Credits to @crowderz
// https://codesandbox.io/s/x2v5qnjz3z?file=/src/useMousePos.js:0-475
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({});

  useEffect(() => {
    const getMousePosition = e => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });
    };

    document.addEventListener("mousemove", getMousePosition);

    return function cleanup() {
      document.removeEventListener("mousemove", getMousePosition);
    };
  });

  return mousePosition;
};

export default useMousePosition;

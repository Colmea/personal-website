import React, { useState, useEffect } from "react";
import throttle from 'lodash.throttle';

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

    const throttledMousePosition = throttle(getMousePosition, 30);

    document.addEventListener("mousemove", throttledMousePosition);

    return function cleanup() {
      document.removeEventListener("mousemove", throttledMousePosition);
    };
  }, []);

  return mousePosition;
};

export default useMousePosition;

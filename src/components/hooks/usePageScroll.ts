import React, { useState, useEffect } from "react";

const usePageScroll = () => {
  const [pageScroll, setPageScroll] = useState({});

  useEffect(() => {
    const getPageScroll = e => {
      const scrollTop = window.scrollY;
      const scrollLeft = window.scrollX;
      
      setPageScroll({ scrollTop, scrollLeft });
    };

    window.addEventListener("scroll", getPageScroll);

    return function cleanup() {
      window.removeEventListener("scroll", getPageScroll);
    };
  });

  return pageScroll;
};

export default usePageScroll;

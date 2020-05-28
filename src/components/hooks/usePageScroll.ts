import React, { useState, useEffect } from "react";
import throttle from 'lodash.throttle';

const usePageScroll = () => {
  const [pageScroll, setPageScroll] = useState({});

  useEffect(() => {
    const getPageScroll = e => {
      const scrollTop = window.scrollY;
      const scrollLeft = window.scrollX;
      
      setPageScroll({ scrollTop, scrollLeft });
    };

    const throttledPageScroll = throttle(getPageScroll, 25);

    window.addEventListener("scroll", throttledPageScroll);

    return function cleanup() {
      window.removeEventListener("scroll", throttledPageScroll);
    };
  }, []);

  return pageScroll;
};

export default usePageScroll;

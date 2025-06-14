import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;

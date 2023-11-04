import React from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = React.useState<{width: number}>({
    width: window.innerWidth,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

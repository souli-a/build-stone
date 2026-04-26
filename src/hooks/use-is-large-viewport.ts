import { useEffect, useState } from "react";

const useIsLargeViewport = (breakpoint = 600) => {
  const [isLarge, setIsLarge] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= breakpoint;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= breakpoint);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isLarge;
};

export default useIsLargeViewport;

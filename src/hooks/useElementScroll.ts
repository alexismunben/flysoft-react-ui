import { useState, useEffect } from "react";

export const useElementScroll = (
  elementRef: React.RefObject<HTMLElement | null>
) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    let lastScrollY = element.scrollTop;

    const handleScroll = () => {
      const currentScrollY = element.scrollTop;

      setScrollY(currentScrollY);

      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      lastScrollY = currentScrollY;
    };

    // Agregar el listener al elemento
    element.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [elementRef]);

  return { scrollY, scrollDirection };
};

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
    let lastDirection: "up" | "down" | null = null;

    const handleScroll = () => {
      const currentScrollY = element.scrollTop;
      let newDirection: "up" | "down" | null = lastDirection;

      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        newDirection = "down";
      } else if (currentScrollY < lastScrollY && currentScrollY > 0) {
        newDirection = "up";
      }

      setScrollY(currentScrollY);

      // Solo actualizar la dirección si cambió
      if (newDirection !== lastDirection) {
        setScrollDirection(newDirection);
        lastDirection = newDirection;
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

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
    let rafId: number | null = null;
    let pendingScrollY = element.scrollTop;

    const handleScroll = () => {
      pendingScrollY = element.scrollTop;

      // Usar requestAnimationFrame para agrupar actualizaciones y evitar temblores
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          const currentScrollY = pendingScrollY;
          const delta = currentScrollY - lastScrollY;

          // Verificar si estamos cerca del final (margen de 5px)
          const isNearBottom =
            Math.abs(
              element.scrollHeight - element.clientHeight - currentScrollY
            ) < 5;

          let newDirection: "up" | "down" | null = lastDirection;

          // Si estamos cerca del final y el delta es muy pequeño, mantener la dirección actual
          if (isNearBottom && Math.abs(delta) < 2) {
            // Mantener la dirección actual, no cambiar
          } else if (delta > 4 && currentScrollY > 10) {
            newDirection = "down";
          } else if (delta < -4 && currentScrollY > 0) {
            newDirection = "up";
          } else if (Math.abs(delta) < 2) {
            // Cambios muy pequeños, mantener la dirección actual
            newDirection = lastDirection;
          }

          setScrollY(currentScrollY);

          // Solo actualizar la dirección si cambió realmente
          if (newDirection !== lastDirection) {
            setScrollDirection(newDirection);
            lastDirection = newDirection;
          }

          lastScrollY = currentScrollY;
        });
      }
    };

    // Agregar el listener al elemento
    element.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      element.removeEventListener("scroll", handleScroll);
    };
  }, [elementRef]);

  return { scrollY, scrollDirection };
};

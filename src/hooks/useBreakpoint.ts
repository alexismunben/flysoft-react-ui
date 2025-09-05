import { useState, useEffect } from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface WindowSize {
  width: number;
  height: number;
}

export interface BreakpointInfo {
  breakpoint: Breakpoint;
  windowSize: WindowSize;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Breakpoints basados en Tailwind CSS
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const useBreakpoint = (): BreakpointInfo => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });

      // Determinar el breakpoint actual
      if (width >= breakpoints["2xl"]) {
        setBreakpoint("2xl");
      } else if (width >= breakpoints.xl) {
        setBreakpoint("xl");
      } else if (width >= breakpoints.lg) {
        setBreakpoint("lg");
      } else if (width >= breakpoints.md) {
        setBreakpoint("md");
      } else if (width >= breakpoints.sm) {
        setBreakpoint("sm");
      } else {
        setBreakpoint("xs");
      }
    };

    // Ejecutar una vez al montar
    handleResize();

    // Agregar listener para cambios de tamaño
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = breakpoint === "xs" || breakpoint === "sm";
  const isTablet = breakpoint === "md";
  const isDesktop =
    breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl";

  return {
    breakpoint,
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
  };
};

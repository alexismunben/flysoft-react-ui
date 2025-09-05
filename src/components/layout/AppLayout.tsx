import React, { useState, useRef } from "react";
import { useBreakpoint } from "../../hooks";
import { useElementScroll } from "../../hooks/useElementScroll";
import { Button } from "../form-controls";

export interface AppLayoutProps {
  navBarDrawer?: React.ReactNode;
  leftDrawer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  navBarDrawer,
  leftDrawer,
  children,
  className = "",
}) => {
  const { isMobile, isTablet } = useBreakpoint();
  const contentRef = useRef<HTMLElement | null>(null);
  const { scrollY, scrollDirection } = useElementScroll(contentRef);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const shouldShowMobileDrawer = isMobile || isTablet;
  const shouldShowDesktopDrawer = !shouldShowMobileDrawer && leftDrawer;

  // Controlar visibilidad del navbar basado en scroll
  React.useEffect(() => {
    if (scrollY < 100) {
      // Siempre mostrar navbar cerca del top
      setIsNavbarVisible(true);
    } else if (scrollDirection === "down" && scrollY > 100) {
      // Ocultar navbar al hacer scroll hacia abajo
      setIsNavbarVisible(false);
    } else if (scrollDirection === "up" && scrollY > 100) {
      // Mostrar navbar al hacer scroll hacia arriba
      setIsNavbarVisible(true);
    }
  }, [scrollDirection, scrollY, isNavbarVisible]);

  const handleMobileDrawerToggle = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  const handleOverlayClick = () => {
    setIsMobileDrawerOpen(false);
  };

  // Clases base del layout
  const layoutClasses = `
    flex flex-col h-screen w-full
    font-[var(--font-default)]
    ${className}
  `;

  // Clases del navbar
  const navbarClasses = `
    bg-[var(--color-bg-default)] border-b border-[var(--color-border-default)]
    z-[1000] fixed top-0 left-0 right-0
    transform transition-transform duration-300 ease-in-out
    ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"}
  `;

  // Estilos inline para debug
  const navbarStyle = {
    transform: isNavbarVisible ? "translateY(0)" : "translateY(-100%)",
    transition: "transform 300ms ease-in-out",
  };

  const navbarContentClasses = `
    flex items-center pr-4 lg:px-4 h-16 gap-2
    md:px-3
  `;

  const navbarDrawerClasses = `flex-1`;

  // Clases del contenido principal
  const mainClasses = `
    flex flex-1 overflow-hidden
    transition-all duration-300 ease-in-out
    ${navBarDrawer && isNavbarVisible ? "pt-16" : ""}
  `;

  const leftDrawerClasses = `
    w-64 bg-[var(--color-bg-default)]
    overflow-y-auto flex-shrink-0 p-4
    transition-all duration-300 ease-in-out
    ${navBarDrawer && isNavbarVisible ? "pt-20" : "pt-4"}
  `;

  const contentClasses = `
    flex-1 overflow-y-auto px-2 py-4 lg:px-6
  `;

  // Clases del overlay móvil
  const overlayClasses = `
    fixed inset-0 bg-black/50 backdrop-blur-sm z-[1998]
  `;

  // Clases del drawer móvil
  const mobileDrawerBaseClasses = `
    fixed top-0 left-0 h-screen w-64 max-w-[80vw]
    bg-[var(--color-bg-default)] shadow-[var(--shadow-xl)]
    transform -translate-x-full transition-transform duration-300 ease-in-out
    z-[1999] flex flex-col
  `;

  const mobileDrawerOpenClasses = `translate-x-0`;

  const mobileDrawerContentClasses = `
    flex-1 overflow-y-auto p-4
  `;

  return (
    <div className={layoutClasses}>
      {/* NavBar */}
      {navBarDrawer && (
        <nav className={navbarClasses} style={navbarStyle}>
          <div className={navbarContentClasses}>
            {/* Botón de menú para móvil/tablet */}
            {shouldShowMobileDrawer && leftDrawer && (
              <Button
                variant="ghost"
                icon="fa-bars"
                onClick={handleMobileDrawerToggle}
                aria-label="Abrir menú"
              />
            )}

            {/* Contenido del navbar */}
            <div className={navbarDrawerClasses}>{navBarDrawer}</div>
          </div>
        </nav>
      )}

      {/* Contenido principal */}
      <div className={mainClasses}>
        {/* Left Drawer - Desktop */}
        {shouldShowDesktopDrawer && (
          <aside className={leftDrawerClasses}>{leftDrawer}</aside>
        )}

        {/* Contenido principal */}
        <main ref={contentRef} className={contentClasses}>
          {children}
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      {shouldShowMobileDrawer && leftDrawer && isMobileDrawerOpen && (
        <div className={overlayClasses} onClick={handleOverlayClick} />
      )}

      {/* Mobile Drawer */}
      {shouldShowMobileDrawer && leftDrawer && (
        <aside
          className={`${mobileDrawerBaseClasses} ${
            isMobileDrawerOpen ? mobileDrawerOpenClasses : ""
          }`}
        >
          {/* Botón de cerrar */}
          <div className="text-right">
            <Button
              variant="ghost"
              icon="fa-times"
              onClick={handleMobileDrawerToggle}
              aria-label="Cerrar menú"
            />
          </div>
          {/* Contenido del drawer */}
          <div className={mobileDrawerContentClasses}>{leftDrawer}</div>
        </aside>
      )}
    </div>
  );
};

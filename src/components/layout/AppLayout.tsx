import React, { useState, useRef } from "react";
import { useBreakpoint } from "../../hooks";
import { useElementScroll } from "../../hooks/useElementScroll";
import { Button } from "../form-controls";
import type {
  NavbarInterface,
  LeftDrawerInterface,
} from "../../contexts/AppLayoutContext";

export interface AppLayoutProps {
  navbar?: NavbarInterface;
  leftDrawer?: LeftDrawerInterface;
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  navbar,
  leftDrawer,
  children,
  className = "",
}) => {
  // Extract values from interfaces
  const navBarLeftNode = navbar?.navBarLeftNode;
  const navBarRightNode = navbar?.navBarRightNode;
  const fullWidthNavbar = navbar?.fullWidthNavbar ?? true;
  const navbarHeight = navbar?.height ?? "64px";
  const navbarClassName = navbar?.className || "";
  const leftDrawerHeader = leftDrawer?.headerNode;
  const leftDrawerContent = leftDrawer?.contentNode;
  const leftDrawerFooter = leftDrawer?.footerNode;
  const leftDrawerClassName = leftDrawer?.className || "";
  const leftDrawerWidth = leftDrawer?.width;
  const { isMobile, isTablet } = useBreakpoint();
  const contentRef = useRef<HTMLElement | null>(null);
  const { scrollY, scrollDirection } = useElementScroll(contentRef);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const isNavbarVisibleRef = useRef(isNavbarVisible);
  const isTransitioningRef = useRef(false);
  const lastScrollYRef = useRef(0);

  // Determinar si hay algún contenido en el drawer izquierdo
  const hasLeftDrawerContent =
    leftDrawerHeader || leftDrawerContent || leftDrawerFooter;

  const shouldShowMobileDrawer = isMobile || isTablet;
  const shouldShowDesktopDrawer =
    !shouldShowMobileDrawer && hasLeftDrawerContent;

  // Determinar si debemos mostrar el navbar
  // Se muestra si hay navBarLeftNode o navBarRightNode o si estamos en móvil/tablet con contenido en el drawer
  const shouldShowNavbar =
    navBarLeftNode ||
    navBarRightNode ||
    (shouldShowMobileDrawer && hasLeftDrawerContent);

  // Mantener el ref sincronizado con el estado
  React.useEffect(() => {
    isNavbarVisibleRef.current = isNavbarVisible;
    // Marcar que estamos en transición por 350ms (duración de la transición + margen)
    isTransitioningRef.current = true;
    const timer = setTimeout(() => {
      isTransitioningRef.current = false;
    }, 350);
    return () => clearTimeout(timer);
  }, [isNavbarVisible]);

  // Controlar visibilidad del navbar basado en scroll con histeresis mejorada
  React.useEffect(() => {
    // Ignorar cambios durante transiciones o cambios muy pequeños de scroll
    if (isTransitioningRef.current) {
      return;
    }

    const SCROLL_DELTA_THRESHOLD = 5; // Mínimo cambio de scroll para considerar
    const scrollDelta = Math.abs(scrollY - lastScrollYRef.current);

    // Ignorar cambios muy pequeños que pueden ser causados por el cambio de padding
    if (scrollDelta < SCROLL_DELTA_THRESHOLD && lastScrollYRef.current > 0) {
      return;
    }

    const SHOW_THRESHOLD = 80;
    const HIDE_THRESHOLD = 120;

    // Verificar si estamos cerca del final del scroll (margen de error de 10px)
    const element = contentRef.current;
    const isNearBottom = element
      ? Math.abs(
          element.scrollHeight - element.clientHeight - element.scrollTop,
        ) < 10
      : false;

    let shouldBeVisible: boolean;

    if (scrollY < SHOW_THRESHOLD) {
      // Siempre mostrar navbar cerca del top
      shouldBeVisible = true;
    } else if (
      scrollDirection === "down" &&
      scrollY > HIDE_THRESHOLD &&
      !isNearBottom
    ) {
      // Ocultar navbar al hacer scroll hacia abajo, excepto si estamos cerca del final
      shouldBeVisible = false;
    } else if (scrollDirection === "up" && scrollY > SHOW_THRESHOLD) {
      // Mostrar navbar al hacer scroll hacia arriba
      shouldBeVisible = true;
    } else if (isNearBottom && scrollDirection === "down") {
      // Si estamos en el final y scrolleamos hacia abajo, mantener el estado actual
      return;
    } else {
      // No cambiar el estado si scrollDirection es null o no se cumple ninguna condición
      return;
    }

    // Solo actualizar el estado si hay un cambio real
    if (shouldBeVisible !== isNavbarVisibleRef.current) {
      lastScrollYRef.current = scrollY;
      setIsNavbarVisible(shouldBeVisible);
    } else {
      // Actualizar la referencia del scroll incluso si no cambiamos la visibilidad
      lastScrollYRef.current = scrollY;
    }
  }, [scrollDirection, scrollY]);

  const handleMobileDrawerToggle = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  const handleOverlayClick = () => {
    setIsMobileDrawerOpen(false);
  };

  // Clases base del layout
  const layoutClasses = `
    flex flex-col w-full ${navbar || leftDrawer ? "h-screen overflow-hidden" : "h-auto"}
    font-[var(--font-default)]
    ${className}
  `;

  // Clases del navbar
  const navbarClasses = `${
    fullWidthNavbar
      ? `z-[1000] fixed top-0 left-0 right-0 overflow-hidden`
      : `relative z-[1000] overflow-hidden`
  } ${navbarClassName}`.trim();

  // Estilos inline para la transformación
  // Cuando fullWidthNavbar es false, solo usamos height para ocultar (sin transform)
  // Cuando fullWidthNavbar es true, usamos transform para ocultar (manteniendo height)
  const navbarStyle = fullWidthNavbar
    ? {
        transform: isNavbarVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 100ms ease-in",
        willChange: "transform",
        height: navbarHeight, // Override any height classes in className
      }
    : {
        height: isNavbarVisible ? navbarHeight : "0",
        minHeight: isNavbarVisible ? navbarHeight : "0",
        maxHeight: isNavbarVisible ? navbarHeight : "0",
        transition:
          "height 100ms ease-in, min-height 100ms ease-in, max-height 100ms ease-in",
        overflow: "hidden",
      };

  const navbarContentClasses = `flex items-center justify-between gap-2`;

  // Style for navbar content with dynamic height
  // When fullWidthNavbar is false and hidden, set height to 0 to not occupy space
  // When fullWidthNavbar is true, always maintain height to prevent layout shifts
  const navbarContentStyle = {
    height: fullWidthNavbar || isNavbarVisible ? navbarHeight : "0",
    maxHeight: fullWidthNavbar || isNavbarVisible ? navbarHeight : "0",
    overflow: "hidden",
    transition: "height 100ms ease-in, max-height 100ms ease-in",
    opacity: isNavbarVisible || fullWidthNavbar ? 1 : 0,
  };

  const navbarLeftClasses = `flex items-center gap-2`;
  const navbarRightClasses = `flex items-center gap-2`;

  // Clases del contenido principal
  const mainClasses = `flex flex-1 overflow-hidden transition-all duration-100 ease-in`;

  // Style for main content with dynamic navbar height padding
  // No padding here anymore, it's handled by individual elements
  const mainStyle = {};

  // Style for the main content area (actual scrollable area)
  // When fullWidthNavbar is true, we need top padding to avoid being covered by fixed navbar
  const contentStyle =
    fullWidthNavbar && shouldShowNavbar && isNavbarVisible
      ? { paddingTop: navbarHeight }
      : {};

  // Clases del drawer izquierdo (contenedor principal)
  // width se aplica como estilo inline para tener prioridad sobre className
  const leftDrawerClasses = `
    ${leftDrawerWidth ? "" : "w-64"} bg-[var(--color-bg-default)]
    flex-shrink-0 flex flex-col
    transition-all duration-100 ease-in
    ${leftDrawerClassName}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Style for left drawer with dynamic height and positioning
  const leftDrawerStyle: React.CSSProperties = {
    ...(leftDrawerWidth ? { width: leftDrawerWidth } : {}),
    height: "100%", // Siempre 100% para evitar huecos en la parte superior
  };

  if (fullWidthNavbar) {
    // Si el navbar es fullwidth, el drawer mide 100% y usamos padding para que el contenido
    // no quede debajo del navbar fixed.
    leftDrawerStyle.paddingTop =
      shouldShowNavbar && isNavbarVisible ? navbarHeight : "0px";
    leftDrawerStyle.transition = "padding-top 100ms ease-in";
  } else {
    // Si no es fullwidth, el drawer está al lado del navbar.
    // No necesitamos marginTop ni height dinámico porque ya está en un flex-row
    // y queremos que ocupe siempre todo el alto desde el borde superior.
    leftDrawerStyle.marginTop = "0px";
    leftDrawerStyle.transition = "padding-top 100ms ease-in";
  }

  // Clases del contenedor que incluye drawer y contenido (cuando fullWidthNavbar es false)
  const contentWrapperClasses = fullWidthNavbar
    ? ""
    : `flex flex-row flex-1 overflow-hidden`;

  // Clases del contenedor que incluye navbar y main (cuando fullWidthNavbar es false)
  const drawerAndContentClasses = fullWidthNavbar
    ? ""
    : `flex flex-col flex-1 overflow-hidden`;

  // Style for drawer and content wrapper with dynamic navbar height padding
  const drawerAndContentStyle =
    !fullWidthNavbar && shouldShowNavbar && isNavbarVisible
      ? { paddingTop: 0 }
      : {};

  // Clases del header del drawer (fijo arriba)
  const leftDrawerHeaderClasses = `
    flex-shrink-0
  `;

  // Clases del contenido del drawer (scrolleable sin scrollbar visible)
  const leftDrawerContentClasses = `
    flex-1 overflow-y-auto scrollbar-hide
  `;

  // Clases del footer del drawer (fijo abajo)
  const leftDrawerFooterClasses = `
    flex-shrink-0
  `;

  const contentClasses = `
    flex-1 overflow-y-auto px-2 pb-4 lg:px-6 pt-4
  `;

  // Clases del overlay móvil
  const overlayClasses = `
    fixed inset-0 bg-black/50 backdrop-blur-sm z-[1998]
  `;

  // Clases del drawer móvil
  const mobileDrawerBaseClasses = `
    fixed top-0 left-0 h-screen w-64 max-w-[80vw]
    bg-[var(--color-bg-default)] shadow-[var(--shadow-xl)]
    transform -translate-x-full transition-transform duration-100 ease-in
    z-[1999] flex flex-col
    ${leftDrawerClassName}
  `
    .trim()
    .replace(/\s+/g, " ");

  // Style for mobile drawer with dynamic width
  const mobileDrawerStyle = leftDrawerWidth ? { width: leftDrawerWidth } : {};

  const mobileDrawerOpenClasses = `translate-x-0`;

  const mobileDrawerContentClasses = `
    flex-1 overflow-y-auto scrollbar-hide
  `;

  return (
    <div className={layoutClasses}>
      {fullWidthNavbar ? (
        <>
          {/* NavBar - Full Width */}
          {shouldShowNavbar && (
            <nav className={navbarClasses} style={navbarStyle}>
              <div className={navbarContentClasses} style={navbarContentStyle}>
                {/* Lado izquierdo del navbar */}
                <div className={navbarLeftClasses}>
                  {/* Botón de menú para móvil/tablet */}
                  {shouldShowMobileDrawer && hasLeftDrawerContent && (
                    <div className="pr-4 lg:px-4 md:px-3">
                      <Button
                        variant="ghost"
                        icon="fa-bars"
                        onClick={handleMobileDrawerToggle}
                        aria-label="Abrir menú"
                      />
                    </div>
                  )}

                  {/* Contenido izquierdo del navbar */}
                  {navBarLeftNode && (
                    <div>
                      {typeof navBarLeftNode === "string" ? (
                        <span>{navBarLeftNode}</span>
                      ) : (
                        navBarLeftNode
                      )}
                    </div>
                  )}
                </div>

                {/* Lado derecho del navbar */}
                {navBarRightNode && (
                  <div className={navbarRightClasses}>
                    {typeof navBarRightNode === "string" ? (
                      <span>{navBarRightNode}</span>
                    ) : (
                      navBarRightNode
                    )}
                  </div>
                )}
              </div>
            </nav>
          )}

          {/* Contenido principal */}
          <div className={mainClasses} style={mainStyle}>
            {/* Left Drawer - Desktop */}
            {shouldShowDesktopDrawer && (
              <aside className={leftDrawerClasses} style={leftDrawerStyle}>
                {/* Header del drawer */}
                {leftDrawerHeader && (
                  <div className={leftDrawerHeaderClasses}>
                    {leftDrawerHeader}
                  </div>
                )}
                {/* Contenido scrolleable del drawer */}
                {leftDrawerContent && (
                  <div className={leftDrawerContentClasses}>
                    {leftDrawerContent}
                  </div>
                )}
                {/* Footer del drawer */}
                {leftDrawerFooter && (
                  <div className={leftDrawerFooterClasses}>
                    {leftDrawerFooter}
                  </div>
                )}
              </aside>
            )}

            {/* Contenido principal */}
            <main
              ref={contentRef}
              className={contentClasses}
              style={contentStyle}
            >
              {children}
            </main>
          </div>
        </>
      ) : (
        <>
          {/* Layout cuando fullWidthNavbar es false */}
          <div className={contentWrapperClasses}>
            {/* Left Drawer - Desktop - Full Height */}
            {shouldShowDesktopDrawer && (
              <aside className={leftDrawerClasses} style={leftDrawerStyle}>
                {/* Header del drawer */}
                {leftDrawerHeader && (
                  <div className={leftDrawerHeaderClasses}>
                    {leftDrawerHeader}
                  </div>
                )}
                {/* Contenido scrolleable del drawer */}
                {leftDrawerContent && (
                  <div className={leftDrawerContentClasses}>
                    {leftDrawerContent}
                  </div>
                )}
                {/* Footer del drawer */}
                {leftDrawerFooter && (
                  <div className={leftDrawerFooterClasses}>
                    {leftDrawerFooter}
                  </div>
                )}
              </aside>
            )}

            {/* Contenedor del navbar y contenido principal */}
            <div
              className={drawerAndContentClasses}
              style={drawerAndContentStyle}
            >
              {/* NavBar - Solo ocupa el ancho del content */}
              {shouldShowNavbar && (
                <nav className={navbarClasses} style={navbarStyle}>
                  <div
                    className={navbarContentClasses}
                    style={navbarContentStyle}
                  >
                    {/* Lado izquierdo del navbar */}
                    <div className={navbarLeftClasses}>
                      {/* Botón de menú para móvil/tablet */}
                      {shouldShowMobileDrawer && hasLeftDrawerContent && (
                        <div className="pr-4 px-2">
                          <Button
                            variant="ghost"
                            icon="fa-bars"
                            onClick={handleMobileDrawerToggle}
                            aria-label="Abrir menú"
                          />
                        </div>
                      )}

                      {/* Contenido izquierdo del navbar */}
                      {navBarLeftNode && (
                        <div>
                          {typeof navBarLeftNode === "string" ? (
                            <span>{navBarLeftNode}</span>
                          ) : (
                            navBarLeftNode
                          )}
                        </div>
                      )}
                    </div>

                    {/* Lado derecho del navbar */}
                    {navBarRightNode && (
                      <div className={navbarRightClasses}>
                        {typeof navBarRightNode === "string" ? (
                          <span>{navBarRightNode}</span>
                        ) : (
                          navBarRightNode
                        )}
                      </div>
                    )}
                  </div>
                </nav>
              )}

              {/* Contenido principal */}
              <main
                ref={contentRef}
                className={contentClasses}
                style={contentStyle}
              >
                {children}
              </main>
            </div>
          </div>
        </>
      )}

      {/* Mobile Drawer Overlay */}
      {shouldShowMobileDrawer && hasLeftDrawerContent && isMobileDrawerOpen && (
        <div className={overlayClasses} onClick={handleOverlayClick} />
      )}

      {/* Mobile Drawer */}
      {shouldShowMobileDrawer && hasLeftDrawerContent && (
        <aside
          className={`${mobileDrawerBaseClasses} ${
            isMobileDrawerOpen ? mobileDrawerOpenClasses : ""
          }`}
          style={mobileDrawerStyle}
        >
          {/* Header del drawer móvil - siempre mostrar para tener el botón de cerrar */}
          <div className="flex-shrink-0 flex items-center justify-between">
            {leftDrawerHeader ? (
              <div className="flex-1">{leftDrawerHeader}</div>
            ) : (
              <div className="flex-1" />
            )}
            {/* Botón de cerrar */}
            <div className="absolute top-3 right-2">
              <Button
                variant="ghost"
                icon="fa-times"
                onClick={handleMobileDrawerToggle}
                aria-label="Cerrar menú"
              />
            </div>
          </div>
          {/* Contenido scrolleable del drawer móvil */}
          {leftDrawerContent && (
            <div className={mobileDrawerContentClasses}>
              {leftDrawerContent}
            </div>
          )}
          {/* Footer del drawer móvil */}
          {leftDrawerFooter && (
            <div className="flex-shrink-0">{leftDrawerFooter}</div>
          )}
        </aside>
      )}
    </div>
  );
};

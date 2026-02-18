import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "../form-controls/Button";

export interface DropdownPanelProps {
  renderNode?: React.ReactNode;
  children: React.ReactNode;
  /**
   * Si es true, el panel se abre al pasar el mouse por encima.
   * Por defecto es false.
   */
  openOnHover?: boolean;
}

export const DropdownPanel = ({
  renderNode,
  children,
  openOnHover = false,
}: DropdownPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<"top" | "bottom">("bottom");
  const [scrollUpdate, setScrollUpdate] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  // Calcular posición del menú
  const calculatePosition = useCallback(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Intentar obtener la altura real del menú, o usar una estimación si no está montado aún
      let menuHeight = 200; // valor por defecto
      if (menuRef.current) {
        menuHeight = menuRef.current.getBoundingClientRect().height;
      }

      const menuMargin = 4;

      // Calcular espacio disponible arriba y abajo
      const spaceBelow = viewportHeight - triggerRect.bottom - menuMargin;
      const spaceAbove = triggerRect.top - menuMargin;

      // Si no hay suficiente espacio abajo pero sí arriba, mostrar arriba
      if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
        setMenuPosition("top");
      } else {
        setMenuPosition("bottom"); // Preferir abajo si cabe o si es el que más espacio tiene, o por defecto
      }
    }
  }, [isOpen]);

  // Recalcular posición cuando cambia isOpen (y cuando el contenido podría haber cambiado el tamaño)
  useEffect(() => {
    calculatePosition();
    // Podríamos necesitar un ResizeObserver para ser más robustos si el contenido cambia
  }, [calculatePosition]);

  // Recalcular posición al hacer scroll o redimensionar
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => {
        calculatePosition();
        // Forzar actualización del estilo del menú
        setScrollUpdate((prev) => prev + 1);
      };

      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, [isOpen, calculatePosition]);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        menuRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Cerrar menú al presionar Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (!openOnHover) return;
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!openOnHover) return;
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150); // Pequeño delay para permitir mover el mouse al panel
  };

  const menuStyles = useMemo((): React.CSSProperties => {
    if (!isOpen || !triggerRef.current) {
      return {};
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const menuMargin = 4;

    // Asegurar que el menú no se salga de la pantalla horizontalmente
    let leftPosition = triggerRect.left;
    const menuMinWidth = 160;
    const viewportWidth = window.innerWidth;

    // Si el menú se sale por la derecha, ajustar la posición
    // Nota: Como el ancho es dinámico (basado en children), idealmente deberíamos medirlo.
    // Usaremos menuRef si está disponible o un estimado.
    let currentMenuWidth = menuMinWidth;
    if (menuRef.current) {
      currentMenuWidth = menuRef.current.getBoundingClientRect().width;
    }

    if (leftPosition + currentMenuWidth > viewportWidth) {
      leftPosition = viewportWidth - currentMenuWidth - 8; // 8px de margen
    }

    // Asegurar que no se salga por la izquierda
    if (leftPosition < 8) {
      leftPosition = 8;
    }

    if (menuPosition === "top") {
      return {
        position: "fixed",
        bottom: window.innerHeight - triggerRect.top + menuMargin,
        left: leftPosition,
        minWidth: Math.max(triggerRect.width, menuMinWidth), // Mantener el minWidth del trigger o 160
      };
    } else {
      return {
        position: "fixed",
        top: triggerRect.bottom + menuMargin,
        left: leftPosition,
        minWidth: Math.max(triggerRect.width, menuMinWidth),
      };
    }
    // scrollUpdate se usa intencionalmente para forzar el recálculo en scroll
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, menuPosition, scrollUpdate]);

  return (
    <div
      className="relative inline-block"
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <div onClick={handleToggle} className="cursor-pointer">
        {renderNode ? (
          renderNode
        ) : (
          <Button variant="ghost" icon="fa-ellipsis-h" />
        )}
      </div>

      {/* Panel */}
      {isOpen &&
        (typeof document !== "undefined" && document.body
          ? createPortal(
              <div
                ref={menuRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="fixed z-[2000] bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded-md shadow-[var(--shadow-lg)] py-1 min-w-[160px] font-[var(--font-default)]"
                style={menuStyles}
              >
                {children}
              </div>,
              document.body,
            )
          : null)}
    </div>
  );
};

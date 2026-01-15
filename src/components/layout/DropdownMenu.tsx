import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "../form-controls/Button";

export interface DropdownMenuProps<T = { label: string }> {
  options: T[];
  onOptionSelected: (item: T) => void;
  renderNode?: React.ReactNode;
  /**
   * Obtiene el label que se muestra para cada opción. Por defecto usa la propiedad "label".
   */
  getOptionLabel?: (item: T) => string;
  /**
   * Renderizado personalizado de cada opción. Si se define, se ignora el render por defecto.
   */
  renderOption?: (item: T) => React.ReactNode;
  /**
   * Si es true y hay una sola opción, muestra directamente la opción en lugar del trigger.
   * Por defecto es false.
   */
  replaceOnSingleOption?: boolean;
}

export const DropdownMenu = <T = { label: string },>({
  options,
  onOptionSelected,
  renderNode,
  getOptionLabel,
  renderOption,
  replaceOnSingleOption = false,
}: DropdownMenuProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<"top" | "bottom">("bottom");
  const [scrollUpdate, setScrollUpdate] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Calcular posición del menú
  const calculatePosition = useCallback(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Estimar altura del menú (aproximadamente 40px por opción + padding)
      const estimatedMenuHeight = options.length * 40 + 16;
      const menuMargin = 4;

      // Calcular espacio disponible arriba y abajo
      const spaceBelow = viewportHeight - triggerRect.bottom - menuMargin;
      const spaceAbove = triggerRect.top - menuMargin;

      // Si no hay suficiente espacio abajo pero sí arriba, mostrar arriba
      // Usamos un margen de seguridad para asegurar que el menú quepa
      if (spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow) {
        setMenuPosition("top");
      } else {
        setMenuPosition("bottom");
      }
    }
  }, [isOpen, options.length]);

  useEffect(() => {
    calculatePosition();
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

  const labelGetter = useCallback(
    (item: T): string => {
      if (getOptionLabel) return getOptionLabel(item);
      const anyItem = item as unknown as { label?: string };
      return (anyItem.label ?? "").toString();
    },
    [getOptionLabel]
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item: T) => {
    onOptionSelected(item);
    setIsOpen(false);
  };

  // Si replaceOnSingleOption es true y hay una sola opción, mostrar directamente la opción
  const shouldReplace = replaceOnSingleOption && options.length === 1;
  const singleOption = shouldReplace ? options[0] : null;

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
    if (leftPosition + menuMinWidth > viewportWidth) {
      leftPosition = viewportWidth - menuMinWidth - 8; // 8px de margen
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
        minWidth: Math.max(triggerRect.width, menuMinWidth),
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

  // Si debe reemplazar con la opción única, mostrar directamente la opción
  if (shouldReplace && singleOption) {
    return (
      <div
        onClick={() => handleOptionClick(singleOption)}
        className="cursor-pointer"
      >
        {renderOption ? renderOption(singleOption) : labelGetter(singleOption)}
      </div>
    );
  }

  return (
    <div className="relative inline-block" ref={triggerRef}>
      {/* Trigger */}
      <div onClick={handleToggle} className="cursor-pointer">
        {renderNode ? (
          renderNode
        ) : (
          <Button variant="ghost" icon="fa-ellipsis-h" />
        )}
      </div>

      {/* Menu */}
      {isOpen &&
        (typeof document !== "undefined" && document.body
          ? createPortal(
            <div
              ref={menuRef}
              className="fixed z-[2000] bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded-md shadow-[var(--shadow-lg)] py-1 min-w-[160px] font-[var(--font-default)]"
              style={menuStyles}
            >
              {options.map((option, index) => {
                const key = String(
                  (option as unknown as { id?: string | number })?.id ??
                  labelGetter(option) ??
                  index
                );

                return (
                  <div
                    key={key}
                    onClick={() => handleOptionClick(option)}
                    className="px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] cursor-pointer transition-colors flex items-center"
                  >
                    {renderOption
                      ? renderOption(option)
                      : labelGetter(option)}
                  </div>
                );
              })}
            </div>,
            document.body
          )
          : null)}
    </div>
  );
};

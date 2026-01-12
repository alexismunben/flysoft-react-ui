import React, { useState, useRef, useEffect } from "react";
import { normalizeIconClass } from "../utils/iconUtils";

export interface AccordionProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  icon?: string;
  rightNode?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  onToggle?: (isOpen: boolean) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  icon,
  rightNode,
  defaultOpen = false,
  className = "",
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Usar requestAnimationFrame para asegurar que el DOM esté actualizado
        requestAnimationFrame(() => {
          if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
          }
        });
      } else {
        setContentHeight(0);
      }
    }
  }, [isOpen, children]);

  // Inicializar altura si está abierto por defecto
  useEffect(() => {
    if (defaultOpen && contentRef.current) {
      requestAnimationFrame(() => {
        if (contentRef.current) {
          setContentHeight(contentRef.current.scrollHeight);
        }
      });
    }
  }, [defaultOpen]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onToggle) {
      onToggle(newIsOpen);
    }
  };

  return (
    <div
      className={`border border-[var(--color-border-default)] rounded-lg overflow-hidden font-[var(--font-default)] ${className}`}
    >
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-bg-default)] hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && (
            <i
              className={`${normalizeIconClass(icon)} text-[var(--color-text-secondary)] flex-shrink-0`}
            />
          )}
          <span className="text-left font-medium text-[var(--color-text-primary)] truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {rightNode && <div className="flex items-center">{rightNode}</div>}
          <i
            className={`${normalizeIconClass(`fa-chevron-${isOpen ? "up" : "down"}`)} text-[var(--color-text-secondary)] transition-all duration-200 flex-shrink-0`}
          />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: `${contentHeight}px`,
        }}
      >
        <div className="px-4 py-3 text-[var(--color-text-primary)]">
          {children}
        </div>
      </div>
    </div>
  );
};


import React, { useCallback } from "react";
import { twMerge } from "tailwind-merge";

export interface MenuProps<T = { label: string }> {
    options: T[];
    onOptionSelected: (item: T) => void;
    /**
     * Obtiene el label que se muestra para cada opción. Por defecto usa la propiedad "label".
     */
    getOptionLabel?: (item: T) => string;
    /**
     * Renderizado personalizado de cada opción. Si se define, se ignora el render por defecto.
     */
    renderOption?: (item: T) => React.ReactNode;
    /**
     * Clases adicionales para el contenedor del menú. Permite sobreescribir los estilos por defecto.
     */
    className?: string;
    /**
     * Estilos adicionales para el contenedor del menú.
     */
    style?: React.CSSProperties;
    /**
     * Clases adicionales para cada opción del menú.
     */
    itemClassName?: string;
}

export const Menu = <T = { label: string },>({
    options,
    onOptionSelected,
    getOptionLabel,
    renderOption,
    className,
    style,
    itemClassName,
}: MenuProps<T>) => {
    const labelGetter = useCallback(
        (item: T): string => {
            if (getOptionLabel) return getOptionLabel(item);
            const anyItem = item as unknown as { label?: string };
            return (anyItem.label ?? "").toString();
        },
        [getOptionLabel]
    );

    const handleOptionClick = (item: T) => {
        onOptionSelected(item);
    };

    const mergedClassName = twMerge(
        "bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded-md shadow-[var(--shadow-sm)] py-1 min-w-[160px] font-[var(--font-default)] inline-block",
        className
    );

    return (
        <div
            className={mergedClassName}
            style={style}
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
                        className={twMerge(
                            "px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] cursor-pointer transition-colors flex items-center",
                            itemClassName
                        )}
                    >
                        {renderOption ? renderOption(option) : labelGetter(option)}
                    </div>
                );
            })}
        </div>
    );
};

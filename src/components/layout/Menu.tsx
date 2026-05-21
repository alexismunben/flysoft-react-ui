import React, { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { compactDensity } from "../../contexts/presets";

const compactDensityOverride: React.CSSProperties = {
  "--flysoft-density-padding-x-sm": compactDensity.paddingX.sm,
  "--flysoft-density-padding-x-md": compactDensity.paddingX.md,
  "--flysoft-density-padding-x-lg": compactDensity.paddingX.lg,
  "--flysoft-density-padding-y-sm": compactDensity.paddingY.sm,
  "--flysoft-density-padding-y-md": compactDensity.paddingY.md,
  "--flysoft-density-padding-y-lg": compactDensity.paddingY.lg,
  "--flysoft-density-gap-sm": compactDensity.gap.sm,
  "--flysoft-density-gap-md": compactDensity.gap.md,
  "--flysoft-density-gap-lg": compactDensity.gap.lg,
  "--flysoft-density-font-xs": compactDensity.fontXs,
  "--flysoft-density-font-sm": compactDensity.fontSm,
  "--flysoft-density-font-base": compactDensity.fontBase,
  "--flysoft-density-font-lg": compactDensity.fontLg,
  "--flysoft-density-font-xl": compactDensity.fontXl,
} as React.CSSProperties;

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
    compact?: boolean;
}

export const Menu = <T = { label: string },>({
    options,
    onOptionSelected,
    getOptionLabel,
    renderOption,
    className,
    style,
    itemClassName,
    compact = false,
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
        `bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded-md shadow-[var(--shadow-sm)] py-[var(--flysoft-density-padding-y-sm)] ${compact ? "min-w-[120px]" : "min-w-[160px]"} font-[var(--font-default)] inline-block`,
        className
    );

    const mergedStyle: React.CSSProperties = {
        ...(compact ? compactDensityOverride : {}),
        ...style,
    };

    return (
        <div
            className={mergedClassName}
            data-density-override={compact ? "compact" : undefined}
            style={mergedStyle}
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
                            "px-[var(--flysoft-density-padding-x-md)] py-[var(--flysoft-density-padding-y-md)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] cursor-pointer transition-colors flex items-center",
                            itemClassName
                        )}
                        style={{ fontSize: "var(--flysoft-density-font-sm)" }}
                    >
                        {renderOption ? renderOption(option) : labelGetter(option)}
                    </div>
                );
            })}
        </div>
    );
};

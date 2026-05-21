import React from "react";
import { useTheme, type Density } from "../index";

const options: { value: Density; label: string }[] = [
  { value: "comfortable", label: "Cómoda" },
  { value: "compact", label: "Compacta" },
  { value: "dense", label: "Densa" },
];

export const DensityToggle: React.FC = () => {
  const { density, setDensity } = useTheme();

  return (
    <div className="flex items-center gap-2 pr-4">
      <span
        className="hidden md:inline"
        style={{
          fontSize: "var(--flysoft-density-font-sm)",
          color: "var(--flysoft-text-secondary)",
        }}
      >
        Densidad:
      </span>
      <div
        className="inline-flex rounded-md overflow-hidden border"
        style={{ borderColor: "var(--flysoft-border-default)" }}
        role="group"
        aria-label="Selector de densidad"
      >
        {options.map(({ value, label }) => {
          const active = density === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setDensity(value)}
              aria-pressed={active}
              className="px-3 py-1 text-xs transition-colors cursor-pointer"
              style={{
                backgroundColor: active
                  ? "var(--flysoft-primary)"
                  : "transparent",
                color: active
                  ? "var(--flysoft-primary-contrast)"
                  : "var(--flysoft-text-primary)",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

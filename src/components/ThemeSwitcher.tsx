import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./form-controls/Button";
import { Card } from "./layout/Card";

export const ThemeSwitcher: React.FC = () => {
  const {
    theme,
    setTheme,
    currentThemeName,
    availableThemes,
    resetToDefault,
    isDark,
  } = useTheme();

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--flysoft-text-primary)" }}
      >
        Theme Switcher
      </h3>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {availableThemes.map((themeName) => (
            <Button
              key={themeName}
              variant={currentThemeName === themeName ? "primary" : "ghost"}
              size="sm"
              onClick={() => setTheme(themeName)}
            >
              {themeName}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={resetToDefault}
          className="w-full"
        >
          Reset to Default
        </Button>

        <div
          className="text-sm space-y-2"
          style={{ color: "var(--flysoft-text-secondary)" }}
        >
          <p>
            <strong>Current Theme:</strong> {currentThemeName}
          </p>
          <p>
            <strong>Mode:</strong> {isDark ? "Dark" : "Light"}
          </p>
          <p>
            <strong>Primary Color:</strong> {theme.colors.primary}
          </p>
        </div>

        <div
          className="w-full h-8 rounded border-2"
          style={{
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.borderDefault,
          }}
        />
      </div>
    </Card>
  );
};

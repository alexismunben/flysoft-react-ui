import React from "react";
import { ThemeProvider, useTheme } from "../src/contexts/ThemeContext";
import { Button, Card } from "../src/components";

// Example component that demonstrates theme overrides
const ThemeOverrideExample: React.FC = () => {
  const { setThemeOverride, resetToDefault, theme } = useTheme();

  const applyCustomColors = () => {
    setThemeOverride({
      name: "custom-colors",
      colors: {
        primary: "#8B5CF6", // Purple
        primaryContrast: "#FFFFFF",
        primaryDark: "#7C3AED",
        primaryLight: "#A78BFA",
      },
    });
  };

  const applyCustomSpacing = () => {
    setThemeOverride({
      name: "custom-spacing",
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
    });
  };

  const applyCustomRadius = () => {
    setThemeOverride({
      name: "custom-radius",
      radius: {
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        full: "9999px",
      },
    });
  };

  const applyMixedOverrides = () => {
    setThemeOverride({
      name: "mixed-custom",
      colors: {
        primary: "#10B981", // Green
        primaryContrast: "#FFFFFF",
        primaryDark: "#059669",
        primaryLight: "#34D399",
      },
      spacing: {
        md: "1.25rem",
        lg: "2rem",
      },
      radius: {
        md: "0.75rem",
      },
    });
  };

  return (
    <div className="p-6 space-y-4">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Theme Override Examples</h2>
        <p className="text-gray-600 mb-4">
          Current theme: <strong>{theme.name}</strong>
        </p>

        <div className="space-y-2">
          <Button onClick={applyCustomColors} variant="primary">
            Apply Custom Colors (Purple)
          </Button>

          <Button onClick={applyCustomSpacing} variant="outline">
            Apply Custom Spacing
          </Button>

          <Button onClick={applyCustomRadius} variant="ghost">
            Apply Custom Radius
          </Button>

          <Button onClick={applyMixedOverrides} variant="primary">
            Apply Mixed Overrides (Green + Custom Spacing/Radius)
          </Button>

          <Button onClick={resetToDefault} variant="outline">
            Reset to Default Theme
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Current Theme Values</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Primary Color:</strong> {theme.colors.primary}
          </div>
          <div>
            <strong>Medium Spacing:</strong> {theme.spacing.md}
          </div>
          <div>
            <strong>Medium Radius:</strong> {theme.radius.md}
          </div>
          <div>
            <strong>Default Font:</strong> {theme.fonts.default}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Main example component with ThemeProvider
const ThemeOverrideExampleApp: React.FC = () => {
  return (
    <ThemeProvider initialTheme="light">
      <ThemeOverrideExample />
    </ThemeProvider>
  );
};

export default ThemeOverrideExampleApp;

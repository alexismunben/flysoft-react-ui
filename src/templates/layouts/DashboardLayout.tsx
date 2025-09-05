import React from "react";
import { Card } from "../../index";

/**
 * Template de Layout de Dashboard
 *
 * Ejemplo de uso:
 * ```tsx
 * import { DashboardLayout } from "flysoft-react-ui/templates/layouts/DashboardLayout";
 *
 * function App() {
 *   return (
 *     <DashboardLayout
 *       title="Mi Dashboard"
 *       stats={stats}
 *       actions={<Button>Nueva Acción</Button>}
 *     >
 *       <div>Contenido del dashboard</div>
 *     </DashboardLayout>
 *   );
 * }
 * ```
 */
export interface DashboardStat {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: string;
}

export interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  stats?: DashboardStat[];
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  subtitle,
  stats = [],
  actions,
  children,
  className = "",
}) => {
  const getChangeColor = (changeType?: string) => {
    switch (changeType) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getChangeIcon = (changeType?: string) => {
    switch (changeType) {
      case "positive":
        return "fa-arrow-up";
      case "negative":
        return "fa-arrow-down";
      default:
        return "fa-minus";
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
            {actions && (
              <div className="flex items-center space-x-3">{actions}</div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} variant="elevated" className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {stat.icon && (
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className={`fa ${stat.icon} text-blue-600`} />
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    {stat.change && (
                      <div className="flex items-center mt-1">
                        <i
                          className={`fa ${getChangeIcon(
                            stat.changeType
                          )} text-xs mr-1 ${getChangeColor(stat.changeType)}`}
                        />
                        <span
                          className={`text-sm ${getChangeColor(
                            stat.changeType
                          )}`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  );
};

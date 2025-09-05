import React from "react";
import "flysoft-react-ui/styles";
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
export declare const DashboardLayout: React.FC<DashboardLayoutProps>;
//# sourceMappingURL=DashboardLayout.d.ts.map
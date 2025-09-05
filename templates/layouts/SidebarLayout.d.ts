import React from "react";
import "flysoft-react-ui/styles";
/**
 * Template de Layout con Sidebar
 *
 * Ejemplo de uso:
 * ```tsx
 * import { SidebarLayout } from "flysoft-react-ui/templates/layouts/SidebarLayout";
 *
 * function App() {
 *   const menuItems = [
 *     { label: "Dashboard", icon: "fa-home", href: "/" },
 *     { label: "Usuarios", icon: "fa-users", href: "/users" },
 *   ];
 *
 *   return (
 *     <SidebarLayout
 *       title="Mi App"
 *       menuItems={menuItems}
 *       user={{ name: "Juan Pérez", avatar: "fa-user" }}
 *     >
 *       <div>Contenido principal</div>
 *     </SidebarLayout>
 *   );
 * }
 * ```
 */
export interface MenuItem {
    label: string;
    icon: string;
    href: string;
    badge?: string | number;
    children?: MenuItem[];
}
export interface User {
    name: string;
    email?: string;
    avatar?: string;
}
export interface SidebarLayoutProps {
    title: string;
    menuItems: MenuItem[];
    user: User;
    children: React.ReactNode;
    className?: string;
    onLogout?: () => void;
}
export declare const SidebarLayout: React.FC<SidebarLayoutProps>;
//# sourceMappingURL=SidebarLayout.d.ts.map
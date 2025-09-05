import React, { useState } from "react";
import { Button, Badge } from "../../index";

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

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  title,
  menuItems,
  user,
  children,
  className = "",
  onLogout,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(menuItems[0]?.href || "");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuClick = (href: string) => {
    setActiveItem(href);
    setSidebarOpen(false); // Cerrar sidebar en móvil
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <i className="fa fa-times" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick(item.href);
                }}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${
                    activeItem === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <i className={`fa ${item.icon} mr-3 flex-shrink-0`} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge variant="primary" size="sm" className="ml-2">
                    {item.badge}
                  </Badge>
                )}
              </a>
            ))}
          </div>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <i className={`fa ${user.avatar || "fa-user"} text-gray-600`} />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              {user.email && (
                <p className="text-xs text-gray-500">{user.email}</p>
              )}
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                title="Cerrar sesión"
              >
                <i className="fa fa-sign-out-alt" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <i className="fa fa-bars" />
            </button>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" icon="fa-bell">
                Notificaciones
              </Button>
              <Button variant="ghost" size="sm" icon="fa-cog">
                Configuración
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

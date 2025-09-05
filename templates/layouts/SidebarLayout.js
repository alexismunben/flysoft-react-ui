import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Button, Badge } from "flysoft-react-ui";
import "flysoft-react-ui/styles";
export const SidebarLayout = ({ title, menuItems, user, children, className = "", onLogout, }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(menuItems[0]?.href || "");
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const handleMenuClick = (href) => {
        setActiveItem(href);
        setSidebarOpen(false); // Cerrar sidebar en móvil
    };
    return (_jsxs("div", { className: `min-h-screen bg-gray-50 ${className}`, children: [sidebarOpen && (_jsx("div", { className: "fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden", onClick: () => setSidebarOpen(false) })), _jsxs("div", { className: `
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0
      `, children: [_jsxs("div", { className: "flex items-center justify-between h-16 px-6 border-b", children: [_jsx("h1", { className: "text-xl font-bold text-gray-900", children: title }), _jsx("button", { onClick: toggleSidebar, className: "lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600", children: _jsx("i", { className: "fa fa-times" }) })] }), _jsx("nav", { className: "mt-6 px-3", children: _jsx("div", { className: "space-y-1", children: menuItems.map((item) => (_jsxs("a", { href: item.href, onClick: (e) => {
                                    e.preventDefault();
                                    handleMenuClick(item.href);
                                }, className: `
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${activeItem === item.href
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                `, children: [_jsx("i", { className: `fa ${item.icon} mr-3 flex-shrink-0` }), _jsx("span", { className: "flex-1", children: item.label }), item.badge && (_jsx(Badge, { variant: "primary", size: "sm", className: "ml-2", children: item.badge }))] }, item.href))) }) }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 p-4 border-t", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center", children: _jsx("i", { className: `fa ${user.avatar || "fa-user"} text-gray-600` }) }) }), _jsxs("div", { className: "ml-3 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-900", children: user.name }), user.email && (_jsx("p", { className: "text-xs text-gray-500", children: user.email }))] }), onLogout && (_jsx("button", { onClick: onLogout, className: "ml-2 p-1 text-gray-400 hover:text-gray-600", title: "Cerrar sesi\u00F3n", children: _jsx("i", { className: "fa fa-sign-out-alt" }) }))] }) })] }), _jsxs("div", { className: "lg:pl-64", children: [_jsx("div", { className: "sticky top-0 z-10 bg-white shadow-sm border-b", children: _jsxs("div", { className: "flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8", children: [_jsx("button", { onClick: toggleSidebar, className: "lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600", children: _jsx("i", { className: "fa fa-bars" }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Button, { variant: "ghost", size: "sm", icon: "fa-bell", children: "Notificaciones" }), _jsx(Button, { variant: "ghost", size: "sm", icon: "fa-cog", children: "Configuraci\u00F3n" })] })] }) }), _jsx("main", { className: "p-4 sm:p-6 lg:p-8", children: children })] })] }));
};

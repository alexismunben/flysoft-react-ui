import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Card, Badge, Button } from "flysoft-react-ui";
import "flysoft-react-ui/styles";
export const DashboardLayout = ({ title, subtitle, stats = [], actions, children, className = "", }) => {
    const getChangeColor = (changeType) => {
        switch (changeType) {
            case "positive":
                return "text-green-600";
            case "negative":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    };
    const getChangeIcon = (changeType) => {
        switch (changeType) {
            case "positive":
                return "fa-arrow-up";
            case "negative":
                return "fa-arrow-down";
            default:
                return "fa-minus";
        }
    };
    return (_jsxs("div", { className: `min-h-screen bg-gray-50 ${className}`, children: [_jsx("div", { className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center py-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: title }), subtitle && (_jsx("p", { className: "mt-1 text-sm text-gray-600", children: subtitle }))] }), actions && (_jsx("div", { className: "flex items-center space-x-3", children: actions }))] }) }) }), stats.length > 0 && (_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, index) => (_jsx(Card, { variant: "elevated", className: "p-6", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0", children: stat.icon && (_jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center", children: _jsx("i", { className: `fa ${stat.icon} text-blue-600` }) })) }), _jsxs("div", { className: "ml-4 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: stat.title }), _jsx("p", { className: "text-2xl font-semibold text-gray-900", children: stat.value }), stat.change && (_jsxs("div", { className: "flex items-center mt-1", children: [_jsx("i", { className: `fa ${getChangeIcon(stat.changeType)} text-xs mr-1 ${getChangeColor(stat.changeType)}` }), _jsx("span", { className: `text-sm ${getChangeColor(stat.changeType)}`, children: stat.change })] }))] })] }) }, index))) }) })), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: children })] }));
};

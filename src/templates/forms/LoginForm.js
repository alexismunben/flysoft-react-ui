import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Button, Input, Card } from "flysoft-react-ui";
import "flysoft-react-ui/styles";
export const LoginForm = ({ onSubmit, loading = false, error, className = "", }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación básica
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "El email es requerido";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email no es válido";
        }
        if (!formData.password) {
            newErrors.password = "La contraseña es requerida";
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            onSubmit?.(formData);
        }
    };
    const handleChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        // Limpiar error cuando el usuario empiece a escribir
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };
    return (_jsxs(Card, { title: "Iniciar Sesi\u00F3n", subtitle: "Ingresa tus credenciales para acceder", className: className, children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [error && (_jsx("div", { className: "p-3 bg-red-50 border border-red-200 rounded-lg", children: _jsxs("p", { className: "text-sm text-red-600", children: [_jsx("i", { className: "fa fa-exclamation-triangle mr-2" }), error] }) })), _jsx(Input, { label: "Email", type: "email", placeholder: "tu@email.com", icon: "fa-envelope", value: formData.email, onChange: handleChange("email"), error: errors.email, disabled: loading }), _jsx(Input, { label: "Contrase\u00F1a", type: "password", placeholder: "Tu contrase\u00F1a", icon: "fa-lock", value: formData.password, onChange: handleChange("password"), error: errors.password, disabled: loading }), _jsx(Button, { type: "submit", variant: "primary", size: "lg", icon: "fa-sign-in-alt", loading: loading, className: "w-full", children: "Iniciar Sesi\u00F3n" })] }), _jsx("div", { className: "mt-4 text-center", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["\u00BFNo tienes cuenta?", " ", _jsx("a", { href: "#", className: "text-blue-600 hover:text-blue-800 font-medium", children: "Reg\u00EDstrate aqu\u00ED" })] }) })] }));
};

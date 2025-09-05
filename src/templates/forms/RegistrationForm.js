import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Button, Input, Card } from "flysoft-react-ui";
import "flysoft-react-ui/styles";
export const RegistrationForm = ({ onSubmit, loading = false, error, className = "", }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación
        const newErrors = {};
        if (!formData.firstName.trim()) {
            newErrors.firstName = "El nombre es requerido";
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "El apellido es requerido";
        }
        if (!formData.email) {
            newErrors.email = "El email es requerido";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email no es válido";
        }
        if (!formData.password) {
            newErrors.password = "La contraseña es requerida";
        }
        else if (formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirma tu contraseña";
        }
        else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
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
    return (_jsxs(Card, { title: "Crear Cuenta", subtitle: "Completa los datos para registrarte", className: className, children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [error && (_jsx("div", { className: "p-3 bg-red-50 border border-red-200 rounded-lg", children: _jsxs("p", { className: "text-sm text-red-600", children: [_jsx("i", { className: "fa fa-exclamation-triangle mr-2" }), error] }) })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(Input, { label: "Nombre", placeholder: "Tu nombre", icon: "fa-user", value: formData.firstName, onChange: handleChange("firstName"), error: errors.firstName, disabled: loading }), _jsx(Input, { label: "Apellido", placeholder: "Tu apellido", icon: "fa-user", value: formData.lastName, onChange: handleChange("lastName"), error: errors.lastName, disabled: loading })] }), _jsx(Input, { label: "Email", type: "email", placeholder: "tu@email.com", icon: "fa-envelope", value: formData.email, onChange: handleChange("email"), error: errors.email, disabled: loading }), _jsx(Input, { label: "Contrase\u00F1a", type: "password", placeholder: "M\u00EDnimo 6 caracteres", icon: "fa-lock", value: formData.password, onChange: handleChange("password"), error: errors.password, disabled: loading }), _jsx(Input, { label: "Confirmar Contrase\u00F1a", type: "password", placeholder: "Repite tu contrase\u00F1a", icon: "fa-lock", value: formData.confirmPassword, onChange: handleChange("confirmPassword"), error: errors.confirmPassword, disabled: loading }), _jsx(Button, { type: "submit", variant: "primary", size: "lg", icon: "fa-user-plus", loading: loading, className: "w-full", children: "Crear Cuenta" })] }), _jsx("div", { className: "mt-4 text-center", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["\u00BFYa tienes cuenta?", " ", _jsx("a", { href: "#", className: "text-blue-600 hover:text-blue-800 font-medium", children: "Inicia sesi\u00F3n aqu\u00ED" })] }) })] }));
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Button, Input, Card } from "flysoft-react-ui";
import "flysoft-react-ui/styles";
export const ContactForm = ({ onSubmit, loading = false, success = false, error, className = "", }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "El nombre es requerido";
        }
        if (!formData.email) {
            newErrors.email = "El email es requerido";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email no es válido";
        }
        if (!formData.subject.trim()) {
            newErrors.subject = "El asunto es requerido";
        }
        if (!formData.message.trim()) {
            newErrors.message = "El mensaje es requerido";
        }
        else if (formData.message.trim().length < 10) {
            newErrors.message = "El mensaje debe tener al menos 10 caracteres";
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
    if (success) {
        return (_jsx(Card, { title: "Mensaje Enviado", subtitle: "Gracias por contactarnos", className: className, children: _jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx("i", { className: "fa fa-check text-green-600 text-2xl" }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u00A1Mensaje enviado con \u00E9xito!" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Hemos recibido tu mensaje y te responderemos pronto." }), _jsx(Button, { variant: "outline", onClick: () => window.location.reload(), icon: "fa-refresh", children: "Enviar otro mensaje" })] }) }));
    }
    return (_jsx(Card, { title: "Cont\u00E1ctanos", subtitle: "Env\u00EDanos un mensaje y te responderemos pronto", className: className, children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [error && (_jsx("div", { className: "p-3 bg-red-50 border border-red-200 rounded-lg", children: _jsxs("p", { className: "text-sm text-red-600", children: [_jsx("i", { className: "fa fa-exclamation-triangle mr-2" }), error] }) })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(Input, { label: "Nombre Completo", placeholder: "Tu nombre completo", icon: "fa-user", value: formData.name, onChange: handleChange("name"), error: errors.name, disabled: loading }), _jsx(Input, { label: "Email", type: "email", placeholder: "tu@email.com", icon: "fa-envelope", value: formData.email, onChange: handleChange("email"), error: errors.email, disabled: loading })] }), _jsx(Input, { label: "Asunto", placeholder: "\u00BFEn qu\u00E9 podemos ayudarte?", icon: "fa-tag", value: formData.subject, onChange: handleChange("subject"), error: errors.subject, disabled: loading }), _jsxs("div", { className: "w-full", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--color-text-primary)] mb-1 font-[var(--font-default)]", children: "Mensaje" }), _jsxs("div", { className: "relative", children: [_jsx("i", { className: "fa fa-comment text-[var(--color-text-muted)] absolute top-3 left-3 w-5 h-5" }), _jsx("textarea", { placeholder: "Escribe tu mensaje aqu\u00ED...", className: `
                w-full border rounded-lg transition-colors focus:outline-none focus:ring-2 
                disabled:opacity-50 disabled:cursor-not-allowed
                font-[var(--font-default)] text-[var(--color-text-primary)]
                bg-[var(--color-bg-default)] pl-10 pr-4 py-3 text-base
                ${errors.message
                                        ? "border-[var(--color-border-error)] focus:border-[var(--color-border-error)] focus:ring-[var(--color-border-error)]"
                                        : "border-[var(--color-border-default)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-border-focus)]"}
              `, rows: 5, value: formData.message, onChange: handleChange("message"), disabled: loading })] }), errors.message && (_jsx("p", { className: "mt-1 text-sm text-[var(--color-danger)] font-[var(--font-default)]", children: errors.message }))] }), _jsx(Button, { type: "submit", variant: "primary", size: "lg", icon: "fa-paper-plane", loading: loading, className: "w-full", children: "Enviar Mensaje" })] }) }));
};

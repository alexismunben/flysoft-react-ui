import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Button, Input, Card } from "flysoft-react-ui";
import "flysoft-react-ui/styles";
export const FormPattern = ({ title, subtitle, fields, onSubmit, submitText = "Enviar", submitIcon = "fa-paper-plane", loading = false, error, success = false, className = "", gridCols = 1, }) => {
    const [formData, setFormData] = useState(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación
        const newErrors = {};
        fields.forEach((field) => {
            const value = formData[field.name] || "";
            if (field.required && !value.trim()) {
                newErrors[field.name] = `${field.label} es requerido`;
            }
            else if (field.validation) {
                const validationError = field.validation(value);
                if (validationError) {
                    newErrors[field.name] = validationError;
                }
            }
        });
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
        }
    };
    const handleChange = (fieldName) => (e) => {
        setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
        // Limpiar error cuando el usuario empiece a escribir
        if (errors[fieldName]) {
            setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
        }
    };
    const renderField = (field) => {
        const commonProps = {
            label: field.label,
            placeholder: field.placeholder,
            icon: field.icon,
            value: formData[field.name] || "",
            onChange: handleChange(field.name),
            error: errors[field.name],
            disabled: loading,
        };
        if (field.multiline) {
            return (_jsxs("div", { className: "w-full", children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--color-text-primary)] mb-1 font-[var(--font-default)]", children: [field.label, field.required && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] }), _jsxs("div", { className: "relative", children: [field.icon && (_jsx("i", { className: `fa ${field.icon} text-[var(--color-text-muted)] absolute top-3 left-3 w-5 h-5` })), _jsx("textarea", { placeholder: field.placeholder, className: `
                w-full border rounded-lg transition-colors focus:outline-none focus:ring-2 
                disabled:opacity-50 disabled:cursor-not-allowed
                font-[var(--font-default)] text-[var(--color-text-primary)]
                bg-[var(--color-bg-default)] px-4 py-3 text-base
                ${field.icon ? "pl-10" : "pl-4"}
                ${errors[field.name]
                                    ? "border-[var(--color-border-error)] focus:border-[var(--color-border-error)] focus:ring-[var(--color-border-error)]"
                                    : "border-[var(--color-border-default)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-border-focus)]"}
              `, rows: field.rows || 4, value: formData[field.name] || "", onChange: handleChange(field.name), disabled: loading })] }), errors[field.name] && (_jsx("p", { className: "mt-1 text-sm text-[var(--color-danger)] font-[var(--font-default)]", children: errors[field.name] }))] }, field.name));
        }
        return (_jsx(Input, { type: field.type || "text", ...commonProps }, field.name));
    };
    if (success) {
        return (_jsx(Card, { title: "\u00A1\u00C9xito!", subtitle: "La operaci\u00F3n se complet\u00F3 correctamente", className: className, children: _jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx("i", { className: "fa fa-check text-green-600 text-2xl" }) }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u00A1Operaci\u00F3n exitosa!" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Los datos se han procesado correctamente." }), _jsx(Button, { variant: "outline", onClick: () => window.location.reload(), icon: "fa-refresh", children: "Continuar" })] }) }));
    }
    return (_jsx(Card, { title: title, subtitle: subtitle, className: className, children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [error && (_jsx("div", { className: "p-3 bg-red-50 border border-red-200 rounded-lg", children: _jsxs("p", { className: "text-sm text-red-600", children: [_jsx("i", { className: "fa fa-exclamation-triangle mr-2" }), error] }) })), _jsx("div", { className: `grid grid-cols-1 ${gridCols === 2 ? "md:grid-cols-2" : ""} gap-4`, children: fields.map(renderField) }), _jsx(Button, { type: "submit", variant: "primary", size: "lg", icon: submitIcon, loading: loading, className: "w-full", children: submitText })] }) }));
};

import React, { useState } from "react";
import { Button, Input, Card } from "../../index";

/**
 * Template de Patrón de Formulario Reutilizable
 *
 * Este patrón proporciona una estructura base para cualquier formulario
 * con validación, estados de carga y manejo de errores.
 *
 * Ejemplo de uso:
 * ```tsx
 * import { FormPattern } from "flysoft-react-ui/templates/patterns/FormPattern";
 *
 * function MyForm() {
 *   const fields = [
 *     { name: "name", label: "Nombre", type: "text", icon: "fa-user", required: true },
 *     { name: "email", label: "Email", type: "email", icon: "fa-envelope", required: true },
 *   ];
 *
 *   return (
 *     <FormPattern
 *       title="Mi Formulario"
 *       fields={fields}
 *       onSubmit={handleSubmit}
 *       submitText="Guardar"
 *     />
 *   );
 * }
 * ```
 */
export interface FormField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: string;
  required?: boolean;
  validation?: (value: string) => string | undefined;
  multiline?: boolean;
  rows?: number;
}

export interface FormPatternProps {
  title: string;
  subtitle?: string;
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitText?: string;
  submitIcon?: string;
  loading?: boolean;
  error?: string;
  success?: boolean;
  className?: string;
  gridCols?: 1 | 2;
}

export const FormPattern: React.FC<FormPatternProps> = ({
  title,
  subtitle,
  fields,
  onSubmit,
  submitText = "Enviar",
  submitIcon = "fa-paper-plane",
  loading = false,
  error,
  success = false,
  className = "",
  gridCols = 1,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.name] || "";

      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} es requerido`;
      } else if (field.validation) {
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

  const handleChange =
    (fieldName: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
      // Limpiar error cuando el usuario empiece a escribir
      if (errors[fieldName]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    };

  const renderField = (field: FormField) => {
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
      return (
        <div key={field.name} className="w-full">
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1 font-[var(--font-default)]">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className="relative">
            {field.icon && (
              <i
                className={`fa ${field.icon} text-[var(--color-text-muted)] absolute top-3 left-3 w-5 h-5`}
              />
            )}
            <textarea
              placeholder={field.placeholder}
              className={`
                w-full border rounded-lg transition-colors focus:outline-none focus:ring-2 
                disabled:opacity-50 disabled:cursor-not-allowed
                font-[var(--font-default)] text-[var(--color-text-primary)]
                bg-[var(--color-bg-default)] px-4 py-3 text-base
                ${field.icon ? "pl-10" : "pl-4"}
                ${
                  errors[field.name]
                    ? "border-[var(--color-border-error)] focus:border-[var(--color-border-error)] focus:ring-[var(--color-border-error)]"
                    : "border-[var(--color-border-default)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-border-focus)]"
                }
              `}
              rows={field.rows || 4}
              value={formData[field.name] || ""}
              onChange={handleChange(field.name)}
              disabled={loading}
            />
          </div>
          {errors[field.name] && (
            <p className="mt-1 text-sm text-[var(--color-danger)] font-[var(--font-default)]">
              {errors[field.name]}
            </p>
          )}
        </div>
      );
    }

    return (
      <Input key={field.name} type={field.type || "text"} {...commonProps} />
    );
  };

  if (success) {
    return (
      <Card
        title="¡Éxito!"
        subtitle="La operación se completó correctamente"
        className={className}
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa fa-check text-green-600 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            ¡Operación exitosa!
          </h3>
          <p className="text-gray-600 mb-4">
            Los datos se han procesado correctamente.
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            icon="fa-refresh"
          >
            Continuar
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card title={title} subtitle={subtitle} className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              <i className="fa fa-exclamation-triangle mr-2" />
              {error}
            </p>
          </div>
        )}

        <div
          className={`grid grid-cols-1 ${
            gridCols === 2 ? "md:grid-cols-2" : ""
          } gap-4`}
        >
          {fields.map(renderField)}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={submitIcon}
          loading={loading}
          className="w-full"
        >
          {submitText}
        </Button>
      </form>
    </Card>
  );
};

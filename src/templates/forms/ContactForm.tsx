import React, { useState } from "react";
import { Button, Input, Card } from "../../index";

/**
 * Template de Formulario de Contacto
 *
 * Ejemplo de uso:
 * ```tsx
 * import { ContactForm } from "flysoft-react-ui/templates/forms/ContactForm";
 *
 * function App() {
 *   return <ContactForm onSubmit={handleContact} />;
 * }
 * ```
 */
export interface ContactFormProps {
  onSubmit?: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => void;
  loading?: boolean;
  success?: boolean;
  error?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  loading = false,
  success = false,
  error,
  className = "",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "El asunto es requerido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData);
    }
  };

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Limpiar error cuando el usuario empiece a escribir
      if (errors[field as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  if (success) {
    return (
      <Card
        title="Mensaje Enviado"
        subtitle="Gracias por contactarnos"
        className={className}
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fal fa-check text-green-600 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            ¡Mensaje enviado con éxito!
          </h3>
          <p className="text-gray-600 mb-4">
            Hemos recibido tu mensaje y te responderemos pronto.
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            icon="fa-refresh"
          >
            Enviar otro mensaje
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Contáctanos"
      subtitle="Envíanos un mensaje y te responderemos pronto"
      className={className}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              <i className="fal fa-exclamation-triangle mr-2" />
              {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre Completo"
            placeholder="Tu nombre completo"
            icon="fa-user"
            value={formData.name}
            onChange={handleChange("name")}
            error={errors.name}
            disabled={loading}
          />

          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            icon="fa-envelope"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
            disabled={loading}
          />
        </div>

        <Input
          label="Asunto"
          placeholder="¿En qué podemos ayudarte?"
          icon="fa-tag"
          value={formData.subject}
          onChange={handleChange("subject")}
          error={errors.subject}
          disabled={loading}
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1 font-[var(--font-default)]">
            Mensaje
          </label>
          <div className="relative">
            <i className="fal fa-comment text-[var(--color-text-muted)] absolute top-3 left-3 w-5 h-5" />
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              className={`
                w-full border rounded-lg transition-colors focus:outline-none focus:ring-2 
                disabled:opacity-50 disabled:cursor-not-allowed
                font-[var(--font-default)] text-[var(--color-text-primary)]
                bg-[var(--color-bg-default)] pl-10 pr-4 py-3 text-base
                ${
                  errors.message
                    ? "border-[var(--color-border-error)] focus:border-[var(--color-border-error)] focus:ring-[var(--color-border-error)]"
                    : "border-[var(--color-border-default)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-border-focus)]"
                }
              `}
              rows={5}
              value={formData.message}
              onChange={handleChange("message")}
              disabled={loading}
            />
          </div>
          {errors.message && (
            <p className="mt-1 text-sm text-[var(--color-danger)] font-[var(--font-default)]">
              {errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon="fa-paper-plane"
          loading={loading}
          className="w-full"
        >
          Enviar Mensaje
        </Button>
      </form>
    </Card>
  );
};

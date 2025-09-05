import React, { useState } from "react";
import { Button, Input, Card } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

/**
 * Template de Formulario de Registro
 *
 * Ejemplo de uso:
 * ```tsx
 * import { RegistrationForm } from "flysoft-react-ui/templates/forms/RegistrationForm";
 *
 * function App() {
 *   return <RegistrationForm onSubmit={handleRegistration} />;
 * }
 * ```
 */
export interface RegistrationFormProps {
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
  loading?: boolean;
  error?: string;
  className?: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  loading = false,
  error,
  className = "",
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    const newErrors: typeof errors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData);
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Limpiar error cuando el usuario empiece a escribir
      if (errors[field as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  return (
    <Card
      title="Crear Cuenta"
      subtitle="Completa los datos para registrarte"
      className={className}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              <i className="fa fa-exclamation-triangle mr-2" />
              {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            placeholder="Tu nombre"
            icon="fa-user"
            value={formData.firstName}
            onChange={handleChange("firstName")}
            error={errors.firstName}
            disabled={loading}
          />

          <Input
            label="Apellido"
            placeholder="Tu apellido"
            icon="fa-user"
            value={formData.lastName}
            onChange={handleChange("lastName")}
            error={errors.lastName}
            disabled={loading}
          />
        </div>

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

        <Input
          label="Contraseña"
          type="password"
          placeholder="Mínimo 6 caracteres"
          icon="fa-lock"
          value={formData.password}
          onChange={handleChange("password")}
          error={errors.password}
          disabled={loading}
        />

        <Input
          label="Confirmar Contraseña"
          type="password"
          placeholder="Repite tu contraseña"
          icon="fa-lock"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          disabled={loading}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon="fa-user-plus"
          loading={loading}
          className="w-full"
        >
          Crear Cuenta
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </Card>
  );
};

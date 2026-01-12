import React, { useState } from "react";
import { Button, Input, Card } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

/**
 * Template de Formulario de Login
 *
 * Ejemplo de uso:
 * ```tsx
 * import { LoginForm } from "flysoft-react-ui/templates/forms/LoginForm";
 *
 * function App() {
 *   return <LoginForm onSubmit={handleLogin} />;
 * }
 * ```
 */
export interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  loading?: boolean;
  error?: string;
  className?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error,
  className = "",
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
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
      title="Iniciar Sesión"
      subtitle="Ingresa tus credenciales para acceder"
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
          placeholder="Tu contraseña"
          icon="fa-lock"
          value={formData.password}
          onChange={handleChange("password")}
          error={errors.password}
          disabled={loading}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon="fa-sign-in-alt"
          loading={loading}
          className="w-full"
        >
          Iniciar Sesión
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Regístrate aquí
          </a>
        </p>
      </div>
    </Card>
  );
};

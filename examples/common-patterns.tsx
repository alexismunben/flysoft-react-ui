import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  Badge,
  ThemeProvider,
  ThemeSwitcher,
  useTheme,
} from "flysoft-react-ui";
import "flysoft-react-ui/styles";

/**
 * Ejemplos Comunes de Patrones de Uso
 *
 * Este archivo contiene ejemplos completos de cómo usar los componentes
 * de flysoft-react-ui en patrones comunes de aplicaciones.
 */

// ============================================================================
// 1. FORMULARIO DE LOGIN COMPLETO
// ============================================================================

export const LoginFormExample: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (
        formData.email === "admin@test.com" &&
        formData.password === "password"
      ) {
        alert("¡Login exitoso!");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Iniciar Sesión" subtitle="Ejemplo de formulario de login">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              <i className="fa fa-exclamation-triangle mr-2" />
              {error}
            </p>
          </div>
        )}

        <Input
          label="Email"
          type="email"
          placeholder="admin@test.com"
          icon="fa-envelope"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          disabled={loading}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="password"
          icon="fa-lock"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
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
    </Card>
  );
};

// ============================================================================
// 2. FORMULARIO DE REGISTRO
// ============================================================================

export const RegistrationFormExample: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      alert("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card title="¡Registro Exitoso!" subtitle="Tu cuenta ha sido creada">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa fa-check text-green-600 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            ¡Bienvenido!
          </h3>
          <p className="text-gray-600">
            Tu cuenta ha sido creada exitosamente.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Crear Cuenta" subtitle="Completa los datos para registrarte">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            placeholder="Tu nombre"
            icon="fa-user"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            disabled={loading}
          />

          <Input
            label="Apellido"
            placeholder="Tu apellido"
            icon="fa-user"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            disabled={loading}
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          icon="fa-envelope"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          disabled={loading}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="Mínimo 6 caracteres"
          icon="fa-lock"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          disabled={loading}
        />

        <Input
          label="Confirmar Contraseña"
          type="password"
          placeholder="Repite tu contraseña"
          icon="fa-lock"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
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
    </Card>
  );
};

// ============================================================================
// 3. FORMULARIO DE CONTACTO
// ============================================================================

export const ContactFormExample: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      alert("Error al enviar mensaje");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card title="Mensaje Enviado" subtitle="Gracias por contactarnos">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa fa-check text-green-600 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            ¡Mensaje enviado con éxito!
          </h3>
          <p className="text-gray-600">
            Hemos recibido tu mensaje y te responderemos pronto.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Contáctanos" subtitle="Envíanos un mensaje">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre Completo"
            placeholder="Tu nombre completo"
            icon="fa-user"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            disabled={loading}
          />

          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            icon="fa-envelope"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            disabled={loading}
          />
        </div>

        <Input
          label="Asunto"
          placeholder="¿En qué podemos ayudarte?"
          icon="fa-tag"
          value={formData.subject}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, subject: e.target.value }))
          }
          disabled={loading}
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1 font-[var(--font-default)]">
            Mensaje
          </label>
          <div className="relative">
            <i className="fa fa-comment text-[var(--color-text-muted)] absolute top-3 left-3 w-5 h-5" />
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              className="w-full border rounded-lg transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed font-[var(--font-default)] text-[var(--color-text-primary)] bg-[var(--color-bg-default)] pl-10 pr-4 py-3 text-base border-[var(--color-border-default)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-border-focus)]"
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              disabled={loading}
            />
          </div>
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

// ============================================================================
// 4. DASHBOARD BÁSICO
// ============================================================================

export const DashboardExample: React.FC = () => {
  const stats = [
    {
      title: "Usuarios Totales",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: "fa-users",
    },
    {
      title: "Ventas del Mes",
      value: "$45,678",
      change: "+8%",
      changeType: "positive" as const,
      icon: "fa-chart-line",
    },
    {
      title: "Órdenes Pendientes",
      value: "23",
      change: "-3%",
      changeType: "negative" as const,
      icon: "fa-clock",
    },
    {
      title: "Satisfacción",
      value: "4.8/5",
      change: "0%",
      changeType: "neutral" as const,
      icon: "fa-star",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Resumen de tu aplicación
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" icon="fa-download">
                Exportar
              </Button>
              <Button variant="primary" icon="fa-plus">
                Nueva Acción
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} variant="elevated" className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className={`fa ${stat.icon} text-blue-600`} />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-1">
                    <i
                      className={`fa ${
                        stat.changeType === "positive"
                          ? "fa-arrow-up"
                          : stat.changeType === "negative"
                          ? "fa-arrow-down"
                          : "fa-minus"
                      } text-xs mr-1 ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card title="Actividad Reciente" variant="elevated">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="fa fa-user text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Usuario {item} realizó una acción
                    </p>
                    <p className="text-xs text-gray-500">Hace {item} horas</p>
                  </div>
                  <Badge variant="primary" size="sm">
                    Nuevo
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Estados del Sistema" variant="elevated">
            <div className="space-y-4">
              {[
                { name: "Servidor Web", status: "online", icon: "fa-server" },
                {
                  name: "Base de Datos",
                  status: "online",
                  icon: "fa-database",
                },
                { name: "API", status: "warning", icon: "fa-cog" },
                { name: "Cache", status: "online", icon: "fa-memory" },
              ].map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <i className={`fa ${service.icon} text-gray-600`} />
                    <span className="text-sm font-medium text-gray-900">
                      {service.name}
                    </span>
                  </div>
                  <Badge
                    variant={
                      service.status === "online"
                        ? "success"
                        : service.status === "warning"
                        ? "warning"
                        : "danger"
                    }
                    size="sm"
                  >
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. LAYOUT CON SIDEBAR
// ============================================================================

export const SidebarLayoutExample: React.FC = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { label: "Dashboard", icon: "fa-home", href: "dashboard" },
    { label: "Usuarios", icon: "fa-users", href: "users", badge: "12" },
    { label: "Productos", icon: "fa-box", href: "products" },
    { label: "Órdenes", icon: "fa-shopping-cart", href: "orders", badge: "5" },
    { label: "Reportes", icon: "fa-chart-bar", href: "reports" },
    { label: "Configuración", icon: "fa-cog", href: "settings" },
  ];

  const user = {
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    avatar: "fa-user",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Mi App</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => setActiveItem(item.href)}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors w-full text-left
                  ${
                    activeItem === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <i className={`fa ${item.icon} mr-3 flex-shrink-0`} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge variant="primary" size="sm" className="ml-2">
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <i className="fa fa-user text-gray-600" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button className="ml-2 p-1 text-gray-400 hover:text-gray-600">
              <i className="fa fa-sign-out-alt" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {activeItem}
            </h2>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" icon="fa-bell">
                Notificaciones
              </Button>
              <Button variant="ghost" size="sm" icon="fa-cog">
                Configuración
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Card
            title={`Contenido de ${activeItem}`}
            subtitle="Aquí va el contenido específico"
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                Este es el contenido para la sección{" "}
                <strong>{activeItem}</strong>. Aquí puedes agregar cualquier
                componente o funcionalidad específica.
              </p>

              <div className="flex space-x-3">
                <Button variant="primary" icon="fa-plus">
                  Agregar
                </Button>
                <Button variant="outline" icon="fa-edit">
                  Editar
                </Button>
                <Button variant="ghost" icon="fa-trash">
                  Eliminar
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

// ============================================================================
// 6. EJEMPLO CON SISTEMA DE TEMAS
// ============================================================================

export const ThemeExample: React.FC = () => {
  return (
    <ThemeProvider initialTheme="light">
      <div className="p-8">
        <Card
          title="Ejemplo con Temas"
          subtitle="Cambia entre temas usando el switcher"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Cambiar Tema</h3>
              <ThemeSwitcher />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Campo de ejemplo"
                placeholder="Escribe algo aquí"
                icon="fa-edit"
              />

              <div className="space-y-2">
                <Button variant="primary" icon="fa-heart">
                  Botón Primario
                </Button>
                <Button variant="outline" icon="fa-star">
                  Botón Outline
                </Button>
                <Button variant="ghost" icon="fa-bookmark">
                  Botón Ghost
                </Button>
              </div>
            </div>

            <div className="flex space-x-2">
              <Badge variant="primary">Primario</Badge>
              <Badge variant="success">Éxito</Badge>
              <Badge variant="warning">Advertencia</Badge>
              <Badge variant="danger">Peligro</Badge>
            </div>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL QUE MUESTRA TODOS LOS EJEMPLOS
// ============================================================================

export const CommonPatternsShowcase: React.FC = () => {
  const [activeExample, setActiveExample] = useState("login");

  const examples = [
    { id: "login", label: "Login Form", component: <LoginFormExample /> },
    {
      id: "registration",
      label: "Registration Form",
      component: <RegistrationFormExample />,
    },
    { id: "contact", label: "Contact Form", component: <ContactFormExample /> },
    { id: "dashboard", label: "Dashboard", component: <DashboardExample /> },
    {
      id: "sidebar",
      label: "Sidebar Layout",
      component: <SidebarLayoutExample />,
    },
    { id: "theme", label: "Theme System", component: <ThemeExample /> },
  ];

  return (
    <ThemeProvider initialTheme="light">
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-xl font-bold text-gray-900">
                Flysoft React UI - Ejemplos Comunes
              </h1>
              <ThemeSwitcher />
            </div>

            <div className="flex space-x-1 pb-4">
              {examples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => setActiveExample(example.id)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-md transition-colors
                    ${
                      activeExample === example.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {examples.find((ex) => ex.id === activeExample)?.component}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CommonPatternsShowcase;

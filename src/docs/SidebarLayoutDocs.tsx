import React, { useState } from "react";
import { Card, Checkbox } from "../index";
import { SidebarLayout } from "../templates/layouts/SidebarLayout";
import type { MenuItem, User } from "../templates/layouts/SidebarLayout";

const sampleMenuItems: MenuItem[] = [
  { label: "Dashboard", icon: "fa-home", href: "/" },
  { label: "Usuarios", icon: "fa-users", href: "/users", badge: 5 },
  { label: "Productos", icon: "fa-box", href: "/products" },
  { label: "Pedidos", icon: "fa-shopping-cart", href: "/orders", badge: 12 },
  { label: "Reportes", icon: "fa-chart-bar", href: "/reports" },
  { label: "Configuración", icon: "fa-cog", href: "/settings" },
];

const sampleUser: User = {
  name: "Juan Pérez",
  email: "juan@ejemplo.com",
  avatar: "fa-user",
};

const SidebarLayoutDocs: React.FC = () => {
  const [isCompact, setIsCompact] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="SidebarLayout - Template de Layout con Sidebar">
        <div className="space-y-8">
          <section>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Template pre-construido para layouts con sidebar lateral. Incluye menú
              de navegación con badges, sección de usuario, sidebar colapsable en
              móvil y barra superior con acciones.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Demo
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Checkbox
                label="Modo compacto"
                checked={isCompact}
                onChange={(e) => setIsCompact(e.target.checked)}
              />
            </div>
            <div className="border rounded-lg overflow-hidden" style={{ height: "500px" }}>
              <SidebarLayout
                compact={isCompact}
                title="Mi Aplicación"
                menuItems={sampleMenuItems}
                user={sampleUser}
                onLogout={() => alert("Cerrar sesión")}
              >
                <Card title="Contenido Principal">
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    Este es el área de contenido principal. Navega por el menú lateral
                    para cambiar la sección activa. En pantallas pequeñas, el sidebar
                    se colapsa y puede abrirse con el botón de hamburguesa.
                  </p>
                </Card>
              </SidebarLayout>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso
            </h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`import { SidebarLayout } from "flysoft-react-ui";

const menuItems = [
  { label: "Dashboard", icon: "fa-home", href: "/" },
  { label: "Usuarios", icon: "fa-users", href: "/users", badge: 5 },
];

const user = { name: "Juan Pérez", email: "juan@ejemplo.com", avatar: "fa-user" };

<SidebarLayout
  title="Mi App"
  menuItems={menuItems}
  user={user}
  onLogout={() => handleLogout()}
>
  <div>Contenido principal</div>
</SidebarLayout>`}</code>
            </pre>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props - SidebarLayout
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Prop</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-left p-2">Default</th>
                    <th className="text-left p-2">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2"><code>title</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Título de la aplicación en el sidebar (requerido)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>menuItems</code></td>
                    <td className="p-2"><code>MenuItem[]</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Items del menú de navegación (requerido)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>user</code></td>
                    <td className="p-2"><code>User</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Datos del usuario para la sección inferior (requerido)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>children</code></td>
                    <td className="p-2"><code>ReactNode</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Contenido principal (requerido)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>className</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2"><code>""</code></td>
                    <td className="p-2">Clases CSS adicionales</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>onLogout</code></td>
                    <td className="p-2"><code>() =&gt; void</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Callback al presionar el botón de cerrar sesión</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Interfaces
            </h3>
            <div className="space-y-4">
              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  MenuItem
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Campo</th>
                        <th className="text-left p-2">Tipo</th>
                        <th className="text-left p-2">Descripción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2"><code>label</code></td>
                        <td className="p-2"><code>string</code></td>
                        <td className="p-2">Texto del item</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2"><code>icon</code></td>
                        <td className="p-2"><code>string</code></td>
                        <td className="p-2">Icono FontAwesome</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2"><code>href</code></td>
                        <td className="p-2"><code>string</code></td>
                        <td className="p-2">Ruta de navegación</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2"><code>badge</code></td>
                        <td className="p-2"><code>string | number</code></td>
                        <td className="p-2">Badge opcional junto al label</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2"><code>children</code></td>
                        <td className="p-2"><code>MenuItem[]</code></td>
                        <td className="p-2">Sub-items anidados</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  User
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Campo</th>
                        <th className="text-left p-2">Tipo</th>
                        <th className="text-left p-2">Descripción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2"><code>name</code></td>
                        <td className="p-2"><code>string</code></td>
                        <td className="p-2">Nombre del usuario</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2"><code>email</code></td>
                        <td className="p-2"><code>string</code></td>
                        <td className="p-2">Email del usuario (opcional)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2"><code>avatar</code></td>
                        <td className="p-2"><code>string</code></td>
                        <td className="p-2">Icono FontAwesome para el avatar (opcional)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default SidebarLayoutDocs;

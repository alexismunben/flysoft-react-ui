import React, { useState } from "react";
import { Card, TabsGroup, TabPanel, Button, Badge, Input } from "../index";

const TabsGroupDocs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("");

  const basicTabs = [
    { id: "users", label: "Usuarios" },
    { id: "roles", label: "Roles" },
    { id: "permissions", label: "Permisos" },
  ];

  const tabsWithNumbers = [
    { id: 1, label: "Primero" },
    { id: 2, label: "Segundo" },
    { id: 3, label: "Tercero" },
  ];

  const tabsWithHeader = [
    { id: "dashboard", label: "Dashboard" },
    { id: "analytics", label: "Analytics" },
    { id: "reports", label: "Reportes" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="TabsGroup - Variantes y Ejemplos">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso básico
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente TabsGroup permite organizar contenido en pestañas.
              Cada TabPanel muestra su contenido cuando el tab correspondiente
              está activo.
            </p>
            <Card title="Ejemplo básico">
              <TabsGroup tabs={basicTabs}>
                <TabPanel tabId="users">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Lista de Usuarios
                    </h4>
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Contenido del panel de usuarios. Aquí puedes mostrar una
                      lista, formulario, o cualquier contenido relacionado con
                      usuarios.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="primary" icon="fa-user-plus">
                        Agregar Usuario
                      </Button>
                      <Button variant="outline" icon="fa-search">
                        Buscar
                      </Button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel tabId="roles">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Gestión de Roles
                    </h4>
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Contenido del panel de roles. Aquí puedes gestionar los
                      diferentes roles del sistema.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="primary" icon="fa-shield-alt">
                        Crear Rol
                      </Button>
                      <Button variant="outline" icon="fa-list">
                        Ver Todos
                      </Button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel tabId="permissions">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Permisos del Sistema
                    </h4>
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Contenido del panel de permisos. Aquí puedes configurar
                      los permisos disponibles en el sistema.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="primary" icon="fa-key">
                        Asignar Permisos
                      </Button>
                      <Button variant="outline" icon="fa-cog">
                        Configurar
                      </Button>
                    </div>
                  </div>
                </TabPanel>
              </TabsGroup>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabs con IDs numéricos
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Los tabs pueden usar tanto strings como números como identificadores.
            </p>
            <Card title="Ejemplo con IDs numéricos">
              <TabsGroup tabs={tabsWithNumbers}>
                <TabPanel tabId={1}>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Contenido del Primer Tab
                    </h4>
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Este tab usa el ID numérico 1.
                    </p>
                  </div>
                </TabPanel>
                <TabPanel tabId={2}>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Contenido del Segundo Tab
                    </h4>
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Este tab usa el ID numérico 2.
                    </p>
                  </div>
                </TabPanel>
                <TabPanel tabId={3}>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Contenido del Tercer Tab
                    </h4>
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Este tab usa el ID numérico 3.
                    </p>
                  </div>
                </TabPanel>
              </TabsGroup>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tabs con headerNode
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El prop headerNode permite agregar contenido adicional en la misma
              línea que los tabs, alineado a la derecha. Útil para botones de
              acción, badges, o cualquier otro contenido.
            </p>
            <Card title="Ejemplo con headerNode">
              <TabsGroup
                tabs={tabsWithHeader}
                headerNode={
                  <div className="flex items-center gap-2">
                    <Badge variant="info">Nuevo</Badge>
                    <Button size="sm" variant="primary" icon="fa-plus">
                      Agregar
                    </Button>
                  </div>
                }
              >
                <TabPanel tabId="dashboard">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Dashboard
                    </h4>
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Vista general del sistema con métricas y estadísticas
                      importantes.
                    </p>
                  </div>
                </TabPanel>
                <TabPanel tabId="analytics">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Analytics
                    </h4>
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Análisis detallado de datos y tendencias del sistema.
                    </p>
                  </div>
                </TabPanel>
                <TabPanel tabId="reports">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Reportes
                    </h4>
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Generación y visualización de reportes del sistema.
                    </p>
                  </div>
                </TabPanel>
              </TabsGroup>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con callback onChangeTab
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El prop onChangeTab permite ejecutar una función cuando se cambia
              de tab. Útil para sincronizar estado externo o realizar acciones
              al cambiar de pestaña.
            </p>
            <Card title="Ejemplo con onChangeTab">
              <div className="space-y-4">
                {selectedTab && (
                  <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                    <p className="text-sm">
                      <span className="font-semibold">Tab seleccionado:</span>{" "}
                      <span style={{ color: "var(--flysoft-text-secondary)" }}>
                        {selectedTab}
                      </span>
                    </p>
                  </div>
                )}
                <TabsGroup
                  tabs={basicTabs}
                  onChangeTab={(tab) => setSelectedTab(tab)}
                >
                  <TabPanel tabId="users">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                        Usuarios
                      </h4>
                      <p style={{ color: "var(--flysoft-text-secondary)" }}>
                        Este tab notifica el cambio mediante onChangeTab.
                      </p>
                    </div>
                  </TabPanel>
                  <TabPanel tabId="roles">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                        Roles
                      </h4>
                      <p style={{ color: "var(--flysoft-text-secondary)" }}>
                        Este tab también notifica el cambio mediante onChangeTab.
                      </p>
                    </div>
                  </TabPanel>
                  <TabPanel tabId="permissions">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                        Permisos
                      </h4>
                      <p style={{ color: "var(--flysoft-text-secondary)" }}>
                        Este tab también notifica el cambio mediante onChangeTab.
                      </p>
                    </div>
                  </TabPanel>
                </TabsGroup>
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ejemplo completo con formularios
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Ejemplo práctico usando TabsGroup con TabPanel para organizar
              formularios en diferentes secciones.
            </p>
            <Card title="Formulario de Configuración">
              <TabsGroup
                tabs={[
                  { id: "personal", label: "Personal" },
                  { id: "contact", label: "Contacto" },
                  { id: "security", label: "Seguridad" },
                ]}
                headerNode={
                  <Button size="sm" variant="primary" icon="fa-save">
                    Guardar Cambios
                  </Button>
                }
              >
                <TabPanel tabId="personal">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Información Personal
                    </h4>
                    <div className="space-y-3">
                      <Input
                        label="Nombre"
                        placeholder="Ingresa tu nombre"
                        icon="fa-user"
                      />
                      <Input
                        label="Apellido"
                        placeholder="Ingresa tu apellido"
                        icon="fa-user"
                      />
                      <Input
                        label="Fecha de Nacimiento"
                        type="date"
                        icon="fa-calendar"
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel tabId="contact">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Información de Contacto
                    </h4>
                    <div className="space-y-3">
                      <Input
                        label="Email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        icon="fa-envelope"
                      />
                      <Input
                        label="Teléfono"
                        type="tel"
                        placeholder="+34 600 000 000"
                        icon="fa-phone"
                      />
                      <Input
                        label="Dirección"
                        placeholder="Calle, número, ciudad"
                        icon="fa-map-marker-alt"
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel tabId="security">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      Configuración de Seguridad
                    </h4>
                    <div className="space-y-3">
                      <Input
                        label="Contraseña Actual"
                        type="password"
                        placeholder="Ingresa tu contraseña actual"
                        icon="fa-lock"
                      />
                      <Input
                        label="Nueva Contraseña"
                        type="password"
                        placeholder="Ingresa tu nueva contraseña"
                        icon="fa-key"
                      />
                      <Input
                        label="Confirmar Contraseña"
                        type="password"
                        placeholder="Confirma tu nueva contraseña"
                        icon="fa-key"
                      />
                    </div>
                  </div>
                </TabPanel>
              </TabsGroup>
            </Card>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default TabsGroupDocs;


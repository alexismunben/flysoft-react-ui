import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, TabsGroup, TabPanel, Button, Badge, Input, Checkbox } from "../index";

const UrlSyncExample: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlTab = searchParams.get("tab");

  const tabsForUrl = [
    { id: "overview", label: "Resumen" },
    { id: "details", label: "Detalles" },
    { id: "settings", label: "Configuración" },
  ];

  return (
    <div className="space-y-4">
      {urlTab && (
        <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
          <p className="text-sm">
            <span className="font-semibold">Tab desde URL:</span>{" "}
            <span style={{ color: "var(--flysoft-text-secondary)" }}>
              {urlTab}
            </span>
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--flysoft-text-secondary)" }}
          >
            URL actual:{" "}
            <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
              ?tab={urlTab}
            </code>
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: "var(--flysoft-text-secondary)" }}
          >
            💡 Prueba cambiar de tab y observa cómo se actualiza la URL. También
            puedes recargar la página con{" "}
            <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
              ?tab=details
            </code>
            en la URL para ver cómo se carga directamente ese tab.
          </p>
        </div>
      )}
      {!urlTab && (
        <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
          <p
            className="text-sm"
            style={{ color: "var(--flysoft-text-secondary)" }}
          >
            💡 Cambia de tab y observa cómo se actualiza la URL. También puedes
            agregar{" "}
            <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
              ?tab=details
            </code>
            manualmente en la URL para cargar directamente ese tab.
          </p>
        </div>
      )}
      <TabsGroup tabs={tabsForUrl} paramName="tab">
        <TabPanel tabId="overview">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Resumen General
            </h4>
            <p style={{ color: "var(--flysoft-text-secondary)" }}>
              Este es el tab de resumen. Cuando este tab esté activo, la URL
              mostrará{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                ?tab=overview
              </code>
              .
            </p>
            <div className="flex gap-2">
              <Button variant="primary" icon="fa-chart-bar">
                Ver Estadísticas
              </Button>
              <Button variant="outline" icon="fa-download">
                Exportar
              </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel tabId="details">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Detalles Completos
            </h4>
            <p style={{ color: "var(--flysoft-text-secondary)" }}>
              Este es el tab de detalles. Cuando este tab esté activo, la URL
              mostrará{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                ?tab=details
              </code>
              .
            </p>
            <p style={{ color: "var(--flysoft-text-secondary)" }}>
              Si recargas la página con{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                ?tab=details
              </code>
              en la URL, este tab se cargará automáticamente.
            </p>
            <div className="flex gap-2">
              <Button variant="primary" icon="fa-info-circle">
                Más Información
              </Button>
              <Button variant="outline" icon="fa-edit">
                Editar
              </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel tabId="settings">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Configuración
            </h4>
            <p style={{ color: "var(--flysoft-text-secondary)" }}>
              Este es el tab de configuración. Cuando este tab esté activo, la
              URL mostrará{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                ?tab=settings
              </code>
              .
            </p>
            <div className="flex gap-2">
              <Button variant="primary" icon="fa-cog">
                Configurar
              </Button>
              <Button variant="outline" icon="fa-save">
                Guardar
              </Button>
            </div>
          </div>
        </TabPanel>
      </TabsGroup>
    </div>
  );
};

const TabsGroupDocs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [isCompact, setIsCompact] = useState(false);

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
          <div className="flex items-center gap-4 mb-4">
            <Checkbox
              label="Modo compacto"
              checked={isCompact}
              onChange={(e) => setIsCompact(e.target.checked)}
            />
          </div>
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
              <TabsGroup tabs={basicTabs} compact={isCompact}>
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
              Los tabs pueden usar tanto strings como números como
              identificadores.
            </p>
            <Card title="Ejemplo con IDs numéricos">
              <TabsGroup tabs={tabsWithNumbers} compact={isCompact}>
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
                compact={isCompact}
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
                  compact={isCompact}
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
                        Este tab también notifica el cambio mediante
                        onChangeTab.
                      </p>
                    </div>
                  </TabPanel>
                  <TabPanel tabId="permissions">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                        Permisos
                      </h4>
                      <p style={{ color: "var(--flysoft-text-secondary)" }}>
                        Este tab también notifica el cambio mediante
                        onChangeTab.
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
              Sincronización con URL (paramName)
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El prop{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                paramName
              </code>{" "}
              permite sincronizar el tab activo con los parámetros de la URL.
              Cuando cambias de tab, se actualiza la URL automáticamente. Si la
              URL ya contiene el parámetro al cargar la página, se mostrará el
              tab correspondiente. Esto es útil para compartir enlaces directos
              a un tab específico o para mantener el estado al navegar con el
              botón atrás/adelante del navegador.
            </p>
            <Card title="Ejemplo con sincronización de URL">
              <UrlSyncExample />
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
                compact={isCompact}
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

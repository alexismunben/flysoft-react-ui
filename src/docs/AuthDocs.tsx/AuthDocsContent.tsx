import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Card, DataField, Badge } from "../../components";

export const AuthDocsContent = () => {
  const { login, isAuthenticated, isLoading, user, logout } =
    useContext(AuthContext);

  const handleLogin = async () => {
    await login("usuario@ejemplo.com", "password123");
  };

  const handleLogout = () => {
    logout();
  };

  // Sección de documentación de interfaces (siempre visible)
  const InterfacesDocumentation = () => (
    <div className="space-y-4 mb-6">
      <Card
        title="Interfaces de TypeScript"
        subtitle="Estructuras de datos utilizadas por el AuthContext"
      >
        <div className="space-y-6">
          {/* AuthTokenInterface */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary" icon="fa-code" size="sm">
                Interface
              </Badge>
              <code className="text-sm font-mono text-[var(--color-primary)] font-semibold">
                AuthTokenInterface
              </code>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Define la estructura de los datos del token de autenticación
              devueltos por el servicio de autenticación.
            </p>
            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4 border border-[var(--color-border-default)]">
              <div className="space-y-2">
                <DataField
                  label="accessToken"
                  value={
                    <span className="text-xs font-mono">
                      string | undefined
                    </span>
                  }
                />
                <p className="text-xs text-[var(--color-text-secondary)] ml-2">
                  Token de acceso utilizado para autenticar las solicitudes
                  HTTP.
                </p>

                <div className="pt-2 border-t border-[var(--color-border-default)]">
                  <DataField
                    label="tokenType"
                    value={
                      <span className="text-xs font-mono">
                        string | undefined
                      </span>
                    }
                  />
                  <p className="text-xs text-[var(--color-text-secondary)] ml-2">
                    Tipo de token (generalmente "Bearer").
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--color-border-default)]">
                  <DataField
                    label="expires"
                    value={
                      <span className="text-xs font-mono">
                        string | undefined
                      </span>
                    }
                  />
                  <p className="text-xs text-[var(--color-text-secondary)] ml-2">
                    Fecha de expiración del token en formato ISO 8601.
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--color-border-default)]">
                  <DataField
                    label="refreshToken"
                    value={
                      <span className="text-xs font-mono">
                        string | undefined
                      </span>
                    }
                  />
                  <p className="text-xs text-[var(--color-text-secondary)] ml-2">
                    Token de actualización utilizado para obtener un nuevo token
                    de acceso cuando el actual expira.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AuthContextUserInterface */}
          <div className="pt-4 border-t border-[var(--color-border-default)]">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary" icon="fa-code" size="sm">
                Interface
              </Badge>
              <code className="text-sm font-mono text-[var(--color-primary)] font-semibold">
                AuthContextUserInterface
              </code>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Define la estructura de los datos del usuario autenticado que se
              almacenan en el contexto.
            </p>
            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4 border border-[var(--color-border-default)]">
              <div className="space-y-2">
                <DataField
                  label="id"
                  value={
                    <span className="text-xs font-mono">
                      number | undefined
                    </span>
                  }
                />
                <p className="text-xs text-[var(--color-text-secondary)] ml-2">
                  Identificador único del usuario.
                </p>

                <div className="pt-2 border-t border-[var(--color-border-default)]">
                  <DataField
                    label="name"
                    value={
                      <span className="text-xs font-mono">
                        string | undefined
                      </span>
                    }
                  />
                  <p className="text-xs text-[var(--color-text-secondary)] ml-2">
                    Nombre del usuario.
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--color-border-default)]">
                  <DataField
                    label="aditionalData"
                    value={
                      <span className="text-xs font-mono">any | undefined</span>
                    }
                  />
                  <p className="text-xs text-[var(--color-text-secondary)] ml-2">
                    Objeto que puede contener datos adicionales del usuario
                    (roles, permisos, email, etc.). Es flexible y puede
                    adaptarse a las necesidades específicas de cada aplicación.
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--color-border-default)]">
                  <DataField
                    label="token"
                    value={
                      <span className="text-xs font-mono">
                        AuthTokenInterface | undefined
                      </span>
                    }
                  />
                  <p className="text-xs text-[var(--color-text-secondary)] ml-2">
                    Objeto de token que contiene el{" "}
                    <code className="text-xs bg-white/50 px-1 rounded">
                      AuthTokenInterface
                    </code>{" "}
                    con la información de autenticación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <InterfacesDocumentation />
        <Card>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <i className="fal fa-spinner fa-spin text-[var(--color-primary)] text-xl"></i>
              <span className="text-[var(--color-text-secondary)]">
                Iniciando sesión...
              </span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="space-y-4">
        <InterfacesDocumentation />
        <Card
          title="Sesión Activa"
          subtitle="Información del usuario autenticado"
          headerActions={
            <Badge variant="success" icon="fa-check-circle" iconPosition="left">
              Autenticado
            </Badge>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DataField label="ID de Usuario" value={user.id} />
              <DataField label="Nombre" value={user.name || "No disponible"} />
            </div>

            {user.aditionalData && (
              <div className="mt-4 pt-4 border-t border-[var(--color-border-default)]">
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
                  Datos Adicionales
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.aditionalData.role && (
                    <DataField
                      label="Rol"
                      value={
                        <Badge variant="primary" icon="fa-user-shield">
                          {user.aditionalData.role}
                        </Badge>
                      }
                    />
                  )}
                  {user.aditionalData.email && (
                    <DataField label="Email" value={user.aditionalData.email} />
                  )}
                  {user.aditionalData.createdAt && (
                    <DataField
                      label="Fecha de Creación"
                      value={new Date(
                        user.aditionalData.createdAt
                      ).toLocaleString()}
                    />
                  )}
                  {user.aditionalData.permissions && (
                    <DataField
                      label="Permisos"
                      value={
                        <div className="flex flex-wrap gap-2">
                          {user.aditionalData.permissions.map(
                            (permission: string, index: number) => (
                              <Badge
                                key={index}
                                variant="info"
                                size="sm"
                                icon="fa-key"
                              >
                                {permission}
                              </Badge>
                            )
                          )}
                        </div>
                      }
                    />
                  )}
                </div>
              </div>
            )}

            {user.token && (
              <div className="mt-4 pt-4 border-t border-[var(--color-border-default)]">
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
                  Información del Token
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DataField
                    label="Tipo de Token"
                    value={
                      <Badge variant="secondary" icon="fa-tag">
                        {user.token.tokenType || "Bearer"}
                      </Badge>
                    }
                  />
                  {user.token.expires && (
                    <DataField
                      label="Expira"
                      value={new Date(user.token.expires).toLocaleString()}
                    />
                  )}
                  {user.token.accessToken && (
                    <DataField
                      label="Access Token"
                      value={
                        <code className="text-xs bg-[var(--color-bg-secondary)] px-2 py-1 rounded break-all">
                          {user.token.accessToken.substring(0, 30)}...
                        </code>
                      }
                    />
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[var(--color-border-default)]">
              <Button
                variant="outline"
                icon="fa-sign-out-alt"
                iconPosition="left"
                onClick={handleLogout}
                className="w-full md:w-auto"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>          
        </Card>        
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <InterfacesDocumentation />
      <Card
        title="Autenticación"
        subtitle="Inicia sesión para ver el AuthContext en acción"
      >
        <div className="space-y-4">
          <div className="bg-[var(--color-info-light)] border border-[var(--color-info)] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <i className="fal fa-info-circle text-[var(--color-info)] mt-1"></i>
              <div className="flex-1">
                <p className="text-sm text-[var(--color-text-primary)]">
                  Esta es una demostración del{" "}
                  <code className="text-xs bg-white/50 px-1 rounded">
                    AuthContext
                  </code>{" "}
                  usando un servicio mock. Haz clic en el botón para simular un
                  inicio de sesión.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              variant="primary"
              size="lg"
              icon="fa-sign-in-alt"
              iconPosition="left"
              onClick={handleLogin}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>        
      </Card>
    </div>
  );
};

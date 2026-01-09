import React from "react";
import { Card, Button, SnackbarProvider, SnackbarContainer, useSnackbar } from "../index";

// Componente wrapper para usar el hook dentro del provider
const SnackbarExamples: React.FC = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <div className="space-y-8">
      <section>
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--flysoft-text-primary)" }}
        >
          Variantes
        </h3>
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--flysoft-text-secondary)" }}
        >
          Los snackbars soportan las mismas variantes que el componente Badge:
          <code>primary</code>, <code>secondary</code>, <code>success</code>,{" "}
          <code>warning</code>, <code>danger</code>, e <code>info</code>.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() =>
              showSnackbar("Mensaje de información primaria", "primary")
            }
          >
            Primary
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              showSnackbar("Mensaje secundario", "secondary")
            }
          >
            Secondary
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              showSnackbar("Operación completada exitosamente", "success")
            }
          >
            Success
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              showSnackbar("Advertencia: revisa esta acción", "warning")
            }
          >
            Warning
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              showSnackbar("Error al procesar la solicitud", "danger")
            }
          >
            Danger
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              showSnackbar("Información adicional disponible", "info")
            }
          >
            Info
          </Button>
        </div>
      </section>

      <section>
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--flysoft-text-primary)" }}
        >
          Con íconos personalizados
        </h3>
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--flysoft-text-secondary)" }}
        >
          Puedes especificar un ícono personalizado usando clases de FontAwesome
          5. Si no especificas un ícono, se usa uno por defecto según la
          variante.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            icon="fa-star"
            onClick={() =>
              showSnackbar("¡Favorito agregado!", "success", {
                icon: "fa-star",
                iconLabel: "Favorito",
              })
            }
          >
            Con ícono estrella
          </Button>
          <Button
            variant="primary"
            icon="fa-bell"
            onClick={() =>
              showSnackbar("Nueva notificación recibida", "info", {
                icon: "fa-bell",
                iconLabel: "Notificación",
              })
            }
          >
            Con ícono campana
          </Button>
          <Button
            variant="primary"
            icon="fa-download"
            onClick={() =>
              showSnackbar("Descarga completada", "success", {
                icon: "fa-download",
                iconLabel: "Descarga",
              })
            }
          >
            Con ícono descarga
          </Button>
          <Button
            variant="primary"
            icon="fa-save"
            onClick={() =>
              showSnackbar("Cambios guardados correctamente", "success", {
                icon: "fa-save",
                iconLabel: "Guardado",
              })
            }
          >
            Con ícono guardar
          </Button>
        </div>
      </section>

      <section>
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--flysoft-text-primary)" }}
        >
          Duración personalizada
        </h3>
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--flysoft-text-secondary)" }}
        >
          Por defecto, los snackbars se muestran durante 3 segundos. Puedes
          personalizar la duración en milisegundos. Usa <code>0</code> para que
          no se cierren automáticamente.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() =>
              showSnackbar("Este snackbar dura 2 segundos", "info", {
                duration: 2000,
              })
            }
          >
            2 segundos
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              showSnackbar("Este snackbar dura 10 segundos", "warning", {
                duration: 10000,
              })
            }
          >
            10 segundos
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              showSnackbar(
                "Este snackbar no se cierra automáticamente",
                "success",
                {
                  duration: 0,
                }
              )
            }
          >
            Sin auto-cierre
          </Button>
        </div>
      </section>

      <section>
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--flysoft-text-primary)" }}
        >
          Mensajes largos
        </h3>
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--flysoft-text-secondary)" }}
        >
          Los snackbars tienen un ancho fijo de 18rem. Los mensajes largos se
          ajustan automáticamente ocupando varios renglones sin estirar el
          snackbar.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() =>
              showSnackbar(
                "Este es un mensaje muy largo que debería ocupar varios renglones en el snackbar sin estirarlo, manteniendo el ancho fijo de 18rem.",
                "info"
              )
            }
          >
            Mensaje largo
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              showSnackbar(
                "Este es otro ejemplo de mensaje extenso que demuestra cómo el texto se ajusta automáticamente dentro del snackbar, permitiendo que el contenido sea legible sin afectar el diseño.",
                "warning",
                {
                  icon: "fa-exclamation-triangle",
                }
              )
            }
          >
            Mensaje muy largo
          </Button>
        </div>
      </section>

      <section>
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--flysoft-text-primary)" }}
        >
          Múltiples snackbars
        </h3>
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--flysoft-text-secondary)" }}
        >
          Puedes mostrar múltiples snackbars simultáneamente. Los nuevos
          aparecen abajo y los antiguos arriba. La barra de progreso se pausa
          cuando pasas el mouse sobre un snackbar.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            onClick={() => {
              showSnackbar("Primer snackbar", "success");
              setTimeout(() => showSnackbar("Segundo snackbar", "info"), 500);
              setTimeout(() => showSnackbar("Tercer snackbar", "warning"), 1000);
            }}
          >
            Mostrar 3 snackbars
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              for (let i = 1; i <= 5; i++) {
                setTimeout(
                  () =>
                    showSnackbar(`Snackbar número ${i}`, "primary", {
                      duration: 3000,
                    }),
                  i * 300
                );
              }
            }}
          >
            Mostrar 5 snackbars
          </Button>
        </div>
      </section>

      <section>
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--flysoft-text-primary)" }}
        >
          Casos de uso comunes
        </h3>
        <div className="space-y-4">
          <div>
            <h4
              className="text-md font-medium mb-2"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Operación exitosa
            </h4>
            <Button
              variant="primary"
              icon="fa-check"
              onClick={() =>
                showSnackbar("Los cambios se guardaron correctamente", "success", {
                  icon: "fa-check-circle",
                })
              }
            >
              Guardar cambios
            </Button>
          </div>

          <div>
            <h4
              className="text-md font-medium mb-2"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Error de validación
            </h4>
            <Button
              variant="primary"
              icon="fa-exclamation-triangle"
              onClick={() =>
                showSnackbar(
                  "Por favor, completa todos los campos requeridos",
                  "danger",
                  {
                    icon: "fa-times-circle",
                    duration: 6000,
                  }
                )
              }
            >
              Validar formulario
            </Button>
          </div>

          <div>
            <h4
              className="text-md font-medium mb-2"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Información importante
            </h4>
            <Button
              variant="primary"
              icon="fa-info-circle"
              onClick={() =>
                showSnackbar(
                  "Tu sesión expirará en 5 minutos. Guarda tu trabajo.",
                  "warning",
                  {
                    icon: "fa-clock",
                    duration: 8000,
                  }
                )
              }
            >
              Mostrar advertencia
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--flysoft-text-primary)" }}
        >
          Posiciones del contenedor
        </h3>
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--flysoft-text-secondary)" }}
        >
          El <code>SnackbarContainer</code> puede posicionarse en diferentes
          lugares de la pantalla. En esta documentación está configurado en{" "}
          <code>top-right</code>. Las opciones disponibles son:
        </p>
        <ul
          className="list-disc list-inside space-y-1 text-sm mb-4"
          style={{ color: "var(--flysoft-text-secondary)" }}
        >
          <li>
            <code>top-right</code> - Esquina superior derecha (por defecto)
          </li>
          <li>
            <code>top-left</code> - Esquina superior izquierda
          </li>
          <li>
            <code>bottom-right</code> - Esquina inferior derecha
          </li>
          <li>
            <code>bottom-left</code> - Esquina inferior izquierda
          </li>
          <li>
            <code>top-center</code> - Centro superior
          </li>
          <li>
            <code>bottom-center</code> - Centro inferior
          </li>
        </ul>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <code className="text-sm">
            {`<SnackbarContainer position="top-right" />`}
          </code>
        </div>
      </section>

      <section>
        <h3
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--flysoft-text-primary)" }}
        >
          Características
        </h3>
        <ul
          className="list-disc list-inside space-y-2 text-sm"
          style={{ color: "var(--flysoft-text-secondary)" }}
        >
          <li>
            <strong>Ancho fijo:</strong> 18rem (288px)
          </li>
          <li>
            <strong>Barra de progreso:</strong> Muestra el tiempo restante en el
            borde inferior con el color de la variante
          </li>
          <li>
            <strong>Auto-cierre:</strong> Se cierra automáticamente después de
            la duración especificada (default: 3 segundos)
          </li>
          <li>
            <strong>Pausa al hover:</strong> La barra de progreso se pausa
            cuando pasas el mouse sobre el snackbar
          </li>
          <li>
            <strong>Cierre manual:</strong> Botón X en la esquina superior
            derecha
          </li>
          <li>
            <strong>Íconos:</strong> Soporte para íconos FontAwesome 5 con
            íconos por defecto según la variante
          </li>
          <li>
            <strong>Mensajes largos:</strong> El texto se ajusta automáticamente
            en múltiples líneas
          </li>
          <li>
            <strong>Múltiples snackbars:</strong> Soporte para mostrar varios
            snackbars apilados verticalmente
          </li>
          <li>
            <strong>Posiciones:</strong> Configurable en el SnackbarContainer
            (top-right, top-left, bottom-right, bottom-left, top-center,
            bottom-center)
          </li>
        </ul>
      </section>
    </div>
  );
};

const SnackbarDocs: React.FC = () => {
  return (
    <SnackbarProvider>
      <div className="max-w-5xl mx-auto space-y-8">
        <Card title="Snackbar - Notificaciones y Mensajes">
          <SnackbarExamples />
        </Card>
      </div>
      <SnackbarContainer position="top-right" />
    </SnackbarProvider>
  );
};

export default SnackbarDocs;


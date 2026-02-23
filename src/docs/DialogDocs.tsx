import React, { useState } from "react";
import { Card, Dialog, Button, Input, Badge } from "../index";

const DialogDocs: React.FC = () => {
  const [isOpenBasic, setIsOpenBasic] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isOpenNoOverlay, setIsOpenNoOverlay] = useState(false);
  const [isOpenCustom, setIsOpenCustom] = useState(false);
  const [isOpenCompact, setIsOpenCompact] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Dialog - Variantes y Ejemplos">
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
              El componente Dialog muestra un modal centrado con overlay. Se
              controla mediante la prop <code>isOpen</code> y se cierra con{" "}
              <code>onClose</code>. El contenido se pasa como{" "}
              <code>children</code>.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-window-maximize"
                onClick={() => setIsOpenBasic(true)}
              >
                Abrir Dialog Básico
              </Button>
              <Dialog
                isOpen={isOpenBasic}
                title="Dialog Básico"
                footer={
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsOpenBasic(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setIsOpenBasic(false)}
                    >
                      Aceptar
                    </Button>
                  </>
                }
                onClose={() => setIsOpenBasic(false)}
              >
                <div className="space-y-3">
                  <p style={{ color: "var(--flysoft-text-secondary)" }}>
                    Este es un ejemplo de dialog básico. Puedes incluir
                    cualquier contenido como <code>children</code>.
                  </p>
                  <p style={{ color: "var(--flysoft-text-secondary)" }}>
                    El dialog se puede cerrar haciendo clic en el overlay, en el
                    botón de cerrar (X), o presionando la tecla Escape.
                  </p>
                </div>
              </Dialog>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Modo Compacto
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El prop <code>compact</code> reduce los paddings del header, body
              y footer, permitiendo mostrar más contenido en menos espacio.
              Ideal para formularios densos.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-compress-alt"
                onClick={() => setIsOpenCompact(true)}
              >
                Abrir Dialog Compacto
              </Button>
              <Dialog
                isOpen={isOpenCompact}
                compact={true}
                title="Dialog Modo Compacto"
                footer={
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsOpenCompact(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setIsOpenCompact(false)}
                    >
                      Aceptar
                    </Button>
                  </>
                }
                onClose={() => setIsOpenCompact(false)}
              >
                <div className="space-y-3">
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    Este es un ejemplo de dialog en modo compacto. El padding
                    interno es reducido para optimizar el espacio.
                  </p>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                    <p className="text-xs text-gray-500 italic">
                      Este modo es ideal para modales que contienen formularios
                      complejos o tablas.
                    </p>
                  </div>
                </div>
              </Dialog>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Dialog con formulario
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Ejemplo de dialog que contiene un formulario completo con campos
              de entrada.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-edit"
                onClick={() => setIsOpenForm(true)}
              >
                Abrir Dialog con Formulario
              </Button>
              <Dialog
                isOpen={isOpenForm}
                title="Editar Usuario"
                footer={
                  <>
                    <Button
                      variant="outline"
                      icon="fa-times"
                      onClick={() => setIsOpenForm(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      icon="fa-save"
                      onClick={() => setIsOpenForm(false)}
                    >
                      Guardar Cambios
                    </Button>
                  </>
                }
                onClose={() => setIsOpenForm(false)}
              >
                <div className="space-y-4">
                  <Input
                    label="Nombre"
                    placeholder="Ingresa el nombre"
                    icon="fa-user"
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    icon="fa-envelope"
                  />
                  <Input
                    label="Teléfono"
                    type="tel"
                    placeholder="+34 600 000 000"
                    icon="fa-phone"
                  />
                </div>
              </Dialog>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Dialog de confirmación
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Ejemplo de dialog usado para confirmar una acción importante.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-trash"
                onClick={() => setIsOpenConfirm(true)}
              >
                Eliminar Item
              </Button>
              <Dialog
                isOpen={isOpenConfirm}
                title={
                  <div className="flex items-center gap-2">
                    <i className="fal fa-exclamation-triangle text-[var(--color-danger)]" />
                    <span>Confirmar Eliminación</span>
                  </div>
                }
                footer={
                  <>
                    <Button
                      variant="outline"
                      icon="fa-times"
                      onClick={() => setIsOpenConfirm(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      icon="fa-trash"
                      onClick={() => setIsOpenConfirm(false)}
                    >
                      Eliminar
                    </Button>
                  </>
                }
                onClose={() => setIsOpenConfirm(false)}
              >
                <div className="space-y-3">
                  <p style={{ color: "var(--flysoft-text-secondary)" }}>
                    ¿Estás seguro de que deseas eliminar este elemento? Esta
                    acción no se puede deshacer.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="danger" icon="fa-exclamation-circle">
                      Acción irreversible
                    </Badge>
                  </div>
                </div>
              </Dialog>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Dialog sin cerrar al hacer clic en overlay
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usando <code>closeOnOverlayClick={false}</code> el dialog solo se
              puede cerrar mediante el botón de cerrar, los botones de acción, o
              la tecla Escape.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-lock"
                onClick={() => setIsOpenNoOverlay(true)}
              >
                Abrir Dialog (sin cerrar en overlay)
              </Button>
              <Dialog
                isOpen={isOpenNoOverlay}
                title="Dialog Protegido"
                footer={
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsOpenNoOverlay(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setIsOpenNoOverlay(false)}
                    >
                      Continuar
                    </Button>
                  </>
                }
                onClose={() => setIsOpenNoOverlay(false)}
                closeOnOverlayClick={false}
              >
                <div className="space-y-3">
                  <p style={{ color: "var(--flysoft-text-secondary)" }}>
                    Este dialog no se cierra al hacer clic en el overlay. Debes
                    usar el botón de cerrar o los botones de acción.
                  </p>
                  <p style={{ color: "var(--flysoft-text-secondary)" }}>
                    Útil para formularios importantes donde no quieres que el
                    usuario cierre accidentalmente el dialog.
                  </p>
                </div>
              </Dialog>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Dialog con título personalizado
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El prop <code>title</code> acepta un ReactNode, permitiendo
              incluir iconos, badges u otros componentes.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-star"
                onClick={() => setIsOpenCustom(true)}
              >
                Abrir Dialog Personalizado
              </Button>
              <Dialog
                isOpen={isOpenCustom}
                title={
                  <div className="flex items-center gap-2">
                    <i className="fal fa-info-circle text-[var(--color-primary)]" />
                    <span>Información Importante</span>
                    <Badge variant="info" size="sm">
                      Nuevo
                    </Badge>
                  </div>
                }
                footer={
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      icon="fa-bookmark"
                      onClick={() => setIsOpenCustom(false)}
                    >
                      Guardar para después
                    </Button>
                    <Button
                      variant="primary"
                      icon="fa-check"
                      onClick={() => setIsOpenCustom(false)}
                    >
                      Entendido
                    </Button>
                  </div>
                }
                onClose={() => setIsOpenCustom(false)}
              >
                <div className="space-y-3">
                  <p style={{ color: "var(--flysoft-text-secondary)" }}>
                    Este dialog muestra cómo puedes personalizar el título
                    usando ReactNode, incluyendo iconos y badges.
                  </p>
                  <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                    <p
                      className="text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      <i className="fal fa-lightbulb mr-2" />
                      Puedes usar cualquier componente React en el título,
                      children y acciones.
                    </p>
                  </div>
                </div>
              </Dialog>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Características
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                <ul
                  className="list-disc list-inside space-y-2 text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  <li>
                    <strong>Overlay con blur:</strong> El overlay tiene un
                    efecto de desenfoque (backdrop-blur) para mejor enfoque
                    visual
                  </li>
                  <li>
                    <strong>Cierre múltiple:</strong> Se puede cerrar haciendo
                    clic en el overlay, en el botón X, en los botones de acción,
                    o presionando Escape
                  </li>
                  <li>
                    <strong>Prevención de scroll:</strong> Cuando el dialog está
                    abierto, se previene el scroll del body
                  </li>
                  <li>
                    <strong>Responsive:</strong> El dialog se adapta a
                    diferentes tamaños de pantalla con padding adecuado
                  </li>
                  <li>
                    <strong>Accesibilidad:</strong> Incluye atributos ARIA para
                    mejor accesibilidad
                  </li>
                  <li>
                    <strong>Contenido flexible:</strong> El body tiene scroll
                    automático si el contenido es muy largo
                  </li>
                  <li>
                    <strong>Modo Compacto:</strong> Soporte para paddings
                    reducidos mediante la prop <code>compact</code>, ideal para
                    interfaces de alta densidad
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default DialogDocs;

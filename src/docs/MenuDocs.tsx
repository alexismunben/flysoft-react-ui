import React, { useState } from "react";
import { Card, Menu, Badge } from "../index";

interface BasicOption {
    label: string;
    id: string;
}

interface ActionOption {
    label: string;
    icon: string;
    action: string;
}

interface UserOption {
    id: number;
    name: string;
    email: string;
    role: string;
}

const MenuDocs: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<BasicOption | null>(null);

    // Opciones básicas
    const basicOptions: BasicOption[] = [
        { label: "Dashboard", id: "dashboard" },
        { label: "Configuración", id: "settings" },
        { label: "Perfil", id: "profile" },
        { label: "Ayuda", id: "help" },
    ];

    // Opciones con iconos
    const optionsWithIcons: ActionOption[] = [
        { label: "Editar", icon: "fa-edit", action: "edit" },
        { label: "Eliminar", icon: "fa-trash", action: "delete" },
        { label: "Compartir", icon: "fa-share", action: "share" },
    ];

    // Opciones complejas
    const userOptions: UserOption[] = [
        { id: 1, name: "Juan Pérez", email: "juan@ejemplo.com", role: "Admin" },
        { id: 2, name: "María García", email: "maria@ejemplo.com", role: "User" },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <Card title="Menu - Lista de Opciones">
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
                            El componente Menu muestra una lista vertical de opciones. Es la versión estática y siempre visible del contenido de un DropdownMenu.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-8">
                                <Menu<BasicOption>
                                    options={basicOptions}
                                    onOptionSelected={(item) => setSelectedItem(item)}
                                />

                                {selectedItem && (
                                    <div className="p-4 border rounded bg-[var(--color-bg-secondary)]">
                                        <p className="text-sm font-semibold">Seleccionado:</p>
                                        <p className="text-sm">{selectedItem.label} ({selectedItem.id})</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3
                            className="text-lg font-semibold mb-4"
                            style={{ color: "var(--flysoft-text-primary)" }}
                        >
                            Personalización con renderOption
                        </h3>
                        <p
                            className="mb-4 text-sm"
                            style={{ color: "var(--flysoft-text-secondary)" }}
                        >
                            Puedes personalizar completamente cómo se renderiza cada opción.
                        </p>
                        <div className="space-y-4">
                            <Menu<ActionOption>
                                options={optionsWithIcons}
                                onOptionSelected={(item) => console.log(item)}
                                renderOption={(item) => (
                                    <div className="flex items-center">
                                        <i className={`fa ${item.icon} w-6`} />
                                        <span>{item.label}</span>
                                    </div>
                                )}
                            />
                        </div>
                    </section>

                    <section>
                        <h3
                            className="text-lg font-semibold mb-4"
                            style={{ color: "var(--flysoft-text-primary)" }}
                        >
                            Uso de getOptionLabel
                        </h3>
                        <p
                            className="mb-4 text-sm"
                            style={{ color: "var(--flysoft-text-secondary)" }}
                        >
                            Si tus objetos no tienen una propiedad `label`, puedes usar `getOptionLabel`.
                        </p>
                        <div className="space-y-4">
                            <Menu<UserOption>
                                options={userOptions}
                                onOptionSelected={(item) => console.log(item)}
                                getOptionLabel={(item) => item.name}
                                renderOption={(item) => (
                                    <div className="flex justify-between items-center w-full min-w-[200px]">
                                        <div>
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-xs text-[var(--flysoft-text-secondary)]">{item.email}</div>
                                        </div>
                                        <Badge variant={item.role === 'Admin' ? 'primary' : 'secondary'} size="sm">
                                            {item.role}
                                        </Badge>
                                    </div>
                                )}
                            />
                        </div>
                    </section>
                    <section>
                        <h3
                            className="text-lg font-semibold mb-4"
                            style={{ color: "var(--flysoft-text-primary)" }}
                        >
                            Personalización de Estilos
                        </h3>
                        <p
                            className="mb-4 text-sm"
                            style={{ color: "var(--flysoft-text-secondary)" }}
                        >
                            Puedes usar la propiedad `className` para sobreescribir los estilos por defecto usando clases de Tailwind.
                            Por ejemplo, puedes cambiar el color de fondo, quitar el borde o sombra, etc.
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-8 flex-wrap">
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Fondo Oscuro</h4>
                                    <Menu<BasicOption>
                                        options={basicOptions}
                                        onOptionSelected={(item) => setSelectedItem(item)}
                                        className="bg-gray-800 border-gray-700 text-white"
                                        itemClassName="text-gray-200 hover:bg-gray-700 hover:text-white"
                                        renderOption={(item) => (
                                            <span>{item.label}</span>
                                        )}
                                    />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Sin Borde ni Sombra</h4>
                                    <Menu<BasicOption>
                                        options={basicOptions}
                                        onOptionSelected={(item) => setSelectedItem(item)}
                                        className="border-0 shadow-none bg-blue-50"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Estilo Destacado</h4>
                                    <Menu<BasicOption>
                                        options={basicOptions}
                                        onOptionSelected={(item) => setSelectedItem(item)}
                                        className="bg-indigo-50 border-indigo-200 shadow-md"
                                        renderOption={(item) => (
                                            <span className="text-indigo-800 font-medium">{item.label}</span>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Card>
        </div>
    );
};

export default MenuDocs;

import React from "react";
import "flysoft-react-ui/styles";
/**
 * Template de Patrón de Formulario Reutilizable
 *
 * Este patrón proporciona una estructura base para cualquier formulario
 * con validación, estados de carga y manejo de errores.
 *
 * Ejemplo de uso:
 * ```tsx
 * import { FormPattern } from "flysoft-react-ui/templates/patterns/FormPattern";
 *
 * function MyForm() {
 *   const fields = [
 *     { name: "name", label: "Nombre", type: "text", icon: "fa-user", required: true },
 *     { name: "email", label: "Email", type: "email", icon: "fa-envelope", required: true },
 *   ];
 *
 *   return (
 *     <FormPattern
 *       title="Mi Formulario"
 *       fields={fields}
 *       onSubmit={handleSubmit}
 *       submitText="Guardar"
 *     />
 *   );
 * }
 * ```
 */
export interface FormField {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    icon?: string;
    required?: boolean;
    validation?: (value: string) => string | undefined;
    multiline?: boolean;
    rows?: number;
}
export interface FormPatternProps {
    title: string;
    subtitle?: string;
    fields: FormField[];
    onSubmit: (data: Record<string, string>) => void;
    submitText?: string;
    submitIcon?: string;
    loading?: boolean;
    error?: string;
    success?: boolean;
    className?: string;
    gridCols?: 1 | 2;
}
export declare const FormPattern: React.FC<FormPatternProps>;
//# sourceMappingURL=FormPattern.d.ts.map
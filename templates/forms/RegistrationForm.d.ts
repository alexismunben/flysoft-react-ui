import React from "react";
import "flysoft-react-ui/styles";
/**
 * Template de Formulario de Registro
 *
 * Ejemplo de uso:
 * ```tsx
 * import { RegistrationForm } from "flysoft-react-ui/templates/forms/RegistrationForm";
 *
 * function App() {
 *   return <RegistrationForm onSubmit={handleRegistration} />;
 * }
 * ```
 */
export interface RegistrationFormProps {
    onSubmit?: (data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => void;
    loading?: boolean;
    error?: string;
    className?: string;
}
export declare const RegistrationForm: React.FC<RegistrationFormProps>;
//# sourceMappingURL=RegistrationForm.d.ts.map
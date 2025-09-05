import React from "react";
import "flysoft-react-ui/styles";
/**
 * Template de Formulario de Login
 *
 * Ejemplo de uso:
 * ```tsx
 * import { LoginForm } from "flysoft-react-ui/templates/forms/LoginForm";
 *
 * function App() {
 *   return <LoginForm onSubmit={handleLogin} />;
 * }
 * ```
 */
export interface LoginFormProps {
    onSubmit?: (data: {
        email: string;
        password: string;
    }) => void;
    loading?: boolean;
    error?: string;
    className?: string;
}
export declare const LoginForm: React.FC<LoginFormProps>;
//# sourceMappingURL=LoginForm.d.ts.map
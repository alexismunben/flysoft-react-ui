import React from "react";
import "flysoft-react-ui/styles";
/**
 * Template de Formulario de Contacto
 *
 * Ejemplo de uso:
 * ```tsx
 * import { ContactForm } from "flysoft-react-ui/templates/forms/ContactForm";
 *
 * function App() {
 *   return <ContactForm onSubmit={handleContact} />;
 * }
 * ```
 */
export interface ContactFormProps {
    onSubmit?: (data: {
        name: string;
        email: string;
        subject: string;
        message: string;
    }) => void;
    loading?: boolean;
    success?: boolean;
    error?: string;
    className?: string;
}
export declare const ContactForm: React.FC<ContactFormProps>;
//# sourceMappingURL=ContactForm.d.ts.map
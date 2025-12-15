import { AuthProvider } from "../../contexts/AuthContext";
import { AuthDocsContent } from "./AuthDocsContent";
import {
  mockGetToken,
  mockGetUserData,
  mockRemoveToken,
} from "./mockAuthService";

/**
 * Componente de Documentación del AuthContext
 *
 * Este componente muestra cómo usar el AuthContext con un servicio mock
 * para propósitos de documentación y desarrollo.
 *
 * El servicio mock simula las tres operaciones principales:
 * - getToken: Obtiene un token de acceso
 * - getUserData: Obtiene los datos del usuario autenticado
 * - removeToken: Revoca/invalida un token (opcional)
 */
export const AuthDocs = () => {
  return (
    <AuthProvider
      getToken={mockGetToken}
      getUserData={mockGetUserData}
      removeToken={mockRemoveToken}
    >
      <AuthDocsContent />
    </AuthProvider>
  );
};

import { AuthProvider, type AuthContextUserInterface, type AuthTokenInterface } from "../../contexts/AuthContext";
import { apiClient } from "../../services/apiClient";
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

const propiedaiGetToken = async (email: string, password: string): Promise<AuthTokenInterface> => {
    const authResponse: any = await apiClient.post({
        url: "https://propiedai.com/api/auth/login",
        body: {
            email: 'alexis@munben.com',
            password: 'Argentina2026!'
        }
    });

    return {
      accessToken: authResponse.access_token,
      expires: new Date(Date.now() + authResponse.expires_in * 1000).toISOString(),
      tokenType: authResponse.token_type,
      refreshToken: authResponse.refresh_token,
      aditionalData: {
        user: {
            name: authResponse.user.name,
            surname: authResponse.user.surname,
            role: authResponse.user.role,
            id: authResponse.user.id
        }
      }
    }
}

const propiedaiGetUserData = async (auth: AuthTokenInterface): Promise<AuthContextUserInterface> => {
  return {
    id: auth.aditionalData?.user.id,
    name: auth.aditionalData?.user.name + ' ' + auth.aditionalData?.user.surname,
    aditionalData: {
      role: auth.aditionalData?.user.role,
    }
  }
}

const propiedaiRefreshToken = async (auth: AuthTokenInterface): Promise<AuthTokenInterface> => {
  const authResponse: any = await apiClient.post({
        url: "https://propiedai.com/api/auth/refresh",
        body: {
            refresh_token: auth.refreshToken,
        }
    });

  return {
    ...auth,
    accessToken: authResponse.access_token,
    expires: new Date(Date.now() + authResponse.expires_in * 1000).toISOString(),
    tokenType: authResponse.token_type,
  }
}



export const AuthDocs = () => {
  return (
    <AuthProvider
      getToken={propiedaiGetToken}
      getUserData={propiedaiGetUserData}
      removeToken={mockRemoveToken}
      refreshToken={propiedaiRefreshToken}
      showLog
    >
      <AuthDocsContent />
    </AuthProvider>
  );
};

import type {
  AuthTokenInterface,
  AuthContextUserInterface,
} from "../../contexts/AuthContext";

/**
 * Servicio Mock para Autenticación
 *
 * Este servicio simula las llamadas a la API de autenticación
 * para propósitos de documentación y desarrollo.
 */

/**
 * Simula un delay de red para hacer más realista el mock
 */
const simulateNetworkDelay = (ms: number = 800) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Mock de getToken - Obtiene un token de acceso
 *
 * @param username - Nombre de usuario o email
 * @param password - Contraseña del usuario
 * @returns Promise con los datos del token
 */
export const mockGetToken = async (
  username: string,
  password: string
): Promise<AuthTokenInterface> => {
  await simulateNetworkDelay();

  // Validación básica de credenciales
  if (!username || !password) {
    throw new Error("Username y password son requeridos");
  }

  // Simular token JWT
  const tokenData: AuthTokenInterface = {
    accessToken: `mock_access_token_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`,
    tokenType: "Bearer",
    expires: new Date(Date.now() + 3600000).toISOString(), // 1 hora
    refreshToken: `mock_refresh_token_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`,
  };

  return tokenData;
};

/**
 * Mock de getUserData - Obtiene los datos del usuario autenticado
 *
 * @param token - Token de acceso
 * @returns Promise con los datos del usuario
 */
export const mockGetUserData = async (
  auth: AuthTokenInterface
): Promise<AuthContextUserInterface> => {
  await simulateNetworkDelay();

  if (!auth.accessToken) {
    throw new Error("Token es requerido");
  }

  // Simular datos de usuario
  const userData: AuthContextUserInterface = {
    id: 123,
    name: "Usuario de Prueba",
    aditionalData: {
      role: "admin",
      email: "usuario@ejemplo.com",
      createdAt: new Date().toISOString(),
      permissions: ["read", "write", "delete"],
    },
  };

  return userData;
};

/**
 * Mock de removeToken - Revoca/invalida un token
 *
 * @param token - Token a revocar
 * @returns Promise que se resuelve cuando el token es revocado
 */
export const mockRemoveToken = async (auth: AuthTokenInterface): Promise<void> => {
  await simulateNetworkDelay();

  if (!auth.accessToken) {
    throw new Error("Token es requerido");
  }

  // Simular revocación del token
  // En una implementación real, aquí se haría una llamada al servidor
  // para invalidar el token
  console.log(`Token revocado: ${auth.accessToken.substring(0, 20)}...`);
};

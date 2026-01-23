import { createContext, useEffect, useState } from "react";

export interface AuthContextUserInterface {
  id?: number | string;
  name?: string;
  aditionalData?: any;
  token?: AuthTokenInterface;
}

export interface AuthTokenInterface {
  accessToken?: string;
  expires?: string;
  tokenType?: string;
  refreshToken?: string;
  aditionalData?: any;
}

export interface AuthContextType {
  user: AuthContextUserInterface | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => { },
  logout: async () => { },
  isAuthenticated: false,
  isLoading: false,
});

const initAuth = (): AuthContextUserInterface => {
  const authString = localStorage.getItem("auth");
  if (!authString) return {};

  return JSON.parse(authString);
};

const storeAuth = (auth: AuthContextUserInterface) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

const removeStoredAuth = () => {
  localStorage.removeItem("auth");
};

/**
 * Verifica si un token ha expirado basándose en el string expires en formato ISO 8601
 * @param expires - String de fecha en formato ISO 8601
 * @returns true si el token ha expirado o si el formato es inválido, false si está vigente
 */
const isTokenExpired = (expires?: string): boolean => {
  if (!expires) {
    return true; // Si no hay fecha de expiración, consideramos que está expirado
  }

  try {
    // Validar formato ISO 8601 básico (debe poder ser parseado por Date)
    const expirationDate = new Date(expires);

    // Verificar que la fecha sea válida
    if (isNaN(expirationDate.getTime())) {
      console.warn("Formato de fecha de expiración inválido:", expires);
      return true;
    }

    // Comparar con la fecha actual (agregamos un margen de 1 minuto para evitar problemas de precisión)
    const now = new Date();
    const oneMinuteInMs = 60 * 1000;

    return expirationDate.getTime() <= now.getTime() + oneMinuteInMs;
  } catch (error) {
    console.error("Error al verificar expiración del token:", error);
    return true; // En caso de error, considerar como expirado por seguridad
  }
};

/**
 * Valida que un usuario tenga un token vigente
 * @param user - Objeto de usuario a validar
 * @returns true si el usuario tiene un token válido y vigente, false en caso contrario
 */
const isUserTokenValid = (user: AuthContextUserInterface | null): boolean => {

  if (!user || !user.id) {
    return false;
  }

  if (!user.token) {
    return false;
  }

  return !isTokenExpired(user.token.expires);
};

interface AuthProviderProps {
  children: React.ReactNode;
  getToken: (username: string, password: string) => Promise<AuthTokenInterface>;  
  getUserData: (auth: AuthTokenInterface) => Promise<AuthContextUserInterface>;  
  refreshToken?: (auth: AuthTokenInterface) => Promise<AuthTokenInterface>;
  removeToken?: (auth: AuthTokenInterface) => Promise<void>;
  showLog?: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  getToken,  
  getUserData,
  refreshToken,
  removeToken,
  showLog = false,
}) => {
  const [user, setUser] = useState<AuthContextUserInterface | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const log = (action: string, data?: any, isError: boolean = false) => {
    if (isError) {
      console.error(`[AuthContext] ${action}: `, data);
    } else if (showLog) {
      console.log(`[AuthContext] ${action}: `, data);
    }
  };

  useEffect(() => {
    const auth = initAuth();
    log("Init Auth - Retrieved from storage", auth);

    // Verificar que el usuario tenga un token válido y vigente
    const isValid = isUserTokenValid(auth);
    log("Init Auth - Token valid check", { isValid, auth });

    if (isValid) {
      setUser(auth);
      setIsAuthenticated(true);
      log("Init Auth - User authenticated restored", auth);
    } else {
      // Si el token está expirado o es inválido, limpiar el almacenamiento
      if (auth.id && isTokenExpired(auth.token?.expires)) {
        log("Init Auth - Token expired or invalid, cleaning storage", auth);
        removeStoredAuth();
      } else {
        log("Init Auth - No valid session found", auth);
      }
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    log("Login - Start", { username });

    try {
      const token = await getToken(username, password);
      log("Login - Token received", token);

      if (token.accessToken) {
        // Verificar que el token recibido no esté expirado antes de continuar      
        const expired = isTokenExpired(token.expires);
        log("Login - Token expiration check", { expires: token.expires, expired });

        if (expired) {
          log("Login - Token expired upon receipt", token, true);
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const { id, name, aditionalData } = await getUserData(
          token
        );
        log("Login - User data received", { id, name, aditionalData });

        const userData: AuthContextUserInterface = {
          id,
          name,
          aditionalData,
          token,
        };

        // Validar nuevamente antes de establecer el estado
        const isValid = isUserTokenValid(userData);
        log("Login - Final validation", { isValid, userData });

        if (isValid) {
          setUser(userData);
          storeAuth(userData);
          setIsAuthenticated(true);
          log("Login - Success", userData);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          log("Login - Validation failed", userData, true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        log("Login - No access token in response", token, true);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      log("Login - Error", error, true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    log("Logout - Start", { user });
    removeStoredAuth();
    setUser(null);
    if (removeToken && user?.token) {
      try {
        await removeToken(user.token);
        log("Logout - Token removed from server");
      } catch (e) {
        log("Logout - Error removing token", e, true);
      }
    }
    setIsAuthenticated(false);
    log("Logout - Completed");
  };

  // Validar el token periódicamente o cuando cambia el usuario
  // Esto asegura que si el token expira durante la sesión, se actualice el estado
  useEffect(() => {
    if (user && user.token?.expires) {
      const checkTokenExpiration = async () => {
        const expired = isTokenExpired(user.token?.expires);
        log("Token Check - Checking expiration", { expires: user.token?.expires, expired });

        if (expired) {
          let refreshed = false;

          // Si existe la función de refresco, intentar renovar el token antes de cerrar sesión
          if (refreshToken && user.token) {
            try {

              log("Token Check - Attempting refresh", { oldToken: user.token });

              const newToken = await refreshToken(user.token);
              log("Token Check - Refresh response", newToken);
              
              // Verificar que el nuevo token sea válido y no esté expirado
              if (newToken && newToken.accessToken && !isTokenExpired(newToken.expires)) {
                const newUser = { ...user, token: newToken };
                setUser(newUser);
                storeAuth(newUser);
                refreshed = true;

                log("Token Check - Refresh success", newUser);
              } else {
                 log("Token Check - Refreshed token invalid or expired", newToken, true);
              }
            } catch (error) {
              console.error("Error al intentar refrescar el token:", error);
              log("Token Check - Refresh error", error, true);
            }
          } else {
             log("Token Check - No refresh logic available or token missing", { refreshToken: !!refreshToken, token: !!user.token });
          }

          if (!refreshed) {
            // Token expirado y no se pudo renovar, cerrar sesión
            log("Token Check - Session expired, logging out");
            removeStoredAuth();
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      };

      // Verificar inmediatamente
      checkTokenExpiration();

      // Verificar cada minuto para detectar expiraciones
      const interval = setInterval(checkTokenExpiration, 60000);

      return () => clearInterval(interval);
    }
  }, [user, refreshToken]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

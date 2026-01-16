import { createContext, useEffect, useState } from "react";

export interface AuthContextUserInterface {
  id?: number;
  name?: string;
  aditionalData?: any;
  token?: AuthTokenInterface;
}

export interface AuthTokenInterface {
  accessToken?: string;
  expires?: string;
  tokenType?: string;
  refreshToken?: string;
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
  getUserData: (token: string) => Promise<AuthContextUserInterface>;
  removeToken?: (token: string) => Promise<void>;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  getToken,
  getUserData,
  removeToken,
}) => {
  const [user, setUser] = useState<AuthContextUserInterface | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const auth = initAuth();

    // Verificar que el usuario tenga un token válido y vigente
    if (isUserTokenValid(auth)) {
      setUser(auth);
      setIsAuthenticated(true);
    } else {
      // Si el token está expirado o es inválido, limpiar el almacenamiento
      if (auth.id && isTokenExpired(auth.token?.expires)) {
        removeStoredAuth();
      }
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      const token = await getToken(username, password);

      if (token.accessToken) {
        // Verificar que el token recibido no esté expirado antes de continuar
        if (isTokenExpired(token.expires)) {
          console.warn("El token recibido ya está expirado");
          setUser(null);
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const { id, name, aditionalData } = await getUserData(
          token.accessToken
        );

        const userData: AuthContextUserInterface = {
          id,
          name,
          aditionalData,
          token,
        };

        // Validar nuevamente antes de establecer el estado
        if (isUserTokenValid(userData)) {
          setUser(userData);
          storeAuth(userData);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    removeStoredAuth();
    setUser(null);
    if (removeToken && user?.token?.accessToken) {
      await removeToken(user.token.accessToken);
    }
    setIsAuthenticated(false);
  };

  // Validar el token periódicamente o cuando cambia el usuario
  // Esto asegura que si el token expira durante la sesión, se actualice el estado
  useEffect(() => {
    if (user && user.token?.expires) {
      const checkTokenExpiration = () => {
        if (isTokenExpired(user.token?.expires)) {
          // Token expirado, cerrar sesión
          removeStoredAuth();
          setUser(null);
          setIsAuthenticated(false);
        }
      };

      // Verificar inmediatamente
      checkTokenExpiration();

      // Verificar cada minuto para detectar expiraciones
      const interval = setInterval(checkTokenExpiration, 60000);

      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

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
  login: async () => {},
  logout: async () => {},
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
    if (auth.id) {
      setUser(auth);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    const token = await getToken(username, password);

    if (token.accessToken) {
      const { id, name, aditionalData } = await getUserData(token.accessToken);

      const userData: AuthContextUserInterface = {
        id,
        name,
        aditionalData,
        token,
      };

      setUser(userData);

      storeAuth(userData);

      setIsAuthenticated(true);
    }

    setIsLoading(false);
  };

  const logout = async () => {
    removeStoredAuth();
    setUser(null);
    if (removeToken && user?.token?.accessToken) {
      await removeToken(user.token.accessToken);
    }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

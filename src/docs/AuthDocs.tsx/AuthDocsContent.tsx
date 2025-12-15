import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../../components";

export const AuthDocsContent = () => {
  const { login, isAuthenticated, isLoading, user, logout } =
    useContext(AuthContext);

  const handleLogin = async () => {
    await login("wursten.alexis@gmail.com", "Oscn1138");
  };

  const handleLogout = () => {
    logout();
  };

  return isAuthenticated ? (
    <div>
      <h1>Bienvenido</h1>
      {JSON.stringify(user)}
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  ) : isLoading ? (
    <div>Cargando...</div>
  ) : (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

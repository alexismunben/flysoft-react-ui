import {
  AuthProvider,
  type AuthContextUserInterface,
} from "../../contexts/AuthContext";
import { apiClient } from "../../services/apiClient";
import { AuthDocsContent } from "./AuthDocsContent";

const getToken = async (username: string, password: string) => {
  const {
    access_token,
    expires,
    token_type,
    refresh_token,
  }: {
    access_token: string;
    expires: string;
    token_type: string;
    refresh_token: string;
  } = await apiClient.post({
    url: "https://devmanager.osocna.com.ar/backend/api/users/login",
    body: {
      username,
      password,
    },
  });

  return {
    accessToken: access_token,
    tokenType: token_type,
    expires,
    refreshToken: refresh_token,
  };
};

const getUserData = async (token: string) => {
  const { id, name } = await apiClient.get<AuthContextUserInterface>({
    url: "https://devmanager.osocna.com.ar/backend/api/users/userdata",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    id,
    name,
    aditionalData: {
      role: "admin",
    },
  };
};

export const AuthDocs = () => {
  return (
    <AuthProvider getToken={getToken} getUserData={getUserData}>
      <AuthDocsContent />
    </AuthProvider>
  );
};

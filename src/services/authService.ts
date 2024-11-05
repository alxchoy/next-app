import httpClient from "@/lib/http/httpClient";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/app/api/auth/types";

const login = (req: LoginRequest) => {
  return httpClient.post<AuthResponse>("/api/auth/login", req);
};

const register = (req: RegisterRequest) => {
  return httpClient.post<AuthResponse>("/api/auth/register", req);
};

export const authService = {
  login,
  register,
};

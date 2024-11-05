import httpClient from "@/lib/http/httpClient";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/app/api/auth/types";

export const login = (req: LoginRequest) => {
  return httpClient.post<AuthResponse>("/api/auth/login", req);
};

export const register = (req: RegisterRequest) => {
  return httpClient.post<AuthResponse>("/api/auth/register", req);
};

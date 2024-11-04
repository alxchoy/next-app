// export type AuthResponse = {
//   email: string;
// }

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
}

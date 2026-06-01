export interface LoginRequest {
  correo: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface ProfileResponse {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  is_active: boolean;
  created_at: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

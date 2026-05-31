export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userId: string | null;
  role: string | null;
  permissions: string[];
}
export interface AuthActions {
  login: (token: string, userId: string, role: string, permissions: string[]) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
  setUser: (userId: string | null, role: string | null, permissions: string[]) => void;
  clearAuth: () => void;
}

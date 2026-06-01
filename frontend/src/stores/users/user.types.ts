export interface UserState {
  id: string | null;
  fullName: string | null;
  email: string | null;
  role: string | null;
  area: string | null;
  position: string | null;
  lastAccess: string | null;
}

export interface UserActions {
  setUser: (user: Partial<UserState>) => void;
  updateUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
}

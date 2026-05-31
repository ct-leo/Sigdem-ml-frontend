import type { LoginFormValues } from "../schemas/login.schema";

export const authService = {
  login: async (credentials: LoginFormValues) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          resolve({ success: true, user: { email: credentials.email } });
        } else {
          reject(new Error("Credenciales inválidas"));
        }
      }, 1500);
    });
  },
};

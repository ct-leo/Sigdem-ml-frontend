import { useState } from "react";
import type { LoginFormValues } from "../schemas/login.schema";
import { authService } from "../services/auth.service";
import { toast } from "sonner";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      await authService.login(data);
      toast.success("Inicio de sesión exitoso!");
    } catch (error) {
      toast.error("Error al iniciar sesión. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
  };
};

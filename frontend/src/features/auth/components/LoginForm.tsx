import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { loginSchema } from "../schemas/login.schema";
import type { LoginFormValues } from "../schemas/login.schema";
import { PasswordInput } from "./PasswordInput";
import { useLogin } from "../hooks/useLogin";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { loading, handleLogin } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await handleLogin(data);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
            <Mail size={20} />
          </div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="Correo"
                disabled={loading}
                className={`w-full h-[52px] pl-12 pr-4 rounded-2xl border text-text-primary placeholder-text-secondary bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-border-color hover:border-navy-blue/50 focus:border-navy-blue"
                }`}
              />
            )}
          />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm pl-1"
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      <div className="space-y-2">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              value={field.value}
              onChange={field.onChange}
              error={errors.password?.message}
              disabled={loading}
            />
          )}
        />
      </div>

      <div className="flex items-center">
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                disabled={loading}
                className="w-4 h-4 rounded border-border-color text-navy-blue focus:ring-navy-blue"
              />
              <label
                htmlFor="remember"
                className="text-text-secondary text-sm cursor-pointer select-none"
              >
                Recordarme
              </label>
            </div>
          )}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full h-[52px] bg-navy-blue text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-navy-blue/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            Ingresar al sistema
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </>
        )}
      </motion.button>
    </form>
  );
};

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { loginSchema } from "../schemas/login.schema";
import type { LoginSchemaInput } from "../schemas/login.schema";
import { PasswordInput } from "./PasswordInput";
import { useLogin } from "../hooks/useLogin";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const loginMutation = useLogin();
  const loading = loginMutation.isPending;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      correo: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaInput) => {
    try {
      await loginMutation.mutateAsync(data);
      onSuccess?.();
    } catch (err) {
      // Handled in hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary animate-pulse">
            <Mail size={20} />
          </div>
          <Controller
            name="correo"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="Correo Institucional"
                disabled={loading}
                className={`w-full h-[52px] pl-12 pr-4 rounded-2xl border text-text-primary placeholder-text-secondary bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.correo
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-border-color hover:border-navy-blue/50 focus:border-navy-blue"
                }`}
              />
            )}
          />
        </div>
        {errors.correo && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm pl-1"
          >
            {errors.correo.message}
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

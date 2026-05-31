import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver as resolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/user.schema";
import type { UserSchemaInput } from "../schemas/user.schema";
import { Button } from "../../../components/ui/Button";
import { User, Mail, Phone, Briefcase, Building, Lock, ShieldCheck, CheckCircle } from "lucide-react";

interface UserFormProps {
  initialValues?: Partial<UserSchemaInput>;
  onSubmit: (data: UserSchemaInput) => void;
  isLoading: boolean;
  isEditMode?: boolean;
}

const AREAS = [
  "Administración",
  "Tesorería",
  "Recursos Humanos",
  "Obras",
  "Tecnologías de Información",
  "Defensa Civil",
  "Fiscalización",
  "Secretaría General"
];

const ROLES = [
  "Administrador",
  "Supervisor",
  "Analista",
  "Operador",
  "RRHH"
];

const STATUSES = [
  "Activo",
  "Inactivo",
  "Suspendido",
  "Bloqueado"
];

export const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
  isEditMode = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaInput>({
    resolver: resolver(userSchema),
    defaultValues: {
      fullName: initialValues?.fullName || "",
      email: initialValues?.email || "",
      role: initialValues?.role || "Operador",
      status: initialValues?.status || "Activo",
      phone: initialValues?.phone || "",
      position: initialValues?.position || "",
      area: initialValues?.area || "Administración",
      password: "",
      confirmPassword: ""
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-border-color rounded-xl p-6 shadow-sm flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-navy-blue" />
            Nombre Completo
          </label>
          <input
            type="text"
            placeholder="Ej. Carlos Mendoza"
            {...register("fullName")}
            className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-navy-blue text-text-primary placeholder:text-text-secondary"
          />
          {errors.fullName && (
            <span className="text-[10px] font-bold text-danger">{errors.fullName.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-navy-blue" />
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="Ej. carlos.mendoza@municipalidad.gob.pe"
            {...register("email")}
            className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-navy-blue text-text-primary placeholder:text-text-secondary"
          />
          {errors.email && (
            <span className="text-[10px] font-bold text-danger">{errors.email.message}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-navy-blue" />
            Teléfono Móvil
          </label>
          <input
            type="text"
            placeholder="Ej. 987654321"
            {...register("phone")}
            className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-navy-blue text-text-primary placeholder:text-text-secondary"
          />
          {errors.phone && (
            <span className="text-[10px] font-bold text-danger">{errors.phone.message}</span>
          )}
        </div>

        {/* Position */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-[#7DAA74]" />
            Cargo / Cargo Administrativo
          </label>
          <input
            type="text"
            placeholder="Ej. Jefe de Soporte y Sistemas"
            {...register("position")}
            className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-navy-blue text-text-primary placeholder:text-text-secondary"
          />
          {errors.position && (
            <span className="text-[10px] font-bold text-danger">{errors.position.message}</span>
          )}
        </div>

        {/* Area */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary flex items-center gap-1">
            <Building className="w-3.5 h-3.5 text-[#7DAA74]" />
            Área Municipal
          </label>
          <select
            {...register("area")}
            className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-navy-blue text-text-primary bg-white"
          >
            {AREAS.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          {errors.area && (
            <span className="text-[10px] font-bold text-danger">{errors.area.message}</span>
          )}
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7DAA74]" />
            Rol Administrativo (RBAC)
          </label>
          <select
            {...register("role")}
            className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-navy-blue text-text-primary bg-white"
          >
            {ROLES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.role && (
            <span className="text-[10px] font-bold text-danger">{errors.role.message}</span>
          )}
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-primary flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-[#7DAA74]" />
            Estado de Identidad
          </label>
          <select
            {...register("status")}
            className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-navy-blue text-text-primary bg-white"
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.status && (
            <span className="text-[10px] font-bold text-danger">{errors.status.message}</span>
          )}
        </div>
      </div>

      {/* Passwords - Only shown for creation */}
      {!isEditMode && (
        <div className="border-t border-border-color pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-text-primary flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-golden-sand" />
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              {...register("password")}
              className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-navy-blue text-text-primary placeholder:text-text-secondary"
            />
            {errors.password && (
              <span className="text-[10px] font-bold text-danger">{errors.password.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-text-primary flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-golden-sand" />
              Confirmar Contraseña
            </label>
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              {...register("confirmPassword")}
              className="border border-border-color rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-navy-blue text-text-primary placeholder:text-text-secondary"
            />
            {errors.confirmPassword && (
              <span className="text-[10px] font-bold text-danger">{errors.confirmPassword.message}</span>
            )}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <Button type="submit" disabled={isLoading} className="gap-2 px-6">
          {isLoading ? "Guardando..." : "Guardar Usuario"}
        </Button>
      </div>
    </form>
  );
};

import React, { useState } from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { Card, CardContent } from "../../../components/ui/Card";
import { useUser } from "../../../stores/hooks/useUser";
import { Briefcase, Shield, User, Clock, Check, Edit2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const MyProfilePage: React.FC = () => {
  const userStore = useUser();

  // Local state for editing form
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(userStore.fullName || "");
  const [email, setEmail] = useState(userStore.email || "");
  const [position, setPosition] = useState(userStore.position || "");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim()) {
      toast.error("El nombre y el correo electrónico son campos obligatorios.");
      return;
    }

    userStore.updateUser({
      fullName,
      email,
      position,
    });

    setIsEditing(false);
    toast.success("Tu perfil ha sido actualizado con éxito.");
  };

  const handleCancel = () => {
    setFullName(userStore.fullName || "");
    setEmail(userStore.email || "");
    setPosition(userStore.position || "");
    setIsEditing(false);
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Determine permissions based on role
  const getPermissionsByRole = (role: string | null) => {
    switch (role) {
      case "Administrador":
        return [
          "Acceso total a la base de datos municipal",
          "Creación, edición y eliminación de funcionarios",
          "Auditoría y logs de auditoría de seguridad del sistema",
          "Gestión de modelos cognitivos de Machine Learning",
          "Exportación e impresión de reportes de Business Intelligence",
        ];
      case "RRHH":
        return [
          "Acceso completo a la base de currículos ATS",
          "Creación y edición de convocatorias laborales",
          "Visualización del ranking inteligente de candidatos",
          "Generación de reportes de talento humano",
        ];
      case "Mesa de Partes":
        return [
          "Gestión integral de expedientes y trámites ciudadanos",
          "Carga de documentos escaneados e inicio de flujos OCR",
          "Consulta de expedientes y estados",
        ];
      default:
        return [
          "Consulta básica de documentos públicos",
          "Visualización de paneles generales",
        ];
    }
  };

  const permissionsList = getPermissionsByRole(userStore.role);

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Mi Perfil Administrativo"
        description="Gestione la información de su cuenta, credenciales institucionales y consulte sus niveles de acceso asignados."
      />

      {/* Profile Visual Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-navy-blue via-blue-900 to-navy-blue text-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-center gap-6 border border-navy-blue/15"
      >
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white text-navy-blue flex items-center justify-center text-2xl md:text-3xl font-black shadow-lg shrink-0 border-2 border-white/30 tracking-wider">
          {getInitials(userStore.fullName)}
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 justify-center md:justify-start">
            <h2 className="text-xl md:text-2xl font-black">{userStore.fullName || "Usuario Municipal"}</h2>
            <span className="self-center bg-white/20 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider text-white border border-white/10 select-none">
              {userStore.role || "Funcionario"}
            </span>
          </div>

          <p className="text-xs text-blue-100 mt-2 font-medium flex items-center justify-center md:justify-start gap-1">
            <Briefcase className="w-3.5 h-3.5 text-blue-300" /> {userStore.position || "Personal Técnico"}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-blue-100 bg-white/10 px-4 py-2 rounded-xl border border-white/5 self-center md:self-end">
          <Clock className="w-4 h-4 text-blue-300" />
          <span>Último acceso: {userStore.lastAccess ? new Date(userStore.lastAccess).toLocaleDateString() : "Hoy"}</span>
        </div>
      </motion.div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Access rights and stats */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Card: Permissions */}
          <Card className="border border-border-color shadow-sm">
            <CardContent className="p-6 flex flex-col gap-4">
              <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-1.5 border-b border-border-color pb-3">
                <Shield className="w-4.5 h-4.5 text-navy-blue" />
                Privilegios del Rol
              </h3>

              <div className="flex flex-col gap-3.5">
                <div className="bg-light-bg p-3.5 rounded-xl border border-border-color flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-navy-blue shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5 text-xs font-semibold">
                    <span className="text-[10px] font-black uppercase text-text-secondary">Esquema RBAC</span>
                    <span className="text-text-primary">{userStore.role || "Ninguno"}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <p className="text-[10px] font-black text-text-secondary uppercase tracking-wider mt-1">Permisos habilitados:</p>
                  {permissionsList.map((permission, index) => (
                    <div key={index} className="flex gap-2 items-start text-xs font-semibold text-text-primary">
                      <div className="w-4 h-4 rounded-full bg-dashboard-green/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-dashboard-green" />
                      </div>
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Editable User Info */}
        <div className="lg:col-span-2">
          <Card className="border border-border-color shadow-sm h-full">
            <CardContent className="p-6 flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-border-color pb-3">
                <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-1.5">
                  <User className="w-4.5 h-4.5 text-navy-blue" />
                  Datos Personales
                </h3>

                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 font-bold border-border-color hover:bg-gray-50 text-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Editar Datos
                  </Button>
                )}
              </div>

              {!isEditing ? (
                // View Mode
                <div className="flex flex-col gap-4 text-xs font-semibold text-text-primary py-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Nombre Completo</span>
                      <span className="text-sm font-bold text-text-primary">{userStore.fullName || "Sin registrar"}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Correo Electrónico</span>
                      <span className="text-sm font-bold text-text-primary">{userStore.email || "Sin registrar"}</span>
                    </div>



                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Cargo Asignado</span>
                      <span className="text-sm font-bold text-text-primary">{userStore.position || "Sin registrar"}</span>
                    </div>
                  </div>
                </div>
              ) : (
                // Edit Form Mode
                <form onSubmit={handleSave} className="flex flex-col gap-5 py-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-text-secondary">Nombre Completo</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-light-bg border border-border-color rounded-xl py-2 px-3.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-shadow"
                        placeholder="Ej. Carlos Mendoza"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-text-secondary">Correo Electrónico</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-light-bg border border-border-color rounded-xl py-2 px-3.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-shadow"
                        placeholder="Ej. correo@municipalidad.gob.pe"
                        required
                      />
                    </div>



                    {/* Position */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black uppercase text-text-secondary">Cargo Administrativo</label>
                      <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-full bg-light-bg border border-border-color rounded-xl py-2 px-3.5 text-xs font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-shadow"
                        placeholder="Ej. Jefe de Soporte y Sistemas"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2.5 mt-2 pt-4 border-t border-border-color">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="px-4 font-bold text-xs"
                      size="sm"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="px-5 font-bold text-xs"
                      size="sm"
                    >
                      Guardar Cambios
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import type { User } from "../types/user.types";
import { Card, CardContent } from "../../../components/ui/Card";
import { Mail, Phone, Building, Briefcase, Calendar, ShieldCheck } from "lucide-react";

interface UserInfoCardProps {
  user: User;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
  return (
    <Card className="border border-border-color shadow-sm h-full select-none">
      <CardContent className="p-6 flex flex-col gap-5">
        <h3 className="text-sm font-extrabold text-text-primary flex items-center gap-1.5 border-b border-border-color pb-3">
          <ShieldCheck className="w-4.5 h-4.5 text-navy-blue" />
          Información Administrativa
        </h3>

        <div className="flex flex-col gap-4 text-xs font-semibold text-text-primary">
          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-navy-blue shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Correo Electrónico</span>
              <span>{user.email}</span>
            </div>
          </div>

          <hr className="border-border-color" />

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-navy-blue shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Teléfono de Contacto</span>
              <span>{user.phone}</span>
            </div>
          </div>

          <hr className="border-border-color" />

          {/* Area */}
          <div className="flex items-center gap-3">
            <Building className="w-4 h-4 text-[#7DAA74] shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Área Asignada</span>
              <span>{user.area}</span>
            </div>
          </div>

          <hr className="border-border-color" />

          {/* Position */}
          <div className="flex items-center gap-3">
            <Briefcase className="w-4 h-4 text-[#7DAA74] shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Cargo Administrativo</span>
              <span>{user.position}</span>
            </div>
          </div>

          <hr className="border-border-color" />

          {/* Dates */}
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-golden-sand shrink-0" />
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Fecha Registro</span>
                <span>{new Date(user.registrationDate).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase font-black tracking-wider text-text-secondary">Último Acceso</span>
                <span>{new Date(user.lastAccess).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

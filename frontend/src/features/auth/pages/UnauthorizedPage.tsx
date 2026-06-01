import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { useRole } from "../../../auth/hooks/useRole";

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { defaultRoute } = useRole();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 select-none transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-xl flex flex-col items-center">
        {/* Animated Icon Block */}
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-500 flex items-center justify-center mb-6 border border-rose-100 dark:border-rose-900/30 animate-bounce">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Header Title */}
        <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-3">
          Acceso Restringido
        </h2>
        
        {/* Decorative divider */}
        <div className="w-12 h-0.5 bg-golden-sand rounded-full mb-4" />

        {/* Message description */}
        <p className="text-2xs text-slate-500 dark:text-slate-400 font-semibold uppercase leading-relaxed mb-8 max-w-xs">
          No tiene los permisos institucionales requeridos para acceder a este recurso. Su intento ha sido registrado en la bitácora de auditoría.
        </p>

        {/* Navigation Actions */}
        <Button
          onClick={() => navigate(defaultRoute)}
          className="gap-2 w-full justify-center h-10 font-bold bg-navy-blue text-white hover:bg-navy-blue/90"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la Página Principal
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;

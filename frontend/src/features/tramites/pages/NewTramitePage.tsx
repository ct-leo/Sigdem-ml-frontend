import React from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { TramiteForm } from "../components/TramiteForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const NewTramitePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 pb-8 max-w-5xl mx-auto w-full">
      <div 
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-navy-blue cursor-pointer transition-colors w-fit" 
        onClick={() => navigate("/tramites")}
      >
        <ArrowLeft className="w-4 h-4" /> Volver a trámites
      </div>

      <PageHeader 
        title="Registrar Nuevo Trámite"
        description="Completa el formulario para ingresar un nuevo expediente al sistema SIGDEM-ML."
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <TramiteForm />
      </motion.div>
    </div>
  );
};

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTramite } from "../hooks/useTramite";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft, Edit, Download } from "lucide-react";
import { TramiteInfoCard } from "../components/TramiteInfoCard";
import { TramiteHistoryCard } from "../components/TramiteHistoryCard";
import { TramiteDocumentsCard } from "../components/TramiteDocumentsCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const TramiteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: tramite, isLoading } = useTramite(id || "");

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-navy-blue animate-spin mb-4" />
          <p className="text-text-secondary">Cargando expediente...</p>
        </div>
      </div>
    );
  }

  if (!tramite) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Expediente no encontrado</h2>
        <p className="text-text-secondary mb-6">El trámite solicitado no existe o no tienes permisos para verlo.</p>
        <Button onClick={() => navigate("/tramites")}>
          Volver a Trámites
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-2 text-sm text-text-secondary mb-2 hover:text-navy-blue cursor-pointer transition-colors w-fit" onClick={() => navigate("/tramites")}>
        <ArrowLeft className="w-4 h-4" /> Volver a la lista
      </div>

      <PageHeader 
        title={`Expediente ${tramite.code}`}
        description={tramite.description}
        actions={
          <>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar PDF
            </Button>
            <Button className="gap-2">
              <Edit className="w-4 h-4" />
              Editar Trámite
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="xl:col-span-2 space-y-6"
        >
          <TramiteInfoCard tramite={tramite} />
          <TramiteDocumentsCard documents={tramite.documents} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="xl:col-span-1"
        >
          <TramiteHistoryCard history={tramite.history} />
        </motion.div>
      </div>
    </div>
  );
};

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import { DocumentViewer } from "../components/DocumentViewer";
import { DocumentInfoCard } from "../components/DocumentInfoCard";
import { RecentDocuments } from "../components/RecentDocuments";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { ArrowLeft, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { alerts } from "../../../utils/sweetalert";

export const DocumentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const docId = Number(id);

  const { data: document, isLoading, error } = useDocument(docId);
  const deleteMutation = useDeleteDocument();

  const handleDelete = async () => {
    const result = await alerts.confirmDelete(
      "¿Desea eliminar este documento?",
      "El archivo digital será purgado permanentemente de los registros municipales y servidores cloud."
    );

    if (result.isConfirmed) {
      deleteMutation.mutate(docId, {
        onSuccess: () => {
          navigate("/documentos");
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-navy-blue animate-spin mb-4" />
        <p className="text-text-secondary font-medium text-sm">
          Cargando visor y análisis del documento...
        </p>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="w-full h-[50vh] flex flex-col items-center justify-center text-center p-6 bg-white rounded-xl border border-border-color shadow-sm max-w-md mx-auto mt-12">
        <div className="w-16 h-16 rounded-full bg-red-50 text-danger flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-text-primary text-lg mb-2">
          Documento No Encontrado
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-6">
          El documento solicitado no existe en los servidores institucionales o ha sido reclasificado.
        </p>
        <Button onClick={() => navigate("/documentos")} className="bg-navy-blue">
          Volver al Repositorio
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Detail header with return actions and breadcrumbs */}
      <PageHeader
        title={document.nombre_original}
        description={`Visualización, metadatos estructurados e indexado OCR del expediente institucional.`}
        actions={
          <div className="flex items-center gap-3 select-none">
            <Button
              onClick={() => navigate("/documentos")}
              variant="default"
              className="gap-2 border border-border-color bg-white hover:bg-gray-50 text-text-primary font-bold text-xs uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider"
            >
              <Trash2 className="w-4 h-4 text-white" />
              {deleteMutation.isPending ? "Eliminando..." : "Eliminar Documento"}
            </Button>
          </div>
        }
      />

      {/* Main Layout Division */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Left Side: Interactive Document Viewer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="xl:col-span-2"
        >
          <DocumentViewer document={document} />
        </motion.div>

        {/* Right Side: Document info card, OCR results, and Recent/Related */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <DocumentInfoCard document={document} />
          <RecentDocuments currentDocument={document} />
        </motion.div>
      </div>
    </div>
  );
};

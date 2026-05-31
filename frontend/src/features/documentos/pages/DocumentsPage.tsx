import React, { useState, useMemo } from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { DocumentStats } from "../components/DocumentStats";
import { DocumentsTable } from "../components/DocumentsTable";
import { DocumentsFilters } from "../components/DocumentsFilters";
import { DocumentsSearch } from "../components/DocumentsSearch";
import { DocumentCard } from "../components/DocumentCard";
import { useDocuments } from "../hooks/useDocuments";
import { useDocumentStats } from "../hooks/useDocument";
import type { DocumentsFiltersState } from "../components/DocumentsFilters";
import { Plus, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export const DocumentsPage: React.FC = () => {
  const { data: documents, isLoading } = useDocuments();
  const { data: stats, isLoading: isLoadingStats } = useDocumentStats();

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<DocumentsFiltersState>({});
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredDocuments = useMemo(() => {
    if (!documents) return [];
    return documents.filter((doc) => {
      // Global search matches
      const matchesSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.procedureCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.responsibleArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filters.type ? doc.type === filters.type : true;
      const matchesOCR = filters.statusOcr ? doc.statusOcr === filters.statusOcr : true;
      const matchesArea = filters.responsibleArea
        ? doc.responsibleArea === filters.responsibleArea
        : true;

      return matchesSearch && matchesType && matchesOCR && matchesArea;
    });
  }, [documents, searchTerm, filters]);

  const handleUploadClick = () => {
    toast.info("Función de carga de documentos: listo para conexión con Backend");
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Gestión Documental"
        description="Administra, consulta y visualiza documentos asociados a los expedientes institucionales."
        actions={
          <Button onClick={handleUploadClick} className="gap-2 bg-navy-blue hover:bg-blue-800">
            <Plus className="w-4.5 h-4.5" />
            Subir Documento
          </Button>
        }
      />

      {/* KPI Stats */}
      <DocumentStats stats={stats} isLoading={isLoadingStats} />

      {/* Toolbar Search / Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <div className="bg-white p-4 rounded-xl border border-border-color shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <DocumentsSearch value={searchTerm} onChange={setSearchTerm} />
            <DocumentsFilters filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Toggle visual mode list/grid */}
          <div className="flex border border-border-color rounded-lg p-0.5 bg-gray-50 shrink-0 self-end lg:self-auto select-none">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white text-navy-blue shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
              title="Vista de lista"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-navy-blue shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
              title="Vista de cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content render mode */}
        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DocumentsTable documents={filteredDocuments} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-4 border animate-pulse h-48 space-y-4"
                    >
                      <div className="flex justify-between">
                        <div className="w-10 h-10 bg-gray-200 rounded"></div>
                        <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-8 bg-gray-150 rounded w-full mt-4"></div>
                    </div>
                  ))}
                </div>
              ) : filteredDocuments.length === 0 ? (
                <div className="w-full bg-white rounded-xl border border-border-color shadow-sm p-12">
                  <p className="text-center text-text-secondary text-sm">
                    No se encontraron documentos
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredDocuments.map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

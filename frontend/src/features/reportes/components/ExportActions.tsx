import React from "react";
import { toast } from "sonner";
import { FileText, FileSpreadsheet } from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface ExportActionsProps {
  reportTitle: string;
}

export const ExportActions: React.FC<ExportActionsProps> = ({ reportTitle }) => {
  const handleExport = (type: "PDF" | "Excel") => {
    toast.info(`Exportación iniciada: Generando documento ${type} de ${reportTitle}...`);
    setTimeout(() => {
      toast.success(`Exportación exitosa: El reporte ${type} se ha descargado correctamente.`);
    }, 2000);
  };

  return (
    <div className="flex gap-2 shrink-0 select-none">
      <Button
        onClick={() => handleExport("PDF")}
        variant="outline"
        size="sm"
        className="gap-1.5 font-bold border-navy-blue text-navy-blue hover:bg-navy-blue/5 py-1.5"
      >
        <FileText className="w-4 h-4 text-navy-blue" />
        PDF
      </Button>
      <Button
        onClick={() => handleExport("Excel")}
        variant="outline"
        size="sm"
        className="gap-1.5 font-bold border-[#749763] text-[#749763] hover:bg-[#749763]/5 py-1.5"
      >
        <FileSpreadsheet className="w-4 h-4 text-[#749763]" />
        Excel
      </Button>
    </div>
  );
};

import React from "react";
import { FileText, FileSpreadsheet, Image as ImageIcon, File } from "lucide-react";
import type { DocumentType } from "../types/document.types";
import { cn } from "../../../lib/utils";

interface DocumentPreviewProps {
  type: DocumentType;
  className?: string;
  iconClassName?: string;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  type,
  className,
  iconClassName,
}) => {
  const config = {
    PDF: {
      bg: "bg-red-50 text-red-600 border-red-100",
      icon: FileText,
    },
    DOCX: {
      bg: "bg-blue-50 text-blue-600 border-blue-100",
      icon: FileText,
    },
    XLSX: {
      bg: "bg-green-50 text-green-600 border-green-100",
      icon: FileSpreadsheet,
    },
    PNG: {
      bg: "bg-purple-50 text-purple-600 border-purple-100",
      icon: ImageIcon,
    },
    JPG: {
      bg: "bg-amber-50 text-amber-600 border-amber-100",
      icon: ImageIcon,
    },
  };

  const { bg, icon: Icon } = config[type] || {
    bg: "bg-gray-50 text-gray-600 border-gray-100",
    icon: File,
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border w-10 h-10 shrink-0 shadow-sm",
        bg,
        className
      )}
    >
      <Icon className={cn("w-5 h-5", iconClassName)} />
    </div>
  );
};

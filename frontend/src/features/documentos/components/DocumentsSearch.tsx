import React from "react";
import { Search } from "lucide-react";

interface DocumentsSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const DocumentsSearch: React.FC<DocumentsSearchProps> = ({
  value,
  onChange,
  placeholder = "Buscar por nombre, tipo, trámite, responsable...",
}) => {
  return (
    <div className="relative w-full md:w-96">
      <Search className="w-4.5 h-4.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-border-color rounded-lg py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-all hover:border-gray-300"
      />
    </div>
  );
};

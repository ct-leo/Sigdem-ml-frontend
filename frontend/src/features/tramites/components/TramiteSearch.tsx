import React from "react";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TramiteSearch: React.FC<Props> = ({ value, onChange, placeholder = "Buscar por código, solicitante..." }) => {
  return (
    <div className="relative w-full md:w-80">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-border-color rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-all hover:border-gray-300"
      />
    </div>
  );
};

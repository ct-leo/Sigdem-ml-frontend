import React from "react";
import { Search } from "lucide-react";

interface UsersSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export const UsersSearch: React.FC<UsersSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full md:w-80">
      <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-secondary" />
      <input
        type="text"
        placeholder="Buscar usuario por nombre o correo..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-4 py-1.5 text-xs font-semibold border border-border-color rounded-lg focus:outline-none focus:ring-1 focus:ring-navy-blue text-text-primary placeholder:text-text-secondary"
      />
    </div>
  );
};

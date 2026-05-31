import React from "react";
import { Search } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { NotificationMenu } from "./NotificationMenu";
import { UserMenu } from "./UserMenu";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 h-16 w-full bg-white/80 backdrop-blur-md border-b border-border-color flex items-center justify-between px-6 shadow-sm">
      <div className="flex-1 flex items-center gap-6">
        <Breadcrumbs />
        
        {/* Search */}
        <div className="hidden lg:flex items-center relative max-w-md w-full ml-4">
          <Search className="w-4 h-4 absolute left-3 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar trámites, documentos, expedientes..."
            className="w-full bg-light-bg border border-border-color rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 transition-shadow"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NotificationMenu />
        <div className="w-px h-6 bg-border-color mx-2"></div>
        <UserMenu />
      </div>
    </header>
  );
};

import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex items-center text-sm text-text-secondary font-medium">
      <Link to="/dashboard" className="hover:text-navy-blue transition-colors flex items-center">
        <Home className="w-4 h-4" />
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const title = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            {last ? (
              <span className="text-navy-blue font-semibold">{title}</span>
            ) : (
              <Link to={to} className="hover:text-navy-blue transition-colors">
                {title}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

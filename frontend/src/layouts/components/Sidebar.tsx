import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  Files, 
  Cpu, 
  Megaphone, 
  Users, 
  Award, 
  UserCog, 
  PieChart, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { cn } from "../../lib/utils";
import logo from "../../assets/images/logo-dashboard.png";

const MENU_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/tramites", label: "Trámites", icon: FileText },
  { path: "/documentos", label: "Documentos", icon: Files },
  { path: "/machine-learning", label: "Machine Learning", icon: Cpu },
  { path: "/convocatorias", label: "Convocatorias", icon: Megaphone },
  { path: "/curriculos", label: "Currículos", icon: Users },
  { path: "/rankings", label: "Rankings", icon: Award },
  { path: "/usuarios", label: "Usuarios", icon: UserCog },
  { path: "/reportes", label: "Reportes", icon: PieChart },
];

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 88 : 260 }}
      className="h-screen bg-navy-blue text-white flex flex-col shrink-0 relative z-20 border-r border-navy-blue/10 shadow-xl"
    >
      {/* Header / Logo */}
      <div className="flex flex-col items-center justify-center px-4 mb-4 mt-6">
        <div className={cn(
          "bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300 cursor-pointer",
          sidebarCollapsed ? "h-12 w-12" : "h-40 w-40"
        )}>
           <img src={logo} alt="Logo" className="object-contain" />
        </div>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 font-bold text-lg whitespace-nowrap tracking-wide"
          >
            SIGDEM-ML
          </motion.div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 bg-municipal-green text-white rounded-full p-1 shadow-md hover:bg-dashboard-green transition-colors z-30"
      >
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-4 px-3 flex flex-col gap-1">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative group"
            >
              <div
                className={cn(
                  "flex items-center px-3 py-3 rounded-lg transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-white/10 text-white font-medium"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-8 bg-golden-sand rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-golden-sand" : "")} />
                
                {!sidebarCollapsed && (
                  <span className="ml-3 truncate">{item.label}</span>
                )}

                {sidebarCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        {!sidebarCollapsed && (
          <div className="text-xs text-white/50 text-center">
            v1.0.0 - Municipalidad
          </div>
        )}
      </div>
    </motion.aside>
  );
};

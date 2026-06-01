import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LoginBranding } from "../components/LoginBranding";
import { LoginCard } from "../components/LoginCard";
import { LoginForm } from "../components/LoginForm";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { useUserStore } from "../../../stores/userStore";
import { getDefaultRouteForRole } from "../../../auth/hooks/useRole";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [animState, setAnimState] = useState<'fullscreen' | 'split'>('fullscreen');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Automatically transition to split mode on initial load for the "presentation"
    const timer = setTimeout(() => setAnimState('split'), 1000);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleLoginSuccess = () => {
    // Primero, el lado derecho pasa a pantalla completa desplazando el izquierdo
    setAnimState('fullscreen');
    // Luego de 2 segundos, se desplaza toda la vista al defaultRoute correspondiente al rol
    setTimeout(() => {
      const storedRol = useUserStore.getState().rol || useUserStore.getState().role;
      const defaultRoute = getDefaultRouteForRole(storedRol as any);
      navigate(defaultRoute);
    }, 2000);
  };

  return (
    <motion.div 
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen flex flex-row overflow-hidden bg-[#FEFDFE]"
    >
      {/* Lado izquierdo: Login form con fondo azul animado */}
      <motion.div
        initial={false}
        animate={{ width: animState === 'fullscreen' ? "0%" : (isMobile ? "100%" : "50%") }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="relative bg-gradient-to-br from-navy-blue via-navy-blue to-[#0f2a50] overflow-hidden shrink-0"
      >
        <div className="absolute right-0 top-0 h-full w-screen md:w-[50vw] flex flex-col justify-center items-center p-8">
          <AnimatedBackground />
          
          {/* Efectos de fondo del diseño original */}
          <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <circle cx="4" cy="4" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          <div className="absolute bottom-8 left-8 w-32 h-32 bg-municipal-green/20 rounded-full blur-3xl z-0 pointer-events-none" />
          <div className="absolute top-16 right-16 w-48 h-48 bg-golden-sand/20 rounded-full blur-3xl z-0 pointer-events-none" />
          
          {/* Contenedor del Login */}
          <div className="relative z-10 w-full flex justify-center max-w-[480px]">
            <LoginCard>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary mb-2">Iniciar Sesión</h1>
                <p className="text-text-secondary">Accede a la plataforma institucional</p>
              </div>
              <LoginForm onSuccess={handleLoginSuccess} />
            </LoginCard>
          </div>
        </div>
      </motion.div>

      {/* Lado derecho: Imagen / Logo con fondo #FEFDFE */}
      <motion.div
        initial={false}
        animate={{ width: animState === 'fullscreen' ? "100%" : (isMobile ? "0%" : "50%") }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="flex items-center justify-center bg-[#FEFDFE] overflow-hidden shrink-0 relative"
      >
        <div className="w-screen md:w-[50vw] flex justify-center items-center p-12 shrink-0">
          <LoginBranding />
        </div>
      </motion.div>
    </motion.div>
  );
};

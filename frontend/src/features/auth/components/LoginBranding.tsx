import React from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/images/logo-sigdem-ml.png";

export const LoginBranding: React.FC = () => {
  return (
    <div className="hidden md:flex md:w-1/2 lg:w-1/2 flex-col justify-center items-center bg-gradient-to-br from-navy-blue via-navy-blue to-[#0f2a50] p-12 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <img src={logo} alt="SIGDEM-ML Logo" className="h-50 w-auto object-contain" />
        </motion.div>
      </motion.div>
      <div className="absolute bottom-8 left-8 w-32 h-32 bg-municipal-green/20 rounded-full blur-3xl" />
      <div className="absolute top-16 right-16 w-48 h-48 bg-golden-sand/20 rounded-full blur-3xl" />
    </div>
  );
};

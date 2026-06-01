import React from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/images/logo-sigdem-ml.png";

export const LoginBranding: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src={logo}
            alt="SIGDEM-ML Logo"
            className="max-w-full h-auto object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

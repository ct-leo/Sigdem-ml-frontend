import React from "react";
import { motion } from "framer-motion";

interface LoginCardProps {
  children: React.ReactNode;
}

export const LoginCard: React.FC<LoginCardProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-[480px] bg-card-bg rounded-3xl shadow-xl border border-border-color p-10"
    >
      {children}
    </motion.div>
  );
};

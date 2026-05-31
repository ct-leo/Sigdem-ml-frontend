import React from "react";
import { LoginBranding } from "../components/LoginBranding";
import { LoginCard } from "../components/LoginCard";
import { LoginForm } from "../components/LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <LoginBranding />
      <div className="w-full md:w-1/2 lg:w-1/2 flex items-center justify-center bg-light-bg p-8">
        <LoginCard>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Iniciar Sesión</h1>
            <p className="text-text-secondary">Accede a la plataforma institucional</p>
          </div>
          <LoginForm />
        </LoginCard>
      </div>
    </div>
  );
};

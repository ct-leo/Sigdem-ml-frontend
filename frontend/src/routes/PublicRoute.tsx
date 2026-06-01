import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

import { useRole } from "../auth/hooks/useRole";

export const PublicRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { defaultRoute } = useRole();

  if (isAuthenticated) {
    return <Navigate to={defaultRoute} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

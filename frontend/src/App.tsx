import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { LoginPage } from "./features/auth/pages/LoginPage";
import { MainLayout } from "./layouts/MainLayout";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";
import { TramitesPage } from "./features/tramites/pages/TramitesPage";
import { NewTramitePage } from "./features/tramites/pages/NewTramitePage";
import { TramiteDetailPage } from "./features/tramites/pages/TramiteDetailPage";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  const rootKey = location.pathname === "/" ? "login" : "app";

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={rootKey}>
        <Route path="/" element={<LoginPage />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/tramites" element={<TramitesPage />} />
          <Route path="/tramites/nuevo" element={<NewTramitePage />} />
          <Route path="/tramites/:id" element={<TramiteDetailPage />} />

          <Route path="/documentos" element={<DashboardPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="top-right" richColors />
        <AnimatedRoutes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
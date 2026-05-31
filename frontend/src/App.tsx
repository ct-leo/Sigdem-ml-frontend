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
import { DocumentsPage } from "./features/documentos/pages/DocumentsPage";
import { DocumentDetailPage } from "./features/documentos/pages/DocumentDetailPage";
import { MachineLearningPage } from "./features/machine-learning/pages/MachineLearningPage";
import { JobsPage } from "./features/rrhh/pages/JobsPage";
import { JobDetailPage } from "./features/rrhh/pages/JobDetailPage";
import { CreateJobPage } from "./features/rrhh/pages/CreateJobPage";
import { EditJobPage } from "./features/rrhh/pages/EditJobPage";
import { CurriculumsPage } from "./features/curriculos/pages/CurriculumsPage";
import { CurriculumDetailPage } from "./features/curriculos/pages/CurriculumDetailPage";

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

          <Route path="/documentos" element={<DocumentsPage />} />
          <Route path="/documentos/:id" element={<DocumentDetailPage />} />

          <Route path="/machine-learning" element={<MachineLearningPage />} />

          <Route path="/convocatorias" element={<JobsPage />} />
          <Route path="/convocatorias/nueva" element={<CreateJobPage />} />
          <Route path="/convocatorias/:id" element={<JobDetailPage />} />
          <Route path="/convocatorias/:id/editar" element={<EditJobPage />} />

          <Route path="/curriculos" element={<CurriculumsPage />} />
          <Route path="/curriculos/:id" element={<CurriculumDetailPage />} />
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
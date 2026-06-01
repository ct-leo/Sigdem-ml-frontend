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
import { RankingsPage } from "./features/rankings/pages/RankingsPage";
import { CandidateRankingDetailPage } from "./features/rankings/pages/CandidateRankingDetailPage";
import { UsersPage } from "./features/usuarios/pages/UsersPage";
import { CreateUserPage } from "./features/usuarios/pages/CreateUserPage";
import { EditUserPage } from "./features/usuarios/pages/EditUserPage";
import { UserDetailPage } from "./features/usuarios/pages/UserDetailPage";
import { MyProfilePage } from "./features/usuarios/pages/MyProfilePage";
import { ReportsPage } from "./features/reportes/pages/ReportsPage";
import { TramitesReportPage } from "./features/reportes/pages/TramitesReportPage";
import { RRHHReportPage } from "./features/reportes/pages/RRHHReportPage";
import { ProductivityReportPage } from "./features/reportes/pages/ProductivityReportPage";
import { AIReportPage } from "./features/reportes/pages/AIReportPage";
import { NotificationCenterPage } from "./features/notifications/pages/NotificationCenterPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  const rootKey = location.pathname === "/" ? "login" : "app";

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={rootKey}>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
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

            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/rankings/:id" element={<CandidateRankingDetailPage />} />

            <Route path="/usuarios" element={<UsersPage />} />
            <Route path="/usuarios/nuevo" element={<CreateUserPage />} />
            <Route path="/usuarios/:id" element={<UserDetailPage />} />
            <Route path="/usuarios/:id/editar" element={<EditUserPage />} />

            <Route path="/reportes" element={<ReportsPage />} />
            <Route path="/reportes/tramites" element={<TramitesReportPage />} />
            <Route path="/reportes/rrhh" element={<RRHHReportPage />} />
            <Route path="/reportes/productividad" element={<ProductivityReportPage />} />
            <Route path="/reportes/inteligencia-artificial" element={<AIReportPage />} />
            <Route path="/notificaciones" element={<NotificationCenterPage />} />
            <Route path="/mi-perfil" element={<MyProfilePage />} />
          </Route>
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
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
import { EditTramitePage } from "./features/tramites/pages/EditTramitePage";
import { DocumentsPage } from "./features/documentos/pages/DocumentsPage";
import { DocumentDetailPage } from "./features/documentos/pages/DocumentDetailPage";
import { MachineLearningPage } from "./features/machine-learning/pages/MachineLearningPage";
import { JobsPage } from "./features/rrhh/pages/JobsPage";
import { JobDetailPage } from "./features/rrhh/pages/JobDetailPage";
import { CreateJobPage } from "./features/rrhh/pages/CreateJobPage";
import { EditJobPage } from "./features/rrhh/pages/EditJobPage";
import { CurriculumsPage } from "./features/curriculos/pages/CurriculumsPage";
import { CurriculumDetailPage } from "./features/curriculos/pages/CurriculumDetailPage";
import { NLPPage as RankingsPage } from "./features/nlp/pages/NLPPage";
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
import { ProtectedRoute } from "./auth/guards/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { RoleGuard } from "./auth/guards/RoleGuard";

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
            {/* Dashboard: ADMIN only */}
            <Route path="/dashboard" element={<RoleGuard roles={["ADMIN"]}><DashboardPage /></RoleGuard>} />

            {/* Trámites: ADMIN, RECEPCIONISTA, ANALISTA */}
            <Route path="/tramites" element={<RoleGuard roles={["ADMIN", "RECEPCIONISTA", "ANALISTA"]}><TramitesPage /></RoleGuard>} />
            <Route path="/tramites/nuevo" element={<RoleGuard roles={["ADMIN", "RECEPCIONISTA"]}><NewTramitePage /></RoleGuard>} />
            <Route path="/tramites/:id" element={<RoleGuard roles={["ADMIN", "RECEPCIONISTA", "ANALISTA"]}><TramiteDetailPage /></RoleGuard>} />
            <Route path="/tramites/:id/editar" element={<RoleGuard roles={["ADMIN", "ANALISTA"]}><EditTramitePage /></RoleGuard>} />

            {/* Documentos: ADMIN, RECEPCIONISTA, ANALISTA */}
            <Route path="/documentos" element={<RoleGuard roles={["ADMIN", "RECEPCIONISTA", "ANALISTA"]}><DocumentsPage /></RoleGuard>} />
            <Route path="/documentos/:id" element={<RoleGuard roles={["ADMIN", "RECEPCIONISTA", "ANALISTA"]}><DocumentDetailPage /></RoleGuard>} />

            {/* Machine Learning: ADMIN, ANALISTA */}
            <Route path="/machine-learning" element={<RoleGuard roles={["ADMIN", "ANALISTA"]}><MachineLearningPage /></RoleGuard>} />

            {/* Convocatorias: ADMIN, RRHH */}
            <Route path="/convocatorias" element={<RoleGuard roles={["ADMIN", "RRHH"]}><JobsPage /></RoleGuard>} />
            <Route path="/convocatorias/nueva" element={<RoleGuard roles={["ADMIN", "RRHH"]}><CreateJobPage /></RoleGuard>} />
            <Route path="/convocatorias/:id" element={<RoleGuard roles={["ADMIN", "RRHH"]}><JobDetailPage /></RoleGuard>} />
            <Route path="/convocatorias/:id/editar" element={<RoleGuard roles={["ADMIN", "RRHH"]}><EditJobPage /></RoleGuard>} />

            {/* Currículos: ADMIN, RRHH */}
            <Route path="/curriculos" element={<RoleGuard roles={["ADMIN", "RRHH"]}><CurriculumsPage /></RoleGuard>} />
            <Route path="/curriculos/:id" element={<RoleGuard roles={["ADMIN", "RRHH"]}><CurriculumDetailPage /></RoleGuard>} />

            {/* Rankings: ADMIN, RRHH */}
            <Route path="/rankings" element={<RoleGuard roles={["ADMIN", "RRHH"]}><RankingsPage /></RoleGuard>} />
            <Route path="/rankings/:id" element={<RoleGuard roles={["ADMIN", "RRHH"]}><CandidateRankingDetailPage /></RoleGuard>} />

            {/* Usuarios: ADMIN only */}
            <Route path="/usuarios" element={<RoleGuard roles={["ADMIN"]}><UsersPage /></RoleGuard>} />
            <Route path="/usuarios/nuevo" element={<RoleGuard roles={["ADMIN"]}><CreateUserPage /></RoleGuard>} />
            <Route path="/usuarios/:id" element={<RoleGuard roles={["ADMIN"]}><UserDetailPage /></RoleGuard>} />
            <Route path="/usuarios/:id/editar" element={<RoleGuard roles={["ADMIN"]}><EditUserPage /></RoleGuard>} />

            {/* Reportes: ADMIN, RRHH, ANALISTA */}
            <Route path="/reportes" element={<RoleGuard roles={["ADMIN", "RRHH", "ANALISTA"]}><ReportsPage /></RoleGuard>} />
            <Route path="/reportes/tramites" element={<RoleGuard roles={["ADMIN", "RRHH", "ANALISTA"]}><TramitesReportPage /></RoleGuard>} />
            <Route path="/reportes/rrhh" element={<RoleGuard roles={["ADMIN", "RRHH", "ANALISTA"]}><RRHHReportPage /></RoleGuard>} />
            <Route path="/reportes/productividad" element={<RoleGuard roles={["ADMIN", "RRHH", "ANALISTA"]}><ProductivityReportPage /></RoleGuard>} />
            <Route path="/reportes/inteligencia-artificial" element={<RoleGuard roles={["ADMIN", "RRHH", "ANALISTA"]}><AIReportPage /></RoleGuard>} />
            
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
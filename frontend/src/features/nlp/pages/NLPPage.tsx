import React, { useState, useMemo } from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { RoleGuard } from "../../../components/RoleGuard";
import { useOpenJobs } from "../../rrhh/hooks/useJobs";
import { useCandidateRanking } from "../hooks/useCandidateRanking";
import { getCompatibilityColor, getCompatibilityLevel } from "../utils/compatibility.utils";
import { TopCandidatesSection } from "../components/TopCandidatesSection";
import { CandidateMatchModal } from "../components/CandidateMatchModal";
import {
  Briefcase,
  Users,
  Brain,
  TrendingUp,
  Award,
  Search,
  Mail,
  Phone,
  BarChart3,
  PieChart as PieIcon,
  AreaChart as AreaIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

export const NLPPage: React.FC = () => {
  const { data: openJobs, isLoading: isLoadingJobs } = useOpenJobs();
  const [selectedJobId, setSelectedJobId] = useState<number | "">("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCvId, setSelectedCvId] = useState<number | null>(null);

  // Retrieve rankings based on selected job ID
  const { data: rankingData, isLoading: isLoadingRanking } = useCandidateRanking(
    Number(selectedJobId)
  );

  // Get active job object
  const selectedJob = useMemo(() => {
    return openJobs?.find((j) => j.id === Number(selectedJobId));
  }, [openJobs, selectedJobId]);

  // Process & filter ranking list
  const filteredRanking = useMemo(() => {
    if (!rankingData?.ranking) return [];
    return [...rankingData.ranking]
      .filter(
        (candidate) =>
          candidate.candidato.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.resultado.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => b.compatibilidad - a.compatibilidad);
  }, [rankingData, searchTerm]);

  // Statistics calculation for KPIs
  const stats = useMemo(() => {
    if (!rankingData?.ranking || rankingData.ranking.length === 0) {
      return {
        total: 0,
        average: 0,
        topCandidate: "N/A",
        maxScore: 0,
      };
    }
    const scores = rankingData.ranking.map((r) => r.compatibilidad);
    const total = scores.length;
    const average = Math.round(scores.reduce((a, b) => a + b, 0) / total);
    const maxScore = Math.max(...scores);
    const topCand = rankingData.ranking.find((r) => r.compatibilidad === maxScore);

    return {
      total,
      average,
      topCandidate: topCand ? topCand.candidato : "N/A",
      maxScore,
    };
  }, [rankingData]);

  // Recharts Chart 2 (Pie Chart) Distribution data
  const pieData = useMemo(() => {
    if (!rankingData?.ranking) return [];
    let alta = 0; // 70-89
    let excelente = 0; // 90-100
    let media = 0; // 40-69
    let baja = 0; // 0-39

    rankingData.ranking.forEach((c) => {
      if (c.compatibilidad >= 90) excelente++;
      else if (c.compatibilidad >= 70) alta++;
      else if (c.compatibilidad >= 40) media++;
      else baja++;
    });

    return [
      { name: "Excelente (90-100%)", value: excelente, color: "#10b981" },
      { name: "Alta (70-89%)", value: alta, color: "#3b82f6" },
      { name: "Media (40-69%)", value: media, color: "#f59e0b" },
      { name: "Baja (0-39%)", value: baja, color: "#f43f5e" },
    ].filter((item) => item.value > 0);
  }, [rankingData]);

  // Recharts Chart 1 (Bar Chart) data
  const barData = useMemo(() => {
    if (!rankingData?.ranking) return [];
    return [...rankingData.ranking]
      .sort((a, b) => b.compatibilidad - a.compatibilidad)
      .map((c) => ({
        name: c.candidato.split(" ")[0] || c.candidato,
        compatibilidad: c.compatibilidad,
      }));
  }, [rankingData]);

  // Recharts Chart 3 (Area Chart) data
  const areaData = useMemo(() => {
    if (!rankingData?.ranking) return [];
    return [...rankingData.ranking]
      .sort((a, b) => a.compatibilidad - b.compatibilidad)
      .map((c, index) => ({
        index: index + 1,
        compatibilidad: c.compatibilidad,
        candidato: c.candidato,
      }));
  }, [rankingData]);

  // Skeleton Loaders
  const renderKpiSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
      ))}
    </div>
  );

  const renderChartSkeletons = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-80">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse h-full" />
      ))}
    </div>
  );

  const renderTableSkeleton = () => (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse h-64 w-full" />
  );

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Talent Intelligence Hub"
        description="Analítica predictiva de adecuación y rankings automatizados de candidatos por Similitud Semántica NLP."
      />

      <RoleGuard allowedRoles={["ADMIN", "RRHH"]}>
        {/* Top filter select job block */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center border border-blue-100 dark:border-blue-900">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase leading-none">
                Convocatoria Laboral de Contraste
              </h3>
              <p className="text-3xs text-slate-400 dark:text-slate-500 font-semibold mt-1 uppercase">
                Seleccione una convocatoria abierta para recalcular el ranking por IA
              </p>
            </div>
          </div>

          <div className="w-full md:w-72 shrink-0">
            {isLoadingJobs ? (
              <div className="h-10 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg" />
            ) : (
              <select
                value={selectedJobId}
                onChange={(e) => {
                  setSelectedJobId(e.target.value ? Number(e.target.value) : "");
                  setSearchTerm("");
                }}
                className="w-full h-10 px-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Seleccionar Convocatoria --</option>
                {openJobs?.map((job) => (
                  <option key={job.id} value={job.id}>
                    [ID: {job.id}] {job.titulo}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Dynamic content wrapper based on selected convocatoria */}
        {!selectedJobId ? (
          /* Institutional Empty State */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-dashed rounded-2xl p-16 text-center shadow-sm select-none"
          >
            <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-600 flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200 dark:border-slate-800">
              <Brain className="w-8 h-8" />
            </div>
            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-2">
              Esperando Selección de Convocatoria
            </h4>
            <p className="text-3xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto font-semibold uppercase leading-relaxed">
              Para desplegar los scores predictivos de adecuación, el podio de talentos y los gráficos analíticos en tiempo real, seleccione una de las convocatorias vigentes.
            </p>
          </motion.div>
        ) : isLoadingRanking ? (
          <div className="flex flex-col gap-6">
            {renderKpiSkeletons()}
            {renderChartSkeletons()}
            {renderTableSkeleton()}
          </div>
        ) : !rankingData?.ranking || rankingData.ranking.length === 0 ? (
          /* Empty ranking state */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-dashed rounded-2xl p-16 text-center shadow-sm select-none"
          >
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <Users className="w-8 h-8" />
            </div>
            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-2">
              Sin Candidaturas Registradas
            </h4>
            <p className="text-3xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto font-semibold uppercase leading-relaxed">
              No existen currículos cargados ni analizados para la convocatoria "{selectedJob?.titulo || "seleccionada"}". Proceda a subir hojas de vida desde el portal de CVs.
            </p>
          </motion.div>
        ) : (
          /* Real Data Loaded Dashboard */
          <div className="flex flex-col gap-6">
            {/* KPI Executive row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Convocatoria Name */}
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-blue-600 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-4xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">
                    Convocatoria
                  </span>
                  <span className="block text-xs font-black text-slate-700 dark:text-white uppercase truncate">
                    {rankingData.convocatoria}
                  </span>
                </div>
              </motion.div>

              {/* Total Candidates */}
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900 text-purple-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-4xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">
                    Total Postulantes
                  </span>
                  <span className="block text-sm font-black text-slate-800 dark:text-white uppercase leading-none mt-0.5">
                    {stats.total} perfiles
                  </span>
                </div>
              </motion.div>

              {/* Average Compatibility */}
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 text-emerald-600 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-4xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">
                    Compatibilidad Promedio
                  </span>
                  <span className="block text-sm font-black text-slate-800 dark:text-white uppercase leading-none mt-0.5">
                    {stats.average}%
                  </span>
                </div>
              </motion.div>

              {/* Top Candidate & Max Score */}
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900 text-amber-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-4xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">
                    Líder de Matching ({stats.maxScore}%)
                  </span>
                  <span className="block text-xs font-black text-slate-700 dark:text-white uppercase truncate">
                    {stats.topCandidate}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Top 3 premium cards visualizer */}
            <TopCandidatesSection
              candidates={rankingData.ranking}
              onSelectCandidate={setSelectedCvId}
            />

            {/* Interactive Analytical Charts Section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                    Modelamiento y Distribución Estadística de Idoneidad
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart */}
                <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-4">
                  <div className="flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span className="text-3xs font-black text-slate-400 uppercase tracking-wider">Compatibilidad por Candidato</span>
                  </div>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 9 }} domain={[0, 100]} stroke="#94a3b8" />
                        <Tooltip />
                        <Bar dataKey="compatibilidad" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                          {barData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.compatibilidad >= 90 ? "#10b981" : entry.compatibilidad >= 70 ? "#3b82f6" : "#f59e0b"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-4">
                  <div className="flex items-center gap-1.5">
                    <PieIcon className="w-4 h-4 text-purple-500" />
                    <span className="text-3xs font-black text-slate-400 uppercase tracking-wider">Segmentación de Rangos NLP</span>
                  </div>
                  <div className="h-60 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-4xs font-bold uppercase text-slate-500">
                    {pieData.map((d, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="truncate">{d.name} ({d.value})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Area Chart */}
                <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-4">
                  <div className="flex items-center gap-1.5">
                    <AreaIcon className="w-4 h-4 text-emerald-500" />
                    <span className="text-3xs font-black text-slate-400 uppercase tracking-wider">Curva Acumulativa de Postulantes</span>
                  </div>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={areaData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="index" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                        <Tooltip />
                        <Area type="monotone" dataKey="compatibilidad" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Ranking Table Container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                    Matriz General del Ranking ATS
                  </h3>
                  <p className="text-3xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5 uppercase">
                    Haga clic en cualquier fila para contrastar el expediente mediante el motor NLP
                  </p>
                </div>

                {/* Local search filter */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar candidato..."
                    className="w-full h-10 pl-9 pr-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {filteredRanking.length === 0 ? (
                <div className="py-8 text-center text-xs font-semibold text-slate-400">
                  Ningún candidato coincide con los criterios de búsqueda.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-3xs font-extrabold uppercase text-slate-400 tracking-wider">
                        <th className="py-3 px-4">Posición</th>
                        <th className="py-3 px-4">Candidato</th>
                        <th className="py-3 px-4">Contacto</th>
                        <th className="py-3 px-4 text-center">Compatibilidad</th>
                        <th className="py-3 px-4">Resultado NLP</th>
                        <th className="py-3 px-4 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                      {filteredRanking.map((row, idx) => {
                        const level = getCompatibilityLevel(row.compatibilidad);
                        const colorClass = getCompatibilityColor(row.compatibilidad);
                        return (
                          <motion.tr
                            key={row.cv_id}
                            whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}
                            onClick={() => setSelectedCvId(row.cv_id)}
                            className="cursor-pointer transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
                          >
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-2xs font-extrabold">
                                #{idx + 1}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-black uppercase text-slate-800 dark:text-white">
                              {row.candidato}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex flex-col gap-1 text-slate-500 font-semibold text-3xs">
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                                  {row.correo}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3 shrink-0 text-slate-400" />
                                  {row.telefono}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-2xs font-black">{row.compatibilidad}%</span>
                                <span className={`px-2 py-0.5 rounded-full text-4xs font-extrabold uppercase border ${colorClass}`}>
                                  {level}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 max-w-xs truncate font-semibold text-slate-500 dark:text-slate-400 italic">
                              "{row.resultado}"
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="text-2xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline">
                                Analizar
                              </span>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </RoleGuard>

      {/* Cognitive NLP matching modal */}
      {selectedCvId !== null && selectedJobId !== "" && (
        <CandidateMatchModal
          isOpen={selectedCvId !== null}
          onClose={() => setSelectedCvId(null)}
          cvId={selectedCvId}
          jobId={Number(selectedJobId)}
        />
      )}
    </div>
  );
};

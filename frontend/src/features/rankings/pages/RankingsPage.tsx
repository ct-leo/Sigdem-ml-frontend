import React, { useState, useMemo } from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { useRankings, useRankingStatistics, useRankingInsight } from "../hooks/useRankings";
import { RankingStatsCards } from "../components/RankingStatsCards";
import { TopCandidatesPodium } from "../components/TopCandidatesPodium";
import { RankingFilters } from "../components/RankingFilters";
import { RankingHeader } from "../components/RankingHeader";
import { RankingDistributionChart } from "../components/RankingDistributionChart";
import { RankingInsightsPanel } from "../components/RankingInsightsPanel";
import { CandidateRankingCard } from "../components/CandidateRankingCard";
import { CandidateRankingTable } from "../components/CandidateRankingTable";
import type { RankingFiltersState } from "../components/RankingFilters";
import { LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";

export const RankingsPage: React.FC = () => {
  const { data: rankings, isLoading: isLoadingRankings } = useRankings();
  const { data: stats, isLoading: isLoadingStats } = useRankingStatistics();
  const { data: insight, isLoading: isLoadingInsight } = useRankingInsight();

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<RankingFiltersState>({});
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Collect unique Convocatorias codes for filter dropdown
  const uniqueConvocatoriasCodes = useMemo(() => {
    if (!rankings) return [];
    return Array.from(new Set(rankings.map((c) => c.codeAssociated).filter(Boolean)));
  }, [rankings]);

  const filteredRankings = useMemo(() => {
    if (!rankings) return [];
    return rankings.filter((candidate) => {
      // Global search match
      const matchesSearch =
        candidate.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.jobTitleAssociated.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.codeAssociated.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = filters.status ? candidate.status === filters.status : true;
      const matchesPosition = filters.position ? candidate.position === filters.position : true;
      const matchesConvocatoria = filters.codeAssociated
        ? candidate.codeAssociated === filters.codeAssociated
        : true;
      const matchesMinScore = filters.minScore ? candidate.scoreIA >= Number(filters.minScore) : true;

      return matchesSearch && matchesStatus && matchesPosition && matchesConvocatoria && matchesMinScore;
    });
  }, [rankings, searchTerm, filters]);

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Ranking de Candidatos"
        description="Centro de Inteligencia de Talento: Evaluación predictiva e idoneidad de candidatos por Inteligencia Artificial."
      />

      {/* KPI Stats cards row */}
      <RankingStatsCards stats={stats} isLoading={isLoadingStats} />

      {/* High-Profile Top Candidates Podium */}
      {!isLoadingRankings && rankings && rankings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TopCandidatesPodium candidates={rankings} />
        </motion.div>
      )}

      {/* Analytical Charts and Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {!isLoadingRankings && rankings && <RankingDistributionChart candidates={rankings} />}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <RankingInsightsPanel insight={insight} isLoading={isLoadingInsight} />
        </motion.div>
      </div>

      {/* Toolbar Search / Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <div className="bg-white p-4 rounded-xl border border-border-color shadow-sm flex flex-col xl:flex-row gap-4 items-center justify-between">
          <RankingHeader value={searchTerm} onChange={setSearchTerm} />
          
          <div className="flex items-center gap-4 flex-wrap w-full xl:w-auto justify-between xl:justify-end">
            <RankingFilters
              filters={filters}
              onFilterChange={setFilters}
              convocatoriasCodes={uniqueConvocatoriasCodes}
            />

            {/* View Mode Toggle */}
            <div className="flex border border-border-color rounded-lg overflow-hidden shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-navy-blue text-white" : "bg-white text-text-secondary hover:bg-gray-50"}`}
                title="Vista de cuadrícula"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 transition-colors ${viewMode === "table" ? "bg-navy-blue text-white" : "bg-white text-text-secondary hover:bg-gray-50"}`}
                title="Vista de tabla"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* List table or Grid view */}
        {viewMode === "grid" ? (
          isLoadingRankings ? (
            <div className="bg-white border border-border-color rounded-xl p-8 text-center text-xs font-semibold text-text-secondary">
              Cargando cuadrícula de candidatos...
            </div>
          ) : filteredRankings.length === 0 ? (
            <div className="bg-white border border-border-color rounded-xl p-8 text-center text-xs font-semibold text-text-secondary">
              No se encontraron candidatos evaluados con los filtros seleccionados.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRankings.map((candidate) => (
                <CandidateRankingCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          )
        ) : (
          <CandidateRankingTable candidates={filteredRankings} isLoading={isLoadingRankings} />
        )}
      </motion.div>
    </div>
  );
};

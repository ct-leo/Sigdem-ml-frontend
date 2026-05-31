import React, { useState, useMemo } from "react";
import { PageHeader } from "../../../components/ui/PageHeader";
import { CurriculumStatsCards } from "../components/CurriculumStatsCards";
import { CurriculumsFilters } from "../components/CurriculumsFilters";
import { CurriculumsSearch } from "../components/CurriculumsSearch";
import { CurriculumsTable } from "../components/CurriculumsTable";
import { useCurriculums, useCurriculumStats } from "../hooks/useCurriculums";
import type { CurriculumsFiltersState } from "../components/CurriculumsFilters";
import { motion } from "framer-motion";

export const CurriculumsPage: React.FC = () => {
  const { data: curriculums, isLoading } = useCurriculums();
  const { data: stats, isLoading: isLoadingStats } = useCurriculumStats();

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<CurriculumsFiltersState>({});

  // Collect unique Convocatorias codes for filter dropdown
  const uniqueConvocatoriasCodes = useMemo(() => {
    if (!curriculums) return [];
    return Array.from(new Set(curriculums.map((c) => c.codeAssociated).filter(Boolean)));
  }, [curriculums]);

  const filteredCvs = useMemo(() => {
    if (!curriculums) return [];
    return curriculums.filter((cv) => {
      // Global search match
      const matchesSearch =
        cv.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cv.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cv.jobTitleAssociated.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cv.codeAssociated.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cv.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = filters.status ? cv.status === filters.status : true;
      const matchesConvocatoria = filters.codeAssociated
        ? cv.codeAssociated === filters.codeAssociated
        : true;
      const matchesAcademic = filters.academicLevel
        ? cv.educations.some((edu) => edu.academicLevel.includes(filters.academicLevel || ""))
        : true;
      const matchesExperience = filters.experienceYears
        ? cv.experienceYears >= Number(filters.experienceYears)
        : true;

      let matchesCompatibility = true;
      if (filters.compatibilityLevel === "Excellent") {
        matchesCompatibility = cv.compatibilityPercentage >= 90;
      } else if (filters.compatibilityLevel === "Good") {
        matchesCompatibility = cv.compatibilityPercentage >= 70 && cv.compatibilityPercentage < 90;
      } else if (filters.compatibilityLevel === "Moderate") {
        matchesCompatibility = cv.compatibilityPercentage < 70;
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesConvocatoria &&
        matchesAcademic &&
        matchesExperience &&
        matchesCompatibility
      );
    });
  }, [curriculums, searchTerm, filters]);

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Currículos"
        description="Gestiona y analiza los perfiles profesionales procesados por el sistema."
      />

      {/* KPI Stats cards row */}
      <CurriculumStatsCards stats={stats} isLoading={isLoadingStats} />

      {/* Toolbar Search / Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <div className="bg-white p-4 rounded-xl border border-border-color shadow-sm flex flex-col xl:flex-row gap-4 items-center justify-between">
          <CurriculumsSearch value={searchTerm} onChange={setSearchTerm} />
          <CurriculumsFilters
            filters={filters}
            onFilterChange={setFilters}
            convocatoriasCodes={uniqueConvocatoriasCodes}
          />
        </div>

        {/* List table */}
        <CurriculumsTable curriculums={filteredCvs} isLoading={isLoading} />
      </motion.div>
    </div>
  );
};

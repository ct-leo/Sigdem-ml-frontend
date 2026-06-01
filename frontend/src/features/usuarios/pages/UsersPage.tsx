import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { useUsers, useUserStatistics } from "../hooks/useUsers";
import { UserStatsCards } from "../components/UserStatsCards";
import { UsersSearch } from "../components/UsersSearch";
import { UsersFilters } from "../components/UsersFilters";
import { UsersTable } from "../components/UsersTable";
import type { UsersFiltersState } from "../components/UsersFilters";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { data: stats, isLoading: isLoadingStats } = useUserStatistics();

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<UsersFiltersState>({});

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((u) => {
      const matchesSearch =
        u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = filters.role ? u.role === filters.role : true;
      const matchesStatus = filters.status ? u.status === filters.status : true;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, filters]);

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <PageHeader
        title="Usuarios"
        description="Administra los usuarios y permisos del sistema institucional."
        actions={
          <Button onClick={() => navigate("/usuarios/nuevo")} className="gap-2 px-5">
            <UserPlus className="w-4 h-4" />
            Nuevo Usuario
          </Button>
        }
      />

      {/* KPIs superiore */}
      <UserStatsCards stats={stats} isLoading={isLoadingStats} />

      {/* Toolbar Search / Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <div className="bg-white p-4 rounded-xl border border-border-color shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <UsersSearch value={searchTerm} onChange={setSearchTerm} />
          <UsersFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Users Table */}
        <UsersTable users={filteredUsers} isLoading={isLoadingUsers} />
      </motion.div>
    </div>
  );
};

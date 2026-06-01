import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { useUser } from "../hooks/useUser";
import { mapUserToLegacy } from "../types/user.types";
import { UserProfileHeader } from "../components/UserProfileHeader";
import { UserInfoCard } from "../components/UserInfoCard";
import { UserPermissionsCard } from "../components/UserPermissionsCard";
import { UserActivityCard } from "../components/UserActivityCard";
import { ArrowLeft, Edit } from "lucide-react";

export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: rawUser, isLoading } = useUser(id || "");
  const user = rawUser ? mapUserToLegacy(rawUser) : undefined;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-xs font-semibold text-text-secondary select-none">
        <div className="flex flex-col items-center gap-2">
          <span className="w-6 h-6 border-2 border-t-navy-blue border-r-transparent rounded-full animate-spin" />
          <span>Cargando perfil del usuario...</span>
        </div>
      </div>
    );
  }

  if (!rawUser || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 select-none">
        <p className="text-sm font-semibold text-text-secondary">Usuario no encontrado</p>
        <Button onClick={() => navigate("/usuarios")} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Volver a Usuarios
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate("/usuarios")} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Button>
        <Button size="sm" onClick={() => navigate(`/usuarios/${rawUser.id}/editar`)} className="gap-1.5 px-4 font-bold">
          <Edit className="w-4 h-4" /> Editar Usuario
        </Button>
      </div>

      <PageHeader
        title={`Perfil de Usuario: ${user.fullName}`}
        description="Ficha integral del personal, privilegios RBAC asignados y auditoría de accesos."
      />

      {/* Profile Header */}
      <UserProfileHeader user={user as any} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Admin Info card */}
        <div className="lg:col-span-1">
          <UserInfoCard user={user as any} />
        </div>

        {/* Right column: Permissions & Activities cards */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <UserPermissionsCard user={user as any} />
          <UserActivityCard user={user as any} />
        </div>
      </div>
    </div>
  );
};

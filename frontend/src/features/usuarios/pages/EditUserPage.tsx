import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { UserForm } from "../components/UserForm";
import { useUser } from "../hooks/useUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { mapUserToLegacy } from "../types/user.types";
import { ArrowLeft } from "lucide-react";
import { alerts } from "../../../utils/sweetalert";
import type { UserSchemaInput } from "../schemas/user.schema";

export const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: rawUser, isLoading: isLoadingUser } = useUser(id || "");
  const updateUserMutation = useUpdateUser();

  const user = rawUser ? mapUserToLegacy(rawUser) : undefined;

  const handleSubmit = async (data: UserSchemaInput) => {
    if (!rawUser) return;
    
    const result = await alerts.confirmAction(
      "Guardar Cambios",
      "¿Desea aplicar las modificaciones al usuario?",
      "Guardar",
      "Cancelar"
    );
    if (!result.isConfirmed) return;

    try {
      await updateUserMutation.mutateAsync({
        id: rawUser.id,
        data: {
          fullName: data.fullName,
          email: data.email,
          role: data.role,
          status: data.status,
          phone: data.phone,
          position: data.position,
        },
      });
      await alerts.success("Cambios Guardados", "Los datos del usuario han sido actualizados exitosamente.");
      navigate("/usuarios");
    } catch (err: any) {
      alerts.error("Error", err.message || "Error al actualizar el usuario");
    }
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-xs font-semibold text-text-secondary select-none">
        <div className="flex flex-col items-center gap-2">
          <span className="w-6 h-6 border-2 border-t-navy-blue border-r-transparent rounded-full animate-spin" />
          <span>Cargando datos del usuario...</span>
        </div>
      </div>
    );
  }

  if (!user || !rawUser) {
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
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate("/usuarios")} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Button>
      </div>

      <PageHeader
        title={`Editar Usuario: ${user.fullName}`}
        description="Actualiza la información administrativa o el rol de acceso del usuario."
      />

      <div className="max-w-3xl mx-auto w-full">
        <UserForm
          initialValues={{
            fullName: user.fullName,
            email: user.email,
            role: user.role as any,
            status: user.status as any,
            phone: user.phone,
            position: user.position,
          }}
          onSubmit={handleSubmit}
          isLoading={updateUserMutation.isPending}
          isEditMode={true}
        />
      </div>
    </div>
  );
};

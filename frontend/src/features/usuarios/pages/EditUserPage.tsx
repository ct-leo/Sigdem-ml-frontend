import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { UserForm } from "../components/UserForm";
import { useUser } from "../hooks/useUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import type { UserSchemaInput } from "../schemas/user.schema";

export const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: user, isLoading: isLoadingUser } = useUser(id || "");
  const updateUserMutation = useUpdateUser();

  const handleSubmit = async (data: UserSchemaInput) => {
    if (!user) return;
    try {
      await updateUserMutation.mutateAsync({
        id: user.id,
        dto: {
          fullName: data.fullName,
          email: data.email,
          role: data.role,
          status: data.status,
          phone: data.phone,
          position: data.position,
          area: data.area,
        },
      });
      toast.success("Usuario actualizado exitosamente");
      navigate("/usuarios");
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar el usuario");
    }
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-xs font-semibold text-text-secondary select-none">
        Cargando datos del usuario...
      </div>
    );
  }

  if (!user) {
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
            role: user.role,
            status: user.status,
            phone: user.phone,
            position: user.position,
            area: user.area,
          }}
          onSubmit={handleSubmit}
          isLoading={updateUserMutation.isPending}
          isEditMode={true}
        />
      </div>
    </div>
  );
};

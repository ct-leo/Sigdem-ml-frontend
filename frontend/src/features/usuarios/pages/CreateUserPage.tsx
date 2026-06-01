import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { UserForm } from "../components/UserForm";
import { useCreateUser } from "../hooks/useCreateUser";
import { ArrowLeft } from "lucide-react";
import { alerts } from "../../../utils/sweetalert";
import type { UserSchemaInput } from "../schemas/user.schema";

export const CreateUserPage: React.FC = () => {
  const navigate = useNavigate();
  const createUserMutation = useCreateUser();

  const handleSubmit = async (data: UserSchemaInput) => {
    const result = await alerts.confirmAction(
      "Confirmar Registro",
      "¿Está seguro de registrar este nuevo usuario?",
      "Registrar",
      "Cancelar"
    );
    if (!result.isConfirmed) return;

    try {
      await createUserMutation.mutateAsync({
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        status: data.status,
        phone: data.phone,
        position: data.position,
        password: data.password,
      });
      await alerts.success("Usuario Creado", "El usuario ha sido registrado exitosamente.");
      navigate("/usuarios");
    } catch (err: any) {
      alerts.error("Error", err.message || "Error al registrar el usuario");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8 select-none">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate("/usuarios")} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Button>
      </div>

      <PageHeader
        title="Registrar Nuevo Usuario"
        description="Agrega una nueva identidad interna y configura su rol inicial en el sistema."
      />

      <div className="max-w-3xl mx-auto w-full">
        <UserForm onSubmit={handleSubmit} isLoading={createUserMutation.isPending} />
      </div>
    </div>
  );
};

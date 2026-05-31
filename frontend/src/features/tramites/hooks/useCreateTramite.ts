import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tramitesService } from "../services/tramites.service";
import type { CreateTramiteDto } from "../types/tramite.types";
import { toast } from "sonner";

export const useCreateTramite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTramiteDto) => tramitesService.createTramite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tramites"] });
      toast.success("Trámite registrado exitosamente");
    },
    onError: () => {
      toast.error("Hubo un error al registrar el trámite");
    }
  });
};

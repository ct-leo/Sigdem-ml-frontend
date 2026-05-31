import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { curriculumsService } from "../services/curriculums.service";
import type { CandidateStatus } from "../types/curriculum.types";

export const useCurriculums = () => {
  return useQuery({
    queryKey: ["curriculums"],
    queryFn: () => curriculumsService.getCurriculums(),
  });
};

export const useCurriculumStats = () => {
  return useQuery({
    queryKey: ["curriculumStats"],
    queryFn: () => curriculumsService.getCurriculumStats(),
  });
};

export const useUpdateCurriculumStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CandidateStatus }) =>
      curriculumsService.updateCurriculumStatus(id, status),
    onSuccess: (updatedCV) => {
      queryClient.invalidateQueries({ queryKey: ["curriculums"] });
      queryClient.invalidateQueries({ queryKey: ["curriculum", updatedCV.id] });
      queryClient.invalidateQueries({ queryKey: ["curriculumStats"] });
    },
  });
};

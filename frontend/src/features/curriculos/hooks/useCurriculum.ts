import { useQuery } from "@tanstack/react-query";
import { curriculumsService } from "../services/curriculums.service";

export const useCurriculum = (id: string) => {
  return useQuery({
    queryKey: ["curriculum", id],
    queryFn: () => curriculumsService.getCurriculumById(id),
    enabled: !!id,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getModels } from "../../../api/models";

export const useModels = (manId?: number) =>
  useQuery({
    queryKey: ["models", manId],
    queryFn: () => getModels(manId!),
    enabled: Boolean(manId),
    select: (items) => items.filter((item) => item.is_car),
    staleTime: 1000 * 60 * 60,
  });
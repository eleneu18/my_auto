import { useQueries } from "@tanstack/react-query";

import { getModels } from "../../../api/models";
import type { CarModel } from "../types";

const ONE_HOUR_MS = 1000 * 60 * 60;

type UseModelsResult = {
  models: CarModel[];
  modelsByManufacturer: Map<number, CarModel[]>;
  isLoading: boolean;
};


export const useModels = (manIds: number[]): UseModelsResult => {
  return useQueries({
    queries: manIds.map((manId) => ({
      queryKey: ["models", manId],
      queryFn: () => getModels(manId),
      select: (items: CarModel[]) => items.filter((item) => item.is_car),
      staleTime: ONE_HOUR_MS,
    })),
    combine: (results): UseModelsResult => {
      const modelsByManufacturer = new Map<number, CarModel[]>();
      const flat: CarModel[] = [];

      results.forEach((result, index) => {
        const manId = manIds[index];
        const data = result.data ?? [];

        if (manId !== undefined) {
          modelsByManufacturer.set(manId, data);
        }

        flat.push(...data);
      });

      return {
        models: flat,
        modelsByManufacturer,
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });
};

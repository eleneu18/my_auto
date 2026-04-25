import type { CarModel } from "../features/listings/types";

type ModelsResponse = {
  data: CarModel[];
};

export const getModels = async (manId: number): Promise<CarModel[]> => {
  const response = await fetch(
    `https://api2.myauto.ge/ka/getManModels?man_id=${manId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch models");
  }

  const result = (await response.json()) as ModelsResponse;
  return result.data;
};
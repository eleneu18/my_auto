import type { Manufacturer } from "../features/listings/types";
import { endpoints } from "../shared/api/endpoints";

export const getManufacturers = async (): Promise<Manufacturer[]> => {
  const response = await fetch(endpoints.manufacturers);

  if (!response.ok) {
    throw new Error("Failed to fetch manufacturers");
  }

  return response.json() as Promise<Manufacturer[]>;
};
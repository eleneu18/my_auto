import type { Manufacturer } from "../features/listings/types";

export const getManufacturers = async (): Promise<Manufacturer[]> => {
  const response = await fetch("https://static.my.ge/myauto/js/mans.json");

  if (!response.ok) {
    throw new Error("Failed to fetch manufacturers");
  }

  return response.json() as Promise<Manufacturer[]>;
};
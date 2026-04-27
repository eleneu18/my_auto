import type { CurrencyApiResponse } from "../features/listings/types";
import { endpoints } from "../shared/api/endpoints";

export const getCurrencies = async () => {
  const response = await fetch(endpoints.currencies);

  if (!response.ok) {
    throw new Error("Failed to fetch currencies");
  }

  const result = (await response.json()) as CurrencyApiResponse;

  return result.Data;
};
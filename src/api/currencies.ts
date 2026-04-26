import type { CurrencyApiResponse } from "../features/listings/types";

const CURRENCIES_URL = "https://api2.myauto.ge/ka/currency";

export const getCurrencies = async () => {
  const response = await fetch(CURRENCIES_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch currencies");
  }

  const result = (await response.json()) as CurrencyApiResponse;

  return result.Data;
};
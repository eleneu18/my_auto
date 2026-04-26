import { useQuery } from "@tanstack/react-query";

import { getCurrencies } from "../../../api/currencies";
import type { Currency } from "../types";

const currencyIdByKey: Record<Currency, string> = {
  gel: "3",
  usd: "1",
};

export const useCurrencies = () => {
  const query = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
    staleTime: 1000 * 60 * 60,
  });

  const getCurrency = (currency: Currency) => {
    const item = query.data?.[currencyIdByKey[currency]];

    return {
      id: item?.currency_id ?? currencyIdByKey[currency],
      symbol: item?.currency_symbol ?? (currency === "gel" ? "₾" : "$"),
      rate: item ? Number(item.currency_rate) : currency === "gel" ? 1 : 0,
    };
  };

  return {
    currencies: query.data,
    getCurrency,
    isLoading: query.isLoading,
  };
};
import type { ProductFilters } from "../types";

const vehicleTypeToTypeId: Record<NonNullable<ProductFilters["vehicleType"]>, string> = {
  car: "0",
  tractor: "1",
  moto: "2",
};

export const buildSearchParams = (filters: ProductFilters) => {
  const params = new URLSearchParams();
  if (filters.vehicleType) {
    params.set("TypeID", vehicleTypeToTypeId[filters.vehicleType]);
  }
  if (filters.forRent !== undefined) {
    params.set("ForRent", String(filters.forRent));
  }

  if (filters.mans) params.set("Mans", filters.mans);
  if (filters.cats) params.set("Cats", filters.cats);
  if (filters.priceFrom) params.set("PriceFrom", String(filters.priceFrom));
  if (filters.priceTo) params.set("PriceTo", String(filters.priceTo));
  if (filters.period) params.set("Period", filters.period);
  if (filters.sortOrder) params.set("SortOrder", String(filters.sortOrder));
  if (filters.page) params.set("Page", String(filters.page));

  return params;
};
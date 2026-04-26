import type { ProductFilters, ProductsResponse } from "../features/listings/types";
import { buildSearchParams } from "../features/listings/utils/buildSearchParams";

const PRODUCTS_URL = "https://api2.myauto.ge/ka/products";

export const getProducts = async (
  filters: ProductFilters = {},
): Promise<ProductsResponse["data"]> => {
  const params = buildSearchParams(filters);
  const url = `${PRODUCTS_URL}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = (await response.json()) as ProductsResponse;

  return result.data;
};
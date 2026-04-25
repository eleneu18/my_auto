import type { ProductsResponse } from "../features/listings/types";

const PRODUCTS_URL = "https://api2.myauto.ge/ka/products/";

export const getProducts = async (): Promise<ProductsResponse["data"]> => {
  const response = await fetch(PRODUCTS_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = (await response.json()) as ProductsResponse;

  return result.data;
};
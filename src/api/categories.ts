import type { Category } from "../features/listings/types";
import { endpoints } from "../shared/api/endpoints";

type CategoriesResponse = {
  data: Category[];
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(endpoints.categories);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = (await response.json()) as CategoriesResponse;
  return result.data;
};
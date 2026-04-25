import type { Category } from "../features/listings/types";

type CategoriesResponse = {
  data: Category[];
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch("https://api2.myauto.ge/ka/cats/get");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = (await response.json()) as CategoriesResponse;
  return result.data;
};
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../../../api/products";
import type { ProductFilters } from "../types";

export const useProducts = (filters: ProductFilters = {}) => {
  const query = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    staleTime: 60_000,
  });

  return {
    products: query.data?.items ?? [],
    total: query.data?.meta.total ?? 0,
    meta: query.data?.meta,
    isLoading: query.isLoading,
    error: query.error ? "პროდუქტების ჩატვირთვა ვერ მოხერხდა" : null,
    isFetching: query.isFetching,
  };
};
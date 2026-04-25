import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../../../api/products";

export const useProducts = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 60_000,
  });

  return {
    products: query.data?.items ?? [],
    total: query.data?.meta.total ?? query.data?.items.length ?? 0,
    isLoading: query.isLoading,
    error: query.error ? "პროდუქტების ჩატვირთვა ვერ მოხერხდა" : null,
    isError: query.isError,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};
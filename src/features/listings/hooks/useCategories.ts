import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../api/categories";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (items) => items.filter((item) => item.vehicle_types.includes(0)),
    staleTime: 1000 * 60 * 60,
  });
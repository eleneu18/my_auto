import { useQuery } from "@tanstack/react-query";
import { getManufacturers } from "../../../api/manufacturers";

export const useManufacturers = () =>
  useQuery({
    queryKey: ["manufacturers"],
    queryFn: getManufacturers,
    select: (items) => items.filter((item) => item.is_car === "1"),
    staleTime: 1000 * 60 * 60,
  });
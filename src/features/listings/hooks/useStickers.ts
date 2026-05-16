import { useQuery } from "@tanstack/react-query";
import { getStickers } from "../../../api/stickers";

export const useStickers = () =>
  useQuery({
    queryKey: ["stickers"],
    queryFn: getStickers,
    staleTime: 1000 * 60 * 60,
  });

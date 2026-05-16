import type {
  QuickMainDataResponse,
  Sticker,
} from "../features/listings/types";
import { endpoints } from "../shared/api/endpoints";

type RawSticker = {
  id: string;
  key: string;
  title: string;
  ForAuto: string;
  AdsCount: string;
  new_title: string;
};


const normalizeSticker = (raw: RawSticker): Sticker => ({
  id: Number(raw.id),
  key: raw.key,
  title: raw.title,
  forAuto: raw.ForAuto === "1",
  adsCount: Number(raw.AdsCount),
});

export const getStickers = async (): Promise<Sticker[]> => {
  const response = await fetch(endpoints.quickMainData);

  if (!response.ok) {
    throw new Error("Failed to fetch stickers");
  }

  const result = (await response.json()) as QuickMainDataResponse;
  const rawStickers = JSON.parse(result.data.stickers) as RawSticker[];

  return rawStickers.map(normalizeSticker);
};

import type { Sticker } from "../types";

export type StickerTag = {
  label: string;
  icon: "danger" | "goodCondition" | "clear";
};

export type VipLabel = "S-VIP" | "VIP+" | "VIP" | null;

export const getVipLabel = (orderNumber: number): VipLabel => {
  if (orderNumber >= 20) return "S-VIP";
  if (orderNumber >= 15) return "VIP+";
  if (orderNumber >= 10) return "VIP";

  return null;
};

const STICKER_ICON_BY_ID: Record<number, StickerTag["icon"]> = {
  23: "danger",
  79: "danger",
  31: "goodCondition",
  3: "goodCondition",
  17: "goodCondition",
  5: "clear",
  19: "clear",
};

const DEFAULT_STICKER_ICON: StickerTag["icon"] = "clear";

export const getStickerTags = (
  stickerId: number | null,
  stickers: Sticker[] | undefined,
): StickerTag[] => {
  if (!stickerId || !stickers || stickers.length === 0) return [];

  const sticker = stickers.find((item) => item.id === stickerId);
  if (!sticker) return [];

  return [
    {
      label: sticker.title,
      icon: STICKER_ICON_BY_ID[sticker.id] ?? DEFAULT_STICKER_ICON,
    },
  ];
};

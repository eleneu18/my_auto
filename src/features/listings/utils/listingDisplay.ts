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

export const getStickerTags = (stickers: number | null): StickerTag[] => {
  if (!stickers) return [];

  const tags: StickerTag[] = [];

  if (stickers & 1) {
    tags.push({ label: "სასწრაფოდ", icon: "danger" });
  }

  if (stickers & 2) {
    tags.push({ label: "იდეალურ მდგომარეობაში", icon: "goodCondition" });
  }

  if (stickers & 4) {
    tags.push({ label: "სუფთა ისტორია", icon: "clear" });
  }

  return tags;
};

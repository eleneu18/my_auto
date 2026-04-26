import type { AppliedListingFilters, Currency } from "../types";

const currencyToCurrId: Record<Currency, string> = {
  gel: "3",
  usd: "1",
};

const currIdToCurrency: Record<string, Currency> = {
  "3": "gel",
  "1": "usd",
};

const parseNumberList = (value: string | null) => {
  if (!value) return [];

  return value
    .split(".")
    .map(Number)
    .filter((value) => Number.isFinite(value));
};

export const parseFiltersFromUrl = (): {
  filters: AppliedListingFilters;
  page: number;
} => {
  const params = new URLSearchParams(window.location.search);

  const bargainType = params.get("bargainType");
  const mansNModels = params.get("mansNModels");
  const vehicleCats = params.get("vehicleCats");
  const currId = params.get("currId");

  const manufacturerIds: number[] = [];
  const modelIds: number[] = [];

  if (mansNModels) {
    mansNModels.split("-").forEach((group) => {
      const ids = parseNumberList(group);

      if (ids.length > 0) {
        manufacturerIds.push(ids[0]);
        modelIds.push(...ids.slice(1));
      }
    });
  }

  const priceFrom = params.get("priceFrom");
  const priceTo = params.get("priceTo");
  const page = Number(params.get("page") ?? 1);

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    filters: {
      forRent:
        bargainType === "0" || bargainType === "1"
          ? (Number(bargainType) as 0 | 1)
          : undefined,
      manufacturerIds,
      modelIds,
      categoryIds: parseNumberList(vehicleCats),
      priceFrom: priceFrom ? Number(priceFrom) : undefined,
      priceTo: priceTo ? Number(priceTo) : undefined,
      currency: currId ? (currIdToCurrency[currId] ?? "gel") : "gel",
    },
  };
};

export const buildUrlParamsFromFilters = (
  filters: AppliedListingFilters,
  page: number,
) => {
  const params = new URLSearchParams();

  params.set("vehicleType", "0");

  if (filters.forRent !== undefined) {
    params.set("bargainType", String(filters.forRent));
  }

  if (filters.manufacturerIds.length > 0) {
    params.set(
      "mansNModels",
      filters.manufacturerIds
        .map((manufacturerId) => {
          const modelPart =
            filters.modelIds.length > 0 ? `.${filters.modelIds.join(".")}` : "";

          return `${manufacturerId}${modelPart}`;
        })
        .join("-"),
    );
  }

  if (filters.categoryIds.length > 0) {
    params.set("vehicleCats", filters.categoryIds.join("."));
  }

  if (filters.priceFrom !== undefined) {
    params.set("priceFrom", String(filters.priceFrom));
  }

  if (filters.priceTo !== undefined) {
    params.set("priceTo", String(filters.priceTo));
  }

  params.set("currId", currencyToCurrId[filters.currency]);
  params.set("mileageType", "1");
  params.set("page", String(page));
  params.set("layoutId", "1");

  return params;
};
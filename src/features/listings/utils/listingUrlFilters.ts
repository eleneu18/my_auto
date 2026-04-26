import type {
  AppliedListingFilters,
  Currency,
  Period,
  SortOrder,
} from "../types";

const currencyToCurrId: Record<Currency, string> = {
  gel: "3",
  usd: "1",
};

const currIdToCurrency: Record<string, Currency> = {
  "3": "gel",
  "1": "usd",
};

const periods: Period[] = [
  "1h",
  "2h",
  "3h",
  "1d",
  "2d",
  "3d",
  "1w",
  "2w",
  "3w",
];

const sortOrders: SortOrder[] = [1, 2, 3, 4, 5, 6];

const parseNumberList = (value: string | null) => {
  if (!value) return [];

  return value
    .split(".")
    .map(Number)
    .filter((value) => Number.isFinite(value));
};

const parseOptionalNumber = (value: string | null) => {
  if (!value) return undefined;

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : undefined;
};

const parsePeriod = (value: string | null): Period => {
  return value && periods.includes(value as Period) ? (value as Period) : "3h";
};

const parseSortOrder = (value: string | null): SortOrder => {
  const numberValue = Number(value);

  return sortOrders.includes(numberValue as SortOrder)
    ? (numberValue as SortOrder)
    : 1;
};

export const parseFiltersFromUrl = (): {
  filters: AppliedListingFilters;
  page: number;
  period: Period;
  sortOrder: SortOrder;
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

  const page = Number(params.get("page") ?? 1);

  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    period: parsePeriod(params.get("period")),
    sortOrder: parseSortOrder(params.get("sortOrder")),
    filters: {
      forRent:
        bargainType === "0" || bargainType === "1"
          ? (Number(bargainType) as 0 | 1)
          : undefined,
      manufacturerIds,
      modelIds,
      categoryIds: parseNumberList(vehicleCats),
      priceFrom: parseOptionalNumber(params.get("priceFrom")),
      priceTo: parseOptionalNumber(params.get("priceTo")),
      currency: currId ? (currIdToCurrency[currId] ?? "gel") : "gel",
    },
  };
};

export const buildUrlParamsFromFilters = (
  filters: AppliedListingFilters,
  page: number,
  period: Period,
  sortOrder: SortOrder,
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
  params.set("period", period);
  params.set("sortOrder", String(sortOrder));
  params.set("page", String(page));
  params.set("layoutId", "1");

  return params;
};
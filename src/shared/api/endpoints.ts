const FALLBACK_API_BASE_URL = "https://api2.myauto.ge/ka";
const FALLBACK_STATIC_BASE_URL = "https://static.my.ge";

const stripTrailingSlash = (value: string): string =>
  value.endsWith("/") ? value.slice(0, -1) : value;

export const API_BASE_URL = stripTrailingSlash(
  import.meta.env.VITE_API_BASE_URL ?? FALLBACK_API_BASE_URL,
);

export const STATIC_BASE_URL = stripTrailingSlash(
  import.meta.env.VITE_STATIC_BASE_URL ?? FALLBACK_STATIC_BASE_URL,
);

export const endpoints = {
  products: `${API_BASE_URL}/products`,
  categories: `${API_BASE_URL}/cats/get`,
  currencies: `${API_BASE_URL}/currency`,
  manufacturers: `${STATIC_BASE_URL}/myauto/js/mans.json`,
  modelsForManufacturer: `${API_BASE_URL}/getManModels`,
} as const;

# myauto.ge clone

A responsive React + TypeScript clone of the [myauto.ge](https://www.myauto.ge) car listings page. The app fetches live data from myauto's public API (manufacturers, models, categories, products, currencies), supports filtering, sorting, pagination, currency switching, and renders both desktop and mobile-optimized car cards.

## Tech stack

- **React 19** + **TypeScript** (Vite)
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **TanStack Query** for data fetching, caching, and request deduplication
- Native `fetch` for all API calls
- **ESLint** with TypeScript and React Hooks plugins

## Features

- Live car listings from the myauto.ge API
- Filter sidebar: vehicle type, manufacturer, model, category, price range, currency
- Toolbar: sort order, period
- URL-synced filters: applied filters, page, period, sort and currency are written into the query string so they survive a hard refresh and can be shared as links
- Pagination
- Currency switcher (GEL / USD) with live rate conversion
- Responsive `CarCard`:
  - Desktop layout (≥ 1024px): horizontal card with image left, info right
  - Mobile layout (< 1024px): stacked card with image, customs status badge, and heart overlay
- Reusable UI primitives in `src/shared/ui` (Badge, Button, Breadcrumb, CurrencySwitcher, CustomsStatusBadge, etc.)
- Client-side calculation of Georgian customs fee from `engine_volume`, `prod_year`, and `fuel_type_id`
- "Good price" highlighting based on myauto's predicted-price breakpoint and paid promo flag

## Project structure

```
src/
  api/                       Thin wrappers around myauto.ge endpoints
  app/                       App shell, root component, React Query client
  assets/                    Static images and SVG icons
  features/listings/
    components/              Listing-specific UI (CarCard, FilterSidebar, Toolbar, ...)
    hooks/                   useProducts, useManufacturers, useModels, useCategories, useCurrencies
    utils/                   Formatters, URL filter (de)serialization, image URL builder
    constants.ts             Listing-specific constants
    types.ts                 API and domain types
  pages/
    ListingPage.tsx          Main listings page (assembles everything)
  shared/
    api/                     API base URLs and endpoint paths (`endpoints.ts`)
    ui/                      Generic, reusable UI components
    utils/                   Shared helpers (e.g. `cn`)
  main.tsx                   Vite entry point
```

## Getting started

### Prerequisites

- Node.js 20+ (or any version compatible with Vite 8)
- npm (bundled with Node)

### Install

```bash
npm install
```

### Configure environment (optional)

The app ships with sensible defaults pointing at the public myauto.ge endpoints, so it runs without any setup. To override the base URLs (e.g. to point at a local proxy), copy the example file and edit it:

```bash
cp .env.example .env
```

Available variables:

| Variable                | Default                       | Purpose                              |
| ----------------------- | ----------------------------- | ------------------------------------ |
| `VITE_API_BASE_URL`     | `https://api2.myauto.ge/ka`   | JSON API root                        |
| `VITE_STATIC_BASE_URL`  | `https://static.my.ge`        | Static asset CDN (images, mans.json) |

Both are read in `src/shared/api/endpoints.ts` and fall back to the production URLs when absent.

### Run the dev server

```bash
npm run dev
```

The app starts on the default Vite port (usually [http://localhost:5173](http://localhost:5173)).

### Build for production

```bash
npm run build
```

Outputs a static bundle in `dist/`.

### Preview the production build locally

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## API

The app talks directly to the public myauto.ge API. No keys or auth are required. All URLs are derived from `VITE_API_BASE_URL` / `VITE_STATIC_BASE_URL` (see above) and are listed in `src/shared/api/endpoints.ts`:

- `${VITE_API_BASE_URL}/products` — listings (filterable, paginated)
- `${VITE_API_BASE_URL}/getManModels?man_id={id}` — models for a manufacturer
- `${VITE_API_BASE_URL}/cats/get` — categories
- `${VITE_API_BASE_URL}/currency` — currency rates
- `${VITE_STATIC_BASE_URL}/myauto/js/mans.json` — manufacturers (static JSON on the asset CDN)

See `src/api/` for the request shapes and `src/features/listings/types.ts` for the response types.

## Notes

- The Georgian customs fee shown on each card is **calculated client-side** in `src/features/listings/utils/carCardFormatters.ts` (`calculateCustomsFee` / `formatCustomsFee`). The rates inside `getExciseRatePerCm3` are an approximation of the official excise table — adjust them there if myauto's published rates change.
- The breakpoint for switching `CarCard` from mobile to desktop is `lg` (1024px).

import { useMemo, useState } from "react";

import Header from "../features/listings/components/Header";
import Breadcrumb from "../features/listings/components/Breadcrumb";
import CarCard from "../features/listings/components/CarCard";
import FilterSidebar from "../features/listings/components/FilterSidebar";
import ListingToolbar from "../features/listings/components/ListingToolbar";
import CarCardSkeleton from "../features/listings/components/CarCardSkeleton";
import Pagination from "../features/listings/components/Pagination";
import AppliedFiltersBar from "../features/listings/components/AppliedFiltersBar";

import { useProducts } from "../features/listings/hooks/useProducts";
import { useManufacturers } from "../features/listings/hooks/useManufacturers";
import { useModels } from "../features/listings/hooks/useModels";
import { useCategories } from "../features/listings/hooks/useCategories";
import { useCurrencies } from "../features/listings/hooks/useCurrencies";
import { buildImageUrl } from "../features/listings/utils/buildImageUrl";
import type {
  AppliedListingFilters,
  Currency,
  Period,
  SortOrder,
} from "../features/listings/types";

const breadcrumbItems = [
  { label: "მთავარი", href: "/" },
  { label: "ავტო", href: "/ka" },
  { label: "მანქანები" },
];

type StickerTag = {
  label: string;
  color: "red" | "green" | "blue";
  icon: "danger" | "goodCondition" | "clear";
};

const getVipLabel = (paidAdd: number): "VIP" | "VIP+" | null => {
  if (paidAdd === 1) return "VIP";
  if (paidAdd >= 2) return "VIP+";

  return null;
};

const getStickerTags = (stickers: number | null): StickerTag[] => {
  if (!stickers) return [];

  const tags: StickerTag[] = [];

  if (stickers & 1) {
    tags.push({ label: "სასწრაფოდ", color: "red", icon: "danger" });
  }

  if (stickers & 2) {
    tags.push({
      label: "იდეალურ მდგომარეობაში",
      color: "green",
      icon: "goodCondition",
    });
  }

  if (stickers & 4) {
    tags.push({ label: "სუფთა ისტორია", color: "blue", icon: "clear" });
  }

  return tags;
};

const ListingPage = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(1);
  const [period, setPeriod] = useState<Period | undefined>("3h");
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState<Currency>("gel");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<AppliedListingFilters>({
    manufacturerIds: [],
    modelIds: [],
    categoryIds: [],
    currency: "gel",
  });

  const selectedManufacturerId = filters.manufacturerIds[0];

  const { data: manufacturers = [] } = useManufacturers();
  const { data: models = [] } = useModels(selectedManufacturerId);
  const { data: categories = [] } = useCategories();
  const { getCurrency } = useCurrencies();

  const selectedCurrency = getCurrency(currency);

  const manufacturerOptions = useMemo(
    () =>
      manufacturers.map((manufacturer) => ({
        id: Number(manufacturer.man_id),
        label: manufacturer.man_name,
      })),
    [manufacturers],
  );

  const modelOptions = useMemo(
    () =>
      models.map((model) => ({
        id: model.model_id,
        label: model.model_name,
      })),
    [models],
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        id: category.category_id,
        label: category.title,
      })),
    [categories],
  );

  const appliedFilterLabels = useMemo(() => {
    const labels: string[] = [];

    if (filters.forRent === 0) labels.push("იყიდება");
    if (filters.forRent === 1) labels.push("ქირავდება");

    manufacturerOptions.forEach((manufacturer) => {
      if (filters.manufacturerIds.includes(manufacturer.id)) {
        labels.push(manufacturer.label);
      }
    });

    modelOptions.forEach((model) => {
      if (filters.modelIds.includes(model.id)) {
        labels.push(model.label);
      }
    });

    categoryOptions.forEach((category) => {
      if (filters.categoryIds.includes(category.id)) {
        labels.push(category.label);
      }
    });

    if (filters.priceFrom !== undefined)
      labels.push(`დან ${filters.priceFrom}`);
    if (filters.priceTo !== undefined) labels.push(`მდე ${filters.priceTo}`);

    return labels;
  }, [categoryOptions, filters, manufacturerOptions, modelOptions]);

  const applyFilters = (nextFilters: AppliedListingFilters) => {
    setFilters(nextFilters);
    setCurrency(nextFilters.currency);
    setPage(1);
  };

  const clearAppliedFilter = (label: string) => {
    setFilters((current) => {
      const manufacturer = manufacturerOptions.find(
        (option) => option.label === label,
      );
      const model = modelOptions.find((option) => option.label === label);
      const category = categoryOptions.find((option) => option.label === label);

      if (label === "იყიდება" || label === "ქირავდება") {
        return { ...current, forRent: undefined };
      }

      if (manufacturer) {
        return {
          ...current,
          manufacturerIds: current.manufacturerIds.filter(
            (id) => id !== manufacturer.id,
          ),
          modelIds: [],
        };
      }

      if (model) {
        return {
          ...current,
          modelIds: current.modelIds.filter((id) => id !== model.id),
        };
      }

      if (category) {
        return {
          ...current,
          categoryIds: current.categoryIds.filter((id) => id !== category.id),
        };
      }

      if (label === `დან ${current.priceFrom}`) {
        return { ...current, priceFrom: undefined };
      }

      if (label === `მდე ${current.priceTo}`) {
        return { ...current, priceTo: undefined };
      }

      return current;
    });

    setPage(1);
  };

  const mans =
    filters.manufacturerIds.length > 0
      ? filters.manufacturerIds
          .map((manId) => {
            const modelsForManufacturer = filters.modelIds;

            return modelsForManufacturer.length > 0
              ? `${manId}.${modelsForManufacturer.join(".")}`
              : String(manId);
          })
          .join("-")
      : undefined;

  const cats =
    filters.categoryIds.length > 0 ? filters.categoryIds.join(".") : undefined;

  const { products, total, meta, isLoading, error } = useProducts({
    sortOrder,
    period,
    forRent: filters.forRent,
    mans,
    cats,
    priceFrom: filters.priceFrom,
    priceTo: filters.priceTo,
    page,
  });

  return (
    <div className="min-h-screen bg-[#f2f3f6]">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <AppliedFiltersBar
          labels={appliedFilterLabels}
          onClearOne={clearAppliedFilter}
          onOpenFilters={() => setIsFilterOpen(true)}
        />

        <div className="flex w-full gap-5">
          <div className="hidden md:block">
            <FilterSidebar
              initialFilters={filters}
              totalCount={total}
              onApply={applyFilters}
            />
          </div>

          <div className="w-full space-y-3">
            <ListingToolbar
              totalCount={total}
              sortOrder={sortOrder}
              period={period}
              onSortChange={setSortOrder}
              onPeriodChange={setPeriod}
            />

            {isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CarCardSkeleton key={index} />
                ))}
              </div>
            )}

            {error && <p className="text-[13px] text-[#FD4100]">{error}</p>}

            {!isLoading && !error && (
              <div className="space-y-3">
                {products.map((product) => {
                  const cardPrice = Math.round(
                    product.price_value * selectedCurrency.rate,
                  );

                  const isGoodPrice =
                    product.prom_color === 1 ||
                    (Boolean(product.has_predicted_price) &&
                      product.pred_first_breakpoint !== undefined &&
                      product.pred_first_breakpoint !== null &&
                      product.price_value <= product.pred_first_breakpoint);

                  return (
                    <CarCard
                      key={product.car_id}
                      imageUrl={buildImageUrl(product)}
                      title={product.car_model || `მანქანა #${product.car_id}`}
                      year={product.prod_year}
                      price={cardPrice}
                      currencySymbol={selectedCurrency.symbol}
                      mileageKm={product.car_run_km}
                      engine={`${product.engine_volume / 1000} ძრავი`}
                      transmission={`კოლოფი #${product.gear_type_id}`}
                      customsPassed={product.customs_passed}
                      locationId={product.location_id}
                      parentLocationId={product.parent_loc_id}
                      views={product.views}
                      orderDate={product.order_date}
                      vipLabel={getVipLabel(product.paid_add)}
                      stickers={getStickerTags(product.stickers)}
                      isGoodPrice={isGoodPrice}
                    />
                  );
                })}
              </div>
            )}

            {meta && (
              <Pagination
                currentPage={meta.current_page}
                lastPage={meta.last_page}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </main>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setIsFilterOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[320px] overflow-y-auto bg-white">
            <FilterSidebar
              initialFilters={filters}
              totalCount={total}
              onApply={(nextFilters) => {
                applyFilters(nextFilters);
                setIsFilterOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingPage;

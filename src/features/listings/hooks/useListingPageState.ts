import { useEffect, useMemo, useState } from "react";

import { useCategories } from "./useCategories";
import { useCurrencies } from "./useCurrencies";
import { useManufacturers } from "./useManufacturers";
import { useModels } from "./useModels";
import { useProducts } from "./useProducts";
import {
  buildUrlParamsFromFilters,
  parseFiltersFromUrl,
} from "../utils/listingUrlFilters";
import type {
  AppliedListingFilters,
  Currency,
  Period,
  SortOrder,
} from "../types";


export const useListingPageState = () => {
  const initialUrlState = useMemo(() => parseFiltersFromUrl(), []);

  const [sortOrder, setSortOrder] = useState<SortOrder>(
    initialUrlState.sortOrder,
  );
  const [period, setPeriod] = useState<Period>(initialUrlState.period);
  const [page, setPage] = useState(initialUrlState.page);
  const [currency, setCurrency] = useState<Currency>(
    initialUrlState.filters.currency,
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<AppliedListingFilters>(
    initialUrlState.filters,
  );

  useEffect(() => {
    const params = buildUrlParamsFromFilters(filters, page, period, sortOrder);
    const nextUrl = `${window.location.pathname}?${params.toString()}`;

    window.history.replaceState(null, "", nextUrl);
  }, [filters, page, period, sortOrder]);

  const { data: manufacturers = [] } = useManufacturers();
  const { models, modelsByManufacturer } = useModels(filters.manufacturerIds);
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

  const breadcrumbItems = useMemo(() => {
    const lastLabel = filters.forRent === 0 ? "იყიდება" : "ქირავდება";

    return [
      { label: "მთავარი", href: "/" },
      { label: "ავტო", href: "/ka" },
      { label: lastLabel },
    ];
  }, [filters.forRent]);

  const appliedFilterLabels = useMemo(() => {
    const labels: string[] = [];

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

    if (filters.priceFrom !== undefined) {
      labels.push(`დან ${filters.priceFrom}`);
    }

    if (filters.priceTo !== undefined) {
      labels.push(`მდე ${filters.priceTo}`);
    }

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

  const handleSortChange = (nextSortOrder: SortOrder) => {
    setSortOrder(nextSortOrder);
    setPage(1);
  };

  const handlePeriodChange = (nextPeriod: Period) => {
    setPeriod(nextPeriod);
    setPage(1);
  };

  const mans = useMemo(() => {
    if (filters.manufacturerIds.length === 0) return undefined;

    return filters.manufacturerIds
      .map((manId) => {
        const modelsForThisMan = (modelsByManufacturer.get(manId) ?? [])
          .filter((model) => filters.modelIds.includes(model.model_id))
          .map((model) => model.model_id);

        return modelsForThisMan.length > 0
          ? `${manId}.${modelsForThisMan.join(".")}`
          : String(manId);
      })
      .join("-");
  }, [filters.manufacturerIds, filters.modelIds, modelsByManufacturer]);

  const cats =
    filters.categoryIds.length > 0 ? filters.categoryIds.join(".") : undefined;

  const { products, total, meta, isLoading, error } = useProducts({
    vehicleType: filters.vehicleType,
    sortOrder,
    period,
    forRent: filters.forRent,
    mans,
    cats,
    priceFrom: filters.priceFrom,
    priceTo: filters.priceTo,
    currency: filters.currency,
    page,
  });

  return {
    filters,
    page,
    period,
    sortOrder,
    selectedCurrency,

    isFilterOpen,
    setIsFilterOpen,

    products,
    total,
    meta,
    isLoading,
    error,

    breadcrumbItems,
    appliedFilterLabels,

    applyFilters,
    clearAppliedFilter,
    handleSortChange,
    handlePeriodChange,
    setPage,
  };
};

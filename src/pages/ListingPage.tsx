import Header from "../features/listings/components/Header";
import Breadcrumb from "../features/listings/components/Breadcrumb";
import CarCard from "../features/listings/components/CarCard";
import FilterSidebar from "../features/listings/components/FilterSidebar";
import ListingToolbar from "../features/listings/components/ListingToolbar";
import CarCardSkeleton from "../features/listings/components/CarCardSkeleton";

import { useProducts } from "../features/listings/hooks/useProducts";
import { buildImageUrl } from "../features/listings/utils/buildImageUrl";
import { useState } from "react";
import type {
  AppliedListingFilters,
  Currency,
  Period,
  SortOrder,
} from "../features/listings/types";
import Pagination from "../features/listings/components/Pagination";

const breadcrumbItems = [
  { label: "მთავარი", href: "/" },
  { label: "ავტო", href: "/ka" },
  { label: "მანქანები" },
];

const ListingPage = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(1);
  const [period, setPeriod] = useState<Period | undefined>("3h");
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState<Currency>("gel");
  const [filters, setFilters] = useState<AppliedListingFilters>({
    currency: "gel",
  });

  const mans = filters.manufacturerId
    ? filters.modelId
      ? `${filters.manufacturerId}.${filters.modelId}`
      : String(filters.manufacturerId)
    : undefined;

  const cats = filters.categoryId ? String(filters.categoryId) : undefined;
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

        <div className="flex gap-5 w-full">
          <FilterSidebar
            initialFilters={filters}
            totalCount={total}
            onApply={(nextFilters) => {
              setFilters(nextFilters);
              setCurrency(nextFilters.currency);
              setPage(1);
            }}
          />
          <div className="space-y-3 w-full">
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
                {products.map((product) => (
                  <CarCard
                    key={product.car_id}
                    imageUrl={buildImageUrl(product)}
                    title={product.car_model || `მანქანა #${product.car_id}`}
                    year={product.prod_year}
                    price={
                      currency === "gel"
                        ? product.price_value
                        : product.price_usd
                    }
                    currency={currency}
                    mileageKm={product.car_run_km}
                    engine={`${product.engine_volume / 1000} ძრავი`}
                    transmission={`კოლოფი #${product.gear_type_id}`}
                    location="თბილისი"
                    customsPassed={product.customs_passed}
                    isVip={false}
                  />
                ))}
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
    </div>
  );
};

export default ListingPage;

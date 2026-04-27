import Header from "../features/listings/components/Header";
import Breadcrumb from "../shared/ui/Breadcrumb";
import CarCard from "../features/listings/components/CarCard";
import FilterSidebar from "../features/listings/components/FilterSidebar/FilterSidebar";
import ListingToolbar from "../features/listings/components/ListingToolbar";
import CarCardSkeleton from "../features/listings/components/CarCardSkeleton";
import Pagination from "../features/listings/components/Pagination";
import AppliedFiltersBar from "../features/listings/components/AppliedFiltersBar";

import { useListingPageState } from "../features/listings/hooks/useListingPageState";
import { buildImageUrl } from "../features/listings/utils/buildImageUrl";
import { formatCustomsFee } from "../features/listings/utils/carCardFormatters";
import {
  getStickerTags,
  getVipLabel,
} from "../features/listings/utils/listingDisplay";
import { cn } from "../shared/utils/cn";

const ListingPage = () => {
  const {
    filters,
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
  } = useListingPageState();

  return (
    <div className="min-h-screen bg-[#f2f3f6]">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-6">
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

          <div className="w-full space-y-[10px]">
            <ListingToolbar
              totalCount={total}
              sortOrder={sortOrder}
              period={period}
              onSortChange={handleSortChange}
              onPeriodChange={handlePeriodChange}
            />

            {isLoading && (
              <div className="space-y-[10px]">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CarCardSkeleton key={index} />
                ))}
              </div>
            )}

            {error && <p className="text-[13px] text-[#FD4100]">{error}</p>}

            {!isLoading && !error && (
              <div className="space-y-[10px]">
                {products.map((product) => {
                  const cardPrice = Math.round(
                    product.price_value * selectedCurrency.rate,
                  );

                  const isGoodPrice =
                    product.prom_color === 1 ||
                    (product.pred_first_breakpoint != null &&
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
                      customsFee={formatCustomsFee(
                        product.engine_volume,
                        product.prod_year,
                        product.fuel_type_id,
                      )}
                      locationId={product.location_id}
                      parentLocationId={product.parent_loc_id}
                      views={product.views}
                      orderDate={product.order_date}
                      vipLabel={getVipLabel(product.order_number)}
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

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          isFilterOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!isFilterOpen}
      >
        <button
          type="button"
          aria-label="Close filters"
          tabIndex={isFilterOpen ? 0 : -1}
          onClick={() => setIsFilterOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out",
            isFilterOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          className={cn(
            "absolute top-0 left-0 h-full w-[85%] max-w-[320px] overflow-y-auto bg-white transition-transform duration-300 ease-out will-change-transform",
            isFilterOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
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
    </div>
  );
};

export default ListingPage;

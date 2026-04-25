import Header from "../features/listings/components/Header";
import Breadcrumb from "../features/listings/components/Breadcrumb";
import CarCard from "../features/listings/components/CarCard";
import FilterSidebar from "../features/listings/components/FilterSidebar";
import ListingToolbar from "../features/listings/components/ListingToolbar";

import { useProducts } from "../features/listings/hooks/useProducts";
import { buildImageUrl } from "../features/listings/utils/buildImageUrl";
import { useState } from "react";
import type { Period, SortOrder } from "../features/listings/types";

const breadcrumbItems = [
  { label: "მთავარი", href: "/" },
  { label: "ავტო", href: "/ka" },
  { label: "მანქანები" },
];

const ListingPage = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(1);
  const [period, setPeriod] = useState<Period | undefined>("3h");
  const { products, total, isLoading, error } = useProducts({
    sortOrder,
    period,
    page: 1,
  });
  return (
    <div className="min-h-screen bg-[#f2f3f6]">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex gap-5 w-full">
          <FilterSidebar />
          <div className="space-y-3 w-full">
            <ListingToolbar
              totalCount={total}
              sortOrder={sortOrder}
              period={period}
              onSortChange={setSortOrder}
              onPeriodChange={setPeriod}
            />{" "}
            {isLoading && (
              <p className="text-[13px] text-[#6F7383]">იტვირთება...</p>
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
                    price={product.price_value || product.price}
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingPage;

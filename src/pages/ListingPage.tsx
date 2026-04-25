import Header from "../features/listings/components/Header";
import Breadcrumb from "../features/listings/components/Breadcrumb";
import CarCard from "../features/listings/components/CarCard";
import FilterSidebar from "../features/listings/components/FilterSidebar";

const breadcrumbItems = [
  { label: "მთავარი", href: "/" },
  { label: "ავტო", href: "/ka" },
  { label: "მანქანები" },
];

const ListingPage = () => {
  return (
    <div className="min-h-screen bg-[#f2f3f6]">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex gap-5">
          <FilterSidebar />
          <div className="max-w-[760px] space-y-3">
            <CarCard
              imageUrl=""
              title="LAND ROVER Range Rover Evoque"
              year={2013}
              price={108122}
              mileageKm={173000}
              engine="3.0 ბენზინი"
              transmission="ავტომატიკა"
              location="თბილისი"
              customsPassed
              isVip
            />
            <CarCard
              imageUrl=""
              title="LAND ROVER Range Rover Evoque"
              year={2013}
              price={108122}
              mileageKm={173000}
              engine="3.0 ბენზინი"
              transmission="ავტომატიკა"
              location="თბილისი"
              customsPassed
              isVip
            />
            <CarCard
              imageUrl=""
              title="LAND ROVER Range Rover Evoque"
              year={2013}
              price={108122}
              mileageKm={173000}
              engine="3.0 ბენზინი"
              transmission="ავტომატიკა"
              location="თბილისი"
              customsPassed
              isVip
            />
            <CarCard
              imageUrl=""
              title="LAND ROVER Range Rover Evoque"
              year={2013}
              price={108122}
              mileageKm={173000}
              engine="3.0 ბენზინი"
              transmission="ავტომატიკა"
              location="თბილისი"
              customsPassed
              isVip
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingPage;

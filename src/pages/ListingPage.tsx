import Header from "../features/listings/components/Header";
import Breadcrumb from "../features/listings/components/Breadcrumb";

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

        {/* todo filters + car listing */}
      </main>
    </div>
  );
};

export default ListingPage;
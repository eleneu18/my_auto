import engineIcon from "../../../assets/images/engine-icon.svg";
import gearboxIcon from "../../../assets/images/gearbox-icon.svg";
import mileageIcon from "../../../assets/images/mileage-icon.svg";
import steeringWheelIcon from "../../../assets/images/steering-wheel-icon.svg";

type CarCardProps = {
  imageUrl: string;
  title: string;
  year: number;
  price: number;
  mileageKm: number;
  engine: string;
  transmission: string;
  location: string;
  customsPassed?: boolean;
  isVip?: boolean;
  currency: "gel" | "usd";
  isGoodPrice?: boolean;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US").format(price);

const formatMileage = (mileage: number) =>
  new Intl.NumberFormat("ka-GE").format(mileage);

const CarCard = ({
  imageUrl,
  title,
  year,
  price,
  mileageKm,
  engine,
  transmission,
  location,
  customsPassed = false,
  isVip = false,
  currency,
  isGoodPrice = false,
}: CarCardProps) => {
  return (
    <article
      className={[
        "overflow-hidden rounded-[14px] border transition hover:shadow-sm md:flex md:min-h-[164px]",
        isGoodPrice
          ? "border-[#59D8C9] bg-[#F0F9F7]"
          : "border-transparent bg-white hover:border-[#BFDAD6]",
      ].join(" ")}
    >
      <div className="relative md:w-[182px] md:shrink-0">
        <img
          src={imageUrl}
          alt={`${title} ${year}`}
          className="h-[210px] w-full object-cover md:h-full md:rounded-l-[14px]"
        />

        <button
          type="button"
          aria-label="Add to favorites"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm"
        >
          ♡
        </button>

        {isVip && (
          <span className="absolute left-3 top-3 rounded-full bg-[#FD4100] px-2 py-1 text-[10px] font-bold uppercase leading-none text-white">
            VIP
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-[#272A37]">
              {title}
              <span className="ml-2 text-[#8C929B]">{year} წ</span>
            </h3>

            <p className="mt-2 text-[20px] font-bold leading-none text-[#272A37] md:hidden">
              {formatPrice(price)} {currency === "gel" ? "₾" : "$"}
            </p>
          </div>

          <div className="hidden text-right md:block">
            {customsPassed ? (
              <p className="mb-2 text-[11px] font-medium text-[#26B753]">
                განბაჟებული
              </p>
            ) : (
              <p className="mb-2 text-[11px] font-medium text-[#FF3B30]">
                განბაჟება 2,176 ₾
              </p>
            )}

            <p className="text-[20px] font-medium leading-none text-[#272A37]">
              {formatPrice(price)} {currency === "gel" ? "₾" : "$"}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-xs font-medium text-[#1B1D25]">
          <div className="flex items-center gap-2">
            <img
              src={engineIcon}
              alt=""
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            />
            <span>{engine}</span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={mileageIcon}
              alt=""
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            />
            <span>{formatMileage(mileageKm)} კმ</span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={gearboxIcon}
              alt=""
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            />
            <span>{transmission}</span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={steeringWheelIcon}
              alt=""
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
            />
            <span>{location}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#EEF0F3] pt-3 text-xs font-normal text-[#6F7383]">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full bg-[#E9EBF0]" />
            <span>589 ნახვა</span>
            <span>•</span>
            <span>2 დღის წინ</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Compare"
              className="text-[#8C929B]"
            >
              ⧉
            </button>
            <button type="button" aria-label="Share" className="text-[#8C929B]">
              ↗
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CarCard;

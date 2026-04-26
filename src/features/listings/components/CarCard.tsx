import engineIcon from "../../../assets/images/engine-icon.svg";
import gearboxIcon from "../../../assets/images/gearbox-icon.svg";
import mileageIcon from "../../../assets/images/mileage-icon.svg";
import steeringWheelIcon from "../../../assets/images/steering-wheel-icon.svg";
import pencilIcon from "../../../assets/images/pencil-icon.svg";
import heartIcon from "../../../assets/images/heart-icon.svg";
import compareIcon from "../../../assets/images/compare-icon.svg";

type StickerTag = {
  label: string;
  color: "red" | "green" | "blue";
};

type CarCardProps = {
  imageUrl: string;
  title: string;
  year: number;
  price: number;
  mileageKm: number;
  engine: string;
  transmission: string;
  customsPassed?: boolean;
  currency: "gel" | "usd";
  isGoodPrice?: boolean;
  locationId: number;
  parentLocationId: number;
  views: number;
  orderDate: string;
  vipLabel?: "VIP" | "VIP+" | null;
  stickers?: StickerTag[];
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US").format(price);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("ka-GE").format(value);

const getLocationLabel = (locationId: number, parentLocationId: number) => {
  if (locationId === 2) return "თბილისი";
  if (locationId === 15) return "რუსთავის ავტო";
  if (parentLocationId === 0) return "გზაში";

  return "გზაში";
};

const formatRelativeDate = (date: string) => {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) return "დღეს";
  if (diffDays === 1) return "1 დღის წინ";

  return `${diffDays} დღის წინ`;
};

const getStickerClassName = (color: StickerTag["color"]) => {
  if (color === "red") return "bg-[#FFF1F0] text-[#F04438]";
  if (color === "green") return "bg-[#ECFDF3] text-[#12B76A]";

  return "bg-[#EFF8FF] text-[#2E90FA]";
};

const CarCard = ({
  imageUrl,
  title,
  year,
  price,
  mileageKm,
  engine,
  transmission,
  customsPassed = false,
  currency,
  isGoodPrice = false,
  locationId,
  parentLocationId,
  views,
  orderDate,
  vipLabel = null,
  stickers = [],
}: CarCardProps) => {
  const locationLabel = getLocationLabel(locationId, parentLocationId);

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

        {vipLabel && (
          <span
            className={[
              "absolute bottom-3 left-3 rounded-full px-2 py-1 text-[10px] font-bold uppercase leading-none text-white",
              vipLabel === "VIP+" ? "bg-[#FDB022]" : "bg-[#3B6DFF]",
            ].join(" ")}
          >
            {vipLabel}
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

          <div className="hidden flex-col items-end md:flex">
            <div className="flex items-center gap-5">
              <div
                className={[
                  "flex items-center gap-1 text-[11px] font-medium",
                  customsPassed ? "text-[#26B753]" : "text-[#FF3B30]",
                ].join(" ")}
              >
                <span>{customsPassed ? "✓" : "!"}</span>
                <span>
                  {customsPassed ? "განბაჟებული" : "განბაჟება 2,176 ₾"}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-medium text-[#6F7383]">
                <span className="text-[#FD4100]">✚</span>
                <span>{locationLabel}</span>
              </div>
            </div>

            <p className="mt-5 text-[20px] font-medium leading-none text-[#272A37]">
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
            <span>{formatNumber(mileageKm)} კმ</span>
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
            <span>{locationLabel}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 text-xs font-normal text-[#6F7383]">
          <div className="flex items-center gap-2">
            <span>{formatNumber(views)} ნახვა</span>
            <span>•</span>
            <span>{formatRelativeDate(orderDate)}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Edit"
              className="flex items-center"
            >
              <img
                src={pencilIcon}
                alt=""
                aria-hidden="true"
                className="h-3 w-3"
              />
            </button>

            <button
              type="button"
              aria-label="Compare"
              className="flex items-center"
            >
              <img
                src={compareIcon}
                alt=""
                aria-hidden="true"
                className="h-[15px] w-[17px]"
              />
            </button>

            <button
              type="button"
              aria-label="Favorite"
              className="flex items-center"
            >
              <img
                src={heartIcon}
                alt=""
                aria-hidden="true"
                className="h-[13px] w-[14px]"
              />
            </button>
          </div>
        </div>

        {stickers.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {stickers.map((sticker) => (
              <span
                key={sticker.label}
                className={[
                  "rounded-full px-2 py-1 text-[11px] font-medium",
                  getStickerClassName(sticker.color),
                ].join(" ")}
              >
                {sticker.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default CarCard;

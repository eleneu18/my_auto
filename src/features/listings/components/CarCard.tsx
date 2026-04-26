import engineIcon from "../../../assets/images/engine-icon.svg";
import gearboxIcon from "../../../assets/images/gearbox-icon.svg";
import mileageIcon from "../../../assets/images/mileage-icon.svg";
import steeringWheelIcon from "../../../assets/images/steering-wheel-icon.svg";
import pencilIcon from "../../../assets/images/pencil-icon.svg";
import heartIcon from "../../../assets/images/heart-icon.svg";
import compareIcon from "../../../assets/images/compare-icon.svg";
import clearIcon from "../../../assets/images/clear-icon.svg";
import goodConditionIcon from "../../../assets/images/good-condition-icon.svg";
import dangerIcon from "../../../assets/images/danger-icon.svg";
import Badge from "../../../shared/ui/Badge";
import { cn } from "../../../shared/utils/cn";

import {
  formatNumber,
  formatPrice,
  formatRelativeDate,
  getLocationLabel,
} from "../utils/carCardFormatters";

type StickerTag = {
  label: string;
  icon: "danger" | "goodCondition" | "clear";
};

type CarCardProps = {
  imageUrl: string;
  title: string;
  year: number;
  price: number;
  currencySymbol: string;
  mileageKm: number;
  engine: string;
  transmission: string;
  customsPassed?: boolean;
  isGoodPrice?: boolean;
  locationId: number;
  parentLocationId: number;
  views: number;
  orderDate: string;
  vipLabel?: "S-VIP" | "VIP+" | "VIP" | null;
  stickers?: StickerTag[];
};

const getStickerIcon = (icon: StickerTag["icon"]) => {
  if (icon === "danger") return dangerIcon;
  if (icon === "goodCondition") return goodConditionIcon;

  return clearIcon;
};

const getVipBadgeVariant = (
  vipLabel: NonNullable<CarCardProps["vipLabel"]>,
) => {
  if (vipLabel === "S-VIP") return "danger";
  if (vipLabel === "VIP+") return "warning";

  return "primary";
};

const CarCard = ({
  imageUrl,
  title,
  year,
  price,
  currencySymbol,
  mileageKm,
  engine,
  transmission,
  customsPassed = false,
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
      className={cn(
        "overflow-hidden rounded-[14px] border transition hover:shadow-sm md:flex md:min-h-[164px]",
        isGoodPrice
          ? "border-[#59D8C9] bg-[#F0F9F7]"
          : "border-transparent bg-white hover:border-[#BFDAD6]",
      )}
    >
      <div className="relative md:w-[182px] md:shrink-0">
        <img
          src={imageUrl}
          alt={`${title} ${year}`}
          className="h-[210px] w-full object-cover md:h-full md:rounded-l-[14px]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-[#272A37]">
              {title}
              <span className="ml-2 text-[#8C929B]">{year} წ</span>
            </h3>

            <p className="mt-2 text-[20px] font-bold leading-none text-[#272A37] md:hidden">
              {formatPrice(price)} {currencySymbol}
            </p>
          </div>

          <div className="hidden flex-col items-end md:flex">
            <div className="flex items-center gap-5">
              <div
                className={cn(
                  "flex items-center gap-1 text-[11px] font-medium",
                  customsPassed ? "text-[#26B753]" : "text-[#FF3B30]",
                )}
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
              {formatPrice(price)} {currencySymbol}
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
            {vipLabel && (
              <Badge text={vipLabel} variant={getVipBadgeVariant(vipLabel)} />
            )}

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
                className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 font-tbcx text-[12px] font-medium leading-[13px] text-[#454857]"
              >
                <img
                  src={getStickerIcon(sticker.icon)}
                  alt=""
                  aria-hidden="true"
                  className="shrink-0"
                />
                <span>{sticker.label}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default CarCard;

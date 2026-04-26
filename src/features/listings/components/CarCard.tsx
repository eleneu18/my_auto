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
import checkMarkIcon from "../../../assets/images/check-mark-icon.svg";
import flagGeorgiaIcon from "../../../assets/images/flag-georgia.svg";
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
  const shouldShowGeorgiaFlag =
    locationLabel === "თბილისი" || locationLabel === "რუსთავის ავტო";

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[14px] border transition hover:shadow-sm",
        isGoodPrice
          ? "border-[#59D8C9] bg-[#F0F9F7]"
          : "border-transparent bg-white hover:border-[#BFDAD6]",
      )}
    >
      <div className="md:flex md:min-h-[172px] px-4 py-4">
        <div className="relative md:w-[182px] md:shrink-0">
          <img
            src={imageUrl}
            alt={`${title} ${year}`}
            className="h-[238px] w-full object-cover md:h-36 rounded-2xl md:rounded-lg"
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

            <div className="hidden min-w-[140px] flex-col items-end md:flex">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex items-center gap-1 font-tbcx text-[11px] font-medium",
                    customsPassed ? "text-[#26B753]" : "text-[#FF3B30]",
                  )}
                >
                  {customsPassed && (
                    <img
                      src={checkMarkIcon}
                      alt=""
                      aria-hidden="true"
                      className="h-[6px] w-[7px]"
                    />
                  )}
                  <span>
                    {customsPassed ? "განბაჟებული" : "განბაჟება 2,176 ₾"}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-medium text-[#6F7383]">
                  {shouldShowGeorgiaFlag && (
                    <img
                      src={flagGeorgiaIcon}
                      alt=""
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  )}
                  <span>{locationLabel}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start justify-between">
            <div className="grid grid-cols-2 gap-x-8 gap-y-[15px] text-xs font-medium text-[#1B1D25]">
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

            <p className="hidden text-[20px] font-bold leading-none text-[#272A37] md:block">
              {formatPrice(price)} {currencySymbol}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between text-xs font-normal text-[#6F7383]">
            <div className="flex items-center gap-1">
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
        </div>
      </div>

      {stickers.length > 0 && (
        <div
          className={cn(
            "h-[1px] w-full",
            isGoodPrice ? "bg-[#CEE8E5]" : "bg-[#EEF2F7]",
          )}
        />
      )}

      {stickers.length > 0 && (
        <div className="pt-[10px] pb-4 px-4">
          <div className="flex flex-wrap gap-2">
            {stickers.map((sticker) => (
              <span
                key={sticker.label}
                className="inline-flex h-[28px] items-center gap-1 rounded-full bg-white px-3 font-tbcx text-[12px] font-medium leading-[13px] text-[#454857] shadow-[0_1px_4px_rgba(39,42,55,0.06)]"
              >
                <img
                  src={getStickerIcon(sticker.icon)}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
                <span>{sticker.label}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default CarCard;

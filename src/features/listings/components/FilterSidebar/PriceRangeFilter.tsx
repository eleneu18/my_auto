import gelIcon from "../../../../assets/images/gel-icon.svg";
import usdIcon from "../../../../assets/images/usd-icon.svg";
import CurrencySwitcher from "../../../../shared/ui/CurrencySwitcher";
import type { AppliedListingFilters, Currency } from "../../types";

type PriceRangeFilterProps = {
  currency: Currency;
  priceFrom?: number;
  priceTo?: number;
  onChange: (patch: Partial<AppliedListingFilters>) => void;
};

const PriceRangeFilter = ({
  currency,
  priceFrom,
  priceTo,
  onChange,
}: PriceRangeFilterProps) => {
  return (
    <div className="border-t border-[#E9E9F0] px-6 pb-[44px] pt-[17px]">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[14px] font-bold leading-none text-[#272A37]">
          ფასი
        </h3>

        <CurrencySwitcher
          value={currency}
          onChange={(nextCurrency) => onChange({ currency: nextCurrency })}
          gelIcon={gelIcon}
          usdIcon={usdIcon}
        />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <PriceInput
          placeholder="დან"
          value={priceFrom}
          onChange={(nextPriceFrom) => onChange({ priceFrom: nextPriceFrom })}
        />

        <span className="h-[2px] w-[6px] rounded-lg bg-[#8C929B]" />

        <PriceInput
          placeholder="მდე"
          value={priceTo}
          onChange={(nextPriceTo) => onChange({ priceTo: nextPriceTo })}
        />
      </div>
    </div>
  );
};

type PriceInputProps = {
  placeholder: string;
  value?: number;
  onChange: (value: number | undefined) => void;
};

const PriceInput = ({ placeholder, value, onChange }: PriceInputProps) => {
  return (
    <input
      type="number"
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(event) =>
        onChange(event.target.value ? Number(event.target.value) : undefined)
      }
      className="h-[44px] min-w-0 rounded-[10px] border border-[#D8DBE2] px-4 text-[13px] text-[#272A37] outline-none placeholder:text-[#8C929B] focus:border-[#6F7383]"
    />
  );
};

export default PriceRangeFilter;

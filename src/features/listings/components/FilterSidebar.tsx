import { useEffect, useRef, useState } from "react";

import carIcon from "../../../assets/images/car-icon.svg";
import gelIcon from "../../../assets/images/gel-icon.svg";
import motoIcon from "../../../assets/images/moto-icon.svg";
import tractorIcon from "../../../assets/images/tractor-icon.svg";
import usdIcon from "../../../assets/images/usd-icon.svg";
import arrowRight from "../../../assets/images/arrow-icon.svg";
import CategoryPillsSelect from "./CategoryPillsSelect";
import MultiSelectDropdown from "./MultiSelectDropdown";
import CurrencySwitcher from "../../../shared/ui/CurrencySwitcher";
import { useCategories } from "../hooks/useCategories";
import { useManufacturers } from "../hooks/useManufacturers";
import { useModels } from "../hooks/useModels";
import type { AppliedListingFilters } from "../types";

type VehicleType = "car" | "tractor" | "moto";

type FilterSidebarProps = {
  initialFilters: AppliedListingFilters;
  totalCount: number;
  onApply: (filters: AppliedListingFilters) => void;
};

const vehicleTypes: { value: VehicleType; icon: string; label: string }[] = [
  { value: "car", icon: carIcon, label: "ავტომობილი" },
  { value: "tractor", icon: tractorIcon, label: "ტრაქტორი" },
  { value: "moto", icon: motoIcon, label: "მოტო" },
];

const FilterSidebar = ({
  initialFilters,
  totalCount,
  onApply,
}: FilterSidebarProps) => {
  const [activeVehicleType, setActiveVehicleType] =
    useState<VehicleType>("car");
  const [draft, setDraft] = useState<AppliedListingFilters>(initialFilters);

  const selectedManufacturerId = draft.manufacturerIds[0];

  const { data: manufacturers = [] } = useManufacturers();
  const { data: models = [] } = useModels(selectedManufacturerId);
  const { data: categories = [] } = useCategories();

  const updateDraft = (patch: Partial<AppliedListingFilters>) => {
    setDraft((current) => ({ ...current, ...patch }));
  };

  const manufacturerOptions = manufacturers.map((manufacturer) => ({
    id: Number(manufacturer.man_id),
    label: manufacturer.man_name,
  }));

  const modelOptions = models.map((model) => ({
    id: model.model_id,
    label: model.model_name,
  }));

  const categoryOptions = categories.map((category) => ({
    id: category.category_id,
    label: category.title,
  }));

  useEffect(() => {
    setDraft(initialFilters);
  }, [initialFilters]);

  return (
    <aside className="w-full overflow-hidden rounded-t-[12px] border border-[#E2E5EB] bg-white shadow-[0_4px_16px_rgba(164,174,193,0.10)] md:w-[250px]">
      <div className="grid h-[48px] grid-cols-3 border-b border-[#E9EBF0]">
        {vehicleTypes.map((item) => {
          const isActive = item.value === activeVehicleType;

          return (
            <button
              key={item.value}
              type="button"
              aria-label={item.label}
              onClick={() => setActiveVehicleType(item.value)}
              className={[
                "flex items-center justify-center border-r border-[#E9EBF0] transition last:border-r-0",
                isActive
                  ? "border-b-2 border-b-[#FD4100] bg-white"
                  : "bg-[#F9F9FB]",
              ].join(" ")}
            >
              <img
                src={item.icon}
                alt=""
                aria-hidden="true"
                className={[
                  "h-6 w-6",
                  isActive ? "opacity-100" : "opacity-45 grayscale",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>

      <div className="space-y-5 p-6 pt-[22px]">
        <FilterSelect
          label="გარიგების ტიპი"
          value={draft.forRent === undefined ? "" : String(draft.forRent)}
          options={[
            { label: "ყველა", value: "" },
            { label: "იყიდება", value: "0" },
            { label: "ქირავდება", value: "1" },
          ]}
          onChange={(value) =>
            updateDraft({
              forRent: value === "" ? undefined : (Number(value) as 0 | 1),
            })
          }
        />

        <MultiSelectDropdown
          label="მწარმოებელი"
          placeholder="ყველა მწარმოებელი"
          selectedIds={draft.manufacturerIds}
          options={manufacturerOptions}
          onChange={(manufacturerIds) =>
            updateDraft({
              manufacturerIds,
              modelIds: [],
            })
          }
        />

        <MultiSelectDropdown
          label="მოდელი"
          placeholder="ყველა მოდელი"
          selectedIds={draft.modelIds}
          options={modelOptions}
          disabled={draft.manufacturerIds.length === 0}
          onChange={(modelIds) => updateDraft({ modelIds })}
        />

        <CategoryPillsSelect
          selectedIds={draft.categoryIds}
          options={categoryOptions}
          onChange={(categoryIds) => updateDraft({ categoryIds })}
        />
      </div>

      <div className="border-t border-[#E9E9F0] pt-[17px] px-6 pb-[44px]">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-[14px] font-bold leading-none text-[#272A37]">
            ფასი
          </h3>

          <CurrencySwitcher
            value={draft.currency}
            onChange={(currency) => updateDraft({ currency })}
            gelIcon={gelIcon}
            usdIcon={usdIcon}
          />
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <PriceInput
            placeholder="დან"
            value={draft.priceFrom}
            onChange={(priceFrom) => updateDraft({ priceFrom })}
          />

          <span className="w-[6px] h-[2px] bg-[#8C929B] rounded-lg" />

          <PriceInput
            placeholder="მდე"
            value={draft.priceTo}
            onChange={(priceTo) => updateDraft({ priceTo })}
          />
        </div>
      </div>

      <div className="bg-white pt-4 pb-5 px-[23px] shadow-[0_-8px_18px_rgba(39,42,55,0.05)]">
        <button
          type="button"
          onClick={() => onApply(draft)}
          className="h-8 w-full rounded-md bg-[#FD4100] font-tbcx text-[14px] font-bold leading-none text-white transition hover:bg-[#e83b00]"
        >
          ძებნა {totalCount.toLocaleString("ka-GE")}
        </button>
      </div>
    </aside>
  );
};

type FilterSelectOption = {
  label: string;
  value: string;
};
type FilterSelectProps = {
  label: string;
  value: string;
  options: FilterSelectOption[];
  onChange: (value: string) => void;
};

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);
  return (
    <div className="relative" ref={dropdownRef}>
      <span className="mb-2 block font-tbcx text-[12px] font-medium leading-none text-[#272A37]">
        {label}
      </span>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-[44px] w-full items-center justify-between rounded-[10px] border border-[#D8DBE2] bg-white px-4 font-tbcx text-[13px] font-medium text-[#272A37]"
      >
        <span>{selectedOption.label}</span>
        <img
          src={arrowRight}
          alt=""
          aria-hidden="true"
          className={[
            "transition-transform",
            isOpen ? "-rotate-90" : "rotate-90",
          ].join(" ")}
        />{" "}
      </button>
      {isOpen && (
        <div className="absolute left-0 top-16 z-30 w-full overflow-hidden rounded-[10px] border border-[#D4D4E0] bg-white py-2 shadow-[0_10px_30px_0_rgba(44,46,85,0.13)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="block h-[44px] w-full px-4 text-left font-tbcx text-[14px] font-medium text-[#6F7383] transition hover:bg-[#F5F6F8]"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
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

export default FilterSidebar;

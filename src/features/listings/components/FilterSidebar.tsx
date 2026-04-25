import { useState } from "react";

import carIcon from "../../../assets/images/car-icon.svg";
import gelIcon from "../../../assets/images/gel-icon.svg";
import motoIcon from "../../../assets/images/moto-icon.svg";
import tractorIcon from "../../../assets/images/tractor-icon.svg";
import usdIcon from "../../../assets/images/usd-icon.svg";

import { useCategories } from "../hooks/useCategories";
import { useManufacturers } from "../hooks/useManufacturers";
import { useModels } from "../hooks/useModels";

type VehicleType = "car" | "tractor" | "moto";
type Currency = "gel" | "usd";

const vehicleTypes: { value: VehicleType; icon: string; label: string }[] = [
  { value: "car", icon: carIcon, label: "ავტომობილი" },
  { value: "tractor", icon: tractorIcon, label: "ტრაქტორი" },
  { value: "moto", icon: motoIcon, label: "მოტო" },
];

type FilterSidebarProps = {
  forRent?: 0 | 1;
  manufacturerId?: number;
  modelId?: number;
  categoryId?: number;
  onForRentChange: (value: 0 | 1 | undefined) => void;
  onManufacturerChange: (value: number | undefined) => void;
  onModelChange: (value: number | undefined) => void;
  onCategoryChange: (value: number | undefined) => void;
};

const FilterSidebar = ({
  forRent,
  manufacturerId,
  modelId,
  categoryId,
  onForRentChange,
  onManufacturerChange,
  onModelChange,
  onCategoryChange,
}: FilterSidebarProps) => {
  const { data: manufacturers = [] } = useManufacturers();
  const { data: models = [] } = useModels(manufacturerId);
  const { data: categories = [] } = useCategories();

  const [activeVehicleType, setActiveVehicleType] =
    useState<VehicleType>("car");
  const [activeCurrency, setActiveCurrency] = useState<Currency>("gel");
  return (
    <aside className="w-full overflow-hidden rounded-t-[14px] bg-white shadow-[0_4px_16px_rgba(39,42,55,0.08)] md:w-[250px]">
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
                isActive ? "border-b-2 border-b-[#FD4100]" : "",
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

      <div className="space-y-5 px-6 py-6">
        <FilterSelect
          label="გარიგების ტიპი"
          value={forRent === undefined ? "" : String(forRent)}
          onChange={(value) =>
            onForRentChange(value === "" ? undefined : (Number(value) as 0 | 1))
          }
        >
          <option value="">ყველა</option>
          <option value="0">იყიდება</option>
          <option value="1">ქირავდება</option>
        </FilterSelect>

        <FilterSelect
          label="მწარმოებელი"
          value={manufacturerId ? String(manufacturerId) : ""}
          onChange={(value) =>
            onManufacturerChange(value ? Number(value) : undefined)
          }
        >
          <option value="">ყველა მწარმოებელი</option>
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer.man_id} value={manufacturer.man_id}>
              {manufacturer.man_name}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          label="მოდელი"
          value={modelId ? String(modelId) : ""}
          onChange={(value) => onModelChange(value ? Number(value) : undefined)}
        >
          <option value="">ყველა მოდელი</option>
          {models.map((model) => (
            <option key={model.model_id} value={model.model_id}>
              {model.model_name}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          label="კატეგორია"
          value={categoryId ? String(categoryId) : ""}
          onChange={(value) =>
            onCategoryChange(value ? Number(value) : undefined)
          }
        >
          <option value="">ყველა კატეგორია</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.title}
            </option>
          ))}
        </FilterSelect>
      </div>

      <div className="border-t border-[#E9EBF0] px-6 py-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-[14px] font-bold leading-none text-[#272A37]">
            ფასი
          </h3>

          <div className="flex rounded-full border border-[#D8DBE2] bg-white p-[2px]">
            <button
              type="button"
              aria-label="Price in GEL"
              onClick={() => setActiveCurrency("gel")}
              className={[
                "flex h-7 w-7 items-center justify-center rounded-full transition",
                activeCurrency === "gel" ? "bg-[#272A37]" : "bg-white",
              ].join(" ")}
            >
              <img
                src={gelIcon}
                alt=""
                aria-hidden="true"
                className="h-4 w-4"
              />
            </button>

            <button
              type="button"
              aria-label="Price in USD"
              onClick={() => setActiveCurrency("usd")}
              className={[
                "flex h-7 w-7 items-center justify-center rounded-full transition",
                activeCurrency === "usd" ? "bg-[#272A37]" : "bg-white",
              ].join(" ")}
            >
              <img
                src={usdIcon}
                alt=""
                aria-hidden="true"
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <input
            type="number"
            placeholder="დან"
            className="h-[44px] min-w-0 rounded-[10px] border border-[#D8DBE2] px-4 text-[13px] text-[#272A37] outline-none placeholder:text-[#8C929B] focus:border-[#6F7383]"
          />

          <span className="h-px w-3 bg-[#D8DBE2]" />

          <input
            type="number"
            placeholder="მდე"
            className="h-[44px] min-w-0 rounded-[10px] border border-[#D8DBE2] px-4 text-[13px] text-[#272A37] outline-none placeholder:text-[#8C929B] focus:border-[#6F7383]"
          />
        </div>
      </div>

      <div className="bg-white px-6 py-6 shadow-[0_-8px_18px_rgba(39,42,55,0.05)]">
        <button
          type="button"
          className="h-[48px] w-full rounded-[8px] bg-[#FD4100] text-[15px] font-bold text-white transition hover:bg-[#e83b00]"
        >
          ძებნა 197,963
        </button>
      </div>
    </aside>
  );
};

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
};

const FilterSelect = ({
  label,
  value,
  onChange,
  children,
}: FilterSelectProps) => {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-bold leading-none text-[#272A37]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[44px] w-full appearance-none rounded-[10px] border border-[#D8DBE2] bg-white px-4 text-[13px] font-medium text-[#272A37] outline-none transition focus:border-[#6F7383]"
      >
        {children}
      </select>
    </label>
  );
};

export default FilterSidebar;

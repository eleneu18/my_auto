import { useEffect, useState } from "react";

import Button from "../../../../shared/ui/Button";
import CategoryPillsSelect from "../CategoryPillsSelect";
import MultiSelectDropdown from "../MultiSelectDropdown";
import { useCategories } from "../../hooks/useCategories";
import { useManufacturers } from "../../hooks/useManufacturers";
import { useModels } from "../../hooks/useModels";
import type { AppliedListingFilters } from "../../types";
import FilterSelect from "./FilterSelect";
import PriceRangeFilter from "./PriceRangeFilter";
import VehicleTypeTabs, { type VehicleType } from "./VehicleTypeTabs";

type FilterSidebarProps = {
  initialFilters: AppliedListingFilters;
  totalCount: number;
  onApply: (filters: AppliedListingFilters) => void;
};

const FilterSidebar = ({
  initialFilters,
  totalCount,
  onApply,
}: FilterSidebarProps) => {
  const [activeVehicleType, setActiveVehicleType] =
    useState<VehicleType>("car");
  const [draft, setDraft] = useState<AppliedListingFilters>(initialFilters);

  useEffect(() => {
    setDraft(initialFilters);
  }, [initialFilters]);

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

  return (
    <aside className="w-full overflow-hidden rounded-t-[12px] border border-[#E2E5EB] bg-white shadow-[0_4px_16px_rgba(164,174,193,0.10)] md:w-[250px]">
      <VehicleTypeTabs
        activeVehicleType={activeVehicleType}
        onChange={setActiveVehicleType}
      />

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

      <PriceRangeFilter
        currency={draft.currency}
        priceFrom={draft.priceFrom}
        priceTo={draft.priceTo}
        onChange={updateDraft}
      />

      <div className="bg-white px-[23px] pb-5 pt-4 shadow-[0_-8px_18px_rgba(39,42,55,0.05)]">
        <Button onClick={() => onApply(draft)}>
          ძებნა {totalCount.toLocaleString("ka-GE")}
        </Button>
      </div>
    </aside>
  );
};

export default FilterSidebar;

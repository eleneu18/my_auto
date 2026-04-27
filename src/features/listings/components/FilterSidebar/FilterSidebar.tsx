import { useEffect, useMemo, useState } from "react";

import Button from "../../../../shared/ui/Button";
import CategoryPillsSelect from "../CategoryPillsSelect";
import MultiSelectDropdown, {
  type MultiSelectGroup,
} from "../MultiSelectDropdown";
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

type VehicleTypeBucket = Pick<
  AppliedListingFilters,
  "manufacturerIds" | "modelIds" | "categoryIds"
>;

const emptyBucket: VehicleTypeBucket = {
  manufacturerIds: [],
  modelIds: [],
  categoryIds: [],
};

const bucketFromFilters = (
  filters: AppliedListingFilters,
): VehicleTypeBucket => ({
  manufacturerIds: filters.manufacturerIds,
  modelIds: filters.modelIds,
  categoryIds: filters.categoryIds,
});

const FilterSidebar = ({
  initialFilters,
  totalCount,
  onApply,
}: FilterSidebarProps) => {
  const [draft, setDraft] = useState<AppliedListingFilters>(initialFilters);

  const [bucketsByType, setBucketsByType] = useState<
    Record<VehicleType, VehicleTypeBucket>
  >(() => ({
    car: emptyBucket,
    tractor: emptyBucket,
    moto: emptyBucket,
    [initialFilters.vehicleType]: bucketFromFilters(initialFilters),
  }));

  useEffect(() => {
    setDraft(initialFilters);
    setBucketsByType((prev) => ({
      ...prev,
      [initialFilters.vehicleType]: bucketFromFilters(initialFilters),
    }));
  }, [initialFilters]);

  const handleVehicleTypeChange = (nextType: VehicleType) => {
    if (nextType === draft.vehicleType) {
      return;
    }

    const nextBuckets: Record<VehicleType, VehicleTypeBucket> = {
      ...bucketsByType,
      [draft.vehicleType]: bucketFromFilters(draft),
    };
    setBucketsByType(nextBuckets);

    const restored = nextBuckets[nextType] ?? emptyBucket;
    setDraft((current) => ({
      ...current,
      vehicleType: nextType,
      manufacturerIds: restored.manufacturerIds,
      modelIds: restored.modelIds,
      categoryIds: restored.categoryIds,
    }));
  };

  const { data: manufacturers = [] } = useManufacturers();
  const { models, modelsByManufacturer } = useModels(draft.manufacturerIds);
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

  const modelGroups = useMemo<MultiSelectGroup[]>(() => {
    return [...draft.manufacturerIds].reverse().flatMap((manufacturerId) => {
      const manufacturer = manufacturers.find(
        (item) => Number(item.man_id) === manufacturerId,
      );
      const groupModels = modelsByManufacturer.get(manufacturerId);

      if (!manufacturer || !groupModels || groupModels.length === 0) {
        return [];
      }

      return [
        {
          id: manufacturerId,
          label: manufacturer.man_name,
          options: groupModels.map((model) => ({
            id: model.model_id,
            label: model.model_name,
          })),
        },
      ];
    });
  }, [draft.manufacturerIds, manufacturers, modelsByManufacturer]);

  const categoryOptions = categories.map((category) => ({
    id: category.category_id,
    label: category.title,
  }));

  return (
    <aside className="w-full rounded-t-[12px] border border-[#E2E5EB] bg-white shadow-[0_4px_16px_rgba(164,174,193,0.10)] md:w-[250px]">
      <div className="overflow-hidden rounded-t-[12px]">
        <VehicleTypeTabs
          activeVehicleType={draft.vehicleType}
          onChange={handleVehicleTypeChange}
        />
      </div>

      <div className="space-y-5 p-6 pt-[22px]">
        <FilterSelect
          label="გარიგების ტიპი"
          value={String(draft.forRent)}
          options={[
            { label: "იყიდება", value: "0" },
            { label: "ქირავდება", value: "1" },
          ]}
          onChange={(value) =>
            updateDraft({ forRent: Number(value) as 0 | 1 })
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
          groups={modelGroups}
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

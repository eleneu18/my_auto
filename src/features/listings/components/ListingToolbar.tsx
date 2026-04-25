import { useState } from "react";
import type { Period, SortOrder } from "../types";

type ToolbarOption<T extends string | number> = {
  label: string;
  value: T;
};

const periodOptions: ToolbarOption<Period>[] = [
  { label: "ბოლო 3 საათი", value: "3h" },
  { label: "ბოლო 1 დღე", value: "1d" },
  { label: "ბოლო 1 კვირა", value: "1w" },
];

const sortOptions: ToolbarOption<SortOrder>[] = [
  { label: "თარიღი კლებადი", value: 1 },
  { label: "თარიღი ზრდადი", value: 2 },
  { label: "ფასი კლებადი", value: 3 },
  { label: "ფასი ზრდადი", value: 4 },
  { label: "გარბენი კლებადი", value: 5 },
  { label: "გარბენი ზრდადი", value: 6 },
];

type ListingToolbarProps = {
  totalCount: number;
  sortOrder: SortOrder;
  period?: Period;
  onSortChange: (sortOrder: SortOrder) => void;
  onPeriodChange: (period: Period) => void;
};

const ListingToolbar = ({
  totalCount,
  sortOrder,
  period,
  onSortChange,
  onPeriodChange,
}: ListingToolbarProps) => {
  const selectedPeriod =
    periodOptions.find((option) => option.value === period) ?? periodOptions[0];

  const selectedSort =
    sortOptions.find((option) => option.value === sortOrder) ?? sortOptions[0];

  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h1 className="text-[16px] font-medium leading-none text-[#272A37]">
        {totalCount.toLocaleString("ka-GE")} განცხადება
      </h1>

      <div className="flex items-center gap-3">
        <ToolbarSelect
          value={selectedPeriod.label}
          options={periodOptions}
          onChange={(option) => onPeriodChange(option.value)}
        />

        <ToolbarSelect
          value={selectedSort.label}
          options={sortOptions}
          onChange={(option) => onSortChange(option.value)}
          align="right"
        />
      </div>
    </div>
  );
};

type ToolbarSelectProps<T extends string | number> = {
  value: string;
  options: ToolbarOption<T>[];
  onChange: (option: ToolbarOption<T>) => void;
  align?: "left" | "right";
};

const ToolbarSelect = <T extends string | number>({
  value,
  options,
  onChange,
  align = "left",
}: ToolbarSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-[40px] min-w-[156px] items-center justify-between gap-4 rounded-[8px] bg-white px-4 text-[12px] font-medium text-[#454857] shadow-[0_2px_8px_rgba(39,42,55,0.06)]"
      >
        <span>{value}</span>
        <span className="text-[#6F7383]">⌄</span>
      </button>

      {isOpen && (
        <div
          className={[
            "absolute top-[48px] z-20 w-[188px] overflow-hidden rounded-[8px] bg-white py-2 shadow-[0_8px_24px_rgba(39,42,55,0.12)]",
            align === "right" ? "right-0" : "left-0",
          ].join(" ")}
        >
          {options.map((option) => {
            const isSelected = option.label === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={[
                  "flex h-[36px] w-full items-center justify-between px-4 text-left text-[12px] transition hover:bg-[#F5F6F8]",
                  isSelected
                    ? "font-bold text-[#272A37]"
                    : "font-medium text-[#6F7383]",
                ].join(" ")}
              >
                <span>{option.label}</span>
                {isSelected && <span className="text-[#26B753]">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListingToolbar;

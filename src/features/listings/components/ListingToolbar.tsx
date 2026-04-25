import { useEffect, useRef, useState } from "react";
import type { Period, SortOrder } from "../types";

type ToolbarOption<T extends string | number> = {
  label: string;
  value: T;
};

const periodOptions: ToolbarOption<Period>[] = [
  { label: "ბოლო 1 საათი", value: "1h" },
  { label: "ბოლო 2 საათი", value: "2h" },
  { label: "ბოლო 3 საათი", value: "3h" },
  { label: "ბოლო 1 დღე", value: "1d" },
  { label: "ბოლო 2 დღე", value: "2d" },
  { label: "ბოლო 3 დღე", value: "3d" },
  { label: "ბოლო 1 კვირა", value: "1w" },
  { label: "ბოლო 2 კვირა", value: "2w" },
  { label: "ბოლო 3 კვირა", value: "3w" },
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-[40px] min-w-[156px] items-center justify-between gap-4 rounded-[10px] border border-[#D8DBE2] bg-white px-4 font-tbcx text-[13px] font-medium text-[#454857]"
      >
        <span>{value}</span>
        <span className="text-[#6F7383]">⌄</span>
      </button>

      {isOpen && (
        <div
          className={[
            "absolute top-[48px] z-20 w-[180px] overflow-hidden rounded-[10px] border border-[#D8DBE2] bg-white py-2 shadow-[0_12px_28px_rgba(39,42,55,0.14)]",
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
                  "flex h-[44px] w-full items-center px-5 text-left font-tbcx text-[16px] font-medium text-[#6F7383] transition hover:bg-[#F5F6F8]",
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

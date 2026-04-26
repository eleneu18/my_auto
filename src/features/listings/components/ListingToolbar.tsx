import { useEffect, useRef, useState } from "react";
import type { Period, SortOrder } from "../types";
import { cn } from "../../../shared/utils/cn";

import arrowRight from "../../../assets/images/arrow-icon.svg";

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
      <h1 className="text-[16px] leading-none text-[#272A37] font-helvetica-geo">
        {totalCount.toLocaleString("ka-GE")} განცხადება
      </h1>

      <div className="flex items-center gap-2">
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
        className="flex h-[40px] min-w-[140px] items-center justify-between gap-4 rounded-lg border border-[#E9E9F0] bg-white px-4 font-tbcx text-[12px] font-medium text-[#454857] cursor-pointer"
      >
        <span>{value}</span>
        <img
          src={arrowRight}
          alt=""
          aria-hidden="true"
          className={cn(
            "transition-transform",
            isOpen ? "-rotate-90" : "rotate-90",
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-[48px] z-20 w-[180px] overflow-hidden rounded-[10px] border border-[#D4D4E0] bg-white py-2 shadow-[0_10px_30px_0_rgba(44,46,85,0.13)]",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="block cursor-pointer w-full pt-[7px] pb-2 pl-[15px] text-left text-[14px] font-helvetica-geo font-medium text-[#6F7383] transition hover:bg-[#F2F3F6] hover:text-[#272A37]"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingToolbar;

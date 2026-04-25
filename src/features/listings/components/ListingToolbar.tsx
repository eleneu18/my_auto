import { useState } from "react";

type SortOption = {
  label: string;
  value: string;
};

const periodOptions: SortOption[] = [
  { label: "ბოლო 3 საათი", value: "3h" },
  { label: "ბოლო 1 დღე", value: "1d" },
  { label: "ბოლო 1 კვირა", value: "1w" },
];

const sortOptions: SortOption[] = [
  { label: "თარიღი კლებადი", value: "date_desc" },
  { label: "თარიღი ზრდადი", value: "date_asc" },
  { label: "ფასი კლებადი", value: "price_desc" },
  { label: "ფასი ზრდადი", value: "price_asc" },
  { label: "გარბენი კლებადი", value: "mileage_desc" },
  { label: "გარბენი ზრდადი", value: "mileage_asc" },
];

type ListingToolbarProps = {
  totalCount: number;
};

const ListingToolbar = ({ totalCount }: ListingToolbarProps) => {
  const [period, setPeriod] = useState(periodOptions[0]);
  const [sort, setSort] = useState(sortOptions[0]);

  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h1 className="text-[16px] font-medium leading-none text-[#272A37]">
        {totalCount.toLocaleString("ka-GE")} განცხადება
      </h1>

      <div className="flex items-center gap-3">
        <ToolbarSelect
          value={period.label}
          options={periodOptions}
          onChange={setPeriod}
        />

        <ToolbarSelect
          value={sort.label}
          options={sortOptions}
          onChange={setSort}
          align="right"
        />
      </div>
    </div>
  );
};

type ToolbarSelectProps = {
  value: string;
  options: SortOption[];
  onChange: (option: SortOption) => void;
  align?: "left" | "right";
};

const ToolbarSelect = ({
  value,
  options,
  onChange,
  align = "left",
}: ToolbarSelectProps) => {
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

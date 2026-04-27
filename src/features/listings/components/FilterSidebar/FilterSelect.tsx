import { useEffect, useRef, useState } from "react";
import { cn } from "../../../../shared/utils/cn";
import arrowRight from "../../../../assets/images/arrow-icon.svg";

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
        className={cn(
          "flex h-[44px] w-full items-center justify-between rounded-[10px] border bg-white px-4 font-tbcx text-[13px] font-medium transition-colors",
          value
            ? "border-[#C2C9D8] text-[#1B1D25] hover:border-[#C2C9D8]"
            : "border-[#D8DBE2] text-[#6F7383] hover:border-[#C2C9D8] hover:text-[#1B1D25]",
        )}
      >
        <span>{selectedOption.label}</span>
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

export default FilterSelect;

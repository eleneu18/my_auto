import { useEffect, useRef, useState } from "react";
import arrowRight from "../../../assets/images/arrow-icon.svg";
import Button from "../../../shared/ui/Button";

type CategoryOption = {
  id: number;
  label: string;
};

type CategoryPillsSelectProps = {
  selectedIds: number[];
  options: CategoryOption[];
  onChange: (ids: number[]) => void;
};

const CategoryPillsSelect = ({
  selectedIds,
  options,
  onChange,
}: CategoryPillsSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedLabels = options
    .filter((option) => selectedIds.includes(option.id))
    .map((option) => option.label);

  const toggle = (id: number) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((selectedId) => selectedId !== id)
        : [...selectedIds, id],
    );
  };

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
      <span className="mb-2 block text-[13px] font-bold text-[#272A37]">
        კატეგორია
      </span>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-[44px] w-full items-center justify-between rounded-[10px] border border-[#D8DBE2] bg-white px-4 text-left text-[13px] text-[#272A37]"
      >
        <span className="truncate">
          {selectedLabels.length > 0
            ? selectedLabels.join(", ")
            : "ყველა კატეგორია"}
        </span>
        <img
          src={arrowRight}
          alt=""
          aria-hidden="true"
          className={[
            "shrink-0 transition-transform",
            isOpen ? "-rotate-90" : "rotate-90",
          ].join(" ")}
        />{" "}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[72px] z-30 w-full rounded-[10px] bg-white p-4 shadow-[0_8px_24px_rgba(39,42,55,0.12)]">
          <div className="max-h-[220px] overflow-y-auto pr-1">
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const isSelected = selectedIds.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggle(option.id)}
                    className={[
                      "rounded-[8px] border px-3 py-2 text-[12px] font-medium",
                      isSelected
                        ? "border-[#26B753] bg-[#F0FFF7] text-[#159947]"
                        : "border-[#E9EBF0] bg-white text-[#6F7383]",
                    ].join(" ")}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => setIsOpen(false)}
          >
            არჩევა
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPillsSelect;

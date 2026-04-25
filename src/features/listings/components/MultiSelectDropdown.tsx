import { useEffect, useRef, useState } from "react";

type MultiSelectOption = {
  id: number;
  label: string;
};

type MultiSelectDropdownProps = {
  label: string;
  placeholder: string;
  selectedIds: number[];
  options: MultiSelectOption[];
  onChange: (ids: number[]) => void;
};

const MultiSelectDropdown = ({
  label,
  placeholder,
  selectedIds,
  options,
  onChange,
}: MultiSelectDropdownProps) => {
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
        {label}
      </span>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-[44px] w-full items-center justify-between rounded-[10px] border border-[#D8DBE2] bg-white px-4 text-left text-[13px] text-[#272A37]"
      >
        <span className="truncate">
          {selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder}
        </span>
        <span className="text-[#6F7383]">{isOpen ? "×" : "⌄"}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[72px] z-30 w-full rounded-[10px] bg-white p-4 shadow-[0_8px_24px_rgba(39,42,55,0.16)]">
          <div className="max-h-[240px] overflow-y-auto pr-1">
            <div className="space-y-3">
              {options.map((option) => {
                const isSelected = selectedIds.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggle(option.id)}
                    className="flex w-full items-center gap-3 text-left text-[13px] text-[#454857]"
                  >
                    <span
                      className={[
                        "flex h-5 w-5 items-center justify-center rounded border",
                        isSelected
                          ? "border-[#26B753] bg-[#26B753] text-white"
                          : "border-[#D8DBE2] bg-white",
                      ].join(" ")}
                    >
                      {isSelected ? "✓" : ""}
                    </span>
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-4 h-[40px] w-full rounded-[8px] bg-[#272A37] text-[13px] font-bold text-white"
          >
            არჩევა
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;

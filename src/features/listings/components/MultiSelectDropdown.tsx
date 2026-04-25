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
  disabled?: boolean;
};

const MultiSelectDropdown = ({
  label,
  placeholder,
  selectedIds,
  options,
  onChange,
  disabled = false,
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedOptions = options.filter((option) =>
    selectedIds.includes(option.id),
  );

  const toggle = (id: number) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((selectedId) => selectedId !== id)
        : [...selectedIds, id],
    );
  };

  const clearSelected = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange([]);
    setIsOpen(false);
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

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  return (
    <div className="relative" ref={dropdownRef}>
      <span className="mb-2 block font-tbcx text-[12px] font-medium text-[#272A37]">
        {label}
      </span>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((current) => !current)}
        className={[
          "flex min-h-[44px] w-full items-center justify-between rounded-[10px] border px-3 py-2 text-left text-[13px] transition",
          disabled
            ? "cursor-not-allowed border-[#E1E3E8] bg-[#F4F5F7] text-[#A0A4AD]"
            : "border-[#D8DBE2] bg-white text-[#272A37]",
        ].join(" ")}
      >
        <span className="min-w-0 flex-1 truncate">
          {selectedOptions.length > 0
            ? selectedOptions.map((option) => option.label).join(", ")
            : placeholder}
        </span>

        {selectedOptions.length > 0 && !disabled ? (
          <span
            role="button"
            tabIndex={-1}
            aria-label="Clear selected values"
            onClick={clearSelected}
            className="ml-2 shrink-0 text-[#6F7383]"
          >
            ×
          </span>
        ) : (
          <span className="ml-2 shrink-0 text-[#6F7383]">
            {isOpen ? "×" : "⌄"}
          </span>
        )}
      </button>

      {isOpen && !disabled && (
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

import { useEffect, useRef, useState } from "react";
import arrowRight from "../../../assets/images/arrow-icon.svg";
import Button from "../../../shared/ui/Button";
import { cn } from "../../../shared/utils/cn";

type MultiSelectOption = {
  id: number;
  label: string;
};

export type MultiSelectGroup = {
  id: number;
  label: string;
  options: MultiSelectOption[];
};

type MultiSelectDropdownProps = {
  label: string;
  placeholder: string;
  selectedIds: number[];
  options: MultiSelectOption[];
  onChange: (ids: number[]) => void;
  disabled?: boolean;
  groups?: MultiSelectGroup[];
  pillsPerGroup?: number;
};

const DEFAULT_PILLS_PER_GROUP = 5;

const MultiSelectDropdown = ({
  label,
  placeholder,
  selectedIds,
  options,
  onChange,
  disabled = false,
  groups,
  pillsPerGroup = DEFAULT_PILLS_PER_GROUP,
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const flatOptions = groups
    ? groups.flatMap((group) => group.options)
    : options;

  const selectedOptions = flatOptions.filter((option) =>
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
        className={cn(
          "flex min-h-[44px] w-full items-center justify-between rounded-[10px] border px-3 py-2 text-left text-[13px] font-tbcx transition",
          disabled
            ? "cursor-not-allowed border-[#E1E3E8] bg-[#F4F5F7] text-[#A0A4AD]"
            : "border-[#D8DBE2] bg-white text-[#272A37]",
        )}
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
            <img
              src={arrowRight}
              alt=""
              aria-hidden="true"
              className={cn(
                "ml-2 shrink-0 transition-transform",
                isOpen ? "-rotate-90" : "rotate-90",
              )}
            />
          </span>
        )}
      </button>

      {isOpen && !disabled && (
        <div className="absolute left-0 top-[72px] z-30 w-full rounded-[10px] bg-white p-4 shadow-[0_8px_24px_rgba(39,42,55,0.16)]">
          <div className="max-h-[320px] overflow-y-auto pr-1">
            {groups ? (
              <GroupedOptions
                groups={groups}
                pillsPerGroup={pillsPerGroup}
                selectedIds={selectedIds}
                onToggle={toggle}
              />
            ) : (
              <FlatOptions
                options={options}
                selectedIds={selectedIds}
                onToggle={toggle}
              />
            )}
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

type FlatOptionsProps = {
  options: MultiSelectOption[];
  selectedIds: number[];
  onToggle: (id: number) => void;
};

const FlatOptions = ({ options, selectedIds, onToggle }: FlatOptionsProps) => (
  <div className="space-y-3">
    {options.map((option) => (
      <CheckboxRow
        key={option.id}
        option={option}
        isSelected={selectedIds.includes(option.id)}
        onToggle={onToggle}
      />
    ))}
  </div>
);

type GroupedOptionsProps = {
  groups: MultiSelectGroup[];
  pillsPerGroup: number;
  selectedIds: number[];
  onToggle: (id: number) => void;
};

const GroupedOptions = ({
  groups,
  pillsPerGroup,
  selectedIds,
  onToggle,
}: GroupedOptionsProps) => (
  <div className="space-y-5">
    {groups.map((group) => {
      const pillOptions = group.options.slice(0, pillsPerGroup);
      const checkboxOptions = group.options.slice(pillsPerGroup);

      return (
        <div key={group.id} className="space-y-3">
          <div className="font-tbcx text-[14px] font-bold text-[#272A37]">
            {group.label}
          </div>

          {pillOptions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {pillOptions.map((option) => (
                <PillOption
                  key={option.id}
                  option={option}
                  isSelected={selectedIds.includes(option.id)}
                  onToggle={onToggle}
                />
              ))}
            </div>
          )}

          {checkboxOptions.length > 0 && (
            <div className="space-y-3">
              {checkboxOptions.map((option) => (
                <CheckboxRow
                  key={option.id}
                  option={option}
                  isSelected={selectedIds.includes(option.id)}
                  onToggle={onToggle}
                />
              ))}
            </div>
          )}
        </div>
      );
    })}
  </div>
);

type OptionRowProps = {
  option: MultiSelectOption;
  isSelected: boolean;
  onToggle: (id: number) => void;
};

const PillOption = ({ option, isSelected, onToggle }: OptionRowProps) => (
  <button
    type="button"
    onClick={() => onToggle(option.id)}
    className={cn(
      "rounded-[8px] border px-3 py-2 text-[12px] font-medium transition",
      isSelected
        ? "border-[#26B753] bg-[#F0FFF7] text-[#159947]"
        : "border-[#E9EBF0] bg-white text-[#6F7383] hover:border-[#D8DBE2]",
    )}
  >
    <span aria-hidden="true" className="mr-1">
      {isSelected ? "✓" : "+"}
    </span>
    {option.label}
  </button>
);

const CheckboxRow = ({ option, isSelected, onToggle }: OptionRowProps) => (
  <button
    type="button"
    onClick={() => onToggle(option.id)}
    className="flex w-full items-center gap-3 text-left text-[13px] text-[#454857]"
  >
    <span
      aria-hidden="true"
      className={cn(
        "flex h-5 w-5 items-center justify-center rounded border",
        isSelected
          ? "border-[#26B753] bg-[#26B753] text-white"
          : "border-[#D8DBE2] bg-white",
      )}
    >
      {isSelected ? "✓" : ""}
    </span>
    {option.label}
  </button>
);

export default MultiSelectDropdown;

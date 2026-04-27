import removeRoundedIcon from "../../../assets/images/remove-rounded.svg";

type AppliedFiltersBarProps = {
  labels: string[];
  onClearOne: (label: string) => void;
  onOpenFilters: () => void;
};

const AppliedFiltersBar = ({
  labels,
  onClearOne,
  onOpenFilters,
}: AppliedFiltersBarProps) => {
  if (labels.length === 0) {
    return (
      <div className="scrollbar-hidden mb-4 flex gap-2 overflow-x-auto md:hidden">
        <button
          type="button"
          onClick={onOpenFilters}
          className="shrink-0 rounded-[10px] border border-[#D8DBE2] bg-white px-4 py-2 text-[12px] font-medium text-[#272A37]"
        >
          ფილტრი
        </button>
      </div>
    );
  }

  return (
    <div className="scrollbar-hidden mb-4 flex gap-2 overflow-x-auto">
      <button
        type="button"
        onClick={onOpenFilters}
        className="shrink-0 rounded-[10px] border border-[#D8DBE2] bg-white px-4 py-2 text-[12px] font-medium text-[#272A37] md:hidden"
      >
        ფილტრი
      </button>

      {labels.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onClearOne(label)}
          className="flex shrink-0 items-center gap-2 rounded-[100px] bg-white px-4 py-2 text-[12px] font-normal text-[#272A37]"
        >
          <span>{label}</span>
          <img
            src={removeRoundedIcon}
            alt=""
            aria-hidden="true"
            className="h-5 w-5 shrink-0"
          />
        </button>
      ))}
    </div>
  );
};

export default AppliedFiltersBar;

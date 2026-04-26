import { cn } from "../utils/cn";

type CurrencySwitcherProps = {
  value: "gel" | "usd";
  onChange: (value: "gel" | "usd") => void;
  gelIcon: string;
  usdIcon: string;
};

const CurrencySwitcher = ({
  value,
  onChange,
  gelIcon,
  usdIcon,
}: CurrencySwitcherProps) => {
  const toggleCurrency = () => {
    onChange(value === "gel" ? "usd" : "gel");
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Toggle currency"
      onClick={toggleCurrency}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleCurrency();
        }
      }}
      className="flex cursor-pointer rounded-full border border-[#D8DBE2] bg-white p-[2px]"
    >
      <CurrencyButton
        label="Price in GEL"
        icon={gelIcon}
        isActive={value === "gel"}
      />

      <CurrencyButton
        label="Price in USD"
        icon={usdIcon}
        isActive={value === "usd"}
      />
    </div>
  );
};

type CurrencyButtonProps = {
  label: string;
  icon: string;
  isActive: boolean;
};

const CurrencyButton = ({ label, icon, isActive }: CurrencyButtonProps) => {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-full transition",
        isActive ? "bg-[#272A37]" : "bg-white",
      )}
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className={cn(
          "transition",
          isActive
            ? "h-[11px] w-[10px] brightness-0 invert"
            : "h-[12px] w-[8px] opacity-55 grayscale",
        )}
      />
    </span>
  );
};

export default CurrencySwitcher;

import { cn } from "../utils/cn";

type BadgeVariant = "primary" | "warning" | "danger";

type BadgeProps = {
  text: string;
  variant?: BadgeVariant;
  className?: string;
};

const variantClassNames: Record<BadgeVariant, string> = {
  primary: "bg-[#4A6CFA]",
  warning: "bg-[#FEC900]",
  danger: "bg-[#FD4100]",
};

const Badge = ({ text, variant = "primary", className = "" }: BadgeProps) => {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-1 font-tbcx text-[10px] font-bold uppercase leading-none text-white whitespace-nowrap",
        variantClassNames[variant],
        className,
      )}
    >
      {text}
    </span>
  );
};

export default Badge;

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "h-8 rounded-md bg-[#FD4100] font-tbcx text-[14px] font-bold leading-none text-white transition hover:bg-[#e83b00]",
  secondary:
    "h-[40px] rounded-[8px] bg-[#272A37] font-tbcx text-[13px] font-bold leading-none text-white transition hover:bg-[#1f222d]",
};

const Button = ({
  variant = "primary",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={[
        "w-full disabled:cursor-not-allowed disabled:opacity-60",
        variantClassNames[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

import checkMarkIcon from "../../assets/images/check-mark-icon.svg";
import { cn } from "../utils/cn";

type CustomsStatusBadgeProps = {
  passed: boolean;
  fee?: string;
  className?: string;
};

const CustomsStatusBadge = ({
  passed,
  fee = "2,176 ₾",
  className = "",
}: CustomsStatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[6px] py-[5px] pl-1 pr-2 font-tbcx text-[10px] font-medium leading-none",
        passed
          ? "bg-[#EEFBF1] text-[#1EB676]"
          : "bg-[#FFE3E3] text-[#FF3B30]",
        className,
      )}
    >
      {passed && (
        <img
          src={checkMarkIcon}
          alt=""
          aria-hidden="true"
          className="h-[6px] w-[7px]"
        />
      )}
      <span>{passed ? "განბაჟებული" : `განბაჟება ${fee}`}</span>
    </span>
  );
};

export default CustomsStatusBadge;

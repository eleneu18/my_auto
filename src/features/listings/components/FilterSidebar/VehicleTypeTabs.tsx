import carIcon from "../../../../assets/images/car-icon.svg";
import motoIcon from "../../../../assets/images/moto-icon.svg";
import tractorIcon from "../../../../assets/images/tractor-icon.svg";
import { cn } from "../../../../shared/utils/cn";

export type VehicleType = "car" | "tractor" | "moto";

type VehicleTypeItem = {
  value: VehicleType;
  icon: string;
  label: string;
};

type VehicleTypeTabsProps = {
  activeVehicleType: VehicleType;
  onChange: (vehicleType: VehicleType) => void;
};

const vehicleTypes: VehicleTypeItem[] = [
  { value: "car", icon: carIcon, label: "ავტომობილი" },
  { value: "tractor", icon: tractorIcon, label: "ტრაქტორი" },
  { value: "moto", icon: motoIcon, label: "მოტო" },
];

const VehicleTypeTabs = ({
  activeVehicleType,
  onChange,
}: VehicleTypeTabsProps) => {
  return (
    <div className="grid h-[48px] grid-cols-3 border-b border-[#E9EBF0]">
      {vehicleTypes.map((item) => {
        const isActive = item.value === activeVehicleType;

        return (
          <button
            key={item.value}
            type="button"
            aria-label={item.label}
            onClick={() => onChange(item.value)}
            className={cn(
              "flex cursor-pointer items-center justify-center border-r border-[#E9EBF0] transition last:border-r-0",
              isActive
                ? "border-b-1 border-b-[#FD4100] bg-white"
                : "bg-[#F9F9FB]",
            )}
          >
            <img
              src={item.icon}
              alt=""
              aria-hidden="true"
              className={cn(
                "h-6 w-6 transition",
                isActive ? "opacity-100" : "opacity-55 grayscale",
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default VehicleTypeTabs;

import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";
import React from "react";
interface InfoCardProps {
  label: string;
  variant?: "default" | "success";
  numberOfItems: number;
  icon: LucideIcon;
}
const InfoCard = ({
  label,
  variant,
  numberOfItems,
  icon: Icon,
}: InfoCardProps) => {
  return (
    <div className=" flex items-center border rounded-sm p-3 gap-x-2">
      <IconBadge icon={Icon} variant={variant} />
      <div className="">
        <p className=" font-medium">{label}</p>
        <p className=" text-gray-500 text-sm">{numberOfItems} {numberOfItems>1 ? "Courses": "Course"}</p>
      </div>
    </div>
  );
};

export default InfoCard;

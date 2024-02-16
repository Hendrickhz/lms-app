import React from "react";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";
interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}
const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};
const textBySize = {
  default: "text-sm",
  sm: "text-xs",
};
const CourseProgress = ({ value, variant, size }: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          textBySize[size || "default"]
        )}
      >
        {Math.round(value)}% completed
      </p>
    </div>
  );
};

export default CourseProgress;

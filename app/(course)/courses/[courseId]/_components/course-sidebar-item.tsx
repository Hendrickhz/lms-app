"use client";
import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
interface CourseSidebarItemProps {
  id: string;
  label: string;
  isLocked: boolean;
  courseId: string;
  isCompleted: boolean;
}
const CourseSidebarItem = ({
  id,
  label,
  courseId,
  isLocked,
  isCompleted,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
  const isActive = pathname.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        " text-sm flex items-center pl-9 text-slate-500 font-[500] gap-x-2 hover:text-slate-600 hover:bg-slate-200/20  ",
        isActive &&
          " text-slate-700  bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && " text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      <div className=" flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </div>
      <div className={cn(" ml-auto border-2  border-slate-700 h-full opacity-0", isActive && " opacity-100", isCompleted && " border-emerald-700")}></div>
    </button>
  );
};

export default CourseSidebarItem;

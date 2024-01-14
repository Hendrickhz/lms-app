"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import React from "react";
type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};
const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const isActive =
    (pathName === "/" && href == "/") ||
    pathName === href ||
    pathName?.startsWith(`${href}/`);

  const handleOnClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={handleOnClick}
      type="button"
      className={cn(
        "    flex items-center gap-x-2 text-slate-500 hover:text-slate-600 hover:bg-slate-300/20 font-[500] pl-6 text-sm transition-all",
        isActive &&
          " text-sky-700 hover:text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 border-r-4 border-sky-700 "
      )}
    >
      <div className="py-4  flex items-center gap-x-2">
        <Icon size={22} />
        <div className="">{label}</div>
      </div>
      
    </button>
  );
};

export default SidebarItem;

"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import { url } from "inspector";
interface CategoryItemProps {
  label: string;
  id: string;
  icon?: IconType;
}
const CategoryItem = ({ id, label, icon: Icon }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === id;
  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { title: currentTitle, categoryId: isSelected ? null : id },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3  text-sm rounded-full flex items-center transition  gap-x-2 border border-slate-200 bg-slate-100 hover:bg-sky-200",
        isSelected && " border-sky-700 bg-sky-200/20 text-sky-700"
      )}
    >
      {Icon && <Icon size={20} />}
      <span>{label}</span>
    </button>
  );
};

export default CategoryItem;

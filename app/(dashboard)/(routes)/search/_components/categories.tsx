"use client";
import { Category } from "@prisma/client";
import React from "react";
import { IconType } from "react-icons";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import CategoryItem from "./categoryItem";
interface CategoriesProps {
  items: Category[];
}
const Categories = ({ items }: CategoriesProps) => {
  const IconMap: Record<Category["name"], IconType> = {
    Music: FcMusic,
    Photography: FcOldTimeCamera,
    Fitness: FcSportsMode,
    Accounting: FcSalesPerformance,
    "Computer Science": FcMultipleDevices,
    Filming: FcFilmReel,
    Engineering: FcEngineering,
  };
  return (
    <div className=" flex items-center gap-x-2 truncate">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          id={item.id}
          icon={IconMap[item.name]}
        />
      ))}
    </div>
  );
};

export default Categories;

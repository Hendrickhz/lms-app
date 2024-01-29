import React from "react";
import Categories from "./_components/categories";
import { db } from "@/lib/db";
import SearchInput from "@/components/search-input";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <div className="px-6 pt-6 md:p-0 block md:hidden">
        <SearchInput />
      </div>
      <div className=" p-6">
        <Categories items={categories} />
      </div>
    </>
  );
};

export default SearchPage;

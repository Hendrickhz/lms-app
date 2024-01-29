"use client";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import qs from "query-string";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounce = useDebounce(searchValue);
  const currentCategoryId = searchParams.get("categoryId");
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debounce,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [currentCategoryId, debounce, pathname, router]);

  return (
    <div className=" relative">
      <Search className=" w-4 h-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search course titles..."
        className=" w-full md:w-[300px] pl-9 bg-slate-100  rounded-sm focus-visible:ring-slate-400"
      />
    </div>
  );
};

export default SearchInput;

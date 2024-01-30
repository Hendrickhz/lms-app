"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";

const NavbarRouteItems = () => {
  const pathName = usePathname();
  const isTeacherMode = pathName?.startsWith("/teacher");
  const isCoursePage = pathName?.includes("/courses");
  const isSearchPage = pathName === "/search";
  return (
    <>
      {isSearchPage && (
        <div className=" hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className=" flex  gap-x-2 ml-auto">
        {isTeacherMode || isCoursePage ? (
          <Link href={"/"}>
            <Button size={"sm"} variant={"ghost"}>
              <LogOut className="w-4 h-4 mr-2" /> Exit
            </Button>
          </Link>
        ) : (
          <Link href={"/teacher/courses"}>
            <Button size={"sm"} variant={"ghost"}>
              Teacher Mode
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRouteItems;

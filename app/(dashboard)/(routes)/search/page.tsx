import React from "react";
import Categories from "./_components/categories";
import { db } from "@/lib/db";
import SearchInput from "@/components/search-input";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getCourses } from "@/actions/get-courses";
import CoursesList from "@/components/courses-list";


interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const courses = await getCourses({ userId, ...searchParams });
  return (
    <>
      <div className="px-6 pt-6 md:p-0 block md:hidden">
        <SearchInput />
      </div>
      <div className=" p-6">
        <Categories items={categories} />
      </div>
      <div className="p-6">
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;

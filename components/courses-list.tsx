import { Category, Course } from "@prisma/client";
import React from "react";
import CourseCard from "./course-card";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};
interface CoursesListProp {
  items: CourseWithProgressWithCategory[];
}
const CoursesList = ({ items }: CoursesListProp) => {
  return (
    <div>
      <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            id={item.id}
            key={item.id}
            title={item.title}
            category={item?.category?.name!}
            price={item.price!}
            chaptersLength={item.chapters.length}
            progress={item.progress}
            imgURL={item.imageURL!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className=" text-center text-sm text-foreground  mt-10">
          No course found.
        </div>
      )}
    </div>
  );
};

export default CoursesList;

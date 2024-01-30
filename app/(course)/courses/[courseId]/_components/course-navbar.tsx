import NavbarRouteItems from "@/components/navbar-routeItems";
import { Course, Chapter, UserProgress } from "@prisma/client";
import React from "react";
import CourseMobileSidebar from "./course-mobile-sidebar";
interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & { userProgress: UserProgress[] | null })[];
  };
  progressCount: number;
}
const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className=" p-4 flex items-center border-b shadow-sm bg-white w-full h-full">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRouteItems />
    </div>
  );
};

export default CourseNavbar;

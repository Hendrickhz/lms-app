import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CourseSidebar from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}
const CourseMobileSidebar = ({
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <div className=" md:hidden block pr-4">
      <Sheet>
        <SheetTrigger>
          {" "}
          <Menu className=" transition hover:opacity-75" />
        </SheetTrigger>
        <SheetContent side={"left"} className=" p-0 bg-white w-72">
          {/* <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader> */}
          <CourseSidebar course={course} progressCount={progressCount} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CourseMobileSidebar;

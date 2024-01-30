import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import CourseSidebarItem from "./course-sidebar-item";
interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & { userProgress: UserProgress[] | null })[];
  };
  progressCount: number | null;
}
const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: { userId, courseId: course.id },
    },
  });
  return (
    <div className=" h-full flex flex-col border-r shadow-sm overflow-y-auto">
      <div className=" p-6 border-b ">
        <h1 className=" font-semibold">{course.title}</h1>
        {/* TODO: CHECK PURCHASE OR ADD PROGRESS */}
      </div>
      <div className=" w-full flex flex-col">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            courseId={course.id}
            id={chapter.id}
            label={chapter.title}
            isLocked={!chapter.isFree && !purchase}
            isCompleted={!!chapter?.userProgress?.[0]?.isCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;

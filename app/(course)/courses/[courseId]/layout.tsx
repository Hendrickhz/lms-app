import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!course) {
    return redirect("/");
  }
  const progressCount = await getProgress(userId, course.id);
  return (
    <div className=" h-full">
      <div className=" z-50 h-[80px] md:pl-80 fixed inset-y-0 w-full">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className=" z-50 hidden md:flex flex-col w-80 h-full fixed inset-y-0">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className=" h-full md:pl-80 mt-[80px]">{children}</main>
    </div>
  );
};

export default CourseLayout;

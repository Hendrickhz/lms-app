import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CoursesWithCategoryWithProgress = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CoursesWithCategoryWithProgress[];
  coursesInProgress: CoursesWithCategoryWithProgress[];
};
export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });
    const courses = purchasedCourses.map(
      (purchase) => purchase.course
    ) as CoursesWithCategoryWithProgress[];
    for (let course of courses) {
      course["progress"] = await getProgress(userId, course.id);
    }
    const completedCourses = courses.filter((course) => course.progress == 100);
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );
    return { completedCourses, coursesInProgress };
  } catch (error) {
    console.log("get_dashboard_courses_error", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: true,
      },
    });
    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }
    const hasPublishedChapters = course.chapters.some(
      (chapter) => chapter.isPublished
    );
    if (
      !hasPublishedChapters ||
      !course.title ||
      !course.description ||
      !course.imageURL ||
      !course.categoryId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId: userId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("COURSE_PUBLISH", error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { isPublished, ...values } = await req.json();

    const chapter = await db.chapter.update({
      where: {
        courseId: params.courseId,
        id: params.chapterId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[Course Chapter Update]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

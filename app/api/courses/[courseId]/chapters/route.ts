import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
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

    const lastChapter = await db.chapter.findFirst({
      where: { courseId: params.courseId },
      orderBy: { positon: "desc" },
    });

    const newChapterPosition = lastChapter ? lastChapter.positon + 1 : 1;
    const newChapter = await db.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        positon: newChapterPosition,
      },
    });
    return NextResponse.json(newChapter);
  } catch (error) {
    console.log("[Course Chapters]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

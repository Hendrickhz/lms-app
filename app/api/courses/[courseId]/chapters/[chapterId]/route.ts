import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);
//* DELETE FUNCTION
export async function DELETE(
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
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    if (!chapter) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (chapter.videoURL) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });
      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }
    const deletedChapter = await db.chapter.delete({
      where: {
        courseId: params.courseId,
        id: params.chapterId,
      },
    });

    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });
    if (!publishedChapters.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("CHAPTER DELETE ERROR", error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}

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
    if (values.videoURL) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });
      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: { id: existingMuxData.id },
        });
      }
      const asset = await Video.Assets.create({
        input: values.videoURL,
        playback_policy: "public",
        test: false,
      });
      await db.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset?.playback_ids?.[0]?.id,
        },
      });
    }
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[Course Chapter Update]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

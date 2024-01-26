import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { Video } = new Mux(
      process.env.MUX_TOKEN_ID!,
      process.env.MUX_TOKEN_SECRET!
    );
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

import { db } from "@/lib/db";

export async function getProgress(
  userId: string,
  courseId: string
): Promise<number> {
  try {
    const publishedChapters = db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });
    const publishedChaptersIds = (await publishedChapters).map(
      (chapter) => chapter.id
    );
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChaptersIds,
        },
        isCompleted: true,
      },
    });
    const progressPercentage =
      (validCompletedChapters / (await publishedChapters).length) * 100;
    return progressPercentage;
  } catch (error) {
    console.log("GET PROGRESS", error);
    return 0;
  }
}

import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/preview";
import { File } from "lucide-react";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const {
    course,
    chapter,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });
  if (!course || !chapter) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant={"success"} label="You already watched this chapter." />
      )}
      {isLocked && (
        <Banner
          variant={"warning"}
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col pb-20 mx-auto max-w-4xl">
        <div className="p-4">
          <VideoPlayer
            title={chapter.title}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
            chapterId={chapter.id}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id!}
          />
        </div>
        <div className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-y-2">
            <h2
              className=" text-xl fw-bolder   "
              style={{ fontWeight: "bold" }}
            >
              {chapter.title}
            </h2>
            {purchase ? (
              <div>{/* TODO Course Progress Button  */}</div>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
        </div>
        <Separator />
        <div className="">
          <Preview value={chapter.description!} />
        </div>
        {!!attachments?.length && (
          <div>
            {attachments.map((attachment) => (
              <a
                key={attachment.id}
                href={attachment.url}
                target="_blank"
                className="p-3 w-full rounded-md text-sky-700 flex items-center bg-sky-100 border-sky-200"
              >
                <File className=" w-4 h-4"/>
                <p>{attachment.name}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterIdPage;

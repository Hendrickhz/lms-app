import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ChapterTitleForm from "./_components/chapter-titile-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const chapter = await db.chapter.findUnique({
    where: {
      courseId: params.courseId,
      id: params.chapterId,
    },
    include: { muxData: true },
  });
  if (!chapter) {
    return null;
  }

  const requiredFields = [
    chapter?.title,
    chapter?.description,
    chapter?.videoURL,
  ];

  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${requiredFields.length})`;
  return (
    <div className="p-6">
      <div className="  flex justify-between items-center">
        <div className=" w-full">
          <Link
            href={`/teacher/courses/${params.courseId}`}
            className=" text-sm flex items-center "
          >
            <ArrowLeft className=" w-4 h-4 mr-2" />
            <span>Back to course setup</span>
          </Link>
          <div className="mt-4">
            <div className="flex flex-col w-full gap-2">
              <h1 className=" text-2xl font-semibold">Chapter Creation</h1>
              <p className=" text-sm text-slate-700">
                Complete all fields {completionText}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 w-full gap-6 mt-16">
        <div className=" space-y-4">
          <div className=" flex items-center gap-2">
            <IconBadge icon={LayoutDashboard} />
            <p className=" text-xl">Customize your chapter</p>
          </div>
          <ChapterTitleForm
            chapterId={params.chapterId}
            courseId={params.courseId}
            initialData={chapter.title}
          />
          <ChapterDescriptionForm
            chapterId={params.chapterId}
            courseId={params.courseId}
            description={chapter.description}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;

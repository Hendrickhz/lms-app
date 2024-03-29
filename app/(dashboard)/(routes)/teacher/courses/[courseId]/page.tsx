import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/titile-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/img-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentsForm from "./_components/attachment-form";
import ChaptersForm from "./_components/chapters-form";
import Actions from "./_components/actions";
import Banner from "@/components/banner";

const IndividualCoursePage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: { id: params.courseId, userId },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }
  const hasPublishedChapters = course.chapters.filter(
    (chapter) => chapter.isPublished == true
  );
  const requiredFields = [
    course?.title,
    course?.description,
    course?.imageURL,
    course?.price,
    course?.categoryId,
    hasPublishedChapters.length
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className=" flex flex-col gap-2">
            <h2 className=" text-2xl font-semibold">Course Setup</h2>
            <span className=" text-sm text-slate-700">
              Complete all the fields{completionText}
            </span>
          </div>
          <Actions
            courseId={params.courseId}
            isPublished={course.isPublished}
            disabled={!isComplete}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="">
            <div className="flex items-center gap-2">
              <IconBadge icon={LayoutDashboard} variant={"default"} />
              <h2 className=" text-xl">Customize Your course</h2>
            </div>
            <TitleForm courseId={course?.id} title={course?.title} />
            <DescriptionForm
              courseId={course?.id}
              description={course?.description || ""}
            />
            <ImageForm
              courseId={course?.id}
              imageURL={course?.imageURL || ""}
            />
            <CategoryForm
              courseId={course?.id}
              initialCategoryId={course?.categoryId || ""}
              options={categories.map((option) => {
                return {
                  label: option.name,
                  value: option.id,
                };
              })}
            />
          </div>
          <div className=" space-y-4">
            <div className="">
              <div className=" flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="  text-xl">Create Chapters</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div className="  ">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell Your Course</h2>
              </div>
              <PriceForm
                initialPrice={course?.price || 0}
                courseId={course?.id}
              />
            </div>
            <div className="">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentsForm courseId={course?.id} initialData={course} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualCoursePage;

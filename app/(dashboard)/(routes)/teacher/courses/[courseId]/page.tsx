import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/titile-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/img-form";

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
  });
  if(!course){
    return null;
  }

  const requiredFields = [
    course?.title,
    course?.description,
    course?.imageURL,
    course?.price,
    course?.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className=" flex flex-col gap-2">
          <h2 className=" text-2xl font-semibold">Course Setup</h2>
          <span className=" text-sm text-slate-700">
            Complete all the fields{completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="">
          <div className="flex items-center gap-2">
          <IconBadge icon={LayoutDashboard} variant={'default'}/>
            <h2 className=" text-xl">Customize Your course</h2>
          </div>
          <TitleForm courseId={course?.id} title={course?.title}/>
          <DescriptionForm courseId={course?.id} description={course?.description || ''}/>
          <ImageForm courseId={course?.id} imageURL={course?.imageURL || ''}/>
        </div>
      </div>
    </div>
  );
};

export default IndividualCoursePage;

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";



const CoursesPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const courses = await db.course.findMany({
    where: {
      userId:userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className=" p-6">
      {/* <Link href={"/teacher/create"}>
        <Button variant={"default"}>Create Course</Button>
      </Link>
       */}
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;

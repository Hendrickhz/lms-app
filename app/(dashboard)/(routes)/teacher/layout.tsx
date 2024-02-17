import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const isTeacherVerified = isTeacher(userId);
  if (!isTeacherVerified) {
    return redirect("/");
  }
  return <div>{children}</div>;
};

export default TeacherLayout;
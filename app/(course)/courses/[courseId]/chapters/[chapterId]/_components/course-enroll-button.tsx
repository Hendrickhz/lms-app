import { Button } from "@/components/ui/button";
import { format } from "@/lib/format";
import React from "react";
interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}
const CourseEnrollButton = ({courseId,price}:CourseEnrollButtonProps) => {
  return <Button size={'sm'} className=" w-full md:w-auto">
    Enroll For {format(price)}
  </Button>;
};

export default CourseEnrollButton;

"use client";
import { Button } from "@/components/ui/button";
import { format } from "@/lib/format";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}
const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const onClick = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/api/courses/${courseId}/checkout`);
      if (res.status == 200) {
        toast.success("Purchase successful");
      } else {
        toast.error("Something went wrong.");
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isLoading}
      size={"sm"}
      className=" w-full md:w-auto"
      onClick={onClick}
    >
      Enroll For {format(price)}
    </Button>
  );
};

export default CourseEnrollButton;

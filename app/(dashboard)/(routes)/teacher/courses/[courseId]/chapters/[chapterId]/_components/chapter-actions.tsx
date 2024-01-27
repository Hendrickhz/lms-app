"use client";
import ConfirmModal from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
  isPublished: boolean;
  disabled: boolean;
  courseId: string;
  chapterId: string;
}

const ChapterActions = ({
  isPublished,
  disabled,
  courseId,
  chapterId,
}: ChapterActionsProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Chapter Delete ", error);
    } finally {
      setLoading(false);
    }
  };
  const onClick = async () => {
    try {
      setLoading(true);
      if(isPublished){
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
        toast.success("Chapter unpublished");
        router.refresh();
      }else{
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
        toast.success("Chapter published");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex items-center gap-x-2">
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button disabled={loading} size={"sm"}>
          <Trash className=" h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;

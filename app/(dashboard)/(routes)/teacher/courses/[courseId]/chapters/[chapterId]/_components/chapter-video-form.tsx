"use client";
import { Button } from "@/components/ui/button";
import {  Pencil, PlusCircle, Video } from "lucide-react";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MuxPlayer from '@mux/mux-player-react'
import FileUpload from "@/components/file-upload";
import { Chapter, MuxData } from "@prisma/client";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoURL: z.string(),
});

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoURL: initialData.videoURL || "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.patch(
      `/api/courses/${courseId}/chapters/${chapterId}`,
      values
    );
    toast.success("Course Updated.");
    router.refresh();
    toggleEdit();
  }
  return (
    <div className="p-4 border rounded-sm mt-6 bg-slate-100">
      <div className=" flex items-center justify-between ">
        <p>Chapter Video</p>
        <div className=" text-sm">
          <Button onClick={toggleEdit} variant={"ghost"}>
            {!isEditing && !initialData.videoURL && (
              <>
                <div className=" flex items-center">
                  <PlusCircle size={15} />{" "}
                  <span className=" ml-2">Add a video</span>
                </div>
              </>
            )}
            {!isEditing && initialData.videoURL && (
              <>
                <div className=" flex items-center">
                  <Pencil size={15} /> <span className=" ml-2">Edit Video</span>
                </div>
              </>
            )}
            {isEditing && "Cancel"}
          </Button>
        </div>
      </div>
      {!isEditing ? (
        !initialData.videoURL ? (
          <div className=" h-60 bg-slate-200  rounded-md flex  justify-center items-center">
            <Video className=" w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className=" relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData.muxData?.playbackId || ""}/>
            <p className="text-xs text-muted-foreground mt-4">Videos takes a few minutes to process. Please refresh the page to preview the video.</p>
          </div>
        )
      ) : (
        <div className="">
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoURL: url });
              }
            }}
          />
          <div className=" text-xs text-muted-foreground mt-4">
            Please upload a video for this chapter.
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;

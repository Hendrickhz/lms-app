"use client";
import { Button } from "@/components/ui/button";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FileUpload from "@/components/file-upload";
import { Attachment, Course } from "@prisma/client";

interface AttachmentsFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentsForm = ({ initialData, courseId }: AttachmentsFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing(!isEditing);

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment is deleted successfully.");
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post(
      `/api/courses/${courseId}/attachments`,
      values
    );
    toast.success("Course Updated.");
    router.refresh();
    toggleEdit();
  }
  return (
    <div className="p-4 border rounded-sm mt-6 bg-slate-100">
      <div className=" flex items-center justify-between ">
        <p>Course Attachment</p>
        <div className=" text-sm">
          <Button onClick={toggleEdit} variant={"ghost"}>
            {!isEditing && (
              <>
                <div className=" flex items-center">
                  <PlusCircle size={15} />{" "}
                  <span className=" ml-2">Add an attachment</span>
                </div>
              </>
            )}

            {isEditing && "Cancel"}
          </Button>
        </div>
      </div>
      {!isEditing && (
        <>
          {" "}
          {initialData?.attachments.length === 0 && (
            <p className=" text-sm mt-2 text-slate-500 italic">
              No attachments yet.
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <>
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="p-3 w-full rounded-md text-sky-700 flex items-center bg-sky-100 border-sky-200"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <>
                      <Loader2 className=" ml-auto w-4 h-4 animate-spin" />
                    </>
                  )}
                  {deletingId !== attachment.id && (
                    <button onClick={()=>onDelete(attachment.id)} className="ml-auto hover:text-sky-500 transition " >
                      <X className=" w-4 h-4  " />
                    </button>
                  )}
                </div>
              ))}
            </>
          )}
        </>
      )}
      {isEditing && (
        <div className="">
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className=" text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete this course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentsForm;

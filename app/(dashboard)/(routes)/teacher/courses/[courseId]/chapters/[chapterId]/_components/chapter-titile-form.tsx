"use client";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
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
import { Chapter } from "@prisma/client";

interface ChapterTitleFormProps {
  initialData: string;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChapterTitleForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterTitleFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData,
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
  const { isSubmitting, isValid } = form.formState;
  return (
    <div className="p-4 border rounded-sm mt-6 bg-slate-100">
      <div className=" flex items-center justify-between ">
        <p>Chapter Title</p>
        <div className=" text-sm">
          <Button onClick={toggleEdit} variant={"ghost"}>
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <Pencil size={15} />
                <span className=" ml-2">Edit Title</span>
              </>
            )}
          </Button>
        </div>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="eg. Introduction to the course"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your chapter title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!isValid || isSubmitting}
              size={"sm"}
              type="submit"
            >
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <p className="font-semibold">{initialData}</p>
      )}
    </div>
  );
};

export default ChapterTitleForm;

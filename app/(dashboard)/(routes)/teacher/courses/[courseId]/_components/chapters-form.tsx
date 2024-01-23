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
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
});

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreate = () => setIsCreating(!isCreating);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post(`/api/courses/${courseId}/chapters`, values);
    toast.success("Chapter created.");
    router.refresh();
    toggleCreate();
  }
  return (
    <div className="p-4 border rounded-sm mt-6 bg-slate-100">
      <div className=" flex items-center justify-between ">
        <p>Course Chapters</p>
        <div className=" text-sm">
          <Button onClick={toggleCreate} variant={"ghost"}>
            {isCreating ? (
              "Cancel"
            ) : (
              <>
                <Pencil size={15} />
                <span className=" ml-2">Add a chapter</span>
              </>
            )}
          </Button>
        </div>
      </div>
      {isCreating ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="eg. Introduction to Web development"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your chapter title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"sm"} type="submit">
              Create
            </Button>
          </form>
        </Form>
      ) : (
        <>
          <div
            className={cn(
              " text-sm mt-2",
              !initialData.chapters.length && "text-slate-500 italic"
            )}
          >
            {!initialData.chapters.length && "No Chapter yet."}
          </div>
          <p className=" text-xs text-muted-foreground mt-2">
            Drag and drop the chapters to position.
          </p>
        </>
      )}
    </div>
  );
};

export default ChaptersForm;

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
import { Checkbox } from "@/components/ui/checkbox";

interface ChapterAccessFormProps {
  isFree: boolean;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean()
});

const ChapterAccessForm = ({
  isFree,
  courseId,
  chapterId,
}: ChapterAccessFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: Boolean(isFree),
    },
  });
  const { isSubmitting, isValid } = form.formState;
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
        <p>Chapter Access</p>
        <div className=" text-sm">
          <Button onClick={toggleEdit} variant={"ghost"}>
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <Pencil size={15} />
                <span className=" ml-2">Edit Access</span>
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
              name="isFree"
              render={({ field }) => (
                <FormItem className=" flex gap-1 items-center p-4 rounded-md">
                  <FormControl >
                  
                    <Checkbox onCheckedChange={field.onChange} checked={field.value}/>
                  </FormControl>
                  <FormDescription className=" mt-0">
                    Check the checkbox if you want to set this chapter free for preview. 
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size={"sm"}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Save
            </Button>
          </form>
        </Form>
      ) : (
        <div className="font-semibold">
          {isFree ? "This chapter is free for preview." : "This chapter is not free for preview."}
        </div>
      )}
    </div>
  );
};

export default ChapterAccessForm;

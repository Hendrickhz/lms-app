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

interface TitleFormProps {
  title: string;
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
});

const TitleForm = ({ title, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="p-4 border rounded-sm mt-6 bg-slate-100">
      <div className=" flex items-center justify-between ">
         <p>Course Title</p>
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
      {isEditing ?  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="eg. Advanced Next JS course" {...field} />
              </FormControl>
              <FormDescription>
                This is your course title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={'sm'} type="submit">Save</Button>
      </form>
    </Form>:
      <p className="font-semibold">{title}</p>}
    </div>
  );
};

export default TitleForm;

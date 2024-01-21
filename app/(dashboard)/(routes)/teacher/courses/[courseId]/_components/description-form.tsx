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
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFormProps {
  description: string;
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required." }),
});

const DescriptionForm = ({ description, courseId }: DescriptionFormProps) => {
  const router= useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res= await axios.patch(`/api/courses/${courseId}`,values);
    toast.success('Course Updated.')
    router.refresh();
    toggleEdit();
    console.log(values);
  }
  return (
    <div className="p-4 border rounded-sm mt-6 bg-slate-100">
      <div className=" flex items-center justify-between ">
         <p>Course Description</p>
         <div className=" text-sm">
              <Button onClick={toggleEdit} variant={"ghost"}>
                {isEditing ? (
                "Cancel"
                ) : (
                <>
                    <Pencil size={15} />
                    <span className=" ml-2">Edit Description</span>
                </>
                )}
             </Button>
         </div>
      </div>
      {isEditing ?  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="eg. Advanced Next JS course" {...field} />
              </FormControl>
              <FormDescription>
                This is your course Description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={'sm'} type="submit">Save</Button>
      </form>
    </Form>:
      <p className="font-semibold">{description}</p>}
    </div>
  );
};

export default DescriptionForm;

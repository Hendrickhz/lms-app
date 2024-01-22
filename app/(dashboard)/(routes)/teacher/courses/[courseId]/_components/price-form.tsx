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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { format } from "@/lib/format";

interface PriceFormProps {
  initialPrice: number;
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number(),
});

const PriceForm = ({ initialPrice, courseId }: PriceFormProps) => {
  const router= useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialPrice  | 0,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res= await axios.patch(`/api/courses/${courseId}`,values);
    toast.success('Course Updated.')
    router.refresh();
    toggleEdit();

  }
  return (
    <div className="p-4 border rounded-sm mt-6 bg-slate-100">
      <div className=" flex items-center justify-between ">
         <p>Course Price</p>
         <div className=" text-sm">
              <Button onClick={toggleEdit} variant={"ghost"}>
                {isEditing ? (
                "Cancel"
                ) : (
                <>
                    <Pencil size={15} />
                    <span className=" ml-2">Edit Price</span>
                </>
                )}
             </Button>
         </div>
      </div>
      {isEditing ?  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input step={0.01} type="number" placeholder="eg. $10.99" {...field} />
              </FormControl>
              <FormDescription>
                This is your course Price.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size={'sm'} type="submit">Save</Button>
      </form>
    </Form>:
      <p className="font-semibold">{initialPrice ? format(initialPrice) : "These is no price for the course."}</p>}
    </div>
  );
};

export default PriceForm;

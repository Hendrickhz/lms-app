"use client";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
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

interface ImageFormProps {
  imageURL: string | "";
  courseId: string;
}

const formSchema = z.object({
  imageURL: z.string().min(1, { message: "Image is required." }),
});

const ImageForm = ({ imageURL, courseId }: ImageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(!isEditing);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageURL: imageURL,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.patch(`/api/courses/${courseId}`, values);
    toast.success("Course Updated.");
    router.refresh();
    toggleEdit();
    console.log(values);
  }
  return (
    <div className="p-4 border rounded-sm mt-6 bg-slate-100">
      <div className=" flex items-center justify-between ">
        <p>Course Image</p>
        <div className=" text-sm">
          <Button onClick={toggleEdit} variant={"ghost"}>
            {!isEditing && !imageURL && (
              <>
                <div className=" flex items-center">
                  <PlusCircle size={15} />{" "}
                  <span className=" ml-2">Add an image</span>
                </div>
              </>
            )}
            {!isEditing && imageURL && (
              <>
                <div className=" flex items-center">
                  <Pencil size={15} /> <span className=" ml-2">Edit Image</span>
                </div>
              </>
            )}
            {isEditing && "Cancel"}
          </Button>
        </div>
      </div>
      {!isEditing ? (
        !imageURL ? (
          <div className=" h-60 bg-slate-200  rounded-md flex  justify-center items-center">
            <ImageIcon className=" w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className=" relative aspect-video mt-2">
            <Image
              alt="Course image"
              className=" object-cover  rounded-md"
              fill
              src={imageURL}
            />
          </div>
        )
      ) : (
        <div className="">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageURL: url });
              }
            }}
          />
          <div className=" text-xs text-muted-foreground mt-4">16:9 aspect ratio is recommended.</div>
        </div>
      )}
     
    </div>
  );
};

export default ImageForm;

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Course Title is required.",
  }),
});

const CourseCreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isValid, isSubmitting } = form.formState;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${res.data.id}`);
      toast.success("Course created.");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }
  return (
    <div className="  max-w-5xl mx-auto h-full p-6  flex md:items-center md:justify-center ">
      <div className=" w-full">
        <p className=" text-3xl font-semibold">Name your course</p>
        <p className=" mt-2 text-slate-600 text-sm">
          Don&apos;t worry. You can change it later.
        </p>
        <div className="w-full mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Course Title. (eg. Advanced React Course)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What will you teach in this course?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className=" mt-4 flex gap-3">
                <Link href={"/"}>
                  <Button type="button" variant={"ghost"}>
                    Cancel
                  </Button>
                </Link>
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CourseCreatePage;

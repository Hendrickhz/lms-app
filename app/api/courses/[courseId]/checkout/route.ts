import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const purchase = await db.purchase.create({
      data: {
        courseId: params.courseId,
        userId: user.id,
      }
    });

    console.log("Purchase record created successfully:", purchase);

    return new NextResponse("Purchase created successfully", { status: 200 });
  } catch (error) {
    console.error("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

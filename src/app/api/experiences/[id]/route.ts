import dbConnect from "@/lib/dbConnect";
import ExperienceModel from "@/models/Experience";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // 👈 params is now a Promise
) {
  const { id } = await context.params; // 👈 you MUST await it here
  await dbConnect();

  try {
    const experience = await ExperienceModel.findById(id);

    if (!experience) {
      return NextResponse.json(
        { success: false, message: "Experience not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: experience },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching experience." },
      { status: 500 }
    );
  }
}

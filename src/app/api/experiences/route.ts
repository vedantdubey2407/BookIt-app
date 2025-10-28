import dbConnect from "../../../lib/dbConnect";
import ExperienceModel from "../../../models/Experience";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const experiences = await ExperienceModel.find({});
    return NextResponse.json({ success: true, data: experiences }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching experiences." }, { status: 500 });
  }
}
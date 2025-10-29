import dbConnect from "@/lib/dbConnect";
import ExperienceModel from "@/models/Experience";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Establish a connection to the database
  await dbConnect();

  try {
    // Find all documents in the Experience collection
    const experiences = await ExperienceModel.find({});
    
    // Send a successful response with the data
    return NextResponse.json(
      {
        success: true,
        data: experiences,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle any errors that occur during the process
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching experiences.",
      },
      { status: 500 }
    );
  }
}
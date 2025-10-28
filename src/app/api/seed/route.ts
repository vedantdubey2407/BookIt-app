import dbConnect from "../../../lib/dbConnect";
import ExperienceModel from "../../../models/Experience";
import { NextResponse } from "next/server";

const sampleExperiences = [
  {
    name: 'Kayaking in the Mangroves',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 999,
    location: 'Udupi, Karnataka',
    imageUrl: 'https://images.unsplash.com/photo-1588432133486-764f4f304d9c',
    slots: [
      { date: new Date('2025-11-15'), times: [{ time: '09:00 AM', slotsAvailable: 10 }, { time: '11:00 AM', slotsAvailable: 5 }] },
      { date: new Date('2025-11-16'), times: [{ time: '09:00 AM', slotsAvailable: 8 }, { time: '11:00 AM', slotsAvailable: 0 }] },
    ],
  },
  {
    name: 'Nandi Hills Sunrise Trek',
    description: 'Witness a breathtaking sunrise from the top of Nandi Hills. Includes breakfast.',
    price: 899,
    location: 'Bangalore, Karnataka',
    imageUrl: 'https://images.unsplash.com/photo-1600293299123-fa1bf2599dfd',
    slots: [
      { date: new Date('2025-11-20'), times: [{ time: '04:00 AM', slotsAvailable: 15 }, { time: '05:00 AM', slotsAvailable: 12 }] },
    ],
  },
];

export async function GET() {
  await dbConnect();

  try {
    // Clear existing data
    await ExperienceModel.deleteMany({});
    
    // Insert new sample data
    await ExperienceModel.insertMany(sampleExperiences);

    return NextResponse.json(
      { success: true, message: "Database seeded successfully!" },
      { status: 200 }
    );
  } catch (error) {
    // Make sure the error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
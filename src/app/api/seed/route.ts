import dbConnect from "../../../lib/dbConnect";
import ExperienceModel from "../../../models/Experience";
import { NextResponse } from "next/server";

const sampleExperiences = [
  {
    name: 'Kayaking in the Mangroves',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 999,
    location: 'Udupi, Karnataka',
    imageUrl: 'https://images.unsplash.com/photo-1586078074298-05dca4848695?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1935',
    slots: [
      { date: new Date('2025-11-15'), times: [{ time: '07:00 AM', slotsAvailable: 4 }, { time: '09:00 AM', slotsAvailable: 8 }, { time: '11:00 AM', slotsAvailable: 5 }, { time: '01:00 PM', slotsAvailable: 0 }] },
      { date: new Date('2025-11-16'), times: [{ time: '07:00 AM', slotsAvailable: 2 }, { time: '09:00 AM', slotsAvailable: 6 }, { time: '11:00 AM', slotsAvailable: 3 }] },
      { date: new Date('2025-11-17'), times: [{ time: '09:00 AM', slotsAvailable: 10 }, { time: '11:00 AM', slotsAvailable: 10 }] },
      { date: new Date('2025-11-18'), times: [{ time: '07:00 AM', slotsAvailable: 5 }, { time: '09:00 AM', slotsAvailable: 5 }] },
      
    ],
  },
  {
    name: 'Nandi Hills Sunrise Trek',
    description: 'Witness a breathtaking sunrise from the top of Nandi Hills. Includes breakfast.',
    price: 899,
    location: 'Bangalore, Karnataka',
    imageUrl: 'https://images.unsplash.com/photo-1741194150373-3b634f273300?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hbmRpJTIwaGlsbHMlMkMlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    slots: [
     { date: new Date('2025-11-20'), times: [{ time: '04:00 AM', slotsAvailable: 15 }, { time: '05:00 AM', slotsAvailable: 12 }] },
      { date: new Date('2025-11-21'), times: [{ time: '04:00 AM', slotsAvailable: 10 }, { time: '05:00 AM', slotsAvailable: 9 }] },
      { date: new Date('2025-11-22'), times: [{ time: '04:00 AM', slotsAvailable: 18 }, { time: '05:00 AM', slotsAvailable: 0 }] },
      { date: new Date('2025-11-23'), times: [{ time: '04:00 AM', slotsAvailable: 8 }, { time: '05:00 AM', slotsAvailable: 7 }] },
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
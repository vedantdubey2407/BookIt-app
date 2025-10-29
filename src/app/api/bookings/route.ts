import dbConnect from "@/lib/dbConnect";
import BookingModel from "@/models/Booking";
import ExperienceModel from "@/models/Experience";
import { NextResponse } from "next/server";

// Define a type for a single date slot
type DateSlot = {
  date: Date;
  times: TimeSlot[];
};

// Define a type for a single time slot
type TimeSlot = {
  time: string;
  slotsAvailable: number;
};

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userName, userEmail, experienceId, date, time } = await request.json();

    // 1. Find the specific slot in the Experience document
    const experience = await ExperienceModel.findById(experienceId);
    if (!experience) {
      return NextResponse.json({ success: false, message: "Experience not found." }, { status: 404 });
    }

    // Find the slot for the specified date
    const dateSlot = experience.slots.find(
      (slot: DateSlot) => new Date(slot.date).toISOString().split('T')[0] === date
    );
    if (!dateSlot) {
      return NextResponse.json({ success: false, message: "Date not available." }, { status: 400 });
    }

    // Find the specific time within that date's slots
    const timeSlot = dateSlot.times.find((t: TimeSlot) => t.time === time);
    if (!timeSlot) {
      return NextResponse.json({ success: false, message: "Time slot not available." }, { status: 400 });
    }

    // 2. Check if slots are available (prevent double-booking)
    if (timeSlot.slotsAvailable <= 0) {
      return NextResponse.json({ success: false, message: "This slot is sold out." }, { status: 400 });
    }

    // 3. Decrement the slot count and save the experience
    timeSlot.slotsAvailable -= 1;
    await experience.save();
    
    // 4. Create and save the new booking
    const newBooking = new BookingModel({
      userName,
      userEmail,
      experienceId,
      date,
      time,
    });
    await newBooking.save();

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
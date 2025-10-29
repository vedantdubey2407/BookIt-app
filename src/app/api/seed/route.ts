import dbConnect from "../../../lib/dbConnect";
import ExperienceModel from "../../../models/Experience";
import { NextResponse } from "next/server";

const sampleExperiences = [
  {
    name: 'Kayaking in the Mangroves',
    about: 'Scenic routes, trained guides, and safety briefing. Minimum age 10.',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 999,
    location: 'Udupi, Karnataka',
    imageUrl: 'https://images.unsplash.com/photo-1586078074298-05dca4848695?w=500',
    slots: [
      { date: new Date('2025-11-15'), times: [{ time: '07:00 AM', slotsAvailable: 4 }, { time: '09:00 AM', slotsAvailable: 8 }, { time: '11:00 AM', slotsAvailable: 5 }, { time: '01:00 PM', slotsAvailable: 0 }] },
      { date: new Date('2025-11-16'), times: [{ time: '07:00 AM', slotsAvailable: 2 }, { time: '09:00 AM', slotsAvailable: 6 }, { time: '11:00 AM', slotsAvailable: 3 }] },
      { date: new Date('2025-11-17'), times: [{ time: '09:00 AM', slotsAvailable: 10 }, { time: '11:00 AM', slotsAvailable: 10 }] },
      { date: new Date('2025-11-18'), times: [{ time: '07:00 AM', slotsAvailable: 5 }, { time: '09:00 AM', slotsAvailable: 5 }] },
    ],
  },
  {
    name: 'Nandi Hills Sunrise Trek',
    about: 'A guided trek to the summit for a panoramic sunrise view. Moderate fitness required.',
    description: 'Witness a breathtaking sunrise from the top of Nandi Hills. Includes breakfast.',
    price: 899,
    location: 'Bangalore, Karnataka',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1690958955208-d5c5dd6a983b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmFuZGklMjBoaWxscyUyQyUyMGluZGlhfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    slots: [
      { date: new Date('2025-11-20'), times: [{ time: '04:00 AM', slotsAvailable: 15 }, { time: '05:00 AM', slotsAvailable: 12 }] },
      { date: new Date('2025-11-21'), times: [{ time: '04:00 AM', slotsAvailable: 10 }, { time: '05:00 AM', slotsAvailable: 9 }] },
      { date: new Date('2025-11-22'), times: [{ time: '04:00 AM', slotsAvailable: 18 }, { time: '05:00 AM', slotsAvailable: 0 }] },
      { date: new Date('2025-11-23'), times: [{ time: '04:00 AM', slotsAvailable: 8 }, { time: '05:00 AM', slotsAvailable: 7 }] },
    ],
  },
  {
    name: 'Scuba Diving Adventure',
    about: 'Explore vibrant coral reefs and marine life with a PADI-certified instructor. All gear provided.',
    description: 'An unforgettable underwater experience in the clear waters of the Andaman Islands.',
    price: 3499,
    location: 'Havelock, Andaman',
    imageUrl: 'https://images.unsplash.com/photo-1595323397978-65433d24fc23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2N1YmElMjBkaXZpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    slots: [
      { date: new Date('2025-12-05'), times: [{ time: '10:00 AM', slotsAvailable: 6 }, { time: '01:00 PM', slotsAvailable: 4 }] },
      { date: new Date('2025-12-06'), times: [{ time: '10:00 AM', slotsAvailable: 5 }, { time: '01:00 PM', slotsAvailable: 0 }] },
    ],
  },
  {
    name: 'White Water Rafting',
    about: 'Navigate the thrilling rapids of the Ganges. Safety kayakers and expert guides included.',
    description: 'An adrenaline-pumping rafting experience in the adventure capital of India.',
    price: 1999,
    location: 'Rishikesh, Uttarakhand',
    imageUrl: 'https://images.unsplash.com/photo-1718383537411-6f9e727ae0bb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJpc2hpa2VzaCUyMHJhZnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    slots: [
      { date: new Date('2026-01-10'), times: [{ time: '09:00 AM', slotsAvailable: 12 }, { time: '12:00 PM', slotsAvailable: 10 }] },
      { date: new Date('2026-01-11'), times: [{ time: '09:00 AM', slotsAvailable: 8 }, { time: '12:00 PM', slotsAvailable: 8 }] },
    ],
  },
  {
    name: 'Paragliding in the Himalayas',
    about: 'Fly like a bird over the stunning landscapes of the Dhauladhar range. Tandem flight with a professional pilot.',
    description: 'Experience the thrill of paragliding from one of the world\'s best sites.',
    price: 2999,
    location: 'Bir Billing, Himachal',
    imageUrl: 'https://images.unsplash.com/photo-1592208127889-a44ea490c64b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFyYWdsaWRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
    slots: [
      { date: new Date('2026-02-15'), times: [{ time: '11:00 AM', slotsAvailable: 5 }, { time: '02:00 PM', slotsAvailable: 3 }] },
      { date: new Date('2026-02-16'), times: [{ time: '11:00 AM', slotsAvailable: 4 }, { time: '02:00 PM', slotsAvailable: 2 }] },
    ],
  },
  {
    name: 'Thar Desert Safari',
    about: 'Camel ride to the dunes, witness a magical sunset, and enjoy a traditional Rajasthani dinner.',
    description: 'A cultural and adventurous journey into the heart of the golden desert.',
    price: 2499,
    location: 'Jaisalmer, Rajasthan',
    imageUrl: 'https://images.unsplash.com/photo-1549944850-84e00be4203b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzZXJ0JTIwc2FmYXJpfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    slots: [
      { date: new Date('2025-11-25'), times: [{ time: '03:00 PM', slotsAvailable: 10 }] },
      { date: new Date('2025-11-26'), times: [{ time: '03:00 PM', slotsAvailable: 12 }] },
    ],
  },
  {
    name: 'Kerala Houseboat Cruise',
    about: 'Relax on a traditional houseboat, enjoy authentic Kerala cuisine, and watch the serene backwaters.',
    description: 'A tranquil overnight cruise through the picturesque backwaters of Alleppey.',
    price: 7999,
    location: 'Alleppey, Kerala',
    imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2VyYWxhJTIwaG91c2Vib2F0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    slots: [
      { date: new Date('2025-12-20'), times: [{ time: '12:00 PM', slotsAvailable: 2 }] },
      { date: new Date('2025-12-22'), times: [{ time: '12:00 PM', slotsAvailable: 1 }] },
    ],
  },
  {
    name: 'Coffee Plantation Trail',
    about: 'A guided walk through lush coffee estates, learn about the bean-to-cup process, and enjoy a coffee tasting session.',
    description: 'Discover the secrets of Coorg\'s famous coffee on this aromatic walking tour.',
    price: 799,
    location: 'Coorg, Karnataka',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1670758291967-25ed2e90f21e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
    slots: [
      { date: new Date('2025-11-10'), times: [{ time: '10:00 AM', slotsAvailable: 10 }, { time: '02:00 PM', slotsAvailable: 8 }] },
      { date: new Date('2025-11-11'), times: [{ time: '10:00 AM', slotsAvailable: 5 }, { time: '02:00 PM', slotsAvailable: 5 }] },
    ],
  },
  {
    name: 'Jim Corbett Wildlife Safari',
    about: 'Jeep safari into the heart of India\'s oldest national park. Spot tigers, elephants, and diverse birdlife.',
    description: 'An exciting safari for wildlife enthusiasts seeking a glimpse of the majestic Bengal tiger.',
    price: 4500,
    location: 'Ramnagar, Uttarakhand',
    imageUrl: 'https://images.unsplash.com/photo-1669021820355-7186908380d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amltJTIwY29yYmV0dCUyMG5hdGlvbmFsJTIwcGFya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    slots: [
      { date: new Date('2026-03-01'), times: [{ time: '06:00 AM', slotsAvailable: 4 }, { time: '02:00 PM', slotsAvailable: 4 }] },
      { date: new Date('2026-03-02'), times: [{ time: '06:00 AM', slotsAvailable: 2 }, { time: '02:00 PM', slotsAvailable: 3 }] },
    ],
  },
  {
    name: 'Jaipur Hot Air Balloon Ride',
    about: 'Get a bird\'s-eye view of the Pink City\'s forts and palaces during a serene sunrise flight.',
    description: 'A breathtaking and unique way to experience the royal landscape of Jaipur.',
    price: 8500,
    location: 'Jaipur, Rajasthan',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661884752233-eac0b5efe655?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90JTIwYWlyJTIwYmFsbG9vbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    slots: [
      { date: new Date('2025-12-15'), times: [{ time: '06:30 AM', slotsAvailable: 5 }] },
      { date: new Date('2025-12-16'), times: [{ time: '06:30 AM', slotsAvailable: 3 }] },
    ],
  },
  {
    name: 'Meghalaya Cave Exploration',
    about: 'Explore some of the longest and most complex cave systems in India with an expert guide. Basic caving gear included.',
    description: 'An adventurous journey into the dark and mysterious limestone caves of Meghalaya.',
    price: 2200,
    location: 'Cherrapunji, Meghalaya',
    imageUrl: 'https://images.unsplash.com/photo-1636313002775-29c5a1d900aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764',
    slots: [
      { date: new Date('2026-02-05'), times: [{ time: '09:00 AM', slotsAvailable: 8 }] },
      { date: new Date('2026-02-06'), times: [{ time: '09:00 AM', slotsAvailable: 6 }] },
    ],
  },
  {
    name: 'Skiing in Gulmarg',
    about: 'Learn to ski on the pristine slopes of Gulmarg with a certified instructor. Includes ski pass and equipment rental.',
    description: 'Experience the world-class powder snow of the Himalayas in this premier ski resort.',
    price: 6500,
    location: 'Gulmarg, Jammu & Kashmir',
    imageUrl: 'https://images.unsplash.com/photo-1637558929744-024c00b06075?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3VsbWFyZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
    slots: [
      { date: new Date('2026-01-20'), times: [{ time: '10:00 AM', slotsAvailable: 7 }, { time: '01:00 PM', slotsAvailable: 5 }] },
      { date: new Date('2026-01-21'), times: [{ time: '10:00 AM', slotsAvailable: 4 }, { time: '01:00 PM', slotsAvailable: 2 }] },
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
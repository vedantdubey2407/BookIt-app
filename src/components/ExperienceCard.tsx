import Image from 'next/image';
import Link from 'next/link';

// Define the shape of the data the card expects
type ExperienceCardProps = {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ExperienceCard({ id, name, location, description, price, imageUrl }: ExperienceCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-md transition-transform duration-300 hover:scale-105">
      {/* Experience Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      
      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
            {location}
          </span>
        </div>
        <p className="mb-4 text-sm text-gray-600">{description}</p>
        
        {/* Price and Button */}
        <div className="mt-auto flex items-center justify-between">
          <p className="text-base font-semibold text-gray-800">
            From <span className="text-xl">₹{price}</span>
          </p>
          <Link
            href={`/experiences/${id}`}
            className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-yellow-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
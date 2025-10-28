import ExperienceCard from '../components/ExperienceCard';
import { IExperience } from '../models/Experience'; // Import the type definition

// Helper function to fetch experiences
async function getExperiences() {
  // Use the full URL for server-side fetching in development
  const res = await fetch('http://localhost:3000/api/experiences', {
    cache: 'no-store', // Ensures fresh data on every request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch experiences');
  }

  const data = await res.json();
  return data.data; // We want the 'data' array from our API response
}


export default async function Home() {
  const experiences: IExperience[] = await getExperiences();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">
          Explore Experiences
        </h1>
        
        {/* Responsive Grid for Experience Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp._id as string}
              id={exp._id as string}
              name={exp.name}
              location={exp.location}
              description={exp.description}
              price={exp.price}
              imageUrl={exp.imageUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
'use client'; // The home page is now interactive

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ExperienceCard from '@/components/ExperienceCard';
import { IExperience } from '@/models/Experience';

function HomePageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [allExperiences, setAllExperiences] = useState<IExperience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all experiences once when the component mounts
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch('/api/experiences');
        const data = await res.json();
        if (data.success) {
          setAllExperiences(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // 2. Filter experiences whenever the search query or the full list changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = allExperiences.filter(exp =>
        exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExperiences(filtered);
    } else {
      setFilteredExperiences(allExperiences); // If no query, show all
    }
  }, [searchQuery, allExperiences]);

  if (loading) {
    return <p className="text-center p-8">Loading experiences...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">
          {searchQuery ? `Results for "${searchQuery}"` : "Explore Experiences"}
        </h1>
        
        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredExperiences.map((exp) => (
              <ExperienceCard
                key={exp._id}
                id={exp._id}
                name={exp.name}
                location={exp.location}
                description={exp.description}
                price={exp.price}
                imageUrl={exp.imageUrl}
              />
            ))}
          </div>
        ) : (
          <p>No experiences found matching your search.</p>
        )}
      </div>
    </main>
  );
}

// The useSearchParams hook must be used within a Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
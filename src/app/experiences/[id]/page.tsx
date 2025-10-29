'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IExperience } from '@/models/Experience';

type Slot = {
  date: string | Date;
  times: {
    time: string;
    slotsAvailable: number;
  }[];
};

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [experience, setExperience] = useState<IExperience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const fetchExperience = async () => {
        try {
          const res = await fetch(`/api/experiences/${id}`);
          if (!res.ok) throw new Error('Experience not found');
          const data = await res.json();
          setExperience(data.data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchExperience();
    }
  }, [id]);

  if (loading) return <p className="text-center p-8 text-gray-600">Loading experience...</p>;
  if (error) return <p className="text-center text-red-500 p-8">Error: {error}</p>;
  if (!experience) return <p className="text-center p-8 text-gray-600">No experience found.</p>;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const availableTimes =
    experience.slots.find(
      (slot: Slot) => new Date(slot.date).toISOString().split('T')[0] === selectedDate
    )?.times || [];

  const subtotal = experience.price * quantity;
  const taxes = subtotal * 0.05;
  const total = subtotal + taxes;

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const params = new URLSearchParams({
        id: experience._id.toString(),
        name: experience.name,
        date: selectedDate,
        time: selectedTime,
        price: experience.price.toString(),
      });
      router.push(`/checkout?${params.toString()}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-semibold text-gray-600 hover:text-[#1c1c1c]"
        >
          ← Back to experiences
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Left Column */}
          <div className="md:col-span-2">
            <div className="relative h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={experience.imageUrl}
                alt={experience.name}
                fill
                className="object-cover"
              />
            </div>

            <h1 className="mt-4 text-3xl font-bold text-[#1c1c1c]">
              {experience.name}
            </h1>
            <p className="mt-2 text-[#444]">{experience.description}</p>

            {/* Date Selector */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#1c1c1c]">Choose date</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {experience.slots.map((slot: Slot) => (
                  <button
                    key={new Date(slot.date).toISOString()}
                    onClick={() => {
                      setSelectedDate(new Date(slot.date).toISOString().split('T')[0]);
                      setSelectedTime(null);
                    }}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      selectedDate === new Date(slot.date).toISOString().split('T')[0]
                        ? 'border-transparent bg-[#FFD600] text-[#1c1c1c]'
                        : 'border-gray-300 bg-white text-[#1c1c1c] hover:bg-gray-100'
                    }`}
                  >
                    {formatDate(new Date(slot.date).toISOString())}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selector */}
            {selectedDate && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-[#1c1c1c]">Choose time</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {availableTimes.map((timeSlot) => (
                    <button
                      key={timeSlot.time}
                      disabled={timeSlot.slotsAvailable === 0}
                      onClick={() => setSelectedTime(timeSlot.time)}
                      className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                        selectedTime === timeSlot.time
                          ? 'border-transparent bg-[#FFD600] text-[#1c1c1c]'
                          : 'border-gray-300 bg-white text-[#1c1c1c] hover:bg-gray-100'
                      } disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400`}
                    >
                      {timeSlot.time}
                      <span className="ml-2 text-xs">
                        ({timeSlot.slotsAvailable === 0
                          ? 'Sold out'
                          : `${timeSlot.slotsAvailable} left`})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* About Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#1c1c1c]">About</h2>
              <p className="mt-2 rounded-md bg-gray-100 p-4 text-sm text-[#444]">
                {experience.about}
              </p>
            </div>
          </div>

          {/* Right Column: Booking Summary */}
          <div className="md:col-span-1">
            <div className=" rounded-lg border bg-white p-6 shadow-md">
              <h2 className="text-2xl font-bold text-[#1c1c1c]">Booking Summary</h2>

              <div className="mt-6 space-y-4 border-t pt-4 text-[#444]">
                <div className="flex justify-between">
                  <span>Starts at</span>
                  <span>₹{experience.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Taxes (5%)</span>
                  <span>₹{taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-4 text-lg font-bold text-[#1c1c1c]">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedTime}
                className="mt-6 w-full rounded-md bg-[#FFD600] py-3 font-semibold text-[#1c1c1c] transition-colors hover:bg-[#ffcc00] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

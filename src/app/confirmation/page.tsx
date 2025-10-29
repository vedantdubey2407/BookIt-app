'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
      <p className="mt-2 text-gray-600">Your booking has been successfully processed.</p>
      {bookingId && <p className="mt-1 text-sm text-gray-500">Ref ID: {bookingId}</p>}
      <Link href="/" className="mt-8 rounded-md bg-gray-800 px-6 py-3 font-semibold text-white hover:bg-gray-700">
        Back to Home
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Suspense fallback={<div>Loading confirmation...</div>}>
        <ConfirmationContent />
      </Suspense>
    </main>
  );
}
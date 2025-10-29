'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const experienceId = searchParams.get('id') || '';
  const experienceName = searchParams.get('name') || 'Experience';
  const date = searchParams.get('date') || 'N/A';
  const time = searchParams.get('time') || 'N/A';
  const price = parseFloat(searchParams.get('price') || '0');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = price;
  const taxes = subtotal * 0.05;
  const total = subtotal + taxes - (subtotal * discount) / 100;

  const handleApplyPromo = async () => {
    setPromoMessage('');
    const res = await fetch('/api/promo/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ promoCode }),
    });
    const data = await res.json();
    if (data.success) {
      setDiscount(data.discount);
      setPromoMessage(`✅ ${data.discount}% discount applied!`);
    } else {
      setDiscount(0);
      setPromoMessage(`❌ ${data.message}`);
    }
  };

  const handlePayAndConfirm = async () => {
    if (!fullName || !email) {
      alert('Please fill in your full name and email address.');
      return;
    }
    setIsProcessing(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: fullName,
          userEmail: email,
          experienceId,
          date,
          time,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push(`/confirmation?bookingId=${data.data._id}`);
      } else {
        alert(`Booking failed: ${data.message}`);
      }
    } catch (error) {
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f8f8] p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/experiences/${experienceId}`}
          className="text-sm font-semibold text-[#1c1c1c] hover:text-[#FFD600]"
        >
          ← Checkout
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left Column */}
          <div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1 block text-sm font-medium text-[#1c1c1c]"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-[#1c1c1c] focus:border-[#FFD600] focus:outline-none"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-[#1c1c1c]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-[#1c1c1c] focus:border-[#FFD600] focus:outline-none"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="promo"
                  className="mb-1 block text-sm font-medium text-[#1c1c1c]"
                >
                  Promo code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-grow rounded-l-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-[#1c1c1c] focus:border-[#FFD600] focus:outline-none"
                    placeholder="SAVE10"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="rounded-r-md bg-[#1c1c1c] px-4 py-2 font-semibold text-white hover:bg-[#333]"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`mt-2 text-sm ${
                      discount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </div>

              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
                <input type="checkbox" className="h-4 w-4 accent-[#FFD600]" />
                <span>I agree to the terms and safety policy</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="rounded-lg border border-gray-200 bg-[#f9f9f9] p-6 shadow-sm">
            <h2 className="text-base font-semibold text-[#1c1c1c] mb-4">
              Experience
            </h2>
            <div className="space-y-2 text-sm text-[#1c1c1c]">
              <div className="flex justify-between">
                <span>Experience</span>
                <span>{experienceName}</span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span>{date}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>{time}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span>-₹{(subtotal * discount / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxes (5%)</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-300 pt-3 text-sm font-semibold text-[#1c1c1c]">
              <div className="flex justify-between">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePayAndConfirm}
              disabled={isProcessing}
              className="mt-6 w-full rounded-md bg-[#FFD600] py-3 font-semibold text-[#1c1c1c] hover:bg-[#ffcc00] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isProcessing ? 'Processing...' : 'Pay and Confirm'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-[#1c1c1c]">
          Loading Checkout...
        </div>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  );
}

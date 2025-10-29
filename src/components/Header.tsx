'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/?q=${searchTerm.trim()}`);
    } else {
      router.push('/');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSearch();
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="flex w-full items-center justify-between px-20 py-3">
        {/* ✅ Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/attachment.png" // your logo file in /public
            alt="Highway Delite Logo"
            width={100}   // ⬅️ Increased size (was 38)
            height={55}  // ⬅️ Increased size (was 38)
            className="object-contain"
          />
         
         
         
        </Link>

        {/* ✅ Search Bar Section */}
        <div className="flex w-full max-w-md items-center justify-end gap-2">
          <input
            type="text"
            placeholder="Search experiences"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-yellow-400 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-yellow-500"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}

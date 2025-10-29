'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    // ❌ Removed bg-[#1c1c1c]
    // ✅ Made background white, full width, no black edges
    <header className="w-full bg-white shadow-sm">
      <div className="flex w-full items-center justify-between px-8 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 125 125"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="62.5" cy="62.5" r="62.5" fill="black" />
            <path
              d="M42 84.5L57.5 59.5L42 34.5H55.5L71 59.5L55.5 84.5H42Z"
              fill="#FFC700"
            />
            <path
              d="M72 84.5L87.5 59.5L72 34.5H85.5L101 59.5L85.5 84.5H72Z"
              fill="#FFC700"
            />
          </svg>
          <span className="text-sm font-medium text-gray-800">
            highway
            <br />
            delite
          </span>
        </Link>

        {/* Search Bar */}
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

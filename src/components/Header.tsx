'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ✅ When navigating back to home page, clear the search bar
  useEffect(() => {
    if (pathname === '/') {
      const q = searchParams.get('q');
      // If URL has no "q" param, clear search term
      if (!q) setSearchTerm('');
    }
  }, [pathname, searchParams]);

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
        <Link href="/" className="flex items-center gap-3" onClick={() => setSearchTerm('')}>
          <Image
            src="/attachment.png"
            alt="Highway Delite Logo"
            width={100}
            height={55}
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

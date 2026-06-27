'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-black text-gray-200 mb-4">500</h1>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Something went wrong</h2>
            <p className="text-gray-500 mb-8">An unexpected error occurred. Please try again.</p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={reset}
                className="px-6 py-2.5 bg-navy text-white text-sm font-bold rounded-full hover:bg-blue-900 transition-colors"
              >
                Try again
              </button>
              <Link
                href="/"
                className="px-6 py-2.5 border border-gray-200 text-sm font-bold rounded-full text-gray-700 hover:border-gray-400 transition-colors"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

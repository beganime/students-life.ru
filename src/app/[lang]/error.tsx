'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function LangError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  useEffect(() => {
    console.error(error);
  }, [error]);

  const messages: Record<string, { title: string; desc: string; retry: string; home: string }> = {
    ru: { title: 'Что-то пошло не так', desc: 'Произошла непредвиденная ошибка. Попробуйте ещё раз.', retry: 'Повторить', home: 'На главную' },
    tk: { title: 'Bir zat nädogry boldy', desc: 'Garaşylmadyk ýalňyşlyk ýüze çykdy.', retry: 'Gaýtala', home: 'Baş sahypa' },
    oz: { title: 'Xato yuz berdi', desc: 'Kutilmagan xato yuz berdi. Qaytadan urinib ko\'ring.', retry: 'Qayta urinish', home: 'Bosh sahifa' },
    en: { title: 'Something went wrong', desc: 'An unexpected error occurred. Please try again.', retry: 'Try again', home: 'Go home' },
  };

  const t = messages[lang] || messages.en;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-gray-200 mb-4">500</h1>
        <h2 className="text-2xl font-black text-gray-900 mb-3">{t.title}</h2>
        <p className="text-gray-500 mb-8">{t.desc}</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-navy text-white text-sm font-bold rounded-full hover:bg-blue-900 transition-colors"
          >
            {t.retry}
          </button>
          <Link
            href={`/${lang}`}
            className="px-6 py-2.5 border border-gray-200 text-sm font-bold rounded-full text-gray-700 hover:border-gray-400 transition-colors"
          >
            {t.home}
          </Link>
        </div>
      </div>
    </main>
  );
}

'use client';

import Image, { StaticImageData } from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

import img01 from '@/assets/studs/IMG_0017.jpg';
import img02 from '@/assets/studs/IMG_0018_2.jpg';
import img03 from '@/assets/studs/IMG_0044.jpg';
import img04 from '@/assets/studs/IMG_0083.jpg';
import img05 from '@/assets/studs/IMG_4023.jpg';
import img06 from '@/assets/studs/IMG_7707.jpg';
import img07 from '@/assets/studs/IMG_8577.jpg';
import img08 from '@/assets/studs/IMG_8651.jpg';
import img09 from '@/assets/studs/IMG_8865.jpg';
import img10 from '@/assets/studs/IMG_8874.jpg';
import img11 from '@/assets/studs/IMG_9282.jpg';
import img12 from '@/assets/studs/IMG_6025.jpg';
import img13 from '@/assets/studs/IMG_6171.jpg';
import img14 from '@/assets/studs/IMG_6183.jpg';
import img15 from '@/assets/studs/IMG_6187.jpg';
import img16 from '@/assets/studs/IMG_6329.jpg';
import img17 from '@/assets/studs/IMG_6334.jpg';
import img18 from '@/assets/studs/IMG_6335.jpg';
import img19 from '@/assets/studs/IMG_6337.jpg';
import img20 from '@/assets/studs/IMG_7523.jpg';
import img21 from '@/assets/studs/A5E3A518-DDA1-4BA5-ACAE-5F7B3A70D1C4.jpg';

const images: StaticImageData[] = [
  img01, img02, img03, img04, img05, img06, img07,
  img08, img09, img10, img11, img12, img13, img14,
  img15, img16, img17, img18, img19, img20, img21,
];

interface StudsGalleryProps {
  title?: string;
}

const INITIAL_COUNT = 9;

export default function StudsGallery({ title = 'Student Gallery' }: StudsGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleImages = showAll ? images : images.slice(0, INITIAL_COUNT);

  const prev = useCallback(() => {
    setSelected(s => s !== null ? (s - 1 + images.length) % images.length : null);
  }, []);

  const next = useCallback(() => {
    setSelected(s => s !== null ? (s + 1) % images.length : null);
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [selected, prev, next]);

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <Images className="w-7 h-7 text-crimson flex-shrink-0" />
        <h2 className="text-2xl md:text-3xl font-black text-gray-900">{title}</h2>
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
        {visibleImages.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className="break-inside-avoid mb-3 overflow-hidden rounded-xl cursor-pointer group relative"
          >
            <Image
              src={img}
              alt={`Öğrenci fotoğrafı ${i + 1}`}
              placeholder="blur"
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" />
          </div>
        ))}
      </div>

      {/* Show more */}
      {!showAll && images.length > INITIAL_COUNT && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-crimson hover:text-crimson transition-colors"
          >
            Показать все фото ({images.length})
          </button>
        </div>
      )}

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={() => setSelected(null)}
        >
          {/* Close */}
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Kapat"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {selected + 1} / {images.length}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Önceki"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative"
            style={{ width: 'min(90vw, 900px)', height: 'min(85vh, 700px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selected]}
              alt={`Öğrenci fotoğrafı ${selected + 1}`}
              fill
              className="object-contain"
              sizes="min(90vw, 900px)"
              placeholder="blur"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Sonraki"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto px-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                className={`flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${
                  i === selected ? 'border-crimson scale-110' : 'border-white/20 opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={img}
                  alt=""
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

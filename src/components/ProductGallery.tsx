'use client';

import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import { cn } from '@/lib/cn';

export default function ProductGallery({
  images,
  productName,
  badges,
}: {
  images: string[];
  productName: string;
  badges?: ReactNode;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-gray-100 text-gray-300">
        <Camera size={64} strokeWidth={1.5} />
      </div>
    );
  }

  const go = (delta: number) => setActive((i) => (i + delta + images.length) % images.length);

  return (
    <div className="lg:sticky lg:top-28">
      <div className="group relative mb-4 aspect-square overflow-hidden rounded-3xl bg-gray-100">
        <SmartImage
          key={images[active]}
          src={images[active]}
          alt={`${productName}, фото ${active + 1}`}
          fill
          priority={active === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        {badges && <div className="absolute left-4 top-4 flex flex-col items-start gap-2">{badges}</div>}
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md transition-opacity hover:bg-white group-hover:opacity-100"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-md transition-opacity hover:bg-white group-hover:opacity-100"
              aria-label="Следующее фото"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={cn(
                'relative aspect-square overflow-hidden rounded-xl border-2 bg-gray-100 transition-all duration-200',
                active === i ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100',
              )}
              aria-label={`Показать фото ${i + 1}`}
            >
              <SmartImage src={img} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

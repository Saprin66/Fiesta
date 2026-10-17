'use client';

import Image, { type ImageProps } from 'next/image';
import { ImageOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { canOptimize } from '@/lib/format';

// next/image со skeleton-загрузкой и заглушкой при ошибке
export function SmartImage({ className, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed || !props.src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-300">
        <ImageOff size={40} strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <>
      {!loaded && <div className="skeleton absolute inset-0" />}
      <Image
        alt={alt}
        className={cn('transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0', className)}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        unoptimized={typeof props.src === 'string' && !canOptimize(props.src)}
        {...props}
      />
    </>
  );
}

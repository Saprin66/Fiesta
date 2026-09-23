'use client'; // Обязательно: этот компонент будет реагировать на клики

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discount?: number;
  isNew?: boolean;
}

export default function ProductGallery({ images, productName, discount, isNew }: ProductGalleryProps) {
  // Состояние: индекс текущей активной картинки (по умолчанию 0)
  const [activeIndex, setActiveIndex] = useState(0);

  // Защита от пустого массива картинок
  if (!images || images.length === 0) {
    return (
      <div className="relative h-96 md:h-[500px] w-full rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <span className="text-6xl text-gray-300">📷</span>
      </div>
    );
  }

  return (
    <div>
      {/* Главное изображение */}
      <div className="relative h-96 md:h-[500px] w-full rounded-2xl overflow-hidden bg-gray-100 mb-4 group">
        <Image 
          src={images[activeIndex]} 
          alt={`${productName} - фото ${activeIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300 group-hover:scale-105"
          priority={activeIndex === 0} // Загружаем сразу только первую картинку
        />
        
        {/* Бейджи (показываем только на главной картинке) */}
        {activeIndex === 0 && (
          <>
            {discount && discount > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
                -{discount}%
              </span>
            )}
            {isNew && (
              <span className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
                Новинка
              </span>
            )}
          </>
        )}
      </div>

      {/* Миниатюры */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-gray-100 ${
                activeIndex === index
                  ? 'border-amber-600 ring-2 ring-amber-600/20 scale-[1.02]'
                  : 'border-transparent hover:border-amber-300 hover:scale-[1.02]'
              }`}
              aria-label={`Показать фото ${index + 1}`}
            >
              <Image 
                src={img} 
                alt={`Миниатюра ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
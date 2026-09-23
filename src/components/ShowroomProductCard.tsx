'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { ShowroomProduct } from '../data/products';

interface ShowroomProductCardProps {
  product: ShowroomProduct;
}

export default function ShowroomProductCard({ product }: ShowroomProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const discount = Math.round((1 - product.showroomPrice / product.originalPrice) * 100);

  const conditionColors = {
    'Новое': 'bg-green-100 text-green-800',
    'Следы использования': 'bg-yellow-100 text-yellow-800',
    'Мелкие царапины': 'bg-orange-100 text-orange-800',
    'Без упаковки': 'bg-blue-100 text-blue-800',
  };

  return (
    <Link 
      href={`/showroom/${product.id}`}
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Изображение */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gray-50">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🛋️</span>
            </div>
            <h3 className="text-lg font-bold text-gray-700">{product.name}</h3>
          </div>
        )}

        <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
          -{discount}%
        </span>

        {product.isLast && (
          <span className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
            Последний!
          </span>
        )}

        {!imageError && (
          <span className="absolute bottom-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded">
            🏷️ Витринный экземпляр
          </span>
        )}
      </div>

      {/* Информация */}
      {!imageError && (
        <div className="p-5 flex flex-col flex-grow">
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="mb-4">
            <span className={`inline-block text-xs font-semibold px-2 py-1 rounded ${conditionColors[product.condition]}`}>
              Состояние: {product.condition}
            </span>
          </div>

          <p className="text-xs text-gray-500 mb-4 italic">
            💡 {product.discountReason}
          </p>

          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold text-red-600">
                {product.showroomPrice.toLocaleString('ru-RU')} ₽
              </span>
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <p className="text-xs text-green-600 font-semibold mb-3">
              Экономия {(product.originalPrice - product.showroomPrice).toLocaleString('ru-RU')} ₽
            </p>
            <button 
              onClick={(e) => e.preventDefault()}
              className="w-full px-4 py-2.5 bg-amber-600 text-white text-sm font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              Забронировать
            </button>
          </div>
        </div>
      )}
    </Link>
  );
}
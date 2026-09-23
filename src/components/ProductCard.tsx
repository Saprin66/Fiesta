'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link 
      href={`/catalog/${product.id}`}
      className="block group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Изображение или заглушка */}
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
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🛋️</span>
            </div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
        )}

        {/* Бейдж скидки */}
        {!imageError && product.oldPrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </span>
        )}

        {/* Бейдж "Новинка" */}
        {!imageError && product.isNew && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            Новинка
          </span>
        )}
      </div>

      {/* Информация */}
      {!imageError && (
        <div className="p-5">
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Цена и кнопка */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-xl font-bold text-gray-900">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
              {product.oldPrice && (
                <span className="block text-sm text-gray-400 line-through">
                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>
            <button className="px-4 py-2 bg-amber-600 text-white text-sm font-semibold rounded-lg hover:bg-amber-700 transition-colors">
              В корзину
            </button>
          </div>
        </div>
      )}
    </Link>
  );
}
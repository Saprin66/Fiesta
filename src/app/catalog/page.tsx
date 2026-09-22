'use client';

import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import CategoryFilter from '../../components/CategoryFilter';
import { products, categories } from '../../data/products';

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Фильтруем товары по выбранной категории
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Заголовок */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Каталог мебели
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Выберите идеальную мебель для вашего дома. Мы тщательно отобрали лучшие модели по соотношению цены и качества.
        </p>
      </div>

      {/* Фильтр категорий */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Сетка товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Если товаров нет */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">В этой категории пока нет товаров</p>
        </div>
      )}

      {/* Счетчик товаров */}
      <div className="mt-8 text-center text-gray-500">
        Показано {filteredProducts.length} из {products.length} товаров
      </div>
    </main>
  );
}
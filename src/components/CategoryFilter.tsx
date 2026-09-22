'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Категории</h3>
      <div className="flex flex-wrap gap-2">
        {/* Кнопка "Все товары" */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-amber-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Все товары
        </button>

        {/* Кнопки категорий */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-amber-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
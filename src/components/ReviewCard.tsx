import type { Review } from '../data/reviews';

interface ReviewCardProps {
  review: Review;
}

// Функция для получения инициалов из имени
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// Цвета для аватаров (зависят от имени)
const avatarColors = [
  'bg-amber-500',
  'bg-orange-500',
  'bg-rose-500',
  'bg-emerald-500',
  'bg-sky-500',
  'bg-violet-500',
  'bg-pink-500',
  'bg-teal-500',
];

export default function ReviewCard({ review }: ReviewCardProps) {
  // Выбираем цвет аватара на основе id
  const colorClass = avatarColors[review.id % avatarColors.length];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
      {/* Звёзды рейтинга */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= review.rating ? 'text-amber-400' : 'text-gray-200'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Текст отзыва */}
      <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
        «{review.text}»
      </p>

      {/* Что купил клиент */}
      {review.product && (
        <div className="mb-4 pb-4 border-b border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Купил(а):</p>
          <p className="text-sm font-semibold text-gray-900">
            {review.product}
          </p>
        </div>
      )}

      {/* Автор */}
      <div className="flex items-center gap-3 mt-auto">
        {/* Аватар с инициалами */}
        <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
          {getInitials(review.name)}
        </div>

        {/* Имя и город */}
        <div className="flex-grow min-w-0">
          <p className="font-semibold text-gray-900 truncate">
            {review.name}
          </p>
          <p className="text-sm text-gray-500">
            {review.city} • {review.date}
          </p>
        </div>

        {/* Галочка "Проверенный покупатель" */}
        <div className="flex-shrink-0" title="Проверенный покупатель">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}
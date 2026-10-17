import { BadgeCheck, Quote } from 'lucide-react';
import { Rating } from '@/components/ui/Rating';
import { formatDate } from '@/lib/format';
import type { Review } from '@/lib/types';

const avatarColors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-success', 'bg-sky-500', 'bg-violet-500'];

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function ReviewCard({ review }: { review: Review }) {
  const color = avatarColors[review.name.length % avatarColors.length];
  return (
    <article className="relative flex flex-col rounded-2xl bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <Quote size={36} className="absolute right-6 top-6 text-primary/10" />
      <Rating value={review.rating} className="mb-4" />
      <p className="mb-6 flex-1 leading-relaxed text-gray-700">{review.text}</p>
      {review.productName && (
        <p className="mb-4 border-b border-line pb-4 text-sm text-muted">
          Покупка: <span className="font-semibold text-ink">{review.productName}</span>
        </p>
      )}
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${color}`}>
          {initials(review.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate font-semibold">
            {review.name}
            <BadgeCheck size={16} className="shrink-0 text-success" aria-label="Проверенный покупатель" />
          </p>
          <p className="text-sm text-muted">
            {[review.city, formatDate(review.createdAt)].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>
    </article>
  );
}

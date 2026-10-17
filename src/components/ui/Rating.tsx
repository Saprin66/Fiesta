import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';

export function Rating({ value, size = 18, className }: { value: number; size?: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`Оценка ${value} из 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(value) ? 'fill-secondary text-secondary' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  );
}

import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';

export function Price({
  price,
  oldPrice,
  size = 'md',
  className,
}: {
  price: number;
  oldPrice?: number | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const main = { sm: 'text-lg', md: 'text-xl', lg: 'text-4xl' }[size];
  const old = { sm: 'text-sm', md: 'text-sm', lg: 'text-xl' }[size];
  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2', className)}>
      <span className={cn('font-extrabold text-ink', main)}>{formatPrice(price)}</span>
      {oldPrice && oldPrice > price && <span className={cn('text-gray-400 line-through', old)}>{formatPrice(oldPrice)}</span>}
    </div>
  );
}

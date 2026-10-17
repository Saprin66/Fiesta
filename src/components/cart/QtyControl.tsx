'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

export function QtyControl({
  value,
  onChange,
  max = 99,
  size = 'md',
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
  size?: 'sm' | 'md';
}) {
  const btn = cn(
    'flex items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent',
    size === 'sm' ? 'h-8 w-8' : 'h-10 w-10',
  );
  return (
    <div className="inline-flex items-center rounded-xl border-2 border-gray-200 p-0.5">
      <button className={btn} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Уменьшить количество">
        <Minus size={16} />
      </button>
      <span className={cn('min-w-8 text-center font-semibold tabular-nums', size === 'sm' ? 'text-sm' : '')}>{value}</span>
      <button className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Увеличить количество">
        <Plus size={16} />
      </button>
    </div>
  );
}

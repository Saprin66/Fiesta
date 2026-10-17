'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { inputClass } from '@/components/ui/Field';
import { cn } from '@/lib/cn';
import type { Category } from '@/lib/types';

const sorts = [
  { value: 'popular', label: 'Сначала популярные' },
  { value: 'new', label: 'Сначала новинки' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
];

export function CatalogFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [showMore, setShowMore] = useState(false);

  const current = params.get('category');

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
  };

  const hasFilters = ['q', 'min', 'max', 'stock'].some((k) => params.get(k));

  return (
    <div className={cn('space-y-5 transition-opacity', pending && 'opacity-60')}>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <Chip active={!current} onClick={() => update({ category: null })}>
          Все товары
        </Chip>
        {categories.map((c) => (
          <Chip key={c.id} active={current === c.slug} onClick={() => update({ category: c.slug })}>
            {c.name}
            <span className={cn('text-xs', current === c.slug ? 'text-white/80' : 'text-gray-400')}>{c.productCount}</span>
          </Chip>
        ))}
      </div>

      <form
        className="flex flex-col gap-3 lg:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          update({
            q: String(data.get('q') ?? '').trim() || null,
            min: String(data.get('min') ?? '') || null,
            max: String(data.get('max') ?? '') || null,
          });
        }}
      >
        <div className="relative flex-1">
          <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input name="q" defaultValue={params.get('q') ?? ''} placeholder="Поиск по каталогу" className={cn(inputClass, 'pl-12')} />
        </div>
        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-5 py-3 font-medium transition-colors hover:border-primary lg:hidden"
        >
          <SlidersHorizontal size={18} /> Фильтры
        </button>
        <div className={cn('flex-col gap-3 sm:flex-row lg:flex', showMore ? 'flex' : 'hidden')}>
          <input name="min" type="number" min={0} inputMode="numeric" defaultValue={params.get('min') ?? ''} placeholder="Цена от" className={cn(inputClass, 'lg:w-32')} />
          <input name="max" type="number" min={0} inputMode="numeric" defaultValue={params.get('max') ?? ''} placeholder="до" className={cn(inputClass, 'lg:w-32')} />
          <label className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border-2 border-gray-200 bg-white px-4 py-3">
            <input
              type="checkbox"
              checked={params.get('stock') === '1'}
              onChange={(e) => update({ stock: e.target.checked ? '1' : null })}
              className="h-4 w-4 accent-primary"
            />
            В наличии
          </label>
          <select
            value={params.get('sort') ?? 'popular'}
            onChange={(e) => update({ sort: e.target.value === 'popular' ? null : e.target.value })}
            className={cn(inputClass, 'cursor-pointer lg:w-56')}
            aria-label="Сортировка"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <button type="submit" className="rounded-xl bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-black">
            Найти
          </button>
        </div>
      </form>

      {hasFilters && (
        <button
          onClick={() => update({ q: null, min: null, max: null, stock: null })}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
        >
          <X size={16} /> Сбросить фильтры
        </button>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
        active ? 'bg-primary text-white shadow-sm shadow-primary/30' : 'bg-white text-gray-700 shadow-card hover:text-primary',
      )}
    >
      {children}
    </button>
  );
}

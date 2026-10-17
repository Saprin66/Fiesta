import Image from 'next/image';
import Link from 'next/link';
import { EyeOff, Plus, Search } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { inputClass } from '@/components/ui/Field';
import { imageUrl } from '@/lib/catalog';
import { prisma } from '@/lib/db';
import { canOptimize, formatPrice } from '@/lib/format';

export default async function AdminProducts({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const { q, category } = await searchParams;
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
        ...(category ? { categoryId: category } : {}),
      },
      include: { category: true, images: { orderBy: { sort: 'asc' }, take: 1 } },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.category.findMany({ orderBy: [{ sort: 'asc' }, { name: 'asc' }] }),
  ]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl">Товары</h1>
        <ButtonLink href="/admin/products/new">
          <Plus size={18} /> Добавить товар
        </ButtonLink>
      </div>
      <form className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input name="q" defaultValue={q} placeholder="Поиск по названию" className={`${inputClass} pl-11`} />
        </div>
        <select name="category" defaultValue={category ?? ''} className={`${inputClass} sm:w-64`}>
          <option value="">Все категории</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button className="rounded-xl bg-ink px-6 py-3 font-semibold text-white">Найти</button>
      </form>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        {products.length === 0 && <p className="p-6 text-muted">Товары не найдены</p>}
        {products.map((p) => {
          const src = p.images[0] ? imageUrl(p.images[0]) : null;
          return (
            <Link key={p.id} href={`/admin/products/${p.id}`} className="flex items-center gap-4 border-b border-line px-4 py-3 last:border-0 hover:bg-gray-50 sm:px-6">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                {src && <Image src={src} alt="" fill sizes="56px" className="object-cover" unoptimized={!canOptimize(src)} />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 truncate font-semibold">
                  {p.name}
                  {!p.published && <EyeOff size={16} className="shrink-0 text-gray-400" aria-label="Скрыт" />}
                </p>
                <p className="truncate text-sm text-muted">
                  {p.category.name}
                  {p.isShowroom && ' · шоу-рум'}
                  {!p.inStock && ' · под заказ'}
                </p>
              </div>
              <span className="hidden font-semibold sm:block">{formatPrice(p.price)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

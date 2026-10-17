import type { Metadata } from 'next';
import { PackageSearch } from 'lucide-react';
import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import { Breadcrumbs } from '@/components/ui/Section';
import { getCategories, getProducts } from '@/lib/catalog';
import { pluralize } from '@/lib/format';
import type { ProductFilter } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Каталог мебели',
  description: 'Диваны, кровати, кухни, шкафы-купе и другая мебель с доставкой и сборкой в Воронеже',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function num(v: string | string[] | undefined) {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export default async function CatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const str = (k: string) => (typeof sp[k] === 'string' ? (sp[k] as string) : undefined);
  const sort = str('sort');
  const filter: ProductFilter = {
    showroom: false,
    category: str('category'),
    query: str('q'),
    minPrice: num(sp.min),
    maxPrice: num(sp.max),
    inStock: str('stock') === '1',
    sort: ['popular', 'new', 'price-asc', 'price-desc'].includes(sort ?? '') ? (sort as ProductFilter['sort']) : 'popular',
  };

  const [categories, products] = await Promise.all([getCategories(), getProducts(filter)]);
  const visibleCategories = categories.filter((c) => c.productCount > 0);
  const active = categories.find((c) => c.slug === filter.category);

  return (
    <main className="container-page py-8 md:py-12">
      <Breadcrumbs items={[{ href: '/', label: 'Главная' }, { label: 'Каталог' }]} />
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h1 className="text-3xl md:text-h1">{active?.name ?? 'Каталог мебели'}</h1>
        <p className="text-muted">
          {products.length} {pluralize(products.length, ['товар', 'товара', 'товаров'])}
        </p>
      </div>

      <Suspense>
        <CatalogFilters categories={visibleCategories} />
      </Suspense>

      {products.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-3xl bg-white px-6 py-20 text-center shadow-card">
          <PackageSearch size={48} className="mb-4 text-gray-300" />
          <p className="mb-2 text-xl font-semibold">Ничего не нашлось</p>
          <p className="text-muted">Попробуйте изменить фильтры или выбрать другую категорию</p>
        </div>
      )}
    </main>
  );
}

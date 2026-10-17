import { ProductCardSkeleton } from '@/components/ProductCard';

export default function Loading() {
  return (
    <main className="container-page py-8 md:py-12">
      <div className="skeleton mb-6 h-4 w-40 rounded" />
      <div className="skeleton mb-10 h-12 w-72 rounded-xl" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}

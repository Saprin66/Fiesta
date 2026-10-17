import { prisma } from '@/lib/db';
import { CategoryEditor } from './CategoryEditor';

export default async function AdminCategories({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: [{ sort: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { products: true } } },
  });
  const editing = categories.find((c) => c.id === edit);

  return (
    <div>
      <h1 className="mb-8 text-3xl">Категории</h1>
      <div className="grid items-start gap-6 xl:grid-cols-3">
        <div className="overflow-hidden rounded-2xl bg-white shadow-card xl:col-span-2">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`/admin/categories?edit=${c.id}`}
              className={`flex items-center gap-4 border-b border-line px-6 py-4 last:border-0 hover:bg-gray-50 ${c.id === edit ? 'bg-primary-soft' : ''}`}
            >
              <span className="w-8 text-sm text-muted">{c.sort}</span>
              <span className="flex-1 font-semibold">{c.name}</span>
              <span className="text-sm text-muted">/{c.slug}</span>
              <span className="w-20 text-right text-sm text-muted">{c._count.products} шт.</span>
            </a>
          ))}
        </div>
        <CategoryEditor
          key={editing?.id ?? 'new'}
          category={editing ? { id: editing.id, name: editing.name, slug: editing.slug, image: editing.image ?? '', sort: editing.sort } : undefined}
        />
      </div>
    </div>
  );
}

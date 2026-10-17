import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import type { ProductSpec } from '@/lib/types';
import { ProductForm } from '../ProductForm';

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include: { images: { orderBy: { sort: 'asc' } } } }),
    prisma.category.findMany({ orderBy: [{ sort: 'asc' }, { name: 'asc' }] }),
  ]);
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-8 text-3xl">{product.name}</h1>
      <ProductForm
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        initial={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          categoryId: product.categoryId,
          price: product.price,
          oldPrice: product.oldPrice,
          description: product.description,
          fullDescription: product.fullDescription,
          specs: Array.isArray(product.specs) ? (product.specs as unknown as ProductSpec[]) : [],
          images: product.images.map((i) => ({ url: i.url, blobId: i.blobId })),
          inStock: product.inStock,
          isNew: product.isNew,
          isHit: product.isHit,
          isShowroom: product.isShowroom,
          isLast: product.isLast,
          published: product.published,
          condition: product.condition ?? '',
          discountReason: product.discountReason ?? '',
        }}
      />
    </div>
  );
}

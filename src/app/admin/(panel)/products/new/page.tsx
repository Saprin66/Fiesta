import { prisma } from '@/lib/db';
import { ProductForm } from '../ProductForm';

export default async function NewProduct() {
  const categories = await prisma.category.findMany({ orderBy: [{ sort: 'asc' }, { name: 'asc' }] });
  return (
    <div>
      <h1 className="mb-8 text-3xl">Новый товар</h1>
      <ProductForm categories={categories.map((c) => ({ id: c.id, name: c.name }))} />
    </div>
  );
}

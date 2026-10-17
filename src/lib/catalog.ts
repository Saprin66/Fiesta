import 'server-only';
import { prisma } from './db';
import type { Prisma } from '@/generated/prisma/client';
import type { Category, Product, ProductFilter, ProductSpec, Review } from './types';

const productInclude = {
  category: { select: { slug: true, name: true } },
  images: { orderBy: { sort: 'asc' }, select: { url: true, blobId: true } },
} satisfies Prisma.ProductInclude;

type ProductRow = Prisma.ProductGetPayload<{ include: typeof productInclude }>;

export function imageUrl(img: { url: string | null; blobId: string | null }): string | null {
  if (img.blobId) return `/api/images/${img.blobId}`;
  return img.url;
}

export function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price,
    oldPrice: row.oldPrice,
    images: row.images.map(imageUrl).filter((u): u is string => Boolean(u)),
    description: row.description,
    fullDescription: row.fullDescription,
    specs: Array.isArray(row.specs) ? (row.specs as unknown as ProductSpec[]) : [],
    inStock: row.inStock,
    isNew: row.isNew,
    isHit: row.isHit,
    isShowroom: row.isShowroom,
    condition: row.condition,
    discountReason: row.discountReason,
    isLast: row.isLast,
  };
}

const orderBy: Record<NonNullable<ProductFilter['sort']>, Prisma.ProductOrderByWithRelationInput[]> = {
  popular: [{ isHit: 'desc' }, { createdAt: 'desc' }],
  new: [{ isNew: 'desc' }, { createdAt: 'desc' }],
  'price-asc': [{ price: 'asc' }],
  'price-desc': [{ price: 'desc' }],
};

export async function getProducts(filter: ProductFilter = {}): Promise<Product[]> {
  const where: Prisma.ProductWhereInput = { published: true };
  if (filter.showroom !== undefined) where.isShowroom = filter.showroom;
  if (filter.category) where.category = { slug: filter.category };
  if (filter.inStock) where.inStock = true;
  if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
    where.price = { gte: filter.minPrice, lte: filter.maxPrice };
  }
  if (filter.query) {
    where.OR = [
      { name: { contains: filter.query, mode: 'insensitive' } },
      { description: { contains: filter.query, mode: 'insensitive' } },
    ];
  }
  const rows = await prisma.product.findMany({
    where,
    include: productInclude,
    orderBy: orderBy[filter.sort ?? 'popular'],
  });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findFirst({ where: { slug, published: true }, include: productInclude });
  return row ? toProduct(row) : null;
}

export async function getProductByLegacyId(legacyId: number): Promise<Product | null> {
  const row = await prisma.product.findFirst({ where: { legacyId, published: true }, include: productInclude });
  return row ? toProduct(row) : null;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { published: true, isShowroom: false, category: { slug: product.category.slug }, id: { not: product.id } },
    include: productInclude,
    take: limit,
  });
  return rows.map(toProduct);
}

export async function getCategories(): Promise<Category[]> {
  const rows = await prisma.category.findMany({
    orderBy: [{ sort: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { products: { where: { published: true, isShowroom: false } } } } },
  });
  return rows.map((c) => ({ id: c.id, slug: c.slug, name: c.name, image: c.image, productCount: c._count.products }));
}

export async function getReviews(limit?: number): Promise<Review[]> {
  const rows = await prisma.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    city: r.city,
    rating: r.rating,
    text: r.text,
    productName: r.productName,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function getReviewStats() {
  const agg = await prisma.review.aggregate({ where: { approved: true }, _avg: { rating: true }, _count: true });
  return { average: agg._avg.rating ?? 0, count: agg._count };
}

// Конвертация исходных данных магазина (бывшие src/data/*) в модель Prisma. Используется только seed-скриптом.
import { products as rawProducts, showroomProducts as rawShowroom } from './products';
import { reviews as rawReviews } from './reviews';
import { slugify } from '../../src/lib/slug';
import type { Category, Product, ProductSpec, Review } from '../../src/lib/types';

const specLabels: Record<string, string> = {
  width: 'Ширина',
  height: 'Высота',
  depth: 'Глубина',
  material: 'Материал',
  upholstery: 'Обивка',
  mechanism: 'Механизм',
  weight: 'Вес',
  country: 'Страна',
  warranty: 'Гарантия',
};

export const categoryImages: Record<string, string> = {
  'Диваны': '/images/categories/divan-scandi.webp',
  'Кровати': '/images/categories/krovati.webp',
  'Кухни': '/images/categories/kitchen.jpg',
  'Шкафы-купе': '/images/categories/kupe.jpg',
  'Прихожие': '/images/categories/prihoshie.jpg',
  'Гардероб': '/images/categories/garderob.jpg',
  'Детские и подростковые': '/images/categories/kids.webp',
  'Мебель для бизнеса': '/images/categories/business.webp',
};

const months: Record<string, number> = {
  'января': 0, 'февраля': 1, 'марта': 2, 'апреля': 3, 'мая': 4, 'июня': 5,
  'июля': 6, 'августа': 7, 'сентября': 8, 'октября': 9, 'ноября': 10, 'декабря': 11,
};

function parseRuDate(value: string): string {
  const [day, month, year] = value.split(' ');
  return new Date(Date.UTC(Number(year), months[month] ?? 0, Number(day))).toISOString();
}

function toSpecs(characteristics: Record<string, string | undefined>): ProductSpec[] {
  return Object.entries(characteristics)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([key, value]) => ({ label: specLabels[key] ?? key, value }));
}

export interface LegacyProduct extends Product {
  legacyId: number;
}

export function legacyProducts(): LegacyProduct[] {
  const catalog: LegacyProduct[] = rawProducts.map((p) => ({
    id: `p${p.id}`,
    legacyId: p.id,
    slug: slugify(p.name),
    name: p.name,
    category: { slug: slugify(p.category), name: p.category },
    price: p.price,
    oldPrice: p.oldPrice ?? null,
    images: p.images.length ? p.images : [p.image],
    description: p.description,
    fullDescription: p.fullDescription,
    specs: toSpecs(p.characteristics),
    inStock: p.inStock,
    isNew: Boolean(p.isNew),
    isHit: Boolean(p.isHit),
    isShowroom: false,
    condition: null,
    discountReason: null,
    isLast: false,
  }));

  const showroom: LegacyProduct[] = rawShowroom.map((p) => ({
    id: `s${p.id}`,
    legacyId: p.id,
    slug: `${slugify(p.name)}-vitrina`,
    name: p.name,
    category: { slug: slugify(p.category), name: p.category },
    price: p.showroomPrice,
    oldPrice: p.originalPrice,
    images: [p.image],
    description: p.description,
    fullDescription: p.description,
    specs: [],
    inStock: true,
    isNew: false,
    isHit: false,
    isShowroom: true,
    condition: p.condition,
    discountReason: p.discountReason,
    isLast: p.isLast,
  }));

  return [...catalog, ...showroom];
}

export function legacyCategories(): Category[] {
  const all = legacyProducts();
  const names = Array.from(new Set(all.map((p) => p.category.name)));
  return names.map((name) => ({
    id: slugify(name),
    slug: slugify(name),
    name,
    image: categoryImages[name] ?? null,
    productCount: all.filter((p) => p.category.name === name && !p.isShowroom).length,
  }));
}

export function legacyReviews(): Review[] {
  return rawReviews.map((r) => ({
    id: `r${r.id}`,
    name: r.name,
    city: r.city,
    rating: r.rating,
    text: r.text,
    productName: r.product ?? null,
    createdAt: parseRuDate(r.date),
  }));
}

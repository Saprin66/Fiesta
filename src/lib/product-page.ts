import 'server-only';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { cache } from 'react';
import { getProductByLegacyId, getProductBySlug } from './catalog';
import { formatPrice } from './format';

// Общая логика страниц товара: поиск по slug и редирект со старых числовых адресов (/catalog/1)
export const loadProduct = cache(async (slug: string, showroom: boolean) => {
  const section = showroom ? 'showroom' : 'catalog';
  if (/^\d+$/.test(slug)) {
    const legacy = await getProductByLegacyId(Number(slug));
    if (legacy) permanentRedirect(`/${legacy.isShowroom ? 'showroom' : 'catalog'}/${legacy.slug}`);
    notFound();
  }
  const product = await getProductBySlug(decodeURIComponent(slug));
  if (!product) notFound();
  if (product.isShowroom !== showroom) permanentRedirect(`/${product.isShowroom ? 'showroom' : 'catalog'}/${product.slug}`);
  return { product, section };
});

export async function productMetadata(slug: string, showroom: boolean): Promise<Metadata> {
  if (/^\d+$/.test(slug)) return {};
  const product = await getProductBySlug(decodeURIComponent(slug));
  if (!product) return { title: 'Товар не найден' };
  return {
    title: `${product.name} за ${formatPrice(product.price)}${showroom ? ', витринный образец' : ''}`,
    description: product.description,
    openGraph: { title: product.name, description: product.description, images: product.images.slice(0, 1) },
  };
}

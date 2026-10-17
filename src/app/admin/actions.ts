'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { login, logout, requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { slugify } from '@/lib/slug';
import { fieldErrors, type FieldErrors } from '@/lib/validation';
import type { OrderStatus } from '@/generated/prisma/client';

export type LoginState = { error: string; email: string } | null;

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const result = await login(email, password);
  if (result === 'locked') return { error: 'Слишком много попыток. Попробуйте через 15 минут.', email };
  if (result === 'invalid') return { error: 'Неверный email или пароль', email };
  redirect('/admin');
}

export async function logoutAction() {
  await logout();
  redirect('/admin/login');
}

// ---------- Товары ----------

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, 'Укажите название').max(200),
  slug: z.string().trim().max(200).optional(),
  categoryId: z.string().min(1, 'Выберите категорию'),
  price: z.coerce.number().int('Цена в рублях, целое число').min(0, 'Цена не может быть отрицательной'),
  oldPrice: z.preprocess((v) => (v === '' || v === null ? null : v), z.coerce.number().int().min(0).nullable()),
  description: z.string().trim().min(5, 'Добавьте краткое описание').max(500),
  fullDescription: z.string().trim().max(10000).default(''),
  specs: z.array(z.object({ label: z.string().trim().min(1), value: z.string().trim().min(1) })).max(40),
  images: z
    .array(z.object({ url: z.string().nullable(), blobId: z.string().nullable() }))
    .max(30)
    .refine((list) => list.every((i) => i.blobId || (i.url && /^(https?:\/\/|\/)/.test(i.url))), 'Неверная ссылка на фото'),
  inStock: z.boolean(),
  isNew: z.boolean(),
  isHit: z.boolean(),
  isShowroom: z.boolean(),
  isLast: z.boolean(),
  published: z.boolean(),
  condition: z.string().trim().max(100).transform((v) => v || null),
  discountReason: z.string().trim().max(200).transform((v) => v || null),
});

export type ProductInput = z.input<typeof productSchema>;

export async function saveProduct(input: ProductInput): Promise<{ ok: true; id: string } | { ok: false; errors: FieldErrors }> {
  await requireAdmin();
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };
  const { id, images, specs, slug: rawSlug, ...data } = parsed.data;

  if (data.oldPrice !== null && data.oldPrice <= data.price) data.oldPrice = null;

  const slug = slugify(rawSlug || data.name) || `tovar-${Date.now()}`;
  const clash = await prisma.product.findFirst({ where: { slug, NOT: id ? { id } : undefined }, select: { id: true } });
  if (clash) return { ok: false, errors: { slug: 'Такой адрес уже занят другим товаром' } };

  const imageRows = images.map((img, sort) => ({ url: img.blobId ? null : img.url, blobId: img.blobId, sort }));

  const saved = await prisma.$transaction(async (tx) => {
    if (id) {
      await tx.productImage.deleteMany({ where: { productId: id } });
      return tx.product.update({
        where: { id },
        data: { ...data, slug, specs, images: { create: imageRows } },
        select: { id: true },
      });
    }
    return tx.product.create({ data: { ...data, slug, specs, images: { create: imageRows } }, select: { id: true } });
  });

  return { ok: true, id: saved.id };
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id } });
  redirect('/admin/products');
}

// ---------- Категории ----------

export async function saveCategory(_prev: string | null, formData: FormData): Promise<string | null> {
  await requireAdmin();
  const id = String(formData.get('id') ?? '') || undefined;
  const name = String(formData.get('name') ?? '').trim();
  const image = String(formData.get('image') ?? '').trim() || null;
  const sort = Number(formData.get('sort') ?? 0) || 0;
  if (name.length < 2) return 'Укажите название категории';
  const slug = slugify(String(formData.get('slug') ?? '') || name);
  const clash = await prisma.category.findFirst({ where: { slug, NOT: id ? { id } : undefined } });
  if (clash) return 'Категория с таким адресом уже есть';
  if (id) await prisma.category.update({ where: { id }, data: { name, slug, image, sort } });
  else await prisma.category.create({ data: { name, slug, image, sort } });
  redirect('/admin/categories');
}

export async function deleteCategory(id: string): Promise<string | null> {
  await requireAdmin();
  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count > 0) return `В категории ${count} товар(ов). Сначала перенесите или удалите их.`;
  await prisma.category.delete({ where: { id } });
  redirect('/admin/categories');
}

// ---------- Заказы, заявки, отзывы ----------

const statuses: OrderStatus[] = ['NEW', 'CONFIRMED', 'DELIVERING', 'DONE', 'CANCELLED'];

export async function setOrderStatus(id: string, status: string) {
  await requireAdmin();
  if (!statuses.includes(status as OrderStatus)) return;
  await prisma.order.update({ where: { id }, data: { status: status as OrderStatus } });
}

export async function setLeadHandled(id: string, handled: boolean) {
  await requireAdmin();
  await prisma.lead.update({ where: { id }, data: { handled } });
}

export async function setReviewApproved(id: string, approved: boolean) {
  await requireAdmin();
  await prisma.review.update({ where: { id }, data: { approved } });
}

export async function deleteReview(id: string) {
  await requireAdmin();
  await prisma.review.delete({ where: { id } });
}

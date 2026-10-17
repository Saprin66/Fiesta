import { z } from 'zod';

export const phoneSchema = z
  .string()
  .trim()
  .refine((v) => {
    const digits = v.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 12;
  }, 'Введите номер телефона, например +7 900 123-45-67');

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v || null);

export const leadSchema = z.object({
  type: z.enum(['contact', 'measure', 'callback']).default('contact'),
  name: z.string().trim().min(2, 'Укажите имя').max(100),
  phone: phoneSchema,
  email: z.union([z.literal(''), z.string().trim().email('Проверьте email')]).transform((v) => v || null),
  message: optional(2000),
});

export const orderSchema = z.object({
  customerName: z.string().trim().min(2, 'Укажите имя').max(100),
  phone: phoneSchema,
  email: z.union([z.literal(''), z.string().trim().email('Проверьте email')]).transform((v) => v || null),
  delivery: z.enum(['delivery', 'pickup']),
  address: optional(300),
  comment: optional(1000),
  items: z
    .array(z.object({ productId: z.string().min(1), qty: z.number().int().min(1).max(99) }))
    .min(1, 'Корзина пуста')
    .max(50),
});

export type FieldErrors = Partial<Record<string, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    out[key] ??= issue.message;
  }
  return out;
}

export const reviewSchema = z.object({
  name: z.string().trim().min(2, 'Укажите имя').max(100),
  city: optional(100),
  rating: z.coerce.number().int().min(1, 'Поставьте оценку').max(5),
  text: z.string().trim().min(10, 'Напишите хотя бы пару предложений').max(2000),
  productName: optional(200),
});

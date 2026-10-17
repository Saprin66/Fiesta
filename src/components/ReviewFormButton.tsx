'use client';

import { CheckCircle2, Loader2, PenLine, Star } from 'lucide-react';
import { useState, useTransition } from 'react';
import { createReview } from '@/app/actions';
import { Button } from '@/components/ui/Button';
import { Field, Input, Textarea } from '@/components/ui/Field';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/cn';
import type { FieldErrors } from '@/lib/validation';

export function ReviewFormButton() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);
  const [pending, start] = useTransition();

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <PenLine size={18} /> Оставить отзыв
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title={sent ? 'Спасибо!' : 'Ваш отзыв'}>
        {sent ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 size={56} className="mb-4 text-success" />
            <p className="text-muted">Отзыв появится на сайте после проверки модератором.</p>
          </div>
        ) : (
          <form
            noValidate
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const data = Object.fromEntries(new FormData(e.currentTarget));
              start(async () => {
                const result = await createReview({ ...data, rating });
                if (result.ok) setSent(true);
                else setErrors(result.errors);
              });
            }}
          >
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">
                Оценка <span className="text-accent">*</span>
              </p>
              <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setRating(i)}
                    onMouseEnter={() => setHover(i)}
                    aria-label={`${i} из 5`}
                    className="transition-transform hover:scale-110"
                  >
                    <Star size={32} className={cn((hover || rating) >= i ? 'fill-secondary text-secondary' : 'fill-gray-200 text-gray-200')} />
                  </button>
                ))}
              </div>
              {errors.rating && <p className="mt-1.5 text-sm text-error">{errors.rating}</p>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Имя" htmlFor="rv-name" required error={errors.name}>
                <Input id="rv-name" name="name" />
              </Field>
              <Field label="Город" htmlFor="rv-city" error={errors.city}>
                <Input id="rv-city" name="city" />
              </Field>
            </div>
            <Field label="Что купили" htmlFor="rv-product" error={errors.productName}>
              <Input id="rv-product" name="productName" placeholder="Например, диван «Сканди»" />
            </Field>
            <Field label="Отзыв" htmlFor="rv-text" required error={errors.text}>
              <Textarea id="rv-text" name="text" rows={4} />
            </Field>
            <Button type="submit" size="lg" className="w-full" disabled={pending}>
              {pending && <Loader2 size={20} className="animate-spin" />}
              Отправить отзыв
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
}

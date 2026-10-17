'use client';

import { CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { createLead } from '@/app/actions';
import { Button } from '@/components/ui/Button';
import { Field, Input, Textarea } from '@/components/ui/Field';
import type { FieldErrors } from '@/lib/validation';

export function LeadForm({ type = 'contact', submitLabel = 'Отправить' }: { type?: 'contact' | 'measure' | 'callback'; submitLabel?: string }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();

  if (sent) {
    return (
      <div className="flex flex-col items-center py-10 text-center animate-scale-in">
        <CheckCircle2 size={56} className="mb-4 text-success" />
        <p className="mb-2 text-xl font-bold">Заявка отправлена</p>
        <p className="text-muted">Мы перезвоним вам в рабочее время</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        startTransition(async () => {
          const result = await createLead({ ...data, type });
          if (result.ok) setSent(true);
          else setErrors(result.errors);
        });
      }}
    >
      <Field label="Ваше имя" htmlFor="lead-name" required error={errors.name}>
        <Input id="lead-name" name="name" autoComplete="name" placeholder="Иван Иванов" />
      </Field>
      <Field label="Телефон" htmlFor="lead-phone" required error={errors.phone}>
        <Input id="lead-phone" name="phone" type="tel" autoComplete="tel" placeholder="+7 900 123-45-67" />
      </Field>
      <Field label="Email" htmlFor="lead-email" error={errors.email}>
        <Input id="lead-email" name="email" type="email" autoComplete="email" placeholder="example@mail.ru" />
      </Field>
      <Field label="Сообщение" htmlFor="lead-message" error={errors.message}>
        <Textarea id="lead-message" name="message" rows={4} placeholder="Расскажите, чем мы можем помочь" />
      </Field>
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending && <Loader2 size={20} className="animate-spin" />}
        {submitLabel}
      </Button>
      <p className="text-center text-xs text-muted">
        Нажимая кнопку, вы соглашаетесь с{' '}
        <a href="/privacy" className="text-primary hover:underline">
          политикой конфиденциальности
        </a>
      </p>
    </form>
  );
}

'use client';

import Link from 'next/link';
import { Loader2, Trash2 } from 'lucide-react';
import { useActionState, useState, useTransition } from 'react';
import { deleteCategory, saveCategory } from '../../actions';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Field';

interface Props {
  category?: { id: string; name: string; slug: string; image: string; sort: number };
}

export function CategoryEditor({ category }: Props) {
  const [error, action, pending] = useActionState(saveCategory, null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, startDelete] = useTransition();

  return (
    <form action={action} className="space-y-5 rounded-2xl bg-white p-6 shadow-card">
      <h2 className="text-lg">{category ? 'Редактирование' : 'Новая категория'}</h2>
      {category && <input type="hidden" name="id" value={category.id} />}
      <Field label="Название" htmlFor="cat-name" required>
        <Input id="cat-name" name="name" defaultValue={category?.name} />
      </Field>
      <Field label="Адрес" htmlFor="cat-slug" hint="Оставьте пустым, чтобы создать из названия">
        <Input id="cat-slug" name="slug" defaultValue={category?.slug} />
      </Field>
      <Field label="Картинка для главной" htmlFor="cat-image" hint="Путь к файлу в /public или ссылка">
        <Input id="cat-image" name="image" defaultValue={category?.image} placeholder="/images/categories/..." />
      </Field>
      <Field label="Порядок" htmlFor="cat-sort" hint="Меньше — выше в списке">
        <Input id="cat-sort" name="sort" type="number" defaultValue={category?.sort ?? 0} />
      </Field>
      {(error || deleteError) && <p className="rounded-xl bg-error/10 p-3 text-sm text-error">{error ?? deleteError}</p>}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending && <Loader2 size={18} className="animate-spin" />}
        {category ? 'Сохранить' : 'Создать категорию'}
      </Button>
      {category && (
        <div className="flex items-center justify-between">
          <Link href="/admin/categories" className="text-sm font-medium text-muted hover:text-ink">
            Новая категория
          </Link>
          <button
            type="button"
            disabled={deleting}
            onClick={() => {
              if (!confirm(`Удалить категорию «${category.name}»?`)) return;
              startDelete(async () => setDeleteError(await deleteCategory(category.id)));
            }}
            className="flex items-center gap-1 text-sm font-medium text-error hover:underline"
          >
            <Trash2 size={16} /> Удалить
          </button>
        </div>
      )}
    </form>
  );
}

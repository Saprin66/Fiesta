'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowUp, ExternalLink, ImagePlus, Link2, Loader2, Plus, Trash2, X } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { deleteProduct, saveProduct, type ProductInput } from '../../actions';
import { Button } from '@/components/ui/Button';
import { Field, Input, Select, Textarea } from '@/components/ui/Field';
import { canOptimize } from '@/lib/format';
import { slugify } from '@/lib/slug';
import type { FieldErrors } from '@/lib/validation';

type ImageItem = { url: string | null; blobId: string | null };

interface FormState {
  id?: string;
  name: string;
  slug: string;
  categoryId: string;
  price: number | string;
  oldPrice: number | string | null;
  description: string;
  fullDescription: string;
  specs: Array<{ label: string; value: string }>;
  images: ImageItem[];
  inStock: boolean;
  isNew: boolean;
  isHit: boolean;
  isShowroom: boolean;
  isLast: boolean;
  published: boolean;
  condition: string;
  discountReason: string;
}

const empty: FormState = {
  name: '',
  slug: '',
  categoryId: '',
  price: '',
  oldPrice: '',
  description: '',
  fullDescription: '',
  specs: [
    { label: 'Ширина', value: '' },
    { label: 'Высота', value: '' },
    { label: 'Глубина', value: '' },
    { label: 'Материал', value: '' },
    { label: 'Гарантия', value: '' },
  ],
  images: [],
  inStock: true,
  isNew: false,
  isHit: false,
  isShowroom: false,
  isLast: false,
  published: true,
  condition: '',
  discountReason: '',
};

const src = (img: ImageItem) => (img.blobId ? `/api/images/${img.blobId}` : img.url ?? '');

export function ProductForm({ categories, initial }: { categories: Array<{ id: string; name: string }>; initial?: FormState }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initial ?? { ...empty, categoryId: categories[0]?.id ?? '' });
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [urlDraft, setUrlDraft] = useState('');
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setSaved(false);
    setForm((f) => ({ ...f, [key]: value }));
  };

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    setUploadError(null);
    const body = new FormData();
    Array.from(files).forEach((f) => body.append('files', f));
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Не удалось загрузить');
      set('images', [...form.images, ...json.files.map((f: { id: string }) => ({ blobId: f.id, url: null }))]);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Не удалось загрузить');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= form.images.length) return;
    const next = [...form.images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    set('images', next);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const payload: ProductInput = {
        ...form,
        price: form.price as number,
        oldPrice: form.oldPrice === '' ? null : (form.oldPrice as number),
        specs: form.specs.filter((s) => s.label.trim() && s.value.trim()),
      };
      const result = await saveProduct(payload);
      if (!result.ok) {
        setErrors(result.errors);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setErrors({});
      setSaved(true);
      if (!form.id) router.replace(`/admin/products/${result.id}`);
      else router.refresh();
    });
  };

  const remove = () => {
    if (!form.id || !confirm(`Удалить «${form.name}»? Это действие нельзя отменить.`)) return;
    startTransition(() => deleteProduct(form.id!));
  };

  const card = 'rounded-2xl bg-white p-6 shadow-card';

  return (
    <form onSubmit={submit} noValidate className="grid items-start gap-6 xl:grid-cols-3">
      <div className="space-y-6 xl:col-span-2">
        {Object.keys(errors).length > 0 && (
          <p className="rounded-xl bg-error/10 p-4 text-sm text-error">Проверьте поля, отмеченные ниже: {Object.values(errors).join('; ')}</p>
        )}

        <section className={`${card} space-y-5`}>
          <Field label="Название" htmlFor="name" required error={errors.name}>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => {
                set('name', e.target.value);
                if (!slugTouched) setForm((f) => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }));
              }}
            />
          </Field>
          <Field label="Адрес страницы" htmlFor="slug" error={errors.slug} hint={`/${form.isShowroom ? 'showroom' : 'catalog'}/${form.slug || '...'}`}>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set('slug', e.target.value);
              }}
            />
          </Field>
          <Field label="Краткое описание" htmlFor="description" required error={errors.description} hint="Показывается в карточке каталога">
            <Textarea id="description" rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} />
          </Field>
          <Field label="Полное описание" htmlFor="fullDescription" error={errors.fullDescription}>
            <Textarea id="fullDescription" rows={6} value={form.fullDescription} onChange={(e) => set('fullDescription', e.target.value)} />
          </Field>
        </section>

        <section className={card}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg">Фотографии</h2>
            <span className="text-sm text-muted">Первое фото будет обложкой</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {form.images.map((img, i) => (
              <div key={`${src(img)}-${i}`} className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                <Image src={src(img)} alt="" fill sizes="200px" className="object-cover" unoptimized={!canOptimize(src(img))} />
                {i === 0 && <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-white">Обложка</span>}
                <div className="absolute inset-x-2 bottom-2 flex justify-between gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                  <div className="flex gap-1">
                    <IconBtn label="Левее" onClick={() => moveImage(i, i - 1)}>
                      <ArrowUp size={16} className="-rotate-90" />
                    </IconBtn>
                    <IconBtn label="Правее" onClick={() => moveImage(i, i + 1)}>
                      <ArrowDown size={16} className="-rotate-90" />
                    </IconBtn>
                  </div>
                  <IconBtn label="Удалить фото" onClick={() => set('images', form.images.filter((_, j) => j !== i))}>
                    <X size={16} />
                  </IconBtn>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
            >
              {uploading ? <Loader2 size={28} className="animate-spin" /> : <ImagePlus size={28} />}
              {uploading ? 'Загрузка...' : 'Загрузить'}
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
          {uploadError && <p className="mt-3 text-sm text-error">{uploadError}</p>}
          {errors.images && <p className="mt-3 text-sm text-error">{errors.images}</p>}
          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Link2 size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input value={urlDraft} onChange={(e) => setUrlDraft(e.target.value)} placeholder="Или вставьте ссылку на фото (https://...)" className="pl-11" />
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                if (!/^https?:\/\//.test(urlDraft.trim())) return;
                set('images', [...form.images, { url: urlDraft.trim(), blobId: null }]);
                setUrlDraft('');
              }}
            >
              Добавить
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted">
            Загруженные файлы сжимаются и хранятся в базе. Внешняя ссылка пропадёт, если фото удалят с исходного сайта.
          </p>
        </section>

        <section className={card}>
          <h2 className="mb-4 text-lg">Характеристики</h2>
          <div className="space-y-3">
            {form.specs.map((s, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={s.label}
                  placeholder="Название"
                  className="w-2/5"
                  onChange={(e) => set('specs', form.specs.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                />
                <Input
                  value={s.value}
                  placeholder="Значение"
                  onChange={(e) => set('specs', form.specs.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))}
                />
                <IconBtn label="Удалить характеристику" onClick={() => set('specs', form.specs.filter((_, j) => j !== i))} light>
                  <Trash2 size={18} />
                </IconBtn>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => set('specs', [...form.specs, { label: '', value: '' }])}
            className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary"
          >
            <Plus size={16} /> Добавить характеристику
          </button>
          <p className="mt-2 text-xs text-muted">Пустые строки не сохраняются.</p>
        </section>
      </div>

      <div className="space-y-6 xl:sticky xl:top-6">
        <section className={`${card} space-y-5`}>
          <Field label="Категория" htmlFor="categoryId" required error={errors.categoryId}>
            <Select id="categoryId" value={form.categoryId} onChange={(e) => set('categoryId', e.target.value)}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Цена, ₽" htmlFor="price" required error={errors.price}>
              <Input id="price" type="number" min={0} value={form.price} onChange={(e) => set('price', e.target.value)} />
            </Field>
            <Field label="Старая цена" htmlFor="oldPrice" error={errors.oldPrice}>
              <Input id="oldPrice" type="number" min={0} value={form.oldPrice ?? ''} onChange={(e) => set('oldPrice', e.target.value)} />
            </Field>
          </div>
          <div className="space-y-3">
            <Toggle label="Показывать на сайте" checked={form.published} onChange={(v) => set('published', v)} />
            <Toggle label="В наличии" checked={form.inStock} onChange={(v) => set('inStock', v)} />
            <Toggle label="Новинка" checked={form.isNew} onChange={(v) => set('isNew', v)} />
            <Toggle label="Хит продаж" checked={form.isHit} onChange={(v) => set('isHit', v)} />
            <Toggle label="Витринный образец (шоу-рум)" checked={form.isShowroom} onChange={(v) => set('isShowroom', v)} />
          </div>
          {form.isShowroom && (
            <div className="space-y-4 border-t border-line pt-5">
              <Field label="Состояние" htmlFor="condition">
                <Input id="condition" value={form.condition} onChange={(e) => set('condition', e.target.value)} placeholder="Новое, мелкие царапины..." />
              </Field>
              <Field label="Причина скидки" htmlFor="discountReason">
                <Input id="discountReason" value={form.discountReason} onChange={(e) => set('discountReason', e.target.value)} placeholder="Экспонат шоу-рума" />
              </Field>
              <Toggle label="Последний экземпляр" checked={form.isLast} onChange={(v) => set('isLast', v)} />
            </div>
          )}
        </section>

        <div className="flex flex-col gap-3">
          <Button type="submit" size="lg" disabled={pending || uploading}>
            {pending && <Loader2 size={20} className="animate-spin" />}
            {form.id ? 'Сохранить изменения' : 'Создать товар'}
          </Button>
          {saved && <p className="text-center text-sm font-medium text-success">Сохранено</p>}
          {form.id && (
            <>
              <a
                href={`/${form.isShowroom ? 'showroom' : 'catalog'}/${form.slug}`}
                target="_blank"
                className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-muted hover:text-primary"
              >
                Открыть на сайте <ExternalLink size={14} />
              </a>
              <button type="button" onClick={remove} disabled={pending} className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-error hover:underline">
                <Trash2 size={16} /> Удалить товар
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="relative h-6 w-11 shrink-0 rounded-full bg-gray-200 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-primary peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40" />
    </label>
  );
}

function IconBtn({ label, onClick, children, light }: { label: string; onClick: () => void; children: React.ReactNode; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={
        light
          ? 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 hover:text-error'
          : 'flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-ink shadow hover:bg-white'
      }
    >
      {children}
    </button>
  );
}

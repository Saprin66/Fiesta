import { SearchX } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="container-page flex flex-col items-center py-24 text-center animate-fade-in">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary-soft text-primary">
        <SearchX size={44} />
      </div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">Ошибка 404</p>
      <h1 className="mb-4 text-4xl md:text-h1">Страница не найдена</h1>
      <p className="mb-10 max-w-md text-lg text-muted">
        Возможно, товар уже продан или ссылка устарела. Загляните в каталог, там много интересного.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/catalog">Перейти в каталог</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          На главную
        </ButtonLink>
      </div>
    </main>
  );
}

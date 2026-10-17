import type { Metadata } from 'next';
import { CheckCircle2, ChevronDown, Eye, PackageSearch, Tag, Truck, Wallet } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { Breadcrumbs, SectionHeading } from '@/components/ui/Section';
import { getProducts } from '@/lib/catalog';
import { pluralize } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Шоу-рум: витринные образцы со скидкой',
  description: 'Мебель из шоу-рума со скидкой до 50%: экспонаты, модели без упаковки и снятые с производства',
};

const benefits = [
  { icon: Wallet, title: 'Скидки до 50%', text: 'Качественная мебель заметно дешевле новой' },
  { icon: CheckCircle2, title: 'Гарантия', text: 'Гарантия производителя, как на новый товар' },
  { icon: Eye, title: 'Честное состояние', text: 'Подробно описываем все нюансы каждого образца' },
  { icon: Truck, title: 'Быстрая доставка', text: 'Всё в наличии, привезём за 1–3 дня' },
];

const steps = [
  { title: 'Выберите товар', text: 'Изучите описание, состояние и причину скидки.' },
  { title: 'Забронируйте', text: 'Добавьте в корзину и оформите заявку или позвоните нам. Бронь действует 3 дня.' },
  { title: 'Получите заказ', text: 'Оплатите удобным способом, доставим и соберём в удобное время.' },
];

const faq = [
  { q: 'Даётся ли гарантия на витринные образцы?', a: 'Да, на все витринные образцы действует гарантия производителя от 1 до 3 лет в зависимости от категории.' },
  { q: 'Можно ли посмотреть товар перед покупкой?', a: 'Конечно. Приезжайте в шоу-рум, покажем все нюансы состояния.' },
  { q: 'Как долго действует бронь?', a: 'Бронь действует 3 дня. За это время можно оплатить товар или продлить бронь через менеджера.' },
  { q: 'Можно ли вернуть товар?', a: 'Да, в течение 14 дней, если товар не использовался и сохранил товарный вид.' },
];

export default async function ShowroomPage() {
  const products = await getProducts({ showroom: true });

  return (
    <main className="container-page py-8 md:py-12">
      <Breadcrumbs items={[{ href: '/', label: 'Главная' }, { label: 'Шоу-рум' }]} />

      <section className="relative mb-16 overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-white md:px-12 md:py-20">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl animate-fade-in">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Tag size={30} />
          </div>
          <h1 className="mb-4 text-4xl text-white md:text-h1">Витринные образцы</h1>
          <p className="text-lg text-white/80 md:text-xl">
            Мебель со скидкой до 50%: экспонаты шоу-рума, товары без упаковки и модели, снятые с производства. Количество ограничено.
          </p>
        </div>
      </section>

      <section className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl bg-white p-6 shadow-card">
            <Icon size={28} className="mb-4 text-primary" />
            <h3 className="mb-1 text-lg font-bold">{title}</h3>
            <p className="text-sm text-muted">{text}</p>
          </div>
        ))}
      </section>

      <section className="mb-20">
        <SectionHeading
          title="Актуальные предложения"
          description={`${products.length} ${pluralize(products.length, ['образец', 'образца', 'образцов'])} в наличии`}
        />
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-3xl bg-white px-6 py-20 text-center shadow-card">
            <PackageSearch size={48} className="mb-4 text-gray-300" />
            <p className="mb-2 text-xl font-semibold">Сейчас витринных образцов нет</p>
            <p className="text-muted">Загляните позже, новые предложения появляются регулярно</p>
          </div>
        )}
      </section>

      <section className="mb-20">
        <SectionHeading align="center" title="Как купить витринный образец" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-3xl bg-white p-8 shadow-card">
              <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
              <p className="text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-20 max-w-3xl">
        <SectionHeading align="center" title="Частые вопросы" />
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-2xl bg-white shadow-card [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-lg font-semibold">
                {f.q}
                <ChevronDown size={20} className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-br from-primary to-secondary px-6 py-14 text-center text-white md:px-12">
        <h2 className="mb-4 text-3xl text-white md:text-h2">Не нашли подходящий вариант?</h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-white/90">Посмотрите новые модели в каталоге или спросите менеджера о ближайших поступлениях.</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/catalog" variant="white" size="lg" className="text-primary">
            Открыть каталог
          </ButtonLink>
          <ButtonLink href="/contacts" size="lg" variant="ghost" className="text-white ring-2 ring-white/40 hover:bg-white/10">
            Связаться с менеджером
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}

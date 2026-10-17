import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Home,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import { ReviewFormButton } from '@/components/ReviewFormButton';
import { ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/Section';
import { getCategories, getProducts, getReviews, getReviewStats } from '@/lib/catalog';
import { pluralize } from '@/lib/format';

const advantages = [
  { icon: ShieldCheck, title: 'Гарантия качества', text: 'Работаем только с проверенными фабриками. Каждый товар проверяем перед отправкой.', value: 'до 5 лет', note: 'гарантия на мебель' },
  { icon: Truck, title: 'Быстрая доставка', text: 'Доставляем по Воронежу за 1–3 дня, по России от 5 дней. Бесплатно при заказе от 50 000 ₽.', value: '1–3 дня', note: 'доставка по городу' },
  { icon: Wrench, title: 'Сборка в подарок', text: 'Профессиональная сборка входит в стоимость. Мастера работают аккуратно и убирают за собой.', value: '0 ₽', note: 'стоимость сборки' },
  { icon: CreditCard, title: 'Рассрочка 0%', text: 'Покупайте сейчас, платите постепенно. Рассрочка без переплат до 24 месяцев.', value: '0%', note: 'переплата' },
  { icon: Home, title: 'Шоу-рум', text: 'Приезжайте посидеть на диванах и потрогать ткани вживую в ТВЦ «Ярмарка».', value: '10+', note: 'лет на рынке' },
  { icon: Star, title: 'Нас рекомендуют', text: 'Клиенты возвращаются к нам снова и советуют друзьям. Средняя оценка 4.9 на Яндекс Картах.', value: '4.9', note: 'из 5 на Яндекс Картах' },
];

export default async function HomePage() {
  const [hits, categories, reviews, stats] = await Promise.all([
    getProducts({ showroom: false, sort: 'popular' }),
    getCategories(),
    getReviews(6),
    getReviewStats(),
  ]);
  const featured = hits.slice(0, 8);
  const visibleCategories = categories.filter((c) => c.image && c.productCount > 0).slice(0, 9);
  // Крупная первая плитка только когда сетка из 4 колонок заполняется без пустых мест
  const bigFirst = visibleCategories.length === 5 || visibleCategories.length === 9;

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
          alt="Светлая гостиная с диваном"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="container-page relative flex min-h-[560px] flex-col justify-center py-20 md:min-h-[680px]">
          <div className="max-w-2xl animate-fade-in">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              Сборка в подарок и рассрочка 0%
            </p>
            <h1 className="mb-6 text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">
              Мебель, в которой хочется <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">жить</span>
            </h1>
            <p className="mb-10 max-w-xl text-lg text-white/80 md:text-xl">
              Диваны, кровати, кухни и шкафы от проверенных фабрик с доставкой и сборкой. Приезжайте в шоу-рум или выбирайте онлайн.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/catalog" size="lg">
                Перейти в каталог <ArrowRight size={20} />
              </ButtonLink>
              <ButtonLink href="/contacts" size="lg" variant="white" className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                Получить консультацию
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Категории */}
      {visibleCategories.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-page">
            <SectionHeading
              eyebrow="Каталог"
              title="Популярные категории"
              description="Мебель для любой комнаты, от гостиной до офиса"
              action={
                <Link href="/catalog" className="group flex items-center gap-1 font-semibold text-primary">
                  Весь каталог <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              }
            />
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
              {visibleCategories.map((c, i) => (
                <Link
                  key={c.id}
                  href={`/catalog?category=${c.slug}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gray-100 ${bigFirst && i === 0 ? 'col-span-2 aspect-[2/1] lg:row-span-2 lg:aspect-auto' : 'aspect-[4/3]'}`}
                >
                  <Image
                    src={c.image!}
                    alt={c.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 md:p-6">
                    <div>
                      <h3 className="text-lg font-bold text-white md:text-2xl">{c.name}</h3>
                      <p className="text-sm text-white/80">
                        {c.productCount} {pluralize(c.productCount, ['модель', 'модели', 'моделей'])}
                      </p>
                    </div>
                    <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-300 group-hover:opacity-100 sm:flex">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Хиты */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Выбор покупателей"
            title="Хиты продаж"
            description="Модели, которые выбирают чаще всего"
            action={
              <Link href="/catalog" className="group flex items-center gap-1 font-semibold text-primary">
                Смотреть все <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Наши преимущества"
            title={
              <>
                Почему выбирают <span className="text-primary">Fiesta Store</span>
              </>
            }
            description="Более 10 лет помогаем создавать уютные дома"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map(({ icon: Icon, title, text, value, note }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon size={28} />
                </div>
                <h3 className="mb-3 text-xl font-bold">{title}</h3>
                <p className="mb-6 leading-relaxed text-muted">{text}</p>
                <div className="flex items-baseline gap-2 border-t border-line pt-5">
                  <span className="text-3xl font-extrabold text-primary">{value}</span>
                  <span className="text-sm text-muted">{note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      {reviews.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="container-page">
            <SectionHeading
              align="center"
              eyebrow={`Средняя оценка ${stats.average.toFixed(1)} из 5`}
              title="Что говорят наши клиенты"
              description="Реальные отзывы покупателей Fiesta Store"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <ReviewFormButton />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary px-6 py-14 text-center text-white md:px-16 md:py-20">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="mb-4 text-3xl text-white md:text-h2">Не можете определиться?</h2>
              <p className="mb-8 text-lg text-white/90">
                Поможем бесплатно подобрать мебель под ваш интерьер и бюджет, приедем на замер.
              </p>
              <ButtonLink href="/contacts" size="lg" variant="white" className="text-primary">
                Получить консультацию
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

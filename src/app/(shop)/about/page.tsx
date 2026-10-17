import type { Metadata } from 'next';
import Image from 'next/image';
import { Handshake, Leaf, Sparkles } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Breadcrumbs, SectionHeading } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'О компании',
  description: 'Fiesta Store: мебельный магазин в Воронеже с 2015 года',
};

const values = [
  { icon: Sparkles, title: 'Качество', text: 'Тщательно отбираем поставщиков и проверяем каждую единицу мебели перед отправкой.' },
  { icon: Leaf, title: 'Экологичность', text: 'Используем безопасные материалы и работаем с фабриками, которые заботятся о природе.' },
  { icon: Handshake, title: 'Сервис', text: 'Помогаем с выбором, привозим в срок и всегда на связи после покупки.' },
];

const stats = [
  { value: '10+', label: 'лет на рынке' },
  { value: '10 000+', label: 'довольных клиентов' },
  { value: '500+', label: 'моделей мебели' },
  { value: '50+', label: 'городов доставки' },
];

export default function AboutPage() {
  return (
    <main className="container-page py-8 md:py-12">
      <Breadcrumbs items={[{ href: '/', label: 'Главная' }, { label: 'О нас' }]} />
      <section className="mb-16 max-w-3xl animate-fade-in">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">О компании</p>
        <h1 className="mb-6 text-4xl md:text-h1">Больше, чем мебельный магазин</h1>
        <p className="text-lg text-muted md:text-xl">Мы создаём пространство, в котором рождается уют вашего дома.</p>
      </section>

      <section className="mb-20 grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="space-y-5 text-lg leading-relaxed text-gray-700">
          <h2 className="text-3xl md:text-h2">Наша история</h2>
          <p>
            Fiesta Store начался с простой идеи: каждый человек заслуживает жить в красивом и комфортном пространстве. В 2015 году мы
            открыли первый шоу-рум и с тех пор помогли обставить дома более чем 10 000 семьям.
          </p>
          <p>
            Мы работаем напрямую с фабриками из России, Италии и Скандинавии, поэтому предлагаем уникальные модели по честным ценам.
          </p>
          <p>
            Наша команда — дизайнеры интерьера, технологи и просто люди, которые любят красивую мебель и знают о каждой модели всё.
          </p>
        </div>
        <div className="relative mx-auto h-[400px] w-[260px] overflow-hidden rounded-3xl bg-gray-100 shadow-card-hover">
          <Image src="/yandexMesto.png" alt="Fiesta Store — хорошее место по версии Яндекса" fill sizes="260px" className="object-cover" />
        </div>
      </section>

      <section className="mb-20">
        <SectionHeading align="center" title="Наши ценности" />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl bg-white p-8 shadow-card">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Icon size={28} />
              </div>
              <h3 className="mb-3 text-xl font-bold">{title}</h3>
              <p className="text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20 rounded-3xl bg-ink px-6 py-14 md:px-12">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
                {s.value}
              </p>
              <p className="text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="mb-4 text-3xl md:text-h2">Готовы создать уют?</h2>
        <p className="mb-8 text-lg text-muted">Приезжайте в шоу-рум или закажите бесплатную консультацию</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/catalog" size="lg">
            Смотреть каталог
          </ButtonLink>
          <ButtonLink href="/contacts" size="lg" variant="secondary">
            Связаться с нами
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}

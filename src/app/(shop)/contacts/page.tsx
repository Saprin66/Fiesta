import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2, Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { LeadForm } from '@/components/LeadForm';
import { Breadcrumbs } from '@/components/ui/Section';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Контакты',
  description: `Fiesta Store: ${site.address}, ${site.addressNote}. Телефон ${site.phones[0].label}`,
};

const socials = [
  { href: site.social.vk, label: 'ВКонтакте', icon: '/images/social/vk-icon-circle.png' },
  { href: site.social.whatsapp, label: 'WhatsApp', icon: '/images/social/whatsApp-icon.png' },
  { href: site.social.max, label: 'MAX', icon: '/images/social/MAX-48x48.png' },
];

export default function ContactsPage() {
  const cards = [
    {
      icon: Phone,
      title: 'Телефон',
      body: site.phones.map((p) => (
        <a key={p.href} href={p.href} className="block font-semibold text-ink transition-colors hover:text-primary">
          {p.label}
        </a>
      )),
      note: 'Ежедневно, кроме понедельника',
    },
    {
      icon: Mail,
      title: 'Email',
      body: (
        <a href={`mailto:${site.email}`} className="font-semibold text-ink transition-colors hover:text-primary">
          {site.email}
        </a>
      ),
      note: 'Ответим в течение рабочего дня',
    },
    { icon: MapPin, title: 'Адрес', body: <p className="font-semibold">{site.address}</p>, note: site.addressNote },
    { icon: Clock, title: 'Режим работы', body: <p className="font-semibold">{site.hours}</p>, note: site.hoursNote },
  ];

  return (
    <main className="container-page py-8 md:py-12">
      <Breadcrumbs items={[{ href: '/', label: 'Главная' }, { label: 'Контакты' }]} />
      <section className="mb-12 max-w-3xl">
        <h1 className="mb-4 text-4xl md:text-h1">Контакты</h1>
        <p className="text-lg text-muted md:text-xl">Приезжайте в шоу-рум или свяжитесь с нами любым удобным способом.</p>
      </section>

      <section className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, title, body, note }) => (
          <div key={title} className="rounded-2xl bg-white p-6 shadow-card">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Icon size={24} />
            </div>
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-muted">{title}</h3>
            <div className="space-y-1">{body}</div>
            <p className="mt-2 text-sm text-muted">{note}</p>
          </div>
        ))}
      </section>

      <section className="mb-16">
        <a
          href={site.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block h-80 overflow-hidden rounded-3xl bg-gray-100 shadow-card md:h-[440px]"
          title="Открыть в Яндекс Картах"
        >
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aded4096b57ca202420c4d3eec0e3ba27e9a434aaad97a2340cb0a2b8eda65f05&source=constructor"
            className="pointer-events-none h-full w-full border-0"
            title="Fiesta Store на карте"
            loading="lazy"
          />
          <span className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
            Построить маршрут <ExternalLink size={16} />
          </span>
        </a>
      </section>

      <section className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="mb-4 text-3xl md:text-h2">Напишите нам</h2>
          <p className="mb-8 text-lg text-muted">
            Есть вопросы о мебели или доставке? Оставьте заявку, и мы перезвоним.
          </p>
          <ul className="mb-10 space-y-4">
            {['Бесплатная консультация по подбору мебели', 'Расчёт стоимости мебели на заказ', 'Бесплатный выезд замерщика'].map((t) => (
              <li key={t} className="flex items-center gap-3 text-gray-700">
                <CheckCircle2 size={22} className="shrink-0 text-success" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mb-4 font-semibold">Мы в соцсетях и мессенджерах</p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-medium shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <Image src={s.icon} alt="" width={22} height={22} />
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
          <LeadForm submitLabel="Отправить заявку" />
        </div>
      </section>
    </main>
  );
}

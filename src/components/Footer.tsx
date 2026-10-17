import Image from 'next/image';
import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/lib/site';

const socials = [
  { href: site.social.vk, label: 'ВКонтакте', icon: '/images/social/vk-icon-circle.png' },
  { href: site.social.whatsapp, label: 'WhatsApp', icon: '/images/social/whatsApp-icon.png' },
  { href: site.social.max, label: 'MAX', icon: '/images/social/MAX-48x48.png' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-gray-400">
      <div className="container-page py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="text-2xl font-extrabold text-white">
              Fiesta<span className="text-primary">Store</span>
            </p>
            <p className="text-sm leading-relaxed">
              Создаём уют в вашем доме с 2015 года. Мебель от проверенных производителей с доставкой и сборкой.
            </p>
            <div className="flex gap-3 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  <Image src={s.icon} alt="" width={26} height={26} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Покупателям</h4>
            <ul className="space-y-3 text-sm">
              {[{ href: '/', label: 'Главная' }, ...site.nav, { href: '/cart', label: 'Корзина' }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  {site.address}
                  <br />
                  {site.addressNote}
                </span>
              </li>
              {site.phones.map((p) => (
                <li key={p.href} className="flex gap-3">
                  <Phone size={18} className="shrink-0 text-primary" />
                  <a href={p.href} className="transition-colors hover:text-white">
                    {p.label}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail size={18} className="shrink-0 text-primary" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">Режим работы</h4>
            <div className="flex gap-3 text-sm">
              <Clock size={18} className="shrink-0 text-primary" />
              <span>
                {site.hours}
                <br />
                {site.hoursNote}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm md:flex-row">
          <p>© {new Date().getFullYear()} Fiesta Store. Все права защищены.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

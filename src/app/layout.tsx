import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

// Данные каталога читаются из базы на каждый запрос, чтобы правки из админки появлялись сразу
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Fiesta Store — мебельный магазин в Воронеже', template: '%s | Fiesta Store' },
  description: site.description,
  openGraph: { siteName: site.name, locale: 'ru_RU', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#FF6B35' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

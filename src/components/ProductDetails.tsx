import { CheckCircle2, CreditCard, Info, Lightbulb, Phone, ShieldCheck, Tag, Truck, Wrench } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { Breadcrumbs } from '@/components/ui/Section';
import { discountPercent, formatPrice } from '@/lib/format';
import { site } from '@/lib/site';
import type { Product } from '@/lib/types';

export default function ProductDetails({ product, related }: { product: Product; related: Product[] }) {
  const discount = discountPercent(product.price, product.oldPrice);
  const warranty = product.specs.find((s) => s.label === 'Гарантия')?.value;
  const base = product.isShowroom
    ? { href: '/showroom', label: 'Шоу-рум' }
    : { href: '/catalog', label: 'Каталог' };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    category: product.category.name,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
    },
  };

  return (
    <main className="container-page py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs
        items={[
          { href: '/', label: 'Главная' },
          base,
          ...(product.isShowroom ? [] : [{ href: `/catalog?category=${product.category.slug}`, label: product.category.name }]),
          { label: product.name },
        ]}
      />

      <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <ProductGallery
          images={product.images}
          productName={product.name}
          badges={
            <>
              {discount > 0 && <Badge tone="accent" className="px-3 py-1.5 text-sm">−{discount}%</Badge>}
              {product.isNew && <Badge tone="success" className="px-3 py-1.5 text-sm">Новинка</Badge>}
              {product.isShowroom && (
                <Badge tone="dark" className="px-3 py-1.5 text-sm">
                  <Tag size={14} /> Витринный образец
                </Badge>
              )}
            </>
          }
        />

        <div className="animate-fade-in">
          <p className="mb-2 text-sm font-semibold text-primary">{product.category.name}</p>
          <h1 className="mb-6 text-3xl md:text-4xl">{product.name}</h1>

          <div className="mb-6 rounded-2xl bg-white p-6 shadow-card">
            <Price price={product.price} oldPrice={product.oldPrice} size="lg" />
            {product.oldPrice && product.oldPrice > product.price && (
              <p className="mt-2 font-semibold text-success">Вы экономите {formatPrice(product.oldPrice - product.price)}</p>
            )}
            <p className={`mt-4 flex items-center gap-2 font-medium ${product.inStock ? 'text-success' : 'text-secondary'}`}>
              <span className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-success' : 'bg-secondary'}`} />
              {product.inStock ? 'В наличии' : 'Под заказ, 7–14 дней'}
              {product.isLast && <span className="text-accent">· последний экземпляр</span>}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                product={product}
                size="lg"
                className="flex-1"
                label={product.isShowroom ? 'Забронировать' : 'В корзину'}
              />
              <a
                href={site.phones[0].href}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary px-6 py-4 font-semibold text-primary transition-all duration-300 hover:bg-primary/10"
              >
                <Phone size={18} /> Позвонить
              </a>
            </div>
          </div>

          {product.isShowroom && (product.condition || product.discountReason) && (
            <div className="mb-6 space-y-3 rounded-2xl border border-secondary/30 bg-secondary/5 p-5">
              {product.condition && (
                <p className="flex items-center gap-2">
                  <Info size={18} className="shrink-0 text-secondary" />
                  Состояние: <span className="font-semibold">{product.condition}</span>
                </p>
              )}
              {product.discountReason && (
                <p className="flex items-center gap-2">
                  <Lightbulb size={18} className="shrink-0 text-secondary" />
                  Причина скидки: <span className="font-semibold">{product.discountReason}</span>
                </p>
              )}
            </div>
          )}

          <p className="mb-6 text-lg leading-relaxed text-gray-700">{product.description}</p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Truck, text: 'Доставка 1–3 дня' },
              { icon: Wrench, text: 'Сборка в подарок' },
              { icon: CreditCard, text: 'Рассрочка 0%' },
              { icon: ShieldCheck, text: `Гарантия ${warranty ?? (product.isShowroom ? '1 год' : '3 года')}` },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 rounded-xl bg-white p-4 text-sm font-medium shadow-card">
                <Icon size={20} className="shrink-0 text-primary" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-4 text-h3">Описание</h2>
          <p className="whitespace-pre-line leading-relaxed text-gray-700">{product.fullDescription || product.description}</p>
          {product.isShowroom && (
            <ul className="mt-6 space-y-3">
              {[
                'На витринные образцы действует гарантия производителя',
                'Можно приехать в шоу-рум и осмотреть товар перед покупкой',
                'Бронь действует 3 дня',
                'Доставка и сборка как для обычных товаров',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-success" />
                  {t}
                </li>
              ))}
            </ul>
          )}
        </section>
        {product.specs.length > 0 && (
          <section>
            <h2 className="mb-4 text-h3">Характеристики</h2>
            <dl className="divide-y divide-line rounded-2xl bg-white px-6 shadow-card">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 py-3.5">
                  <dt className="text-muted">{s.label}</dt>
                  <dd className="text-right font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="mb-8 text-3xl md:text-h2">Похожие товары</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

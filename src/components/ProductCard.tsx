import Link from 'next/link';
import { Tag } from 'lucide-react';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { Badge } from '@/components/ui/Badge';
import { Price } from '@/components/ui/Price';
import { SmartImage } from '@/components/ui/SmartImage';
import { discountPercent } from '@/lib/format';
import type { Product } from '@/lib/types';

export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const discount = discountPercent(product.price, product.oldPrice);
  const href = `/${product.isShowroom ? 'showroom' : 'catalog'}/${product.slug}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover animate-fade-in"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <SmartImage
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {discount > 0 && <Badge tone="accent">−{discount}%</Badge>}
          {product.isNew && <Badge tone="success">Новинка</Badge>}
          {product.isHit && !product.isNew && <Badge tone="primary">Хит</Badge>}
        </div>
        {product.isShowroom && (
          <Badge tone="dark" className="absolute bottom-3 left-3">
            <Tag size={12} /> Витринный образец
          </Badge>
        )}
        {product.isLast && (
          <Badge tone="primary" className="absolute right-3 top-3">
            Последний
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-sm text-muted">{product.category.name}</p>
        <h3 className="mb-2 text-lg font-bold leading-snug transition-colors group-hover:text-primary">{product.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted">{product.description}</p>
        {product.condition && (
          <p className="mb-4 text-xs font-medium text-gray-600">
            Состояние: <span className="text-ink">{product.condition}</span>
          </p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3">
          <Price price={product.price} oldPrice={product.oldPrice} size="sm" className="flex-col gap-0" />
          <AddToCartButton product={product} size="sm" compact />
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="skeleton aspect-square" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-8 w-1/2 rounded" />
      </div>
    </div>
  );
}

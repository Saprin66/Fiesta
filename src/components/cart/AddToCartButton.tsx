'use client';

import { Check, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart-store';
import type { Product } from '@/lib/types';

interface Props {
  product: Pick<Product, 'id' | 'slug' | 'name' | 'price' | 'images' | 'isShowroom'>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  compact?: boolean;
}

export function AddToCartButton({ product, size = 'md', className, label = 'В корзину', compact }: Props) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  return (
    <Button
      size={size}
      className={className}
      aria-label={compact ? `${label}: ${product.name}` : undefined}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0] ?? null,
          isShowroom: product.isShowroom,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
    >
      {added ? <Check size={18} /> : <ShoppingCart size={18} />}
      {!compact && (added ? 'Добавлено' : label)}
    </Button>
  );
}

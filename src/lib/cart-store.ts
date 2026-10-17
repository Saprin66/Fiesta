'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string | null;
  isShowroom: boolean;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          // Витринный экземпляр существует в одном экземпляре
          const maxQty = item.isShowroom ? 1 : 99;
          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, ...item, qty: Math.min(i.qty + qty, maxQty) } : i,
              ),
            };
          }
          return { isOpen: true, items: [...state.items, { ...item, qty: Math.min(qty, maxQty) }] };
        }),
      remove: (productId) => set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      setQty: (productId, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, qty: Math.max(1, Math.min(qty, i.isShowroom ? 1 : 99)) } : i,
          ),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: 'fiesta-cart',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function cartTotals(items: CartItem[]) {
  return items.reduce(
    (acc, i) => ({ count: acc.count + i.qty, total: acc.total + i.price * i.qty }),
    { count: 0, total: 0 },
  );
}

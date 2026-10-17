'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// Корзина хранится в localStorage, поэтому её содержимое показываем только на клиенте после гидрации,
// чтобы серверная и клиентская разметка совпадали.
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

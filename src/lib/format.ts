export function formatPrice(value: number): string {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

export function discountPercent(price: number, oldPrice: number | null | undefined): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

export function formatDate(iso: string | Date): string {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

// next/image оптимизирует только локальные файлы и домены из next.config.ts,
// остальные внешние ссылки (добавленные в админке) показываем как есть
export function canOptimize(src: string): boolean {
  return !/^https?:\/\//.test(src) || src.startsWith('https://images.unsplash.com/');
}

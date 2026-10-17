# Fiesta Store: план редизайна

Дата анализа: 17.10.2026. Ветка `main`, коммит `cdfbc86`.

## 1. Что есть сейчас

| Область | Факт |
|---|---|
| Фреймворк | Next.js 16.3.5 (App Router), React 19.2, TypeScript 5 |
| Стили | Tailwind CSS 4 (`@tailwindcss/postcss`), акцентный цвет `amber-600` |
| Зависимости | Только `next`, `react`, `react-dom`. Нет Zustand, нет библиотеки иконок, нет ORM |
| Данные | Захардкожены в `src/data/products.ts` (17 товаров + 3 товара шоурума) и `src/data/reviews.ts` (9 отзывов) |
| Изображения | Товары: Unsplash по URL. Категории и соцсети: `public/images/*` |
| Страницы | `/`, `/catalog`, `/catalog/[id]`, `/showroom`, `/showroom/[id]`, `/about`, `/contacts`, `/privacy`, `/terms`, 404 |
| Компоненты | Header, Footer, ProductCard, ShowroomProductCard, ProductGallery, CategoryFilter, ReviewCard |
| Объём | ~3 400 строк в `src/`, самый большой файл `src/app/page.tsx` (501 строка) |

### Расхождения README и кода
README обещает Zustand, корзину и отзывы в LocalStorage. В коде этого нет:
- ссылка «Корзина» ведёт на `/cart`, но такой страницы нет (404);
- кнопка «В корзину» на `src/app/catalog/[id]/page.tsx:132` без обработчика;
- форма на `/contacts` (`src/app/contacts/page.tsx:148`) никуда не отправляется;
- форма отзыва отсутствует, отзывы только статические.

### Технический долг
- Два CSS-файла: `globals.css` (подключён, шаблон create-next-app с Arial) и `global.css` (не используется).
- `next.config.ts` разрешает домены Contentful, которые не используются.
- Шоурум-товары живут в отдельном типе `ShowroomProduct`, дублируя `Product`.
- Нет `generateStaticParams`, SEO-метаданных товаров в schema.org, sitemap.

## 2. Эмодзи: где заменить (59 шт. в 11 файлах)

| Файл | Кол-во | Эмодзи | Замена Lucide |
|---|---|---|---|
| `src/app/showroom/[id]/page.tsx` | 15 | 🏷️💡💰💳📞🔥🔧🚚🛒🛡️✓ | Tag, Lightbulb, Wallet, CreditCard, Phone, Flame, Wrench, Truck, ShoppingCart, ShieldCheck, Check |
| `src/app/catalog/[id]/page.tsx` | 11 | ★♡💳🔧🚚🛒🛡️ | Star, Heart, CreditCard, Wrench, Truck, ShoppingCart, ShieldCheck |
| `src/app/contacts/page.tsx` | 11 | ✅✈️✉️👆💬📍📞📷🕐 | CheckCircle2, Send, Mail, MousePointerClick, MessageCircle, MapPin, Phone, Camera, Clock |
| `src/app/showroom/page.tsx` | 7 | ⚡✅🏷️👀💰🔥🚚 | Zap, CheckCircle2, Tag, Eye, Wallet, Flame, Truck |
| `src/components/Footer.tsx` | 4 | ✉️📍📞 | Mail, MapPin, Phone |
| `src/components/ShowroomProductCard.tsx` | 3 | 🏷️💡🛋️ | Tag, Lightbulb, Sofa |
| `src/app/about/page.tsx` | 3 | ✨💚🤝 | Sparkles, Leaf, Handshake |
| `src/components/Header.tsx` | 2 | 🛒 | ShoppingBag |
| `src/components/ProductCard.tsx` | 1 | 🛋️ (заглушка) | ImageOff / Sofa |
| `src/components/ProductGallery.tsx` | 1 | 📷 | Camera |
| `src/app/not-found.tsx` | 1 | 🔍 | SearchX |

Иконки соцсетей в футере (PNG) заменим на SVG (у Lucide нет брендовых логотипов VK/WhatsApp/MAX, поэтому inline SVG-компоненты).

## Принятые решения (17.10.2026)
- Один сервис Next.js на Render (фронт + API + админка), PostgreSQL на Render.
- Шрифт Inter. Тёмной темы нет.
- Онлайн-оплаты пока нет: заказ оформляется как заявка, оплату владелец добавит сам.
- Внешнего хранилища фото нет: фото хранятся в PostgreSQL.
- Уведомлений (Telegram/email) нет: заказы и заявки смотрим в админке.

## 3. Целевая архитектура

```
Next.js 16 (App Router) — один сервис на Render
├── Публичный сайт (Server Components, ISR)
├── /admin — админка (защищена, Auth.js credentials)
├── Route Handlers / Server Actions — API
├── Prisma ORM ──> Render PostgreSQL
└── Фото товаров ──> таблица в той же PostgreSQL, отдача через /api/images/[id]
```

Почему один сервис: фронт и API уже на Next.js, отдельный Express удвоит деплой и CORS. Диск Render эфемерный, поэтому загружаемые фото нельзя хранить в `public/`. Внешнее хранилище не используем: фото сжимаются при загрузке (sharp, WebP до ~1600px) и хранятся в PostgreSQL, ответ кэшируется (`Cache-Control: immutable`). Для каталога в десятки–сотни товаров этого хватает; при росте можно вынести в S3 без смены схемы ссылок.

### Схема Prisma (черновик)

```prisma
model Category { id String @id @default(cuid()) slug String @unique name String image String? sort Int @default(0) products Product[] }

model Product {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  price       Int              // рубли, целое число
  oldPrice    Int?
  description String
  fullDescription String
  specs       Json             // ширина, высота, материал...
  images      ProductImage[]
  inStock     Boolean  @default(true)
  isNew       Boolean  @default(false)
  isHit       Boolean  @default(false)
  isShowroom  Boolean  @default(false)  // шоурум = флаг, а не отдельная модель
  showroomNote String?               // состояние витринного образца
  published   Boolean  @default(true)
  reviews     Review[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ProductImage { id String @id @default(cuid()) productId String product Product @relation(fields: [productId], references: [id], onDelete: Cascade) url String? data Bytes? mime String? sort Int @default(0) } // url для внешних ссылок, data для загруженных файлов

model Review { id String @id @default(cuid()) productId String? product Product? @relation(fields: [productId], references: [id]) name String city String? rating Int text String approved Boolean @default(false) createdAt DateTime @default(now()) }

model Order { id String @id @default(cuid()) number Int @unique @default(autoincrement()) customerName String phone String email String? address String? comment String? total Int status OrderStatus @default(NEW) items OrderItem[] createdAt DateTime @default(now()) }
model OrderItem { id String @id @default(cuid()) orderId String order Order @relation(fields: [orderId], references: [id], onDelete: Cascade) productId String name String price Int qty Int }
enum OrderStatus { NEW CONFIRMED DELIVERING DONE CANCELLED }

model Lead { id String @id @default(cuid()) type String name String phone String message String? createdAt DateTime @default(now()) } // заявки: контакты, замер, звонок

model AdminUser { id String @id @default(cuid()) email String @unique passwordHash String }
```

### Миграция данных
1. Скрипт `prisma/seed.ts` импортирует массивы из `src/data/products.ts` и `src/data/reviews.ts`.
2. Категории создаются из уникальных `category`, slug транслитом (`divany`, `krovati`...).
3. `showroomProducts` переносятся в `Product` с `isShowroom = true`, `showroomPrice` → `price`, исходная цена → `oldPrice`.
4. `characteristics` → поле `specs` (JSON).
5. Старые числовые `id` сохраняются в `slug`-редирект (`/catalog/1` → `/catalog/divan-skandi`), чтобы не сломать ссылки.
6. После проверки удаляем `src/data/*.ts` и все импорты.

## 4. Дорожная карта

### Этап 1. Анализ и план (готово, этот документ)

### Этап 2. Дизайн-система и UI Kit
- Токены в `globals.css` через `@theme` Tailwind 4: цвета из ТЗ (#FF6B35, #F7931E, #E63946, #FAFAFA, #1A1A1A, #6B7280, #10B981, #EF4444), радиусы, тени, анимации `fadeIn`, skeleton.
- Шрифт Inter через `next/font` (subsets latin + cyrillic): заголовки 700/800, текст 400/500.
- Компоненты `src/components/ui/`: Button (primary, secondary, ghost, CTA), Input, Textarea, Select, Badge, Modal, Drawer, Skeleton, Rating, Price, Toast.
- Удалить `global.css`, привести Header/Footer к новой системе.
- Установить `lucide-react`, заменить все 59 эмодзи (таблица в разделе 2).

### Этап 3. Редизайн страниц
Главная, каталог (фильтры по цене, материалу, размерам, сортировка, пагинация), карточка товара, шоурум, о компании, контакты, 404. Mobile-first, Lighthouse 90+.

### Этап 4. Prisma + PostgreSQL
- `prisma`, `@prisma/client`, схема из раздела 3, миграции, seed.
- Страницы читают данные из БД (Server Components + `revalidateTag`).
- Удаление `src/data/*`.

### Этап 5. Корзина с сохранением
- Zustand + `persist` (localStorage): переживает перезагрузку и закрытие вкладки.
- Страница `/cart`, мини-корзина (drawer), счётчик в шапке.
- Оформление заказа `/checkout` → заявка: запись `Order` в БД, менеджер видит её в админке и перезванивает. Онлайн-оплату владелец добавит позже, внешних уведомлений нет.
- Цены при оформлении пересчитываются на сервере из БД.

### Этап 6. Админ-панель `/admin`
- Вход (Auth.js, логин/пароль, bcrypt), middleware защищает `/admin/*`.
- Товары: список с поиском, создание/редактирование/удаление, загрузка нескольких фото с сортировкой, флаги «новинка/хит/шоурум/в наличии».
- Категории, заказы (смена статуса), отзывы (модерация), заявки.
- Валидация через Zod, общая для форм и сервера.

### Этап 7. Деплой на Render
- `render.yaml` (Blueprint): Web Service (Node) + PostgreSQL.
- Build: `npm ci && npx prisma migrate deploy && npm run build`, Start: `npm start`.
- Переменные: `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (для первого входа).
- Health-check, `output: 'standalone'`, бэкапы БД (на бесплатном плане Render Postgres удаляется через 30 дней, для продакшена нужен платный план).

## 5. Предлагаемые функции для мебельного магазина

Приоритет 1 (сильно влияет на продажи):
- Варианты товара: цвет и ткань обивки, размер, с пересчётом цены и сменой фото.
- Фильтры по габаритам (ширина до N см), материалу, механизму, цене.
- Заявка на бесплатный замер (кухни, шкафы-купе, гардеробные) и расчёт по своим размерам.
- Калькулятор доставки и сборки, подъём на этаж.
- Избранное и сравнение товаров (характеристики в таблице).
- Купить в 1 клик (только телефон).
- Отзывы с фото, привязанные к товару, с модерацией в админке.

Приоритет 2:
- Рассрочка и оплата частями (Долями, Сплит), онлайн-оплата (владелец подключит сам).
- Заказ образцов ткани домой.
- «С этим покупают» и комплекты (спальня целиком со скидкой).
- Недавно просмотренные товары.
- Запись на визит в шоурум.
- Отслеживание статуса заказа по номеру и телефону.

Приоритет 3:
- Просмотр товара в 3D/AR в своей комнате.
- Личный кабинет с историей заказов.
- SEO: sitemap, schema.org Product, Open Graph; Яндекс.Метрика с целями.
- Экспорт товаров в Яндекс.Маркет (YML-фид).

import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { legacyCategories, legacyProducts, legacyReviews } from './seed-data/legacy';

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });

async function seedCatalog() {
  const productCount = await prisma.product.count();
  if (productCount > 0) {
    console.log(`Каталог уже заполнен (${productCount} товаров), пропускаю перенос товаров`);
    return;
  }

  const categories = legacyCategories();
  for (const [sort, c] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { slug: c.slug, name: c.name, image: c.image, sort },
    });
  }
  const bySlug = new Map((await prisma.category.findMany()).map((c) => [c.slug, c.id]));

  for (const p of legacyProducts()) {
    await prisma.product.create({
      data: {
        legacyId: p.legacyId,
        slug: p.slug,
        name: p.name,
        categoryId: bySlug.get(p.category.slug)!,
        price: p.price,
        oldPrice: p.oldPrice,
        description: p.description,
        fullDescription: p.fullDescription,
        specs: p.specs as unknown as object,
        inStock: p.inStock,
        isNew: p.isNew,
        isHit: p.isHit,
        isShowroom: p.isShowroom,
        condition: p.condition,
        discountReason: p.discountReason,
        isLast: p.isLast,
        images: { create: p.images.map((url, sort) => ({ url, sort })) },
      },
    });
  }
  console.log(`Перенесено категорий: ${categories.length}, товаров: ${legacyProducts().length}`);

  if ((await prisma.review.count()) === 0) {
    await prisma.review.createMany({
      data: legacyReviews().map((r) => ({
        name: r.name,
        city: r.city,
        rating: r.rating,
        text: r.text,
        productName: r.productName,
        approved: true,
        createdAt: new Date(r.createdAt),
      })),
    });
    console.log(`Перенесено отзывов: ${legacyReviews().length}`);
  }
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.log('ADMIN_EMAIL/ADMIN_PASSWORD не заданы, администратор не создан');
    return;
  }
  const exists = await prisma.adminUser.findUnique({ where: { email } });
  if (exists) return;
  await prisma.adminUser.create({ data: { email, passwordHash: await bcrypt.hash(password, 12) } });
  console.log(`Создан администратор ${email}`);
}

seedCatalog()
  .then(seedAdmin)
  .finally(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

import sharp from 'sharp';
import { getAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';

const MAX_FILE = 15 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await getAdmin())) return Response.json({ error: 'Нужна авторизация' }, { status: 401 });

  const form = await req.formData();
  const files = form.getAll('files').filter((f): f is File => f instanceof File);
  if (files.length === 0) return Response.json({ error: 'Файлы не выбраны' }, { status: 400 });

  const uploaded: Array<{ id: string; url: string }> = [];
  for (const file of files.slice(0, 20)) {
    if (file.size > MAX_FILE) return Response.json({ error: `${file.name}: файл больше 15 МБ` }, { status: 400 });
    try {
      const { data, info } = await sharp(Buffer.from(await file.arrayBuffer()))
        .rotate()
        .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer({ resolveWithObject: true });
      const blob = await prisma.imageBlob.create({
        data: { data: new Uint8Array(data), mime: 'image/webp', width: info.width, height: info.height },
        select: { id: true },
      });
      uploaded.push({ id: blob.id, url: `/api/images/${blob.id}` });
    } catch {
      return Response.json({ error: `${file.name}: не удалось прочитать изображение` }, { status: 400 });
    }
  }

  // Убираем загруженные, но так и не сохранённые в товаре файлы старше суток
  await prisma.imageBlob.deleteMany({
    where: { image: null, createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
  });

  return Response.json({ files: uploaded });
}

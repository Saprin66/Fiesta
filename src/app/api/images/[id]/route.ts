import { prisma } from '@/lib/db';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blob = await prisma.imageBlob.findUnique({ where: { id }, select: { data: true, mime: true } });
  if (!blob) return new Response('Not found', { status: 404 });
  return new Response(new Uint8Array(blob.data), {
    headers: {
      'Content-Type': blob.mime,
      // id меняется при каждой загрузке, поэтому файл можно кэшировать навсегда
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

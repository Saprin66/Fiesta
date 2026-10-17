import { Rating } from '@/components/ui/Rating';
import { prisma } from '@/lib/db';
import { ToggleAction } from '../ToggleAction';

export default async function AdminReviews() {
  const reviews = await prisma.review.findMany({ orderBy: [{ approved: 'asc' }, { createdAt: 'desc' }] });
  return (
    <div>
      <h1 className="mb-2 text-3xl">Отзывы</h1>
      <p className="mb-8 text-muted">Новые отзывы с сайта появляются на главной только после публикации.</p>
      <div className="space-y-3">
        {reviews.map((r) => (
          <article key={r.id} className="rounded-2xl bg-white p-5 shadow-card">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">
                  {r.name}
                  {r.city && <span className="font-normal text-muted">, {r.city}</span>}
                </p>
                <Rating value={r.rating} size={16} className="mt-1" />
              </div>
              <div className="flex items-center gap-2">
                <ToggleAction kind="review" id={r.id} value={r.approved} onLabel="Опубликован" offLabel="Опубликовать" />
                <ToggleAction kind="review-delete" id={r.id} value={false} onLabel="" offLabel="Удалить" />
              </div>
            </div>
            <p className="text-gray-700">{r.text}</p>
            {r.productName && <p className="mt-2 text-sm text-muted">Покупка: {r.productName}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

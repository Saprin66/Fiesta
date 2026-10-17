import { prisma } from '@/lib/db';
import { ToggleAction } from '../ToggleAction';

const types: Record<string, string> = { contact: 'Обратная связь', measure: 'Замер', callback: 'Обратный звонок', review: 'Отзыв' };

export default async function AdminLeads() {
  const leads = await prisma.lead.findMany({ orderBy: [{ handled: 'asc' }, { createdAt: 'desc' }], take: 300 });
  return (
    <div>
      <h1 className="mb-8 text-3xl">Заявки</h1>
      {leads.length === 0 && <p className="rounded-2xl bg-white p-6 text-muted shadow-card">Заявок пока нет</p>}
      <div className="space-y-3">
        {leads.map((l) => (
          <article key={l.id} className={`rounded-2xl bg-white p-5 shadow-card ${l.handled ? 'opacity-60' : ''}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">
                  {l.name}, <a href={`tel:${l.phone}`} className="text-primary">{l.phone}</a>
                  {l.email && <span className="font-normal text-muted"> · {l.email}</span>}
                </p>
                <p className="text-sm text-muted">
                  {types[l.type] ?? l.type} · {l.createdAt.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
                </p>
              </div>
              <ToggleAction kind="lead" id={l.id} value={l.handled} onLabel="Обработана" offLabel="Отметить обработанной" />
            </div>
            {l.message && <p className="mt-3 whitespace-pre-line text-gray-700">{l.message}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

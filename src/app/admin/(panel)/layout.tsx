import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { AdminNav } from './AdminNav';

export const metadata: Metadata = { title: 'Админ-панель', robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const [newOrders, newLeads, pendingReviews] = await Promise.all([
    prisma.order.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { handled: false } }),
    prisma.review.count({ where: { approved: false } }),
  ]);
  return (
    <div className="min-h-screen bg-surface lg:flex">
      <AdminNav email={admin.email} counters={{ orders: newOrders, leads: newLeads, reviews: pendingReviews }} />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
    </div>
  );
}

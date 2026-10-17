import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/auth';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = { title: 'Вход в админку', robots: { index: false } };

export default async function LoginPage() {
  if (await getAdmin()) redirect('/admin');
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-card animate-scale-in">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl font-black text-white">
            F
          </span>
          <h1 className="text-2xl">Админ-панель</h1>
          <p className="mt-1 text-muted">Fiesta Store</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}

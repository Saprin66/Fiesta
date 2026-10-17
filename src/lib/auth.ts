import 'server-only';
import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from './db';

const COOKIE = 'fiesta_admin';
const MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 16) throw new Error('AUTH_SECRET не задан или слишком короткий (нужно от 16 символов)');
  return new TextEncoder().encode(value);
}

export interface AdminSession {
  id: string;
  email: string;
}

// Простая защита от перебора паролей: не больше 10 неудачных попыток за 15 минут на email
const failures = new Map<string, { count: number; until: number }>();

export async function login(email: string, password: string): Promise<'ok' | 'invalid' | 'locked'> {
  const key = email.trim().toLowerCase();
  const entry = failures.get(key);
  if (entry && entry.count >= 10 && entry.until > Date.now()) return 'locked';

  const user = await prisma.adminUser.findUnique({ where: { email: key } });
  const valid = user ? await bcrypt.compare(password, user.passwordHash) : false;
  if (!user || !valid) {
    const current = entry && entry.until > Date.now() ? entry.count : 0;
    failures.set(key, { count: current + 1, until: Date.now() + 15 * 60 * 1000 });
    return 'invalid';
  }
  failures.delete(key);

  const token = await new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
  return 'ok';
}

export async function logout() {
  (await cookies()).delete(COOKIE);
}

export async function getAdmin(): Promise<AdminSession | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (!payload.sub || typeof payload.email !== 'string') return null;
    return { id: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<AdminSession> {
  const admin = await getAdmin();
  if (!admin) redirect('/admin/login');
  return admin;
}

'use client';

import { Loader2 } from 'lucide-react';
import { useActionState } from 'react';
import { loginAction } from '../actions';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Field';

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);
  return (
    <form action={action} className="space-y-5">
      <Field label="Email" htmlFor="email" required>
        <Input id="email" name="email" type="email" autoComplete="username" required defaultValue={state?.email} key={state?.email} />
      </Field>
      <Field label="Пароль" htmlFor="password" required>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </Field>
      {state?.error && <p className="rounded-xl bg-error/10 p-3 text-sm text-error">{state.error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending && <Loader2 size={20} className="animate-spin" />}
        Войти
      </Button>
    </form>
  );
}

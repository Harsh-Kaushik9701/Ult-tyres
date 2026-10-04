'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp, DEMO_MODE } from '@/context/AppContext';
import { Button, Container, Tile, inputClass, labelClass } from '@/components/ui';
import { SITE } from '@/data/site';

/**
 * Dealer login.
 * TODO(step 2): real authentication (Better Auth: passkey or password + MFA).
 * For now any details sign in to the sample dealer account (the portal is behind staging auth).
 */
export default function DealerLoginPage() {
  const router = useRouter();
  const { switchRole } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    switchRole('owner');
    router.push('/portal');
  };

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-md">
        <h1 className="text-center text-4xl font-semibold">Dealer login</h1>
        <p className="mt-2 text-center text-lg text-muted">G&apos;day. Log in to order and track your quotes.</p>

        <Tile className="mt-10 px-6 py-8 sm:px-8">
          <form
            className="grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <div>
              <label htmlFor="login-email" className={labelClass}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label htmlFor="login-password" className={labelClass}>
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
          <p className="mt-5 text-center text-[14px] text-muted">
            Forgot your password? Ring {SITE.phone}.
          </p>
        </Tile>

        <p className="mt-8 text-center text-[17px]">
          New here?{' '}
          <Link href="/join-us/become-a-dealer" className="font-medium text-brand hover:underline">
            Become a dealer
          </Link>
        </p>
        <p className="mt-2 text-center text-[14px] text-muted">
          Ultimate Tyres staff?{' '}
          <Link href="/admin" className="underline hover:text-ink">
            Go to the admin desk
          </Link>
        </p>

        {DEMO_MODE && (
          <div className="mt-8 flex justify-center gap-3 text-[14px]">
            <button type="button" onClick={signIn} className="rounded-full bg-panel px-4 py-2 hover:bg-line/60">
              Demo: dealer
            </button>
            <button
              type="button"
              onClick={() => {
                switchRole('admin');
                router.push('/admin');
              }}
              className="rounded-full bg-panel px-4 py-2 hover:bg-line/60"
            >
              Demo: staff
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

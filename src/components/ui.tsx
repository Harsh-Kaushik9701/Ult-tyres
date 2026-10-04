import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

/** Shared building blocks for the simple, Apple-style layout. */

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1080px] px-5 ${className}`}>{children}</div>;
}

/** Text link with a chevron, e.g. "Learn more ›". */
export function ChevronLink({
  href,
  children,
  className = '',
  tone = 'brand',
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: 'brand' | 'light';
}) {
  const color = tone === 'light' ? 'text-brand-light hover:text-white' : 'text-brand hover:text-brand-dark';
  return (
    <Link href={href} className={`group inline-flex items-center gap-0.5 font-medium ${color} ${className}`}>
      <span className="group-hover:underline underline-offset-4">{children}</span>
      <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
    </Link>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'dark';

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'bg-panel text-ink hover:bg-line/60',
  dark: 'bg-ink text-white hover:bg-black',
};

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium transition disabled:cursor-not-allowed disabled:opacity-40';

/** Pill button rendered as a link. */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonBase} ${BUTTON_STYLES[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/** Pill button for actions and form submits. */
export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ComponentProps<'button'> & { variant?: ButtonVariant }) {
  return <button {...props} className={`${buttonBase} ${BUTTON_STYLES[variant]} ${className}`} />;
}

/** Large centred page opener: title, one line, optional actions. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={dark ? 'bg-charcoal text-white' : 'bg-white'}>
      <Container className="py-16 text-center sm:py-24">
        {eyebrow && (
          <p className={`mb-3 text-[15px] font-semibold ${dark ? 'text-brand-light' : 'text-brand'}`}>{eyebrow}</p>
        )}
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-6xl">{title}</h1>
        {subtitle && (
          <p className={`mx-auto mt-4 max-w-xl text-lg sm:text-xl ${dark ? 'text-white/70' : 'text-muted'}`}>
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">{children}</div>}
      </Container>
    </section>
  );
}

/** Centred section heading. */
export function SectionHeading({ title, subtitle }: { title: ReactNode; subtitle?: ReactNode }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-semibold sm:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-xl text-lg text-muted">{subtitle}</p>}
    </div>
  );
}

/** Rounded content tile on a grey or charcoal surface. */
export function Tile({
  children,
  dark = false,
  className = '',
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-3xl ${dark ? 'bg-charcoal text-white' : 'bg-panel text-ink'} ${className}`}
    >
      {children}
    </div>
  );
}

/** Small grey label/value pair used in spec lists. */
export function Spec({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-[15px] last:border-0">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium tabular-nums">{value}</dd>
    </div>
  );
}

export const inputClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-[16px] text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none';

export const labelClass = 'mb-1.5 block text-sm font-medium text-ink';

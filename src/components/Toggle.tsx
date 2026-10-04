'use client';

import type { ReactNode } from 'react';

/** Accessible on/off switch. */
export default function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: ReactNode;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2 text-[14px]"
    >
      <span
        className={`relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition ${
          checked ? 'bg-ok' : 'bg-line'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${checked ? 'translate-x-[18px]' : 'translate-x-0.5'}`}
        />
      </span>
      <span className={checked ? 'text-ink' : 'text-muted'}>{label}</span>
    </button>
  );
}

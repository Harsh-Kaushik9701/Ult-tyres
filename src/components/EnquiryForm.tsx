'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button, inputClass, labelClass } from '@/components/ui';
import { SITE } from '@/data/site';

/**
 * Short enquiry form (name, phone, message).
 * TODO(step 2): send to the server (email + admin inbox). For now it only shows a confirmation.
 */
export default function EnquiryForm({
  idPrefix,
  topic,
  submitLabel = 'Send',
  messagePlaceholder = 'What can we help with?',
}: {
  idPrefix: string;
  topic?: string;
  submitLabel?: string;
  messagePlaceholder?: string;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center py-6 text-center" role="status">
        <CheckCircle2 className="h-10 w-10 text-ok" aria-hidden />
        <p className="mt-3 text-xl font-semibold">Thanks, we&apos;ve got it.</p>
        <p className="mt-1 text-muted">
          We&apos;ll be in touch soon. In a hurry? Ring {SITE.phone}.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 text-left"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {topic && <input type="hidden" name="topic" value={topic} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelClass}>
            Name
          </label>
          <input id={`${idPrefix}-name`} name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
            Phone
          </label>
          <input id={`${idPrefix}-phone`} name="phone" type="tel" required autoComplete="tel" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-message`} className={labelClass}>
          Message
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={3}
          placeholder={messagePlaceholder}
          className={inputClass}
        />
      </div>
      <div>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

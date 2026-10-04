import { MessageCircle } from 'lucide-react';
import { SITE } from '@/data/site';

/** Small floating WhatsApp button. Plain link: no third-party widget script. */
export default function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
    </a>
  );
}

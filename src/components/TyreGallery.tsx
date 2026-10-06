'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import TyreGraphic from '@/components/TyreGraphic';
import { IMAGE_ALT, type TyreImage } from '@/lib/tyreImages';

/**
 * Tyre photo gallery: one big photo, thumbnails underneath, swipe on phones,
 * tap to see it full screen. Falls back to the tyre illustration with no photos.
 */
export default function TyreGallery({ images, name }: { images: TyreImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex justify-center rounded-3xl bg-panel px-8 py-16">
        <TyreGraphic className="w-56 sm:w-72" />
      </div>
    );
  }

  const current = images[Math.min(index, images.length - 1)];
  const go = (step: number) => setIndex((i) => (i + step + images.length) % images.length);
  const alt = (img: TyreImage) => `${name} ${IMAGE_ALT[img.kind] ?? 'photo'}`;
  const many = images.length > 1;

  return (
    <div>
      <div
        className="group relative overflow-hidden rounded-3xl bg-panel"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null || !many) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="block aspect-[4/5] w-full cursor-zoom-in p-8 sm:p-12"
          aria-label={`View ${alt(current)} full screen`}
        >
          <Image
            key={current.src}
            src={current.src}
            alt={alt(current)}
            width={current.width}
            height={current.height}
            priority={index === 0}
            sizes="(min-width: 768px) 520px, 100vw"
            className="h-full w-full object-contain mix-blend-multiply"
          />
        </button>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/80 p-2 text-ink opacity-0 transition group-hover:opacity-100">
          <Expand className="h-4 w-4" aria-hidden />
        </span>
        {many && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm transition hover:bg-white sm:block"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm transition hover:bg-white sm:block"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
            {/* Dots on phones */}
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5 sm:hidden" aria-hidden>
              {images.map((img, i) => (
                <span key={img.src} className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-ink' : 'bg-ink/25'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {many && (
        <div className="mt-3 hidden gap-3 sm:flex">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${alt(img)}`}
              aria-current={i === index}
              className={`relative h-20 w-20 overflow-hidden rounded-2xl bg-panel p-2 transition ${
                i === index ? 'ring-2 ring-ink' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img.src} alt="" width={img.width} height={img.height} sizes="80px" className="h-full w-full object-contain mix-blend-multiply" />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-white p-0 backdrop:bg-black/60"
        aria-label={`${name} photos`}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className="relative flex h-full w-full items-center justify-center p-6 sm:p-12">
          <Image
            key={`full-${current.src}`}
            src={current.src}
            alt={alt(current)}
            width={current.width}
            height={current.height}
            sizes="100vw"
            className="max-h-full w-auto max-w-full object-contain"
          />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute right-4 top-4 rounded-full bg-panel p-3 hover:bg-line"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          {many && (
            <>
              <button type="button" onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-panel p-3 hover:bg-line" aria-label="Previous photo">
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button type="button" onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-panel p-3 hover:bg-line" aria-label="Next photo">
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}

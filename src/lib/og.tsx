import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Branded 1200×630 share image (og:image) used by every `opengraph-image.tsx`.
 * Built at build time from the fonts in src/fonts, so it needs no internet.
 * Charcoal stage, High-Vis Red accents, Barlow Condensed headline, a tyre on the right.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const fonts = Promise.all([
  readFile(join(process.cwd(), 'src/fonts/barlow-condensed-latin-800-normal.woff')),
  readFile(join(process.cwd(), 'src/fonts/inter-latin-500-normal.woff')),
]);

const C = {
  charcoal: '#1C1F22',
  charcoalSoft: '#343A40',
  red: '#D50000',
  redLight: '#FF3B30',
  onDark: '#CED4DA',
  white: '#FFFFFF',
  yellow: '#F5C400',
};

function Tyre() {
  // Concentric circles: tread, sidewall, rim, hub and wheel nuts.
  const nuts = Array.from({ length: 10 }, (_, i) => (i * Math.PI * 2) / 10);
  return (
    <div
      style={{
        position: 'absolute',
        right: -90,
        top: 70,
        width: 520,
        height: 520,
        borderRadius: 9999,
        background: '#0d0f11',
        border: '26px dashed #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 360,
          height: 360,
          borderRadius: 9999,
          border: `6px solid ${C.charcoalSoft}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 250,
            height: 250,
            borderRadius: 9999,
            background: '#B9C0C6',
            border: '14px solid #CED4DA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {nuts.map((a, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: '#3A4148',
                left: 111 + Math.cos(a) * 62 - 7,
                top: 111 + Math.sin(a) * 62 - 7,
              }}
            />
          ))}
          <div style={{ width: 70, height: 70, borderRadius: 9999, background: '#868E96', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 30, height: 30, borderRadius: 9999, background: C.red }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  /** Small red label above the headline, e.g. "Fleet services". */
  eyebrow: string;
  /** Headline. The last word is drawn in red. Keep it short (about 5 words). */
  title: string;
  /** One line under the headline. */
  subtitle?: string;
}) {
  const [barlow, inter] = await fonts;
  const words = title.trim().split(/\s+/);
  // Shrink long headlines so they fit beside the tyre; drop the subtitle when space is tight.
  const fontSize = title.length > 40 ? 64 : title.length > 26 ? 80 : 104;
  const showSubtitle = subtitle && title.length <= 40;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: C.charcoal,
          color: C.white,
          position: 'relative',
          fontFamily: 'Inter',
        }}
      >
        <Tyre />
        {/* Red bar on the left edge */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 18, background: C.red }} />

        <div style={{ display: 'flex', flexDirection: 'column', padding: '64px 0 0 84px', width: 760 }}>
          {/* Logo row */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 10,
                background: C.red,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Barlow',
                fontSize: 30,
              }}
            >
              UT
            </div>
            <div style={{ marginLeft: 16, fontFamily: 'Barlow', fontSize: 34, letterSpacing: 2 }}>ULTIMATE TYRES</div>
          </div>

          <div style={{ marginTop: 54, fontSize: 26, color: C.redLight, letterSpacing: 4, textTransform: 'uppercase' }}>{eyebrow}</div>
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              flexWrap: 'wrap',
              fontFamily: 'Barlow',
              fontSize,
              lineHeight: 0.95,
              textTransform: 'uppercase',
              maxWidth: 660,
            }}
          >
            {words.map((w, i) => (
              <span key={i} style={{ marginRight: fontSize * 0.22, color: i === words.length - 1 ? C.redLight : C.white }}>
                {w}
              </span>
            ))}
          </div>
          {showSubtitle && <div style={{ marginTop: 24, fontSize: 28, color: C.onDark, lineHeight: 1.3, maxWidth: 640 }}>{subtitle}</div>}
        </div>

        {/* Road strip with lane markings and contact line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 74,
            background: C.charcoalSoft,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 48px 0 84px',
          }}
        >
          <div style={{ fontSize: 26, color: C.white }}>ultimatetyres.com.au · 1300 110 002</div>
          <div style={{ display: 'flex' }}>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} style={{ width: 46, height: 6, background: C.yellow, marginLeft: 26, opacity: 0.8 }} />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Barlow', data: barlow, style: 'normal', weight: 800 },
        { name: 'Inter', data: inter, style: 'normal', weight: 500 },
      ],
    }
  );
}

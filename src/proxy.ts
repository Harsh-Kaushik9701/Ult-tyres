import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkPreviewAuth, type PreviewArea } from '@/lib/previewAuth';

/**
 * Locks the dealer portal and admin desk behind interim Basic auth
 * (see src/lib/previewAuth.ts). Public pages are untouched.
 *
 * This is a staging guard, not the dealer login. Real authentication replaces it.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const area: PreviewArea = pathname.startsWith('/admin') ? 'admin' : 'portal';

  const result = checkPreviewAuth(area, request.headers.get('authorization'));
  if (result === 'ok') return NextResponse.next();

  if (result === 'not-configured') {
    return new NextResponse('This area is not available yet.', {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  // Only challenge real page loads. Background fetches (link prefetch, client-side
  // navigation) get a plain 401: otherwise the browser pops up its sign-in box on
  // pages that merely link here (e.g. the dealer login page linking to /admin).
  // Next.js turns a failed client navigation into a full page load, which is then challenged.
  const mode = request.headers.get('sec-fetch-mode');
  if (mode && mode !== 'navigate') {
    return new NextResponse(null, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="Ultimate Tyres ${area === 'admin' ? 'Admin' : 'Dealer Portal'} (staging)", charset="UTF-8"`,
      'Cache-Control': 'no-store',
    },
  });
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/portal', '/portal/:path*'],
};

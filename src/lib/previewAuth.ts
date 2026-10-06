/**
 * Interim HTTP Basic auth for the staging build.
 *
 * Until real authentication (Better Auth + MongoDB, staff-created dealer
 * accounts, passkeys/MFA) is in place, the dealer portal and the admin desk are
 * locked behind Basic auth credentials set in environment variables. This keeps
 * the prototype off the open internet without pretending to be the final login.
 *
 *   /admin   → ADMIN_USER   / ADMIN_PASSWORD
 *   /portal  → PORTAL_USER  / PORTAL_PASSWORD (admin credentials also work)
 *
 * If a pair is not set, access is refused in production. In development the
 * route stays open so `npm run dev` works out of the box.
 */

export type PreviewArea = 'admin' | 'portal';

interface Credentials {
  user: string;
  password: string;
}

function readPair(userVar: string, passVar: string): Credentials | null {
  const user = process.env[userVar];
  const password = process.env[passVar];
  if (!user || !password) return null;
  return { user, password };
}

/** Credentials accepted for an area. `null` means none are configured. */
export function credentialsFor(area: PreviewArea): Credentials[] | null {
  const admin = readPair('ADMIN_USER', 'ADMIN_PASSWORD');
  if (area === 'admin') return admin ? [admin] : null;
  const portal = readPair('PORTAL_USER', 'PORTAL_PASSWORD');
  const list = [portal, admin].filter((c): c is Credentials => c !== null);
  return list.length ? list : null;
}

/** Length-independent string comparison, so response time does not leak how much of a guess matched. */
function safeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function decodeBasic(header: string | null): Credentials | null {
  if (!header || !header.startsWith('Basic ')) return null;
  try {
    const decoded = atob(header.slice(6).trim());
    const sep = decoded.indexOf(':');
    if (sep < 0) return null;
    return { user: decoded.slice(0, sep), password: decoded.slice(sep + 1) };
  } catch {
    return null;
  }
}

/** Names (never values) of the variables this area still needs, for the "not set up" page. */
export function missingVariables(area: PreviewArea): string[] {
  const names = area === 'admin' ? ['ADMIN_USER', 'ADMIN_PASSWORD'] : ['PORTAL_USER', 'PORTAL_PASSWORD'];
  return names.filter((n) => !process.env[n]);
}

export type PreviewAuthResult = 'ok' | 'unauthorised' | 'not-configured';

/** Check an `Authorization` header against the credentials for an area. */
export function checkPreviewAuth(area: PreviewArea, authHeader: string | null): PreviewAuthResult {
  const allowed = credentialsFor(area);
  if (!allowed) {
    return process.env.NODE_ENV === 'production' ? 'not-configured' : 'ok';
  }
  const given = decodeBasic(authHeader);
  if (!given) return 'unauthorised';
  const match = allowed.some((c) => safeEqual(c.user, given.user) && safeEqual(c.password, given.password));
  return match ? 'ok' : 'unauthorised';
}

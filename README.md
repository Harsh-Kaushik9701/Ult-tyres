# Ultimate Tyres website and dealer portal

Rebuild of ultimatetyres.com.au: a public site for the Ralson, Blacklion and Triangle commercial tyre ranges and fleet services, plus a dealer portal where approved dealers build a cart **without prices** and submit it for quantity-based pricing. Staff price the request, the dealer accepts the quote, and an order is created.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. MongoDB is planned for step 2.

## Current status

This is a **front-end prototype**. All screens exist, but data comes from `src/data/mockData.ts` and is saved in each visitor's browser (localStorage). Nothing reaches a server yet, so pricing requests submitted in one browser are not seen by staff in another.

| Area | State |
| --- | --- |
| Public site (home, about, tyres, fleet services, news, network map, contact, join us, legal) | Screens done, sample content |
| Dealer portal (catalogue, rapid order, cart, quotes, orders, account) | Screens done, browser-only data |
| Admin desk (pricing queue, applications, dispatch, price matrix) | Screens done, browser-only data |
| Dealer and staff login | **Interim** Basic auth on `/portal` and `/admin` (see below) |
| Database, real auth, email/SMS, ABN lookup | Not started (step 2) |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
```

`next/font/google` downloads fonts at build time, so `npm run build` needs internet access.

## Environment variables

See `.env.example`.

- `ADMIN_USER` / `ADMIN_PASSWORD`: protect `/admin` with HTTP Basic auth.
- `PORTAL_USER` / `PORTAL_PASSWORD`: protect `/portal` (the admin pair also works).
- If a pair is empty, that area returns **503 in production** and is **open in development**.
- `NEXT_PUBLIC_DEMO_MODE=true`: shows the persona switcher and one-click demo logins. Keep it off on any deployment the client or public can see.

## Security rules for contributors

1. **Prices never go to the browser except on a dealer's own quote.** The quantity-band matrix lives in `src/server/priceMatrix.ts`, which imports `server-only`; importing it from a client component fails the build. Staff read it through the server actions in `src/app/admin/actions.ts`, which re-check staff credentials.
2. **Public pages show availability bands only** (`src/lib/availability.ts`), never unit counts.
3. **Every dealer record lookup must match the signed-in dealer's ID.** See the quote and order detail pages.
4. `src/proxy.ts` (Next 16's replacement for `middleware.ts`) is a staging guard, not the dealer login. Real authentication replaces it in step 2.

## Design

Simple, Apple-style layout: white and light-grey surfaces, big short headlines, one idea per section, charcoal tiles for contrast, High-Vis Red only for actions. Copy is short and in Australian English. Shared building blocks live in `src/components/ui.tsx`; use them instead of one-off styles. Tokens are in `src/app/globals.css`.

## Project structure

```
src/
  app/
    (site)/            public pages; share one header, footer and WhatsApp button
    portal/            dealer portal (top tabs, plain wording)
    admin/             staff desk; actions.ts = staff-only server actions (pricing)
  components/          ui.tsx primitives, SiteHeader, SiteFooter, TyreFinder, AddToCart…
  context/AppContext   interim browser-side state (replaced by MongoDB in step 2)
  data/                mockData (catalogue, branches), site (contact details), content (news, jobs)
  lib/                 availability bands, ABN check, status labels, tyre helpers, interim auth
  server/              server-only modules (price matrix)
  proxy.ts             interim Basic auth for /portal and /admin
```

## Next steps

1. MongoDB (Atlas, Sydney) with Mongoose models: dealers, users, applications, products, stock, priceMatrix, pricingRequests, orders, locations.
2. Better Auth: staff-created dealer accounts with invite links, passkeys or password + MFA; remove the Basic auth guard.
3. Server actions for cart → pricing request → quote → order, every query scoped to the dealer's ID, quote → order in one transaction.
4. Email and SMS notifications, real ABN lookup, working contact, careers and application forms.
5. Real content: the client's tyre range, opening hours, email, WhatsApp number (`src/data/site.ts`), photos, videos, logo, and approved legal pages.
6. Video banner slider, interactive map, per-page metadata, sitemap, robots, structured data and 301 redirects from the old `?page_id=` URLs.

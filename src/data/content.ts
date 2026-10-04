/**
 * Sample news and job content.
 * TODO(client): replace with real posts and roles (later managed in the CMS).
 */

export interface Article {
  slug: string;
  title: string;
  date: string; // ISO
  category: string;
  summary: string;
  body: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'ralson-australian-distribution',
    title: 'We’re now the authorised Ralson distributor',
    date: '2026-10-01',
    category: 'News',
    summary: 'Ralson truck tyres, straight from the source, for fleets and dealers across Queensland.',
    body: [
      'Ultimate Tyres is now the authorised Australian distributor for Ralson truck tyres.',
      'That means better stock, quicker supply and proper warranty support for our fleets and dealers.',
      'Dealers can log in to see availability and send through a pricing request any time.',
    ],
  },
  {
    slug: 'steer-vs-drive-axle-guide',
    title: 'Steer, drive or trailer: which tyre goes where?',
    date: '2026-09-24',
    category: 'Guide',
    summary: 'A quick guide to picking the right tyre for each axle.',
    body: [
      'Steer tyres are built to hold a straight line and wear evenly at the front.',
      'Drive tyres have deeper, blockier tread to put the power down.',
      'Trailer tyres are made to carry weight and resist scrubbing on tight turns.',
      'Putting the right tyre in the right spot saves money and keeps you safer. Not sure? Give us a ring.',
    ],
  },
  {
    slug: 'laser-alignment-cuts-fuel-drag',
    title: 'Why wheel alignment saves you money',
    date: '2026-09-12',
    category: 'Guide',
    summary: 'Out-of-line wheels wear tyres fast and burn extra fuel.',
    body: [
      'When wheels are out of line, tyres scrub along the road instead of rolling cleanly.',
      'That wears them out early and makes the engine work harder.',
      'A regular alignment check is one of the cheapest ways to cut running costs.',
    ],
  },
];

export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
}

export const JOBS: Job[] = [
  {
    id: 'mobile-tyre-fitter',
    title: 'Mobile truck tyre fitter',
    location: 'Brisbane',
    type: 'Full time',
    summary: 'Fit truck tyres at depots and on the roadside from a fully kitted-out van.',
  },
  {
    id: 'wheel-alignment-tech',
    title: 'Wheel alignment technician',
    location: 'Rocklea and Yatala',
    type: 'Full time',
    summary: 'Align trucks, trailers and buses using laser gear.',
  },
  {
    id: 'fleet-sales',
    title: 'Fleet and dealer sales rep',
    location: 'Brisbane and Gold Coast',
    type: 'Full time',
    summary: 'Look after our fleet customers and dealers, and grow the network.',
  },
];

/** "2026-10-01" → "1 October 2026" (Australian format). */
export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

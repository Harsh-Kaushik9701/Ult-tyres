/**
 * SEO copy for every fixed page: meta title, meta description, meta keywords and the text
 * drawn on its share image (og:image). Edit here; pages and share images read from it.
 *
 * Guide: title under 60 characters (" | Ultimate Tyres" is added), description 120–160.
 * Tyre, service and news pages build theirs from their own data (see src/lib/seo.ts).
 */

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  /** Use the title exactly, without " | Ultimate Tyres" (home page only). */
  absoluteTitle?: boolean;
  noIndex?: boolean;
  og: { eyebrow: string; title: string; subtitle?: string };
}

export const SEO = {
  home: {
    path: '/',
    absoluteTitle: true,
    title: 'Truck Tyres Brisbane & 24/7 Mobile Service | Ultimate Tyres',
    description:
      'Ralson, Blacklion and Triangle truck and bus tyres, supplied and fitted in Brisbane. 24/7 mobile tyre service from Rocklea, Yatala and Bald Hills.',
    keywords: [
      'truck tyres Brisbane',
      'mobile truck tyre service',
      '24/7 truck tyre repair',
      'truck tyre fitting Rocklea',
      'bus tyres Brisbane',
      'fleet tyre service',
    ],
    og: { eyebrow: 'Truck and bus tyres · Brisbane', title: 'Your fleet. Our drive.', subtitle: '24/7 mobile service from Rocklea, Yatala and Bald Hills.' },
  },
  tyres: {
    path: '/tyres',
    title: 'Truck & Bus Tyres: Ralson, Blacklion, Triangle',
    description:
      'Browse Ralson, Blacklion and Triangle truck and bus tyres for steer, drive and trailer axles. In stock in Brisbane and fitted at three branches.',
    keywords: ['truck tyres', 'bus tyres', 'commercial truck tyres', 'steer tyres', 'drive tyres', 'trailer tyres'],
    og: { eyebrow: 'Our tyre range', title: 'Ralson. Blacklion. Triangle.', subtitle: 'Steer, drive and trailer tyres in stock.' },
  },
  truckTyres: {
    path: '/tyres/truck',
    title: 'Truck Tyres Brisbane: Steer, Drive & Trailer',
    description:
      'Steer, drive and trailer truck tyres in 11R22.5, 295/80R22.5 and more. Search by size and get them fitted in Rocklea, Yatala or Bald Hills.',
    keywords: ['truck tyres Brisbane', '11R22.5 tyres', '295/80R22.5 tyres', 'steer tyres', 'drive tyres', 'trailer tyres', 'prime mover tyres'],
    og: { eyebrow: 'Truck tyres', title: 'Steer. Drive. Trailer.', subtitle: 'Search by size, fitted at three branches.' },
  },
  busTyres: {
    path: '/tyres/bus',
    title: 'Bus & Coach Tyres Brisbane',
    description:
      'Urban bus and coach tyres from Ralson, Blacklion and Triangle. Built for stop-start city work and long coach runs, fitted in Brisbane.',
    keywords: ['bus tyres', 'coach tyres', 'urban bus tyres Brisbane', 'city bus tyres'],
    og: { eyebrow: 'Bus tyres', title: 'Built for the bus route.', subtitle: 'Urban bus and coach tyres.' },
  },
  fleetServices: {
    path: '/fleet-services',
    title: 'Fleet Services & Truck Maintenance Brisbane',
    description:
      'Truck maintenance, wheel alignment, balancing, tyre fitting, nitrogen inflation and puncture proofing. In our bays or at your depot, 24/7.',
    keywords: [
      'fleet tyre services',
      'truck maintenance Brisbane',
      'truck wheel alignment',
      'wheel balancing',
      'nitrogen tyre inflation',
      'puncture proofing',
      'mobile tyre fitting',
    ],
    og: { eyebrow: 'Fleet services', title: 'We keep you rolling.', subtitle: 'Alignment, balancing and fitting, in the bay or on the road.' },
  },
  wheelAlignment: {
    path: '/fleet-services/wheel-alignment',
    title: 'Truck Wheel Alignment Brisbane',
    description:
      'Truck, trailer and car wheel alignment in Brisbane. Straight wheels cut tyre wear and fuel use. Book at Rocklea, Yatala or Bald Hills.',
    keywords: ['truck wheel alignment Brisbane', 'trailer alignment', 'wheel alignment Rocklea', 'laser wheel alignment', 'reduce tyre wear'],
    og: { eyebrow: 'Wheel alignment', title: 'Straight wheels. Less fuel.', subtitle: 'Truck, trailer and car alignment in Brisbane.' },
  },
  readyFit: {
    path: '/fleet-services/ultimate-readyfit',
    title: 'Ultimate ReadyFit: Tyres Fitted to Rims',
    description:
      'Tyres delivered already fitted and balanced on rims, ready to bolt on. Less downtime for your fleet. We take the old casings away.',
    keywords: ['tyres fitted to rims', 'tyre and rim assembly', 'tyre exchange', 'ReadyFit', 'fleet downtime'],
    og: { eyebrow: 'Ultimate ReadyFit', title: 'Fitted. Balanced. Ready.', subtitle: 'Tyres on rims, delivered ready to bolt on.' },
  },
  about: {
    path: '/about-us',
    title: 'About Us: Brisbane Truck Tyre Specialists',
    description:
      'Ultimate Tyres is a Brisbane truck tyre and wheel business led by Manjinder, with 15+ years on the tools. Quality tyres, honest service, fair prices.',
    keywords: ['about Ultimate Tyres', 'Brisbane truck tyre specialists', 'independent tyre dealer Queensland', 'truck tyre business'],
    og: { eyebrow: 'About us', title: 'Honest service. Fair prices.', subtitle: 'Brisbane truck tyre specialists.' },
  },
  news: {
    path: '/news',
    title: 'News, Events & Tyre Insights',
    description:
      'News from Ultimate Tyres plus practical tyre insights for fleets: tread life, alignment, steer vs drive tyres and cutting cost per kilometre.',
    keywords: ['truck tyre news', 'tyre tips', 'fleet tyre insights', 'cost per kilometre tyres', 'tyre maintenance advice'],
    og: { eyebrow: 'News & insights', title: 'Tyre talk for fleets.', subtitle: 'News, events and practical tyre advice.' },
  },
  networkMap: {
    path: '/network-map',
    title: 'Find a Branch: Rocklea, Yatala & Bald Hills',
    description:
      'Find your nearest Ultimate Tyres branch on the map: Rocklea, Yatala and Bald Hills. Get directions or call our 24/7 mobile truck tyre service.',
    keywords: ['tyre shop near me', 'truck tyres Rocklea', 'truck tyres Yatala', 'truck tyres Bald Hills', 'tyre branch map'],
    og: { eyebrow: 'Network map', title: 'Three branches. One number.', subtitle: 'Rocklea · Yatala · Bald Hills' },
  },
  contact: {
    path: '/contact',
    title: 'Contact Us: 1300 110 002',
    description:
      'Call 1300 110 002, WhatsApp or send a message. 24/7 mobile truck tyre service. Branches at Rocklea, Yatala and Bald Hills, Queensland.',
    keywords: ['contact Ultimate Tyres', 'truck tyre quote', 'mobile tyre service phone', '24/7 tyre service Brisbane'],
    og: { eyebrow: 'Contact', title: 'Call 1300 110 002.', subtitle: 'Or WhatsApp us. We’re on standby 24/7.' },
  },
  joinUs: {
    path: '/join-us',
    title: 'Join Us: Dealers & Careers',
    description:
      'Become an Ultimate Tyres dealer and order Ralson, Blacklion and Triangle tyres online, or join our Brisbane team of tyre technicians.',
    keywords: ['tyre dealer opportunity', 'tyre jobs Brisbane', 'tyre technician jobs', 'become a tyre dealer'],
    og: { eyebrow: 'Join us', title: 'Sell our tyres. Join our team.' },
  },
  becomeDealer: {
    path: '/join-us/become-a-dealer',
    title: 'Become a Dealer: Wholesale Truck Tyres',
    description:
      'Apply for an Ultimate Tyres dealer account. Order Ralson, Blacklion and Triangle truck tyres online with trade pricing and live stock.',
    keywords: ['wholesale truck tyres', 'tyre dealer account', 'trade tyre pricing', 'Ralson dealer', 'Blacklion dealer', 'Triangle dealer'],
    og: { eyebrow: 'For dealers', title: 'Live stock. Instant orders.', subtitle: 'Apply for a trade account.' },
  },
  careers: {
    path: '/join-us/careers',
    title: 'Careers: Tyre Technician Jobs Brisbane',
    description:
      'Work with Ultimate Tyres in Brisbane. Roles for truck tyre fitters, mobile service technicians and workshop staff at three branches.',
    keywords: ['tyre fitter jobs Brisbane', 'truck tyre technician jobs', 'mobile tyre technician', 'workshop jobs Brisbane'],
    og: { eyebrow: 'Careers', title: 'Join the crew.', subtitle: 'Tyre fitters and technicians, Brisbane.' },
  },
  dealerLogin: {
    path: '/dealer/login',
    title: 'Dealer Login',
    description: 'Dealer portal login for Ultimate Tyres trade customers. Check stock, build an order and request your trade price.',
    keywords: ['Ultimate Tyres dealer login', 'tyre dealer portal'],
    og: { eyebrow: 'Dealer portal', title: 'Dealer login.', subtitle: 'Check stock and order online.' },
  },
  privacy: {
    path: '/legal/privacy',
    title: 'Privacy Policy',
    description: 'How Ultimate Tyres collects, uses and protects your personal information under the Privacy Act 1988.',
    keywords: ['privacy policy'],
    og: { eyebrow: 'Legal', title: 'Privacy policy.' },
  },
  terms: {
    path: '/legal/terms-of-trade',
    title: 'Terms of Trade',
    description: 'Terms of trade for Ultimate Tyres dealer accounts, quotes and orders.',
    keywords: ['terms of trade'],
    og: { eyebrow: 'Legal', title: 'Terms of trade.' },
  },
} satisfies Record<string, PageSeo>;

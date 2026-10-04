/**
 * Business details shown across the site. Change them here once.
 * TODO(client): confirm email address and WhatsApp number before launch.
 */
export const SITE = {
  name: 'Ultimate Tyres',
  tagline: 'Your fleet. Our drive.',
  phone: '1300 110 002',
  phoneHref: 'tel:1300110002',
  email: 'sales@ultimatetyres.com.au',
  whatsappHref:
    'https://wa.me/61400000000?text=' + encodeURIComponent("G'day Ultimate Tyres, I'm after some truck tyres."),
  facebook: 'https://www.facebook.com/Ultimate-tyre-services-Brisbane-2420151501575327',
  instagram: 'https://www.instagram.com/Ultimatetyreservices/',
};

export const NAV = [
  {
    label: 'Tyres',
    href: '/tyres',
    children: [
      { label: 'All tyres', href: '/tyres' },
      { label: 'Truck tyres', href: '/tyres/truck' },
      { label: 'Bus tyres', href: '/tyres/bus' },
      { label: 'Ralson', href: '/tyres/ralson' },
      { label: 'Blacklion', href: '/tyres/blacklion' },
      { label: 'Triangle', href: '/tyres/triangle' },
    ],
  },
  {
    label: 'Fleet Services',
    href: '/fleet-services',
    children: [
      { label: 'All services', href: '/fleet-services' },
      { label: 'Truck maintenance', href: '/fleet-services/truck-maintenance' },
      { label: 'Wheel alignment', href: '/fleet-services/wheel-alignment' },
      { label: 'Wheel balancing', href: '/fleet-services/wheel-balancing' },
      { label: 'Steering & suspension', href: '/fleet-services/steering-suspension-repair' },
      { label: 'Nitrogen inflation', href: '/fleet-services/nitrogen-tyre-inflation' },
      { label: 'Puncture proofing', href: '/fleet-services/puncture-proofing' },
      { label: 'Tyre fitting', href: '/fleet-services/tyre-fitting' },
      { label: 'Ultimate ReadyFit', href: '/fleet-services/ultimate-readyfit' },
      { label: 'U-Wheels', href: '/fleet-services/u-wheels' },
    ],
  },
  { label: 'About', href: '/about-us' },
  { label: 'News', href: '/news' },
  { label: 'Network Map', href: '/network-map' },
  { label: 'Contact', href: '/contact' },
  {
    label: 'Join Us',
    href: '/join-us',
    children: [
      { label: 'Become a dealer', href: '/join-us/become-a-dealer' },
      { label: 'Careers', href: '/join-us/careers' },
    ],
  },
] as const;

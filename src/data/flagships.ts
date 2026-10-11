import type { Pattern } from '@/types';

/**
 * Flagship truck patterns for each brand, with details taken from the manufacturers'
 * own product pages (see the `source` URLs in brandImages.json).
 * TODO(client): confirm which sizes Ultimate Tyres stocks; staff add SKUs in Admin › Tyres.
 */
function flagship(p: Omit<Pattern, 'heroImage' | 'treadImage' | 'datasheetPdf' | 'skus' | 'category'>): Pattern {
  return { ...p, category: 'truck', heroImage: '', treadImage: '', datasheetPdf: '', skus: [] };
}

export const FLAGSHIP_PATTERNS: Pattern[] = [
  flagship({
    id: 'ralson-rsl51',
    brandId: 'ralson',
    brandName: 'Ralson',
    code: 'RSL51',
    name: 'Ralson RSL51',
    positions: ['steer'],
    applications: ['long-haul'],
    description:
      'Closed-shoulder steer tyre for heavy-duty line haul. Built for grip, high mileage and long tread and casing life.',
    features: [
      'Low-heat tread compound resists lateral forces and reduces wear',
      'Tread design spreads pressure evenly across the footprint',
      'Lower shoulder groove absorbs impact and protects the shoulder rib',
      'Sacrificial grooves and premium compounds for longer casing life',
    ],
    treadDepthMm: 12.7,
    plyRating: '16PR',
  }),
  flagship({
    id: 'ralson-rdl52',
    brandId: 'ralson',
    brandName: 'Ralson',
    code: 'RDL52',
    name: 'Ralson RDL52',
    positions: ['drive'],
    applications: ['long-haul'],
    description:
      'Closed-shoulder line-haul drive tyre. Stable at highway speed with smooth, even wear and strong wet traction.',
    features: [
      'Sinusoidal grooves with stone ejectors stop stones lodging in the tread',
      'Multi-dimensional sipes keep traction and braking grip as the tyre wears',
      'Closed shoulder lowers rolling resistance for better fuel economy',
      'Balanced rib layout for stability and longer mileage',
    ],
    treadDepthMm: 19.8,
    plyRating: '16PR',
  }),
  flagship({
    id: 'ralson-rdl55',
    brandId: 'ralson',
    brandName: 'Ralson',
    code: 'RDL55',
    name: 'Ralson RDL55',
    positions: ['drive'],
    applications: ['long-haul'],
    description:
      'Open-shoulder line-haul drive tyre with deep tread, stable blocks and a strong casing for long-distance work.',
    features: [
      'Open shoulder improves traction and heat dissipation',
      'Dense centre sipes give many biting edges for grip',
      'Tie-bar blocks improve block stability and even wear',
      'Sinusoidal shoulder grooves help prevent stone retention',
    ],
    treadDepthMm: 19.8,
    plyRating: '16PR',
  }),
  flagship({
    id: 'ralson-rtr51',
    brandId: 'ralson',
    brandName: 'Ralson',
    code: 'RTR51',
    name: 'Ralson RTR51',
    positions: ['trailer'],
    applications: ['regional'],
    description:
      'Closed-shoulder trailer tyre for heavy regional work with high scrub, on closed and spread-axle trailers.',
    features: [
      'Full-depth multi-dimensional sipes reduce irregular wear and rib tearing',
      'Chamfered solid shoulder resists side forces in high-scrub use',
      'Corrugated cooling fins shed heat to extend casing life',
      'Wider shoulder rib for lateral stability',
    ],
    treadDepthMm: 0, // TODO(client): confirm tread depth for the sizes stocked
    plyRating: '',
  }),
  flagship({
    id: 'blacklion-bf188',
    brandId: 'blacklion',
    brandName: 'Blacklion',
    code: 'BF188',
    name: 'Blacklion BF188',
    positions: ['steer'], // TODO(client): confirm position (Blacklion "F" codes are front-axle patterns)
    applications: ['long-haul'],
    description: 'Long-haul pattern for medium and long-mileage trucks on sealed roads and highways.',
    features: [],
    treadDepthMm: 0,
    plyRating: '',
  }),
  flagship({
    id: 'triangle-trd06',
    brandId: 'triangle',
    brandName: 'Triangle',
    code: 'TRD06',
    name: 'Triangle TRD06',
    positions: ['drive'],
    applications: ['regional'],
    description: 'Directional regional drive tyre with excellent and even wear. Large, low-void blocks resist uneven wear.',
    features: [
      'Directional tread to reduce wear',
      'Low void ratio, large block design for even wear and traction',
      '20.5 mm tread depth in 11R22.5',
    ],
    treadDepthMm: 20.5,
    plyRating: '',
  }),
  flagship({
    id: 'triangle-trt02',
    brandId: 'triangle',
    brandName: 'Triangle',
    code: 'TRT02',
    name: 'Triangle TRT02',
    positions: ['trailer'],
    applications: ['regional'],
    description: 'Wide-base trailer tyre with good wear, in 385/65R22.5 and 385/55R22.5.',
    features: ['Wide-base design for trailer axles', '4,500 kg single load at 900 kPa (160J)', '12.0 mm tread depth in 385/65R22.5'],
    treadDepthMm: 12,
    plyRating: '20PR',
  }),
];

export const FLAGSHIP_IDS = new Set(FLAGSHIP_PATTERNS.map((p) => p.id));

/** Patterns shown in the home page brand showcase, in order. */
export const SHOWCASE: Record<'ralson' | 'blacklion' | 'triangle', string[]> = {
  ralson: ['ralson-rsl51', 'ralson-rdl52', 'ralson-rdl55', 'ralson-rtr51'],
  blacklion: ['blacklion-bf188', 'blacklion-bd175', 'blacklion-bt165'],
  triangle: ['triangle-trs02', 'triangle-tr688', 'triangle-trd06', 'triangle-trt02'],
};

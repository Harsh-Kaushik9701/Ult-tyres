/**
 * Photos and video used around the public site.
 *
 * TEMPORARY: everything below is free stock from Pexels (pexels.com/license: free for
 * commercial use, no credit required), loaded straight from Pexels' servers until the
 * client supplies their own. To swap one, put the new file in /public/media/ and change
 * its `src` to "/media/<file>". Keep `alt` describing what is actually in the new photo.
 *
 * TODO(client): replace with real Ultimate Tyres photos (branches, team, van, bays) and a
 * 10–15 s hero clip. Stock trucks are mostly American; local trucks will read better.
 */

export interface MediaPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Where it came from, so it can be found again or replaced. */
  credit: string;
}

const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

export const MEDIA = {
  heroVideo: {
    src: 'https://videos.pexels.com/video-files/6685034/6685034-uhd_2560_1440_30fps.mp4',
    credit: 'Gustavo Fring, Pexels 6685034 (close-up of a truck wheel turning)',
  },
  workshopVideo: {
    src: 'https://videos.pexels.com/video-files/6685053/6685053-uhd_2560_1440_30fps.mp4',
    credit: 'Pexels 6685053 (mechanic inspecting a truck wheel)',
  },
  /**
   * Prime mover and trailer for the axle finder (Unsplash licence, free to use).
   * TODO(client): swap for a side-on photo of one of your own trucks.
   */
  truckRig: {
    src: 'https://images.unsplash.com/photo-1711942179703-fce59b6afac6',
    alt: 'White prime mover with a refrigerated trailer parked on the roadside',
    width: 1600,
    height: 1067,
    credit: 'Bernd Dittrich, Unsplash OtbeW0R6RFo',
  },
  fitting: {
    src: pexels(6720515),
    alt: 'Mechanic lifting a large tyre in a workshop',
    width: 1600,
    height: 1067,
    credit: 'Pexels 6720515',
  },
  mobileVan: {
    src: pexels(8660855),
    alt: 'Service truck loaded with tyres',
    width: 1600,
    height: 1067,
    credit: 'Pexels 8660855',
  },
  roadsideRepair: {
    src: pexels(34261459),
    alt: 'Technician repairing a flat tyre on a truck',
    width: 1600,
    height: 1067,
    credit: 'Pexels 34261459',
  },
  stackedTyres: {
    src: pexels(29348624),
    alt: 'Truck tyres stacked and ready to fit',
    width: 1600,
    height: 1067,
    credit: 'Pexels 29348624',
  },
  tyreCloseUp: {
    src: pexels(5578887),
    alt: 'Close-up of a truck tyre tread',
    width: 1600,
    height: 1067,
    credit: 'Pexels 5578887',
  },
} satisfies Record<string, MediaPhoto | { src: string; credit: string }>;

/** Brand names shown in the moving strip (text only, no logos). TODO(client): confirm list. */
export const BRANDS_SUPPLIED = [
  'Ralson',
  'Blacklion',
  'Triangle',
  'Michelin',
  'Bridgestone',
  'Continental',
  'Goodyear',
  'Yokohama',
  'Hankook',
  'Maxxis',
];

/**
 * Optional: wheel positions on the truck photo, as [left %, top %] from the photo's top-left.
 * When set, glowing pins sit on the real wheels and can be tapped. Leave as null to show only
 * the axle buttons under the photo (works with any photo).
 * Example: { steer: [[18, 78]], drive: [[38, 80], [45, 80]], trailer: [[78, 80], [85, 80], [92, 80]] }
 */
export const TRUCK_HOTSPOTS: Record<'steer' | 'drive' | 'trailer', [number, number][]> | null = null;

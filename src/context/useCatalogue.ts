'use client';

import { useEffect, useMemo, useState } from 'react';
import type { AxlePosition, Pattern, ProductSku, TyreApplication, TyreCategory } from '@/types';
import { BRANDS, PATTERNS, SKUS } from '@/data/mockData';
import { normaliseSize } from '@/lib/tyres';

/**
 * Tyre catalogue store (patterns + sizes + stock).
 *
 * Interim: saved in the browser (localStorage) so the admin screens work end to end.
 * Step 2 replaces this with MongoDB (`patterns`, `products`, `stock` collections)
 * behind staff-only server actions. Keep the action names; only their insides change.
 */

const STORAGE_KEY = 'ut_catalogue_v1';

/** Patterns are stored without their sizes; sizes live in one list and are joined on read. */
type StoredPattern = Omit<Pattern, 'skus'>;

interface CatalogueData {
  patterns: StoredPattern[];
  skus: ProductSku[];
}

const INITIAL: CatalogueData = {
  patterns: PATTERNS.map(({ skus, ...rest }) => {
    void skus;
    return rest;
  }),
  skus: SKUS,
};

export interface NewPatternInput {
  brandId: string;
  code: string;
  category: TyreCategory;
  positions: AxlePosition[];
  applications: TyreApplication[];
  description: string;
}

export interface SizeInput {
  size: string;
  axlePosition: AxlePosition;
  loadIndexSingle: number;
  loadIndexDual: number;
  speedSymbol: string;
  plyRating: string;
  treadDepthMm: number;
  tubeless: 'TL' | 'TT';
}

export interface StockInput {
  rocklea: number;
  yatala: number;
  baldhills: number;
  incomingQty: number;
  incomingEta: string;
}

const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const clampQty = (n: number) => (Number.isFinite(n) ? Math.min(99999, Math.max(0, Math.floor(n))) : 0);

export function useCatalogueState(hydrated: boolean) {
  const [data, setData] = useState<CatalogueData>(INITIAL);
  const [loaded, setLoaded] = useState(false);

  // Load saved catalogue once the app has hydrated (same pattern as the rest of AppContext).
  useEffect(() => {
    if (!hydrated || loaded) return;
    /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from browser storage */
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CatalogueData;
        if (Array.isArray(parsed.patterns) && Array.isArray(parsed.skus)) setData(parsed);
      }
    } catch {
      // Keep defaults.
    }
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [hydrated, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [loaded, data]);

  /** Every pattern with its sizes attached (admin view: includes hidden ones). */
  const allPatterns: Pattern[] = useMemo(
    () => data.patterns.map((p) => ({ ...p, skus: data.skus.filter((s) => s.patternId === p.id) })),
    [data]
  );

  /** What dealers and the public see: visible patterns, and visible sizes of visible patterns. */
  const visiblePatterns: Pattern[] = useMemo(
    () =>
      allPatterns
        .filter((p) => p.active !== false)
        .map((p) => ({ ...p, skus: p.skus.filter((s) => s.active !== false) })),
    [allPatterns]
  );
  const visibleSkus: ProductSku[] = useMemo(() => visiblePatterns.flatMap((p) => p.skus), [visiblePatterns]);

  // ---------- actions (staff only; enforced server-side in step 2) ----------

  /** Adds a pattern. Returns its id, or an error message. */
  const addPattern = (input: NewPatternInput): { id: string } | { error: string } => {
    const brand = BRANDS.find((b) => b.id === input.brandId);
    const code = input.code.trim().toUpperCase();
    if (!brand) return { error: 'Pick a brand.' };
    if (!code) return { error: 'Enter the pattern code.' };
    if (!input.positions.length) return { error: 'Pick at least one position.' };
    if (data.patterns.some((p) => p.brandId === brand.id && p.code.toUpperCase() === code)) {
      return { error: `${brand.name} ${code} already exists.` };
    }
    const pattern: StoredPattern = {
      id: `${brand.id}-${slug(code)}`,
      brandId: brand.id,
      brandName: brand.name,
      code,
      name: `${brand.name} ${code}`,
      category: input.category,
      positions: input.positions,
      applications: input.applications,
      features: [],
      description: input.description.trim(),
      treadDepthMm: 0,
      plyRating: '',
      heroImage: '',
      treadImage: '',
      datasheetPdf: '',
      active: true,
    };
    setData((d) => ({ ...d, patterns: [...d.patterns, pattern] }));
    return { id: pattern.id };
  };

  const updatePattern = (
    id: string,
    patch: Partial<Pick<StoredPattern, 'category' | 'positions' | 'applications' | 'description' | 'active'>>
  ) => {
    setData((d) => ({ ...d, patterns: d.patterns.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  };

  /** Returns an error message, or null on success. */
  const addSize = (patternId: string, input: SizeInput, stock?: Partial<StockInput>): string | null => {
    const pattern = data.patterns.find((p) => p.id === patternId);
    if (!pattern) return 'Tyre not found.';
    const size = input.size.trim().toUpperCase();
    if (!/^\d/.test(size) || normaliseSize(size).length < 4) return 'Enter a size like 11R22.5 or 295/80R22.5.';
    if (data.skus.some((s) => s.patternId === patternId && normaliseSize(s.size) === normaliseSize(size))) {
      return `${pattern.code} already has size ${size}.`;
    }
    const li = clampQty(input.loadIndexSingle);
    const lid = clampQty(input.loadIndexDual);
    const speed = input.speedSymbol.trim().toUpperCase();
    const sku: ProductSku = {
      id: `${pattern.id}-${normaliseSize(size)}`,
      patternId: pattern.id,
      patternCode: pattern.code,
      brandName: pattern.brandName,
      size,
      fullSizeCode: [size, li ? `${li}${lid ? `/${lid}` : ''}${speed}` : ''].filter(Boolean).join(' '),
      loadIndexSingle: li,
      loadIndexDual: lid,
      speedSymbol: speed,
      plyRating: input.plyRating.trim(),
      tubeless: input.tubeless,
      treadDepthMm: Math.max(0, Number(input.treadDepthMm) || 0),
      overallDiameterMm: 0,
      sectionWidthMm: 0,
      approvedRim: '',
      maxLoadSingleKg: 0,
      maxLoadDualKg: 0,
      maxInflationKpa: 0,
      weightKg: 0,
      axlePosition: input.axlePosition,
      application: pattern.applications[0] ?? 'regional',
      category: pattern.category,
      inStockBranches: {
        rocklea: clampQty(stock?.rocklea ?? 0),
        yatala: clampQty(stock?.yatala ?? 0),
        baldhills: clampQty(stock?.baldhills ?? 0),
      },
      incomingQty: clampQty(stock?.incomingQty ?? 0),
      incomingEta: stock?.incomingEta ?? '',
      active: true,
    };
    setData((d) => ({ ...d, skus: [...d.skus, sku] }));
    return null;
  };

  const updateSize = (skuId: string, patch: Partial<Pick<ProductSku, 'active' | 'plyRating' | 'treadDepthMm' | 'axlePosition'>>) => {
    setData((d) => ({ ...d, skus: d.skus.map((s) => (s.id === skuId ? { ...s, ...patch } : s)) }));
  };

  const setStock = (skuId: string, patch: Partial<StockInput>) => {
    setData((d) => ({
      ...d,
      skus: d.skus.map((s) =>
        s.id !== skuId
          ? s
          : {
              ...s,
              inStockBranches: {
                rocklea: patch.rocklea !== undefined ? clampQty(patch.rocklea) : s.inStockBranches.rocklea,
                yatala: patch.yatala !== undefined ? clampQty(patch.yatala) : s.inStockBranches.yatala,
                baldhills: patch.baldhills !== undefined ? clampQty(patch.baldhills) : s.inStockBranches.baldhills,
              },
              incomingQty: patch.incomingQty !== undefined ? clampQty(patch.incomingQty) : s.incomingQty,
              incomingEta: patch.incomingEta !== undefined ? patch.incomingEta : s.incomingEta,
            }
      ),
    }));
  };

  /** Apply many stock rows at once (CSV upload). Returns how many sizes were updated. */
  const bulkSetStock = (rows: { skuId: string; stock: Partial<StockInput> }[]) => {
    const byId = new Map(rows.map((r) => [r.skuId, r.stock]));
    const count = data.skus.filter((s) => byId.has(s.id)).length;
    setData((d) => ({
      ...d,
      skus: d.skus.map((s) => {
        const p = byId.get(s.id);
        if (!p) return s;
        return {
          ...s,
          inStockBranches: {
            rocklea: p.rocklea !== undefined ? clampQty(p.rocklea) : s.inStockBranches.rocklea,
            yatala: p.yatala !== undefined ? clampQty(p.yatala) : s.inStockBranches.yatala,
            baldhills: p.baldhills !== undefined ? clampQty(p.baldhills) : s.inStockBranches.baldhills,
          },
          incomingQty: p.incomingQty !== undefined ? clampQty(p.incomingQty) : s.incomingQty,
          incomingEta: p.incomingEta !== undefined ? p.incomingEta : s.incomingEta,
        };
      }),
    }));
    return count;
  };

  return {
    catalogueLoaded: loaded,
    allPatterns,
    allSkus: data.skus,
    visiblePatterns,
    visibleSkus,
    addPattern,
    updatePattern,
    addSize,
    updateSize,
    setStock,
    bulkSetStock,
  };
}

export type CatalogueState = ReturnType<typeof useCatalogueState>;

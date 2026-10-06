'use client';

import { useMemo, useRef, useState } from 'react';
import { Download, Search, Upload } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { ProductSku } from '@/types';
import type { StockInput } from '@/context/useCatalogue';
import { Button } from '@/components/ui';
import { matchesQuery, normaliseSize } from '@/lib/tyres';
import { availabilityBand, totalStock, AVAILABILITY_LABEL } from '@/lib/availability';

const BRANCH_COLS = [
  { key: 'rocklea', label: 'Rocklea' },
  { key: 'yatala', label: 'Yatala' },
  { key: 'baldhills', label: 'Bald Hills' },
] as const;

const CSV_HEADER = 'id,brand,pattern,size,rocklea,yatala,baldhills,incoming,eta';

/** Minimal CSV line splitter (handles quoted values). */
function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (quoted && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else quoted = !quoted;
    } else if (c === ',' && !quoted) {
      out.push(cur.trim());
      cur = '';
    } else cur += c;
  }
  out.push(cur.trim());
  return out;
}

function csvFor(skus: ProductSku[]): string {
  const esc = (v: string | number) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
  const rows = skus.map((s) =>
    [s.id, s.brandName, s.patternCode, s.size, s.inStockBranches.rocklea, s.inStockBranches.yatala, s.inStockBranches.baldhills, s.incomingQty, s.incomingEta]
      .map(esc)
      .join(',')
  );
  return [CSV_HEADER, ...rows].join('\n');
}

function StockInputCell({
  value,
  onCommit,
  label,
}: {
  value: number;
  onCommit: (n: number) => void;
  label: string;
}) {
  return (
    <input
      type="number"
      min={0}
      inputMode="numeric"
      value={value}
      onChange={(e) => onCommit(Number(e.target.value))}
      aria-label={label}
      className="w-20 rounded-lg border border-line bg-white px-2 py-1.5 text-right tabular-nums focus:border-ink focus:outline-none"
    />
  );
}

export default function StockTab() {
  const { catalogue } = useApp();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ ok: number; skipped: string[] } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const rows = useMemo(
    () => catalogue.allSkus.filter((s) => matchesQuery(s, query) || s.brandName.toLowerCase().includes(query.toLowerCase())),
    [catalogue.allSkus, query]
  );

  const downloadTemplate = () => {
    const blob = new Blob([csvFor(catalogue.allSkus)], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ultimate-tyres-stock-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const lines = String(reader.result).split(/\r?\n/).filter((l) => l.trim());
      if (lines.length < 2) {
        setResult({ ok: 0, skipped: ['The file has no rows.'] });
        return;
      }
      const header = splitCsvLine(lines[0]).map((h) => h.toLowerCase());
      const col = (name: string) => header.indexOf(name);
      const updates: { skuId: string; stock: Partial<StockInput> }[] = [];
      const skipped: string[] = [];

      lines.slice(1).forEach((line, i) => {
        const v = splitCsvLine(line);
        const get = (name: string) => (col(name) >= 0 ? v[col(name)] ?? '' : '');
        const id = get('id');
        let sku = id ? catalogue.allSkus.find((s) => s.id === id) : undefined;
        if (!sku) {
          // Fall back to brand + pattern + size.
          sku = catalogue.allSkus.find(
            (s) =>
              s.brandName.toLowerCase() === get('brand').toLowerCase() &&
              s.patternCode.toLowerCase() === get('pattern').toLowerCase() &&
              normaliseSize(s.size) === normaliseSize(get('size'))
          );
        }
        if (!sku) {
          skipped.push(`Row ${i + 2}: no matching tyre (${[get('brand'), get('pattern'), get('size')].filter(Boolean).join(' ') || id || 'blank'})`);
          return;
        }
        const numOrUndef = (name: string) => {
          const raw = get(name);
          if (raw === '') return undefined;
          const n = Number(raw);
          return Number.isFinite(n) ? n : undefined;
        };
        updates.push({
          skuId: sku.id,
          stock: {
            rocklea: numOrUndef('rocklea'),
            yatala: numOrUndef('yatala'),
            baldhills: numOrUndef('baldhills'),
            incomingQty: numOrUndef('incoming'),
            incomingEta: col('eta') >= 0 ? get('eta') : undefined,
          },
        });
      });

      const ok = catalogue.bulkSetStock(updates);
      setResult({ ok, skipped });
    };
    reader.readAsText(file);
  };

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Stock</h1>
          <p className="mt-1 text-muted">Changes save straight away. Dealers see In stock, Low stock or On order, never the numbers.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={downloadTemplate}>
            <Download className="h-4 w-4" aria-hidden /> Download CSV
          </Button>
          <Button type="button" variant="dark" onClick={() => fileRef.current?.click()}>
            <Upload className="h-4 w-4" aria-hidden /> Upload CSV
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = '';
            }}
          />
        </div>
      </div>

      {result && (
        <div className="mt-6 rounded-2xl bg-panel px-5 py-4 text-[15px]" role="status">
          <p className="font-medium text-ok">
            Updated {result.ok} {result.ok === 1 ? 'size' : 'sizes'}.
          </p>
          {result.skipped.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-muted">
              {result.skipped.slice(0, 10).map((s) => (
                <li key={s}>{s}</li>
              ))}
              {result.skipped.length > 10 && <li>…and {result.skipped.length - 10} more</li>}
            </ul>
          )}
        </div>
      )}

      <div className="mt-6 flex max-w-md items-center gap-2 rounded-full bg-panel px-4">
        <Search className="h-4 w-4 text-muted" aria-hidden />
        <label htmlFor="stock-search" className="sr-only">
          Search tyres
        </label>
        <input
          id="stock-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search size, pattern or brand"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] outline-none placeholder:text-muted"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-3xl bg-panel">
        <table className="w-full min-w-[860px] text-left text-[15px]">
          <thead className="text-[13px] text-muted">
            <tr>
              <th className="px-6 py-4 font-medium">Tyre</th>
              {BRANCH_COLS.map((b) => (
                <th key={b.key} className="px-3 py-4 text-right font-medium">
                  {b.label}
                </th>
              ))}
              <th className="px-3 py-4 text-right font-medium">Incoming</th>
              <th className="px-3 py-4 font-medium">Arriving</th>
              <th className="px-6 py-4 font-medium">Dealers see</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((s) => {
              const band = availabilityBand(totalStock(s));
              const hidden = s.active === false || catalogue.allPatterns.find((p) => p.id === s.patternId)?.active === false;
              return (
                <tr key={s.id} className={hidden ? 'opacity-60' : ''}>
                  <td className="px-6 py-3">
                    <span className="font-medium">
                      {s.brandName} {s.patternCode}
                    </span>{' '}
                    <span className="text-muted">{s.size}</span>
                  </td>
                  {BRANCH_COLS.map((b) => (
                    <td key={b.key} className="px-3 py-3 text-right">
                      <StockInputCell
                        value={s.inStockBranches[b.key]}
                        onCommit={(n) => catalogue.setStock(s.id, { [b.key]: n })}
                        label={`${s.patternCode} ${s.size} stock at ${b.label}`}
                      />
                    </td>
                  ))}
                  <td className="px-3 py-3 text-right">
                    <StockInputCell
                      value={s.incomingQty}
                      onCommit={(n) => catalogue.setStock(s.id, { incomingQty: n })}
                      label={`${s.patternCode} ${s.size} incoming`}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="date"
                      value={/^\d{4}-\d{2}-\d{2}$/.test(s.incomingEta) ? s.incomingEta : ''}
                      onChange={(e) => catalogue.setStock(s.id, { incomingEta: e.target.value })}
                      aria-label={`${s.patternCode} ${s.size} arriving date`}
                      className="rounded-lg border border-line bg-white px-2 py-1.5 text-[14px] focus:border-ink focus:outline-none"
                    />
                  </td>
                  <td className="px-6 py-3 text-[14px]">{hidden ? 'Hidden' : AVAILABILITY_LABEL[band]}</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-6 text-center text-muted">
                  No tyres match that search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13px] text-muted">
        CSV columns: {CSV_HEADER}. Rows match on id, or on brand + pattern + size. Blank cells are left unchanged.
      </p>
    </section>
  );
}

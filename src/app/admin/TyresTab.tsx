'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import { imagesFor } from '@/lib/tyreImages';
import { useApp } from '@/context/AppContext';
import { BRANDS } from '@/data/mockData';
import type { AxlePosition, Pattern, TyreApplication, TyreCategory } from '@/types';
import { Button, inputClass, labelClass } from '@/components/ui';
import Toggle from '@/components/Toggle';
import { POSITION_LABEL } from '@/lib/tyres';
import { availabilityBand, totalStock, AVAILABILITY_LABEL } from '@/lib/availability';

const POSITIONS: AxlePosition[] = ['steer', 'drive', 'trailer', 'all-position'];
const APPLICATIONS: { id: TyreApplication; label: string }[] = [
  { id: 'long-haul', label: 'Long haul' },
  { id: 'regional', label: 'Regional' },
  { id: 'urban', label: 'City' },
  { id: 'mixed', label: 'Mixed' },
  { id: 'on-off-road', label: 'On/off road' },
];

function Chips<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { id: T; label: string }[];
  value: T[];
  onChange: (v: T[]) => void;
  label: string;
}) {
  return (
    <fieldset>
      <legend className={labelClass}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(on ? value.filter((v) => v !== o.id) : [...value, o.id])}
              className={`rounded-full border px-3.5 py-1.5 text-[14px] ${
                on ? 'border-ink bg-ink text-white' : 'border-line bg-white hover:border-ink'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function TyreThumb({ p }: { p: Pattern }) {
  const img = imagesFor(p)[0];
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
      {img ? (
        <Image src={img.src} alt="" width={img.width} height={img.height} sizes="56px" className="h-full w-full object-contain" />
      ) : (
        <ImageOff className="h-5 w-5 text-line" aria-hidden />
      )}
    </div>
  );
}

const positionOptions = POSITIONS.map((p) => ({ id: p, label: POSITION_LABEL[p] }));

/* ------------------------------------------------------------------ */
/* Add a new tyre (pattern)                                            */
/* ------------------------------------------------------------------ */

function AddTyreForm({ onDone }: { onDone: (patternId?: string) => void }) {
  const { catalogue } = useApp();
  const [brandId, setBrandId] = useState(BRANDS[0].id);
  const [code, setCode] = useState('');
  const [category, setCategory] = useState<TyreCategory>('truck');
  const [positions, setPositions] = useState<AxlePosition[]>(['drive']);
  const [applications, setApplications] = useState<TyreApplication[]>(['regional']);
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-2xl">
      <button type="button" onClick={() => onDone()} className="text-[15px] font-medium text-brand hover:underline">
        ‹ Back to tyres
      </button>
      <h1 className="mt-4 text-3xl font-semibold">Add a tyre</h1>
      <p className="mt-1 text-muted">Add the pattern first, then its sizes and stock.</p>

      <form
        className="mt-8 grid gap-5 rounded-3xl bg-panel px-6 py-8"
        onSubmit={(e) => {
          e.preventDefault();
          const result = catalogue.addPattern({ brandId, code, category, positions, applications, description });
          if ('error' in result) return setError(result.error);
          onDone(result.id);
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="new-brand" className={labelClass}>
              Brand
            </label>
            <select id="new-brand" value={brandId} onChange={(e) => setBrandId(e.target.value)} className={inputClass}>
              {BRANDS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="new-code" className={labelClass}>
              Pattern code
            </label>
            <input
              id="new-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. BD177"
              className={inputClass}
              required
            />
          </div>
        </div>

        <Chips
          label="Type"
          options={[
            { id: 'truck', label: 'Truck' },
            { id: 'bus', label: 'Bus' },
          ]}
          value={[category]}
          onChange={(v) => setCategory((v.filter((x) => x !== category)[0] ?? category) as TyreCategory)}
        />
        <Chips label="Positions" options={positionOptions} value={positions} onChange={setPositions} />
        <Chips label="Use (optional)" options={APPLICATIONS} value={applications} onChange={setApplications} />

        <div>
          <label htmlFor="new-desc" className={labelClass}>
            Short description (optional)
          </label>
          <textarea
            id="new-desc"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="One sentence dealers will see on the tyre page."
            className={inputClass}
          />
        </div>

        {error && (
          <p className="text-[15px] text-brand" role="alert">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <Button type="submit">Add tyre</Button>
          <Button type="button" variant="secondary" onClick={() => onDone()}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Edit one tyre: details, sizes, add size                             */
/* ------------------------------------------------------------------ */

function AddSizeForm({ pattern }: { pattern: Pattern }) {
  const { catalogue } = useApp();
  const empty = {
    size: '',
    axlePosition: pattern.positions[0] ?? 'drive',
    loadIndexSingle: '',
    loadIndexDual: '',
    speedSymbol: '',
    plyRating: '',
    treadDepthMm: '',
    rocklea: '',
    yatala: '',
    baldhills: '',
  };
  const [f, setF] = useState(empty);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<string | null>(null);
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setF({ ...f, [k]: e.target.value });
    setError(null);
    setAdded(null);
  };
  const num = (v: string) => Number(v) || 0;

  return (
    <form
      className="mt-4 grid gap-4 rounded-3xl bg-panel px-6 py-6"
      onSubmit={(e) => {
        e.preventDefault();
        const err = catalogue.addSize(
          pattern.id,
          {
            size: f.size,
            axlePosition: f.axlePosition as AxlePosition,
            loadIndexSingle: num(f.loadIndexSingle),
            loadIndexDual: num(f.loadIndexDual),
            speedSymbol: f.speedSymbol,
            plyRating: f.plyRating,
            treadDepthMm: num(f.treadDepthMm),
            tubeless: 'TL',
          },
          { rocklea: num(f.rocklea), yatala: num(f.yatala), baldhills: num(f.baldhills) }
        );
        if (err) return setError(err);
        setAdded(f.size.toUpperCase());
        setF(empty);
      }}
    >
      <h3 className="text-lg font-semibold">Add a size</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="sz-size" className={labelClass}>
            Size
          </label>
          <input id="sz-size" value={f.size} onChange={set('size')} placeholder="11R22.5" className={inputClass} required />
        </div>
        <div>
          <label htmlFor="sz-pos" className={labelClass}>
            Position
          </label>
          <select id="sz-pos" value={f.axlePosition} onChange={set('axlePosition')} className={inputClass}>
            {pattern.positions.map((p) => (
              <option key={p} value={p}>
                {POSITION_LABEL[p]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sz-ply" className={labelClass}>
            Ply rating
          </label>
          <input id="sz-ply" value={f.plyRating} onChange={set('plyRating')} placeholder="16PR" className={inputClass} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label htmlFor="sz-li" className={labelClass}>
            Load index
          </label>
          <input id="sz-li" inputMode="numeric" value={f.loadIndexSingle} onChange={set('loadIndexSingle')} placeholder="148" className={inputClass} />
        </div>
        <div>
          <label htmlFor="sz-lid" className={labelClass}>
            Dual
          </label>
          <input id="sz-lid" inputMode="numeric" value={f.loadIndexDual} onChange={set('loadIndexDual')} placeholder="145" className={inputClass} />
        </div>
        <div>
          <label htmlFor="sz-speed" className={labelClass}>
            Speed
          </label>
          <input id="sz-speed" value={f.speedSymbol} onChange={set('speedSymbol')} placeholder="M" className={inputClass} />
        </div>
        <div>
          <label htmlFor="sz-tread" className={labelClass}>
            Tread (mm)
          </label>
          <input id="sz-tread" inputMode="decimal" value={f.treadDepthMm} onChange={set('treadDepthMm')} placeholder="22" className={inputClass} />
        </div>
      </div>
      <fieldset>
        <legend className={labelClass}>Starting stock (optional)</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          {(['rocklea', 'yatala', 'baldhills'] as const).map((b) => (
            <label key={b} className="flex items-center gap-2">
              <span className="w-20 text-[14px] text-muted">{b === 'baldhills' ? 'Bald Hills' : b[0].toUpperCase() + b.slice(1)}</span>
              <input inputMode="numeric" value={f[b]} onChange={set(b)} placeholder="0" className={inputClass} aria-label={`${b} stock`} />
            </label>
          ))}
        </div>
      </fieldset>
      {error && (
        <p className="text-[15px] text-brand" role="alert">
          {error}
        </p>
      )}
      {added && (
        <p className="text-[15px] text-ok" role="status">
          Added {added}. Dealers can see it now.
        </p>
      )}
      <div>
        <Button type="submit">Add size</Button>
      </div>
    </form>
  );
}

function EditTyre({ patternId, onBack }: { patternId: string; onBack: () => void }) {
  const { catalogue } = useApp();
  const pattern = catalogue.allPatterns.find((p) => p.id === patternId);

  if (!pattern) {
    return (
      <section>
        <p className="text-muted">That tyre couldn&apos;t be found.</p>
        <Button type="button" variant="secondary" onClick={onBack} className="mt-4">
          Back to tyres
        </Button>
      </section>
    );
  }

  const visible = pattern.active !== false;

  return (
    <section className="mx-auto max-w-3xl">
      <button type="button" onClick={onBack} className="text-[15px] font-medium text-brand hover:underline">
        ‹ Back to tyres
      </button>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">
          {pattern.brandName} {pattern.code}
        </h1>
        <Toggle
          checked={visible}
          onChange={(v) => catalogue.updatePattern(pattern.id, { active: v })}
          label={visible ? 'Shown to dealers' : 'Hidden'}
        />
      </div>
      <p className="mt-1 text-muted">
        {pattern.category === 'bus' ? 'Bus' : 'Truck'} · {pattern.positions.map((p) => POSITION_LABEL[p]).join(', ')}
      </p>

      <div className="mt-6 grid gap-5 rounded-3xl bg-panel px-6 py-6">
        <Chips
          label="Positions"
          options={positionOptions}
          value={pattern.positions}
          onChange={(v) => v.length && catalogue.updatePattern(pattern.id, { positions: v })}
        />
        <div>
          <label htmlFor="edit-desc" className={labelClass}>
            Short description
          </label>
          <textarea
            id="edit-desc"
            rows={2}
            defaultValue={pattern.description}
            onBlur={(e) => catalogue.updatePattern(pattern.id, { description: e.target.value.trim() })}
            className={inputClass}
          />
          <p className="mt-1 text-[13px] text-muted">Saved when you click away.</p>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">Sizes</h2>
      {pattern.skus.length === 0 ? (
        <p className="mt-2 text-muted">No sizes yet. Add one below so dealers can order it.</p>
      ) : (
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-3xl bg-panel">
          {pattern.skus.map((s) => {
            const units = totalStock(s);
            return (
              <li key={s.id} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{s.fullSizeCode || s.size}</p>
                  <p className="text-[14px] text-muted">
                    {POSITION_LABEL[s.axlePosition]} · {units} in stock ({AVAILABILITY_LABEL[availabilityBand(units)].toLowerCase()})
                  </p>
                </div>
                <Toggle
                  checked={s.active !== false}
                  onChange={(v) => catalogue.updateSize(s.id, { active: v })}
                  label={s.active !== false ? 'Shown' : 'Hidden'}
                />
              </li>
            );
          })}
        </ul>
      )}

      <AddSizeForm key={pattern.positions.join(',')} pattern={pattern} />
      <p className="mt-3 text-[14px] text-muted">Change stock levels any time in the Stock tab. Set prices in the Price list tab.</p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Tyres tab                                                           */
/* ------------------------------------------------------------------ */

export default function TyresTab() {
  const { catalogue } = useApp();
  const [view, setView] = useState<{ mode: 'list' } | { mode: 'add' } | { mode: 'edit'; id: string }>({ mode: 'list' });

  if (view.mode === 'add') {
    return <AddTyreForm onDone={(id) => setView(id ? { mode: 'edit', id } : { mode: 'list' })} />;
  }
  if (view.mode === 'edit') {
    return <EditTyre patternId={view.id} onBack={() => setView({ mode: 'list' })} />;
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Tyres</h1>
          <p className="mt-1 text-muted">Add tyres and sizes. Anything shown here appears for dealers straight away.</p>
        </div>
        <Button type="button" onClick={() => setView({ mode: 'add' })}>
          Add a tyre
        </Button>
      </div>

      {BRANDS.map((b) => {
        const patterns = catalogue.allPatterns.filter((p) => p.brandId === b.id);
        return (
          <div key={b.id} className="mt-8">
            <h2 className="mb-3 text-xl font-semibold">{b.name}</h2>
            {patterns.length === 0 ? (
              <p className="rounded-3xl bg-panel px-6 py-5 text-muted">No {b.name} tyres yet.</p>
            ) : (
              <ul className="divide-y divide-line overflow-hidden rounded-3xl bg-panel">
                {patterns.map((p) => {
                  const visible = p.active !== false;
                  const shownSizes = p.skus.filter((s) => s.active !== false).length;
                  return (
                    <li key={p.id} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className={`flex items-center gap-4 ${visible ? '' : 'opacity-60'}`}>
                        <TyreThumb p={p} />
                        <div>
                        <p className="text-lg font-semibold">{p.code}</p>
                        <p className="text-[14px] text-muted">
                          {p.category === 'bus' ? 'Bus' : 'Truck'} · {p.positions.map((x) => POSITION_LABEL[x]).join(', ')} ·{' '}
                          {p.skus.length === 1 ? '1 size' : `${p.skus.length} sizes`}
                          {shownSizes < p.skus.length ? ` (${p.skus.length - shownSizes} hidden)` : ''}
                          {imagesFor(p).length === 0 && ' · No photos yet'}
                        </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Toggle
                          checked={visible}
                          onChange={(v) => catalogue.updatePattern(p.id, { active: v })}
                          label={visible ? 'Shown' : 'Hidden'}
                        />
                        <Button type="button" variant="secondary" onClick={() => setView({ mode: 'edit', id: p.id })}>
                          Edit
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </section>
  );
}

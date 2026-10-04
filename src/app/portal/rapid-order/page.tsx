'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Zap,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  ShoppingCart,
} from 'lucide-react';
import { SKUS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { ProductSku } from '@/types';

interface OrderRow {
  id: string;
  sizeOrSku: string;
  quantity: number;
  matchedSku?: ProductSku;
  isValid: boolean;
}

export default function RapidOrderPage() {
  const router = useRouter();
  const { session, addToCart } = useApp();

  const [rows, setRows] = useState<OrderRow[]>([
    { id: '1', sizeOrSku: '11R22.5', quantity: 8, matchedSku: SKUS[0], isValid: true },
    { id: '2', sizeOrSku: '295/80R22.5', quantity: 4, matchedSku: SKUS[1], isValid: true },
    { id: '3', sizeOrSku: '385/65R22.5', quantity: 4, matchedSku: SKUS[3], isValid: true },
    { id: '4', sizeOrSku: '', quantity: 2, isValid: false },
  ]);

  const [excelPasteText, setExcelPasteText] = useState('');
  const [pasteModalOpen, setPasteModalOpen] = useState(false);

  const cleanSize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

  const matchSku = (input: string): ProductSku | undefined => {
    if (!input.trim()) return undefined;
    const q = cleanSize(input);
    return SKUS.find((s) => {
      const sNorm = cleanSize(s.size);
      const codeNorm = cleanSize(s.patternCode);
      return sNorm.includes(q) || codeNorm.includes(q) || s.id.toLowerCase().includes(q);
    });
  };

  const handleRowChange = (id: string, field: 'sizeOrSku' | 'quantity', val: any) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row;
        const updated = { ...row, [field]: val };
        if (field === 'sizeOrSku') {
          const matched = matchSku(val);
          updated.matchedSku = matched;
          updated.isValid = Boolean(matched);
        }
        return updated;
      })
    );
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: `${Date.now()}`, sizeOrSku: '', quantity: 4, isValid: false },
    ]);
  };

  const removeRow = (id: string) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleParseExcel = () => {
    if (!excelPasteText.trim()) return;

    const lines = excelPasteText.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const newRows: OrderRow[] = lines.map((line, idx) => {
      // Split by tab or comma
      const parts = line.split(/[\t,]+/);
      const rawSize = parts[0]?.trim() || '';
      const rawQty = parseInt(parts[1]?.trim() || '4', 10) || 4;

      const matched = matchSku(rawSize);
      return {
        id: `${Date.now()}-${idx}`,
        sizeOrSku: rawSize,
        quantity: rawQty,
        matchedSku: matched,
        isValid: Boolean(matched),
      };
    });

    setRows(newRows);
    setPasteModalOpen(false);
    setExcelPasteText('');
  };

  const handleAddAllToCart = () => {
    const validRows = rows.filter((r) => r.isValid && r.matchedSku);
    if (validRows.length === 0) return;

    validRows.forEach((r) => {
      if (r.matchedSku) {
        addToCart(r.matchedSku, r.quantity);
      }
    });

    router.push('/portal/cart');
  };

  const totalValidItems = rows.filter((r) => r.isValid).length;
  const totalTyres = rows
    .filter((r) => r.isValid)
    .reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-condensed font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>High-Speed SKU Matrix</span>
          </div>

          <h1 className="font-condensed font-black text-2xl sm:text-3xl text-[#1C1F22] uppercase">
            RAPID ORDER FORM (SKU-WISE)
          </h1>
          <p className="text-xs text-[#6C757D] mt-1 max-w-xl">
            Type or paste part numbers and tyre sizes directly from workshop spreadsheets. Instant verification against live Queensland warehouse stock.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPasteModalOpen(true)}
            className="bg-[#F8F9FA] hover:bg-[#E9ECEF] border border-[#CED4DA] text-[#1C1F22] px-4 py-2.5 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider flex items-center gap-1.5 transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Paste from Excel / CSV</span>
          </button>
        </div>
      </div>

      {/* Grid of Rows */}
      <div className="bg-white border border-[#DEE2E6] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#1C1F22] text-[#CED4DA] font-condensed font-bold uppercase">
              <tr>
                <th className="py-2.5 px-4 w-12 text-center">#</th>
                <th className="py-2.5 px-4">Size or Pattern / SKU</th>
                <th className="py-2.5 px-4">Matched Commercial Tyre</th>
                <th className="py-2.5 px-4 w-32 text-center">Quantity</th>
                <th className="py-2.5 px-4">Stock Status</th>
                <th className="py-2.5 px-4 w-16 text-center">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9ECEF]">
              {rows.map((row, index) => (
                <tr key={row.id} className="hover:bg-[#F8F9FA] transition">
                  <td className="py-3 px-4 text-center font-mono font-bold text-[#868E96]">
                    {index + 1}
                  </td>

                  {/* Input Size / SKU */}
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      placeholder="e.g. 11R22.5, RDC55..."
                      value={row.sizeOrSku}
                      onChange={(e) => handleRowChange(row.id, 'sizeOrSku', e.target.value)}
                      className={`w-full bg-[#F8F9FA] border rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#1C1F22] focus:outline-none ${
                        row.sizeOrSku && !row.isValid
                          ? 'border-red-500 bg-red-50'
                          : row.isValid
                          ? 'border-emerald-500 bg-emerald-50/20'
                          : 'border-[#CED4DA]'
                      }`}
                    />
                  </td>

                  {/* Matched Specs */}
                  <td className="py-3 px-4">
                    {row.isValid && row.matchedSku ? (
                      <div>
                        <div className="font-condensed font-bold text-[#1C1F22] text-sm">
                          {row.matchedSku.brandName} &bull; {row.matchedSku.patternCode}
                        </div>
                        <div className="text-[11px] text-[#6C757D] font-mono">
                          {row.matchedSku.fullSizeCode} ({row.matchedSku.axlePosition} axle)
                        </div>
                      </div>
                    ) : row.sizeOrSku ? (
                      <span className="text-red-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Unknown size code</span>
                      </span>
                    ) : (
                      <span className="text-[#ADB5BD] italic">Enter size to verify</span>
                    )}
                  </td>

                  {/* Quantity Input */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center bg-[#F8F9FA] border border-[#CED4DA] rounded-lg w-28 mx-auto">
                      <button
                        onClick={() =>
                          handleRowChange(row.id, 'quantity', Math.max(1, row.quantity - 2))
                        }
                        className="w-8 h-8 flex items-center justify-center font-bold text-sm text-[#495057]"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={row.quantity}
                        onChange={(e) =>
                          handleRowChange(row.id, 'quantity', parseInt(e.target.value) || 1)
                        }
                        className="w-12 text-center font-mono font-bold text-xs bg-transparent focus:outline-none"
                      />
                      <button
                        onClick={() => handleRowChange(row.id, 'quantity', row.quantity + 2)}
                        className="w-8 h-8 flex items-center justify-center font-bold text-sm text-[#495057]"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Stock Status */}
                  <td className="py-3 px-4">
                    {row.isValid && row.matchedSku ? (
                      <div className="text-xs font-mono">
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>In Stock</span>
                        </span>
                        <span className="text-[10px] text-[#6C757D]">
                          Rocklea: {row.matchedSku.inStockBranches.rocklea} &bull; Yatala: {row.matchedSku.inStockBranches.yatala}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#ADB5BD]">-</span>
                    )}
                  </td>

                  {/* Delete */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="text-[#868E96] hover:text-red-600 p-1.5 rounded transition"
                      title="Remove row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Row Button */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={addRow}
            className="text-xs font-condensed font-bold uppercase tracking-wider text-[#1C1F22] hover:text-[#D50000] flex items-center gap-1.5 py-2 px-3 rounded hover:bg-[#F8F9FA] transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Row</span>
          </button>

          <div className="text-xs text-[#6C757D] font-mono">
            {totalValidItems} valid lines ({totalTyres} tyres)
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-[#1C1F22] text-white rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-amber-400 font-condensed font-bold uppercase">
            Ready to Transfer to Request-For-Pricing Cart
          </div>
          <div className="font-condensed font-black text-2xl text-white">
            {totalTyres} Commercial Tyres Across {totalValidItems} SKUs
          </div>
          <p className="text-xs text-[#868E96]">
            No prices shown &bull; Tier {session?.tier || 'A'} wholesale quantity discount applied upon submission
          </p>
        </div>

        <button
          onClick={handleAddAllToCart}
          disabled={totalValidItems === 0}
          className="bg-[#D50000] hover:bg-[#B30000] disabled:opacity-50 text-white px-8 py-3.5 rounded-xl font-condensed font-bold text-base uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-red-950"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add All {totalTyres} Tyres to RFQ Cart &rarr;</span>
        </button>
      </div>

      {/* Paste from Excel Modal */}
      {pasteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="font-condensed font-black text-xl text-[#1C1F22] uppercase mb-1">
              Paste Tyre List from Spreadsheet
            </h3>
            <p className="text-xs text-[#6C757D] mb-4">
              Copy two columns from Excel (Size or Pattern + Quantity) and paste below:
            </p>

            <textarea
              rows={6}
              placeholder="11R22.5	8&#10;295/80R22.5	4&#10;385/65R22.5	4"
              value={excelPasteText}
              onChange={(e) => setExcelPasteText(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#CED4DA] rounded-lg p-3 text-xs font-mono text-[#1C1F22] focus:border-[#D50000] focus:outline-none"
            />

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setPasteModalOpen(false)}
                className="px-4 py-2 text-xs font-condensed font-bold uppercase text-[#6C757D]"
              >
                Cancel
              </button>
              <button
                onClick={handleParseExcel}
                className="bg-[#D50000] hover:bg-[#B30000] text-white px-5 py-2 rounded-lg text-xs font-condensed font-bold uppercase tracking-wider transition"
              >
                Populate Order Grid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

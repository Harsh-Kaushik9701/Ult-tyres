'use client';

import React from 'react';
import { AxlePosition } from '@/types';

interface Props {
  selectedPosition?: AxlePosition;
  interactive?: boolean;
  onSelectPosition?: (pos: AxlePosition) => void;
  className?: string;
}

export default function AxlePositionDiagram({
  selectedPosition,
  interactive = false,
  onSelectPosition,
  className = '',
}: Props) {
  const isSteer = selectedPosition === 'steer' || selectedPosition === 'all-position';
  const isDrive = selectedPosition === 'drive' || selectedPosition === 'all-position';
  const isTrailer = selectedPosition === 'trailer' || selectedPosition === 'all-position';

  const handleClick = (pos: AxlePosition) => {
    if (interactive && onSelectPosition) {
      onSelectPosition(pos);
    }
  };

  return (
    <div className={`bg-[#1C1F22] border border-[#2B3036] rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase font-condensed font-bold text-[#CED4DA] tracking-wider">
          Axle Fitment Schematic
        </span>
        {selectedPosition && (
          <span className="text-[11px] font-mono uppercase bg-[#25292E] text-white px-2 py-0.5 rounded border border-[#343A40]">
            Target: <strong className="text-[#FF3B30]">{selectedPosition}</strong>
          </span>
        )}
      </div>

      <div className="relative w-full flex justify-center py-2">
        <svg
          viewBox="0 0 540 160"
          className="w-full max-w-[500px] h-auto drop-shadow-md select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cab Outline */}
          <path
            d="M 40 110 L 40 50 Q 40 30 60 30 L 110 30 L 140 70 L 150 70 L 150 110 Z"
            fill="#25292E"
            stroke="#495057"
            strokeWidth="2"
          />
          {/* Cab Windscreen */}
          <path
            d="M 65 38 L 105 38 L 132 70 L 65 70 Z"
            fill="#121416"
            stroke="#343A40"
            strokeWidth="1.5"
          />

          {/* Prime Mover Chassis & Hitch */}
          <rect x="145" y="80" width="105" height="15" fill="#343A40" rx="2" />
          <circle cx="210" cy="80" r="7" fill="#6C757D" />

          {/* Semi-Trailer Body */}
          <rect
            x="200"
            y="35"
            width="310"
            height="60"
            fill="#25292E"
            stroke="#495057"
            strokeWidth="2"
            rx="4"
          />
          {/* Trailer Details */}
          <line x1="210" y1="45" x2="500" y2="45" stroke="#343A40" strokeWidth="1.5" />
          <line x1="210" y1="65" x2="500" y2="65" stroke="#343A40" strokeWidth="1.5" />

          {/* STEER AXLE WHEELS (Front) */}
          <g
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => handleClick('steer')}
          >
            <rect
              x="65"
              y="100"
              width="26"
              height="45"
              rx="6"
              fill={isSteer ? '#D50000' : '#343A40'}
              stroke={isSteer ? '#FF3B30' : '#6C757D'}
              strokeWidth="2"
              className="transition-all duration-200"
            />
            {/* Tyre tread lines */}
            <line x1="72" y1="106" x2="72" y2="139" stroke={isSteer ? '#fff' : '#495057'} strokeWidth="1.5" />
            <line x1="84" y1="106" x2="84" y2="139" stroke={isSteer ? '#fff' : '#495057'} strokeWidth="1.5" />
            <text
              x="78"
              y="158"
              textAnchor="middle"
              fill={isSteer ? '#FF3B30' : '#868E96'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              STEER
            </text>
          </g>

          {/* TANDEM DRIVE AXLE WHEELS (Dual 1 & Dual 2) */}
          <g
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => handleClick('drive')}
          >
            {/* Drive 1 */}
            <rect
              x="165"
              y="100"
              width="26"
              height="45"
              rx="6"
              fill={isDrive ? '#D50000' : '#343A40'}
              stroke={isDrive ? '#FF3B30' : '#6C757D'}
              strokeWidth="2"
              className="transition-all duration-200"
            />
            <line x1="172" y1="106" x2="172" y2="139" stroke={isDrive ? '#fff' : '#495057'} strokeWidth="1.5" />
            <line x1="184" y1="106" x2="184" y2="139" stroke={isDrive ? '#fff' : '#495057'} strokeWidth="1.5" />

            {/* Drive 2 */}
            <rect
              x="200"
              y="100"
              width="26"
              height="45"
              rx="6"
              fill={isDrive ? '#D50000' : '#343A40'}
              stroke={isDrive ? '#FF3B30' : '#6C757D'}
              strokeWidth="2"
              className="transition-all duration-200"
            />
            <line x1="207" y1="106" x2="207" y2="139" stroke={isDrive ? '#fff' : '#495057'} strokeWidth="1.5" />
            <line x1="219" y1="106" x2="219" y2="139" stroke={isDrive ? '#fff' : '#495057'} strokeWidth="1.5" />

            <text
              x="195"
              y="158"
              textAnchor="middle"
              fill={isDrive ? '#FF3B30' : '#868E96'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              DRIVE
            </text>
          </g>

          {/* TRI-AXLE TRAILER WHEELS (Axle 1, 2, 3) */}
          <g
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => handleClick('trailer')}
          >
            {/* Trailer 1 */}
            <rect
              x="395"
              y="100"
              width="26"
              height="45"
              rx="6"
              fill={isTrailer ? '#D50000' : '#343A40'}
              stroke={isTrailer ? '#FF3B30' : '#6C757D'}
              strokeWidth="2"
              className="transition-all duration-200"
            />
            {/* Trailer 2 */}
            <rect
              x="430"
              y="100"
              width="26"
              height="45"
              rx="6"
              fill={isTrailer ? '#D50000' : '#343A40'}
              stroke={isTrailer ? '#FF3B30' : '#6C757D'}
              strokeWidth="2"
              className="transition-all duration-200"
            />
            {/* Trailer 3 */}
            <rect
              x="465"
              y="100"
              width="26"
              height="45"
              rx="6"
              fill={isTrailer ? '#D50000' : '#343A40'}
              stroke={isTrailer ? '#FF3B30' : '#6C757D'}
              strokeWidth="2"
              className="transition-all duration-200"
            />
            <text
              x="443"
              y="158"
              textAnchor="middle"
              fill={isTrailer ? '#FF3B30' : '#868E96'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              TRAILER
            </text>
          </g>
        </svg>
      </div>

      {interactive && (
        <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t border-[#25292E] text-center">
          {(['all-position', 'steer', 'drive', 'trailer'] as AxlePosition[]).map((pos) => (
            <button
              key={pos}
              onClick={() => handleClick(pos)}
              className={`py-1 text-[11px] font-condensed font-bold uppercase rounded transition ${
                selectedPosition === pos
                  ? 'bg-[#D50000] text-white'
                  : 'bg-[#25292E] text-[#CED4DA] hover:bg-[#343A40]'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

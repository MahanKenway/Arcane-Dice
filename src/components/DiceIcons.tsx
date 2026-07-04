import React from 'react';
import { cn } from '../utils';

export type DiceMaterial = 'slate' | 'gold' | 'ruby' | 'emerald' | 'amethyst' | 'rock' | 'sapphire' | 'bronze' | 'silver' | 'obsidian' | 'rust' | 'wooden' | 'gemstone' | 'marble' | 'metal_bg' | 'smooth' | 'smooth_pip' | 'rolling' | 'prismatic' | 'holyc' | 'zig' | 'cobol';
export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

interface DiceIconProps extends React.SVGProps<SVGSVGElement> {
  value?: number;
  type: DiceType;
  isRolling?: boolean;
  material?: DiceMaterial;
  className?: string;
}

const materials = {
  slate: { stop1: '#f8fafc', stop2: '#94a3b8', stop3: '#334155', fill: '#0f172a', line: '#1e293b' },
  gold: { stop1: '#fef08a', stop2: '#eab308', stop3: '#854d0e', fill: '#422006', line: '#713f12' },
  ruby: { stop1: '#fecaca', stop2: '#ef4444', stop3: '#7f1d1d', fill: '#450a0a', line: '#7f1d1d' },
  emerald: { stop1: '#a7f3d0', stop2: '#10b981', stop3: '#064e3b', fill: '#022c22', line: '#064e3b' },
  amethyst: { stop1: '#e9d5ff', stop2: '#a855f7', stop3: '#581c87', fill: '#2e1065', line: '#4c1d95' },
  rock: { stop1: '#cbd5e1', stop2: '#64748b', stop3: '#334155', fill: '#18181b', line: '#27272a' },
  sapphire: { stop1: '#bfdbfe', stop2: '#2563eb', stop3: '#1e3a8a', fill: '#172554', line: '#1e3a8a' },
  bronze: { stop1: '#fde047', stop2: '#ca8a04', stop3: '#713f12', fill: '#1c0d02', line: '#422006' },
  silver: { stop1: '#f1f5f9', stop2: '#cbd5e1', stop3: '#475569', fill: '#0f172a', line: '#334155' },
  obsidian: { stop1: '#4b5563', stop2: '#1f2937', stop3: '#111827', fill: '#030712', line: '#1f2937' },
  rust: { stop1: '#ea580c', stop2: '#9a3412', stop3: '#451a03', fill: '#2d0f01', line: '#7c2d12' },
  wooden: { stop1: '#b45309', stop2: '#78350f', stop3: '#451a03', fill: '#2d0f01', line: '#78350f' },
  gemstone: { stop1: '#2dd4bf', stop2: '#0d9488', stop3: '#115e59', fill: '#042f2e', line: '#0f766e' },
  marble: { stop1: '#e879f9', stop2: '#a21caf', stop3: '#701a75', fill: '#4a044e', line: '#86198f' },
  metal_bg: { stop1: '#22d3ee', stop2: '#0891b2', stop3: '#164e63', fill: '#083344', line: '#0e7490' },
  smooth: { stop1: '#fda4af', stop2: '#f43f5e', stop3: '#9f1239', fill: '#4c0519', line: '#e11d48' },
  smooth_pip: { stop1: '#6ee7b7', stop2: '#10b981', stop3: '#065f46', fill: '#022c22', line: '#059669' },
  rolling: { stop1: '#fef08a', stop2: '#f59e0b', stop3: '#b45309', fill: '#451a03', line: '#d97706' },
  prismatic: { stop1: '#ffffff', stop2: '#00ffff', stop3: '#ff00ff', fill: '#0c0721', line: '#2a0e4a' },
  holyc: { stop1: '#ffffff', stop2: '#fef08a', stop3: '#ca8a04', fill: '#0a0a16', line: '#f59e0b' },
  zig: { stop1: '#f97316', stop2: '#f3f4f6', stop3: '#4b5563', fill: '#0f172a', line: '#ea580c' },
  cobol: { stop1: '#4ade80', stop2: '#166534', stop3: '#14532d', fill: '#022c22', line: '#22c55e' },
};

export function DiceIcon({ className, value, type, isRolling, material = 'slate', ...props }: DiceIconProps) {
  const mat = materials[material] || materials.slate;
  const gradId = `grad-${material}-${type}`;

  const renderShape = () => {
    switch (type) {
      case 'd4':
        return (
          <>
            <polygon points="50,15 90,85 10,85" fill={mat.fill} stroke={`url(#${gradId})`} strokeWidth="3" strokeLinejoin="round" />
            <polygon points="50,15 50,85 10,85" fill="rgba(0,0,0,0.2)" stroke={`url(#${gradId})`} strokeWidth="1" />
          </>
        );
      case 'd6':
        return (
          <>
            <rect x="20" y="20" width="60" height="60" rx="8" fill={mat.fill} stroke={`url(#${gradId})`} strokeWidth="3" strokeLinejoin="round" />
            <rect x="25" y="25" width="50" height="50" rx="4" fill="transparent" stroke={`url(#${gradId})`} strokeWidth="1" opacity="0.5" />
          </>
        );
      case 'd8':
        return (
          <>
            <polygon points="50,10 90,50 50,90 10,50" fill={mat.fill} stroke={`url(#${gradId})`} strokeWidth="3" strokeLinejoin="round" />
            <polygon points="10,50 90,50" fill="none" stroke={`url(#${gradId})`} strokeWidth="1.5" />
            <polygon points="50,10 50,90" fill="none" stroke={`url(#${gradId})`} strokeWidth="1.5" />
          </>
        );
      case 'd10':
      case 'd100':
        return (
          <>
            <polygon points="50,10 85,45 50,90 15,45" fill={mat.fill} stroke={`url(#${gradId})`} strokeWidth="3" strokeLinejoin="round" />
            <polygon points="50,10 95,45 50,90 5,45" fill="none" stroke={`url(#${gradId})`} strokeWidth="1" opacity="0.3"/>
            <polygon points="50,30 75,45 50,70 25,45" fill={mat.line} stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
          </>
        );
      case 'd12':
        return (
          <>
            <polygon points="50,10 88,38 73,83 27,83 12,38" fill={mat.fill} stroke={`url(#${gradId})`} strokeWidth="3" strokeLinejoin="round" />
            <polygon points="50,25 75,43 65,70 35,70 25,43" fill={mat.line} stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
            <line x1="50" y1="10" x2="50" y2="25" stroke={`url(#${gradId})`} strokeWidth="1.5" />
            <line x1="88" y1="38" x2="75" y2="43" stroke={`url(#${gradId})`} strokeWidth="1.5" />
            <line x1="73" y1="83" x2="65" y2="70" stroke={`url(#${gradId})`} strokeWidth="1.5" />
            <line x1="27" y1="83" x2="35" y2="70" stroke={`url(#${gradId})`} strokeWidth="1.5" />
            <line x1="12" y1="38" x2="25" y2="43" stroke={`url(#${gradId})`} strokeWidth="1.5" />
          </>
        );
      case 'd20':
      default:
        return (
          <>
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill={mat.fill} stroke={`url(#${gradId})`} strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="50,5 25,45 75,45" fill={mat.line} stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="25,45 50,95 75,45" fill={mat.fill} stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="50,5 5,25 25,45" fill={mat.line} stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="5,25 5,75 25,45" fill={mat.fill} stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="5,75 50,95 25,45" fill="rgba(0,0,0,0.3)" stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="50,5 95,25 75,45" fill={mat.line} stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="95,25 95,75 75,45" fill={mat.fill} stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="95,75 50,95 75,45" fill="rgba(0,0,0,0.3)" stroke={`url(#${gradId})`} strokeWidth="1.5" strokeLinejoin="round" />
          </>
        );
    }
  };

  let textY = 63;
  let fontSize = 24;
  if (type === 'd20') { textY = 73; fontSize = 32; }
  else if (type === 'd12') { textY = 62; fontSize = 26; }
  else if (type === 'd10') { textY = 62; fontSize = 22; }
  else if (type === 'd100') { textY = 61; fontSize = 16; }
  else if (type === 'd8') { textY = 60; fontSize = 26; }
  else if (type === 'd6') { textY = 62; fontSize = 32; }
  else if (type === 'd4') { textY = 68; fontSize = 22; }

  if (type === 'd100' && value !== undefined) {
    fontSize = 15;
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("w-full h-full drop-shadow-2xl transition-all duration-300", className)}
      {...props}
    >
      <defs>
        {material === 'prismatic' ? (
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff3366" />
            <stop offset="20%" stopColor="#ff9933" />
            <stop offset="40%" stopColor="#33cc66" />
            <stop offset="60%" stopColor="#3399ff" />
            <stop offset="80%" stopColor="#9933ff" />
            <stop offset="100%" stopColor="#ff3366" />
          </linearGradient>
        ) : (
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={mat.stop1} />
            <stop offset="50%" stopColor={mat.stop2} />
            <stop offset="100%" stopColor={mat.stop3} />
          </linearGradient>
        )}
      </defs>

      {renderShape()}
      
      {value !== undefined && !isRolling && (
        <text
          x="50"
          y={textY}
          textAnchor="middle"
          fill={value === 20 ? "#fbbf24" : mat.stop1}
          fontSize={fontSize}
          stroke={value === 20 ? "#78350f" : mat.fill}
          strokeWidth={value === 20 ? "2" : "1.5"}
          paintOrder="stroke fill"
          className={cn(
            "font-serif font-bold select-none drop-shadow-md",
            value === 20 && "drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
          )}
        >
          {value}
        </text>
      )}
      {!value && !isRolling && (
         <text
          x="50"
          y={textY}
          textAnchor="middle"
          fill={mat.stop2}
          fontSize={fontSize}
          stroke={mat.fill}
          strokeWidth="1.5"
          paintOrder="stroke fill"
          className="font-serif font-bold select-none opacity-95"
        >
          {type}
        </text>
      )}
    </svg>
  );
}

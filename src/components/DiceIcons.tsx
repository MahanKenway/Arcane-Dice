import React from 'react';
import { cn } from '../utils';

export type DiceMaterial = 'slate' | 'gold' | 'ruby' | 'emerald' | 'amethyst';
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
  else if (type === 'd10' || type === 'd100') { textY = 62; fontSize = 22; }
  else if (type === 'd8') { textY = 60; fontSize = 26; }
  else if (type === 'd6') { textY = 62; fontSize = 32; }
  else if (type === 'd4') { textY = 70; fontSize = 22; }

  if (type === 'd100' && value !== undefined) {
    fontSize = 18;
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("w-full h-full drop-shadow-2xl transition-all duration-300", className)}
      {...props}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={mat.stop1} />
          <stop offset="50%" stopColor={mat.stop2} />
          <stop offset="100%" stopColor={mat.stop3} />
        </linearGradient>
      </defs>

      {renderShape()}
      
      {value !== undefined && !isRolling && (
        <text
          x="50"
          y={textY}
          textAnchor="middle"
          fill={mat.stop1}
          fontSize={fontSize}
          className="font-serif font-bold select-none drop-shadow-md"
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
          className="font-serif font-bold select-none opacity-50"
        >
          {type}
        </text>
      )}
    </svg>
  );
}

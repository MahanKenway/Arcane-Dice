import React, { useState, useEffect, useRef } from 'react';
import { History, Dices, RotateCcw, Plus, Minus, Settings2, X, Palette, Image as ImageIcon, TrendingUp, TrendingDown, Sparkles, Music, Play, Pause, Upload, Trash2, SkipBack, SkipForward, Volume2, Terminal, Binary } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils';
import { RollResult, DiceType } from './gameLogic';
import { DiceIcon, DiceMaterial } from './components/DiceIcons';
import { getNarrativeForRoll } from './narrations';
import { PhysicsDice, PhysicsDiceRef } from './components/PhysicsDice';
import BardicSoundscapes from './components/BardicSoundscapes';
import ArcaneVault from './components/ArcaneVault';

import pixelTavernBg from './assets/images/pixel_tavern_1782917884945.jpg';
import pixelVoidBg from './assets/images/pixel_void_1782917906511.jpg';
import fantasyDragonLairBg from './assets/images/fantasy_dragon_lair_1782917922387.jpg';
import fantasyRuinsBg from './assets/images/fantasy_ruins_1782917939309.jpg';
import pixelDungeonBg from './assets/images/pixel_dungeon_1782917956406.jpg';
import cyberNeonBg from './assets/images/cyber_neon_1782917969801.jpg';
import darkForestBg from './assets/images/dark_forest_1782917984275.jpg';
import underdarkBg from './assets/images/underdark_1782918008872.jpg';
import pixelCrystalCaveBg from './assets/images/pixel_crystal_cave_1782919292811.jpg';
import pixelFloatingIslandBg from './assets/images/pixel_floating_island_1782919307912.jpg';
import pixelCyberStreetBg from './assets/images/pixel_cyber_street_1782919324741.jpg';
import pixelCozyLibraryBg from './assets/images/pixel_cozy_library_1782919338788.jpg';
import pixelWaterfallTempleBg from './assets/images/pixel_waterfall_temple_1782919617924.jpg';
import pixelVolcanoForgeBg from './assets/images/pixel_volcano_forge_1782919639447.jpg';
import pixelSnowyPeakBg from './assets/images/pixel_snowy_peak_1782919863361.jpg';
import pixelCursedSwampBg from './assets/images/pixel_cursed_swamp_1782919880602.jpg';
import pixelDesertOasisBg from './assets/images/pixel_desert_oasis_1782919880602_1782920361362.jpg';
import pixelHauntedMansionBg from './assets/images/pixel_haunted_mansion_1782919880602_1782920377130.jpg';
import pixelUnderwaterRuinsBg from './assets/images/pixel_underwater_ruins_1782921053773.jpg';
import pixelAbyssalDepthsBg from './assets/images/pixel_abyssal_depths_1783176460827.jpg';
import pixelDesertScorchingBg from './assets/images/pixel_desert_scorching_1783176472880.jpg';
import pixelFrozenKeepBg from './assets/images/pixel_frozen_keep_1783176483703.jpg';
import pixelFloatingCitadelBg from './assets/images/pixel_floating_citadel_1783176494927.jpg';
import pixelStarlightAirshipBg from './assets/images/pixel_starlight_airship_1783176509301.jpg';
import pixelSunkenTempleBg from './assets/images/pixel_sunken_temple_1783176519790.jpg';
import pixelChronoTowerBg from './assets/images/pixel_chrono_tower_1783180407728.jpg';
import pixelAlchemyLabBg from './assets/images/pixel_alchemy_lab_1783180420013.jpg';
import pixelFeyCanopyBg from './assets/images/pixel_fey_canopy_1783180429708.jpg';
import pixelMagmaCathedralBg from './assets/images/pixel_magma_cathedral_1783180439493.jpg';
import pixelSkyTempleBg from './assets/images/pixel_sky_temple_1783180601864.jpg';
import pixelCyberArcadeBg from './assets/images/pixel_cyber_arcade_1783180615252.jpg';
import pixelCoralReefBg from './assets/images/pixel_coral_reef_1783180626749.jpg';
import pixelNecroCryptBg from './assets/images/pixel_necro_crypt_1783180641646.jpg';
import discoHarborTavernBg from './assets/images/disco_harbor_tavern_1783183913826.jpg';
import discoRainyStreetBg from './assets/images/disco_rainy_street_1783183924346.jpg';
import discoCoastalRuinsBg from './assets/images/disco_coastal_ruins_1783183935157.jpg';
import discoDetectiveStudyBg from './assets/images/disco_detective_study_1783183945667.jpg';

const BACKGROUNDS = [
  { id: 'disco_harbor', name: 'Disco Harbor Tavern', url: discoHarborTavernBg },
  { id: 'disco_street', name: 'Disco Rainy Street', url: discoRainyStreetBg },
  { id: 'disco_ruins', name: 'Disco Coastal Ruins', url: discoCoastalRuinsBg },
  { id: 'disco_study', name: 'Disco Detective Study', url: discoDetectiveStudyBg },
  { id: 'sky_temple', name: 'Pixel Sky Temple', url: pixelSkyTempleBg },
  { id: 'cyber_arcade', name: 'Pixel Cyberpunk Arcade', url: pixelCyberArcadeBg },
  { id: 'coral_reef', name: 'Pixel Coral Sanctuary', url: pixelCoralReefBg },
  { id: 'necro_crypt', name: 'Pixel Necro Crypt', url: pixelNecroCryptBg },
  { id: 'chrono_tower', name: 'Pixel Chrono Tower', url: pixelChronoTowerBg },
  { id: 'alchemy_lab', name: 'Pixel Alchemy Lab', url: pixelAlchemyLabBg },
  { id: 'fey_canopy', name: 'Pixel Feywood Canopy', url: pixelFeyCanopyBg },
  { id: 'magma_cathedral', name: 'Pixel Magma Cathedral', url: pixelMagmaCathedralBg },
  { id: 'underwater_ruins', name: 'Pixel Underwater Ruins', url: pixelUnderwaterRuinsBg },
  { id: 'desert_oasis', name: 'Pixel Desert Oasis', url: pixelDesertOasisBg },
  { id: 'haunted_mansion', name: 'Pixel Haunted Mansion', url: pixelHauntedMansionBg },
  { id: 'snowy_peak', name: 'Pixel Snowy Peak', url: pixelSnowyPeakBg },
  { id: 'cursed_swamp', name: 'Pixel Cursed Swamp', url: pixelCursedSwampBg },
  { id: 'temple_falls', name: 'Pixel Waterfall Temple', url: pixelWaterfallTempleBg },
  { id: 'forge', name: 'Pixel Dwarven Forge', url: pixelVolcanoForgeBg },
  { id: 'crystal', name: 'Pixel Crystal Cave', url: pixelCrystalCaveBg },
  { id: 'floating', name: 'Pixel Floating Island', url: pixelFloatingIslandBg },
  { id: 'cyber', name: 'Pixel Cyber Street', url: pixelCyberStreetBg },
  { id: 'library', name: 'Pixel Cozy Library', url: pixelCozyLibraryBg },
  { id: 'tavern', name: 'Pixel Tavern Hearth', url: pixelTavernBg },
  { id: 'dungeon', name: 'Pixel Dungeon Corridor', url: pixelDungeonBg },
  { id: 'void', name: 'Astral Void Nebula', url: pixelVoidBg },
  { id: 'dragon', name: "Dragon's Lair", url: fantasyDragonLairBg },
  { id: 'ruins', name: 'Overgrown Fantasy Ruins', url: fantasyRuinsBg },
  { id: 'neon', name: 'Cyberpunk Neon Sanctum', url: cyberNeonBg },
  { id: 'forest', name: 'Elven Dark Forest', url: darkForestBg },
  { id: 'underdark', name: 'Glowing Underdark Caverns', url: underdarkBg },
  { id: 'abyss', name: 'Pixel Abyssal Depths', url: pixelAbyssalDepthsBg },
  { id: 'desert', name: 'Pixel Scorching Sands', url: pixelDesertScorchingBg },
  { id: 'frozen', name: 'Pixel Frozen Keep', url: pixelFrozenKeepBg },
  { id: 'citadel', name: 'Pixel Floating Citadel', url: pixelFloatingCitadelBg },
  { id: 'ship', name: 'Pixel Starlight Airship', url: pixelStarlightAirshipBg },
  { id: 'temple', name: 'Pixel Sunken Temple', url: pixelSunkenTempleBg }
];

const BACKGROUND_TINTS = [
  { id: 'slate', name: 'Dark Slate', class: 'from-slate-950 via-slate-950/80 to-slate-950/20', bgClass: 'bg-slate-950', border: 'border-slate-500' },
  { id: 'indigo', name: 'Arcane Indigo', class: 'from-indigo-950 via-indigo-950/80 to-indigo-950/20', bgClass: 'bg-indigo-950', border: 'border-indigo-500' },
  { id: 'rose', name: 'Blood Rose', class: 'from-rose-950 via-rose-950/80 to-rose-950/20', bgClass: 'bg-rose-950', border: 'border-rose-500' },
  { id: 'emerald', name: 'Fey Emerald', class: 'from-emerald-950 via-emerald-950/80 to-emerald-950/20', bgClass: 'bg-emerald-950', border: 'border-emerald-500' },
  { id: 'purple', name: 'Void Purple', class: 'from-purple-950 via-purple-950/80 to-purple-950/20', bgClass: 'bg-purple-950', border: 'border-purple-500' },
  { id: 'none', name: 'Natural (No Tint)', class: 'from-black/80 via-black/40 to-transparent', bgClass: 'bg-black', border: 'border-white/50' },
];

const MATERIALS: { id: DiceMaterial, name: string, color: string, hex: string, theme: string }[] = [
  { id: 'prismatic', name: 'Prismatic Rainbow', color: 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500', hex: '#ffffff', theme: 'default' },
  { id: 'slate', name: 'Iron Slate', color: 'bg-slate-500', hex: '#475569', theme: 'default' },
  { id: 'gold', name: 'Divine Gold', color: 'bg-yellow-500', hex: '#dfb15b', theme: 'default' },
  { id: 'ruby', name: 'Blood Ruby', color: 'bg-red-600', hex: '#b22222', theme: 'default' },
  { id: 'emerald', name: 'Fey Emerald', color: 'bg-emerald-500', hex: '#1b4d3e', theme: 'default' },
  { id: 'amethyst', name: 'Void Amethyst', color: 'bg-purple-600', hex: '#5d3fd3', theme: 'default' },
  { id: 'rock', name: 'Ancient Granite', color: 'bg-zinc-500', hex: '#708090', theme: 'rock' },
  { id: 'sapphire', name: 'Celestial Sapphire', color: 'bg-blue-600', hex: '#0f52ba', theme: 'default' },
  { id: 'bronze', name: 'Weathered Bronze', color: 'bg-amber-600', hex: '#ca8a04', theme: 'default' },
  { id: 'silver', name: 'Astral Silver', color: 'bg-slate-300', hex: '#cbd5e1', theme: 'default' },
  { id: 'obsidian', name: 'Void Obsidian', color: 'bg-stone-900', hex: '#111827', theme: 'default' },
  { id: 'rust', name: 'Rusted Iron', color: 'bg-amber-700', hex: '#b5511b', theme: 'rust' },
  { id: 'wooden', name: 'Ancient Wood', color: 'bg-amber-900', hex: '#8b5a2b', theme: 'wooden' },
  { id: 'gemstone', name: 'Teal Gemstone', color: 'bg-teal-600', hex: '#0d9488', theme: 'gemstone' },
  { id: 'marble', name: 'Marble Amethyst', color: 'bg-fuchsia-700', hex: '#9333ea', theme: 'gemstoneMarble' },
  { id: 'metal_bg', name: 'Lagoon Metal', color: 'bg-cyan-700', hex: '#0e7490', theme: 'blueGreenMetal' },
  { id: 'smooth', name: 'Rose Smooth', color: 'bg-rose-500', hex: '#f43f5e', theme: 'smooth' },
  { id: 'smooth_pip', name: 'Emerald Smooth Pip', color: 'bg-emerald-500', hex: '#10b981', theme: 'smooth-pip' },
  { id: 'rolling', name: 'Gold-Flecked Rolling', color: 'bg-yellow-600', hex: '#eab308', theme: 'diceOfRolling' },
  { id: 'holyc', name: 'HolyC Divine', color: 'bg-amber-300 shadow-[0_0_8px_#f59e0b]', hex: '#f59e0b', theme: 'default' },
  { id: 'zig', name: 'Zig Safe Metal', color: 'bg-orange-500', hex: '#ea580c', theme: 'default' },
  { id: 'cobol', name: 'COBOL Punchcard', color: 'bg-emerald-600', hex: '#22c55e', theme: 'default' }
];

export default function App() {
  const [history, setHistory] = useState<RollResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<RollResult | null>(null);
  const [activeDice, setActiveDice] = useState<DiceType>('d20');
  const [narration, setNarration] = useState('');
  const [modifier, setModifier] = useState(0);
  const [advantageMode, setAdvantageMode] = useState<'advantage' | 'disadvantage' | 'none'>('none');
  const [isMultiMode, setIsMultiMode] = useState(false);
  const [selectedPool, setSelectedPool] = useState<Record<DiceType, number>>({});
  const [lastRollWasPool, setLastRollWasPool] = useState(false);
  
  interface CustomBg {
    id: string;
    name: string;
    url: string;
  }

  // Select background from localStorage, or randomly on load
  const [bgImage, setBgImage] = useState(() => {
    const saved = localStorage.getItem('arcane_dice_bg_image');
    if (saved) return saved;
    return BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)].url;
  });

  const [customBgs, setCustomBgs] = useState<CustomBg[]>(() => {
    try {
      const saved = localStorage.getItem('arcane_dice_custom_bgs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse custom backgrounds", e);
      return [];
    }
  });

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('لطفا یک فایل تصویر یا گیف معتبر انتخاب کنید.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      
      const newBg: CustomBg = {
        id: `custom_${Date.now()}`,
        name: file.name.substring(0, file.name.lastIndexOf('.')) || file.name,
        url: dataUrl
      };

      const updated = [newBg, ...customBgs];
      setCustomBgs(updated);
      setBgImage(newBg.url);
      localStorage.setItem('arcane_dice_bg_image', newBg.url);

      try {
        localStorage.setItem('arcane_dice_custom_bgs', JSON.stringify(updated));
      } catch (err) {
        console.warn("Storage quota exceeded, keeping in memory for this session", err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteCustomBg = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customBgs.filter(bg => bg.id !== id);
    setCustomBgs(updated);
    
    const deletedBg = customBgs.find(bg => bg.id === id);
    if (deletedBg && bgImage === deletedBg.url) {
      const randomDefault = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)].url;
      setBgImage(randomDefault);
      localStorage.setItem('arcane_dice_bg_image', randomDefault);
    }

    try {
      localStorage.setItem('arcane_dice_custom_bgs', JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to update custom backgrounds in localStorage", err);
    }
  };

  const [material, setMaterial] = useState<DiceMaterial>('rolling');
  const [bgOpacity, setBgOpacity] = useState<number>(() => {
    const saved = localStorage.getItem('arcane_dice_bg_opacity');
    return saved ? parseFloat(saved) : 0.35;
  });
  const [bgTint, setBgTint] = useState(() => {
    return localStorage.getItem('arcane_dice_bg_tint') || 'slate';
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isPhysicsReady, setIsPhysicsReady] = useState(false);
  

  const [shouldShake, setShouldShake] = useState(false);
  const [particles, setParticles] = useState<{
    id: number;
    color: string;
    size: number;
    duration: number;
    delay: number;
    angle: number;
    speed: number;
  }[]>([]);

  const triggerCriticalEffects = () => {
    // 1. Screen Shake
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 500);

    // 2. Celebratory Particles
    const newParticles = Array.from({ length: 65 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 9;
      const size = 6 + Math.random() * 12;
      const colors = [
        '#fbbf24', // Amber/Gold
        '#f59e0b', // Deep Gold
        '#d97706', // Dark Gold
        '#eab308', // Yellow
        '#fffbeb', // Light Gold/White sheen
        '#dfb15b', // Divine Gold hex
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        id: Date.now() + i + Math.random(),
        color,
        size,
        duration: 1.2 + Math.random() * 1.8,
        delay: Math.random() * 0.15,
        angle,
        speed,
      };
    });
    setParticles(newParticles);
    setTimeout(() => {
      setParticles([]);
    }, 3200);
  };
  const physicsDiceRef = useRef<PhysicsDiceRef>(null);

  // Dynamic color cycling for Prismatic Rainbow 3D dice!
  const [rainbowColor, setRainbowColor] = useState('#ff3366');

  useEffect(() => {
    if (material !== 'prismatic') return;

    // Smooth beautiful rainbow cycle colors utilizing all working materials' hex colors!
    const colors = MATERIALS.filter(m => m.id !== 'prismatic').map(m => m.hex);
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % colors.length;
      setRainbowColor(colors[idx]);
    }, 1500);

    return () => clearInterval(interval);
  }, [material]);

  useEffect(() => {
    if (!isPhysicsReady || !physicsDiceRef.current) return;
    const selectedMaterial = MATERIALS.find(m => m.id === material) || MATERIALS[0];
    const targetHex = material === 'prismatic' ? rainbowColor : selectedMaterial.hex;
    physicsDiceRef.current.updateConfig(targetHex, selectedMaterial.theme);
  }, [material, rainbowColor, isPhysicsReady]);

  useEffect(() => {
    const saved = localStorage.getItem('arcane_dice_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  const saveHistory = async (newHistory: RollResult[]) => {
    setHistory(newHistory);
    localStorage.setItem('arcane_dice_history', JSON.stringify(newHistory.slice(0, 20))); // Keep last 20
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.setItem('arcane_dice_history', JSON.stringify([]));
  };

  const handleRoll = async (singleDiceType?: DiceType, count: number = 1) => {
    // We don't block the roll if 3D is not ready! We just use the mathematical fallback!
    const is3DReady = isPhysicsReady && !!physicsDiceRef.current;
    
    if (is3DReady && physicsDiceRef.current) {
      physicsDiceRef.current.clear();
    }
    
    setCurrentRoll(null);
    setIsRolling(true);
    setNarration('');

    const isPoolRoll = isMultiMode && !singleDiceType;

    try {
      const selectedMaterial = MATERIALS.find(m => m.id === material) || MATERIALS[0];
      
      let notation: string | string[] = '';
      let d100Count = 0;

      if (isPoolRoll) {
        d100Count = selectedPool.d100 || 0;
        // Construct composite notation array from selectedPool for 3D physics engine to roll multiple groups correctly
        const parts: string[] = [];
        (Object.entries(selectedPool) as [DiceType, number][])
          .filter(([_, count]) => count > 0)
          .forEach(([type, count]) => {
            if (type === 'd100') {
              parts.push(`${count}d100`);
              parts.push(`${count}d10`);
            } else {
              parts.push(`${count}${type}`);
            }
          });
        notation = parts;
      } else {
        const diceType = singleDiceType || activeDice;
        const isAdvantageRoll = advantageMode === 'advantage';
        const isDisadvantageRoll = advantageMode === 'disadvantage';
        const actualCount = (isAdvantageRoll || isDisadvantageRoll) ? 2 : count;
        
        if (diceType === 'd100') {
          d100Count = actualCount;
          notation = [`${actualCount}d100`, `${actualCount}d10`];
        } else {
          notation = `${actualCount}${diceType}`;
        }
        setActiveDice(diceType);
      }

      if (!notation || (Array.isArray(notation) && notation.length === 0)) {
        setIsRolling(false);
        return;
      }
      
      let result = null;
      if (is3DReady && physicsDiceRef.current) {
        try {
          const targetHex = material === 'prismatic' ? rainbowColor : selectedMaterial.hex;
          result = await physicsDiceRef.current.roll(notation, targetHex, selectedMaterial.theme);
        } catch (rollErr) {
          console.warn("3D physics roll failed, falling back to math:", rollErr);
          result = null;
        }
      } else {
        console.info("3D physics engine not ready, using math roll.");
      }
      
      let parsedRolls: { type: DiceType; value: number }[] = [];
      let totalSum = 0;

      if (result && Array.isArray(result)) {
        const tensRolls: any[] = [];
        const d10Rolls: any[] = [];
        const otherGroups: any[] = [];

        result.forEach((group: any) => {
          if (group) {
            let typeStr = "";
            if (group.dieType) {
              typeStr = group.dieType.toLowerCase();
            } else if (group.sides) {
              const sidesStr = String(group.sides).toLowerCase();
              typeStr = sidesStr.startsWith("d") ? sidesStr : `d${sidesStr}`;
            } else {
              typeStr = "d20";
            }
            const groupType = typeStr as DiceType;

            const rollsList = Array.isArray(group.rolls)
              ? group.rolls
              : (group.value !== undefined ? [{ value: group.value }] : []);

            if (groupType === 'd100') {
              tensRolls.push(...rollsList);
            } else if (groupType === 'd10') {
              d10Rolls.push(...rollsList);
            } else {
              otherGroups.push({ type: groupType, rolls: rollsList });
            }
          }
        });

        // Pair d100 (tens) with d10 (units)
        const pairedCount = Math.min(tensRolls.length, d10Rolls.length);
        for (let i = 0; i < pairedCount; i++) {
          const T = tensRolls[i].value;
          const U = d10Rolls[i].value;
          const u = U % 10;
          let val = T + u;
          if (T === 0 && u === 0) {
            val = 100;
          }
          parsedRolls.push({
            type: 'd100',
            value: val
          });
          totalSum += val;
        }

        // Remaining d10s (if any, e.g., regular pool rolls)
        for (let i = pairedCount; i < d10Rolls.length; i++) {
          parsedRolls.push({
            type: 'd10',
            value: d10Rolls[i].value
          });
          totalSum += d10Rolls[i].value;
        }

        // Other groups (d4, d6, d8, d12, d20)
        otherGroups.forEach((g) => {
          g.rolls.forEach((r: any) => {
            parsedRolls.push({
              type: g.type,
              value: r.value
            });
            totalSum += r.value;
          });
        });
      }

      // Mathematical Fallback (uses high-quality random values)
      if (parsedRolls.length === 0) {
        if (isPoolRoll) {
          (Object.entries(selectedPool) as [DiceType, number][]).forEach(([type, c]) => {
            const sides = parseInt(type.substring(1), 10);
            for (let i = 0; i < c; i++) {
              const val = Math.floor(Math.random() * sides) + 1;
              parsedRolls.push({ type, value: val });
              totalSum += val;
            }
          });
        } else {
          const dt = singleDiceType || activeDice;
          const sides = parseInt(dt.substring(1), 10);
          const isAdvantageRoll = advantageMode === 'advantage';
          const isDisadvantageRoll = advantageMode === 'disadvantage';
          const actualCount = (isAdvantageRoll || isDisadvantageRoll) ? 2 : count;
          
          for (let i = 0; i < actualCount; i++) {
            const val = Math.floor(Math.random() * sides) + 1;
            parsedRolls.push({ type: dt, value: val });
            totalSum += val;
          }
        }
      }

      let rolledValue = totalSum;
      let finalTotal = totalSum + modifier;
      let isCriticalSuccess = false;
      let isCriticalFailure = false;
      let displayNotation = '';
      let activeMode: 'advantage' | 'disadvantage' | 'none' = 'none';

      if (!isPoolRoll) {
        const dt = singleDiceType || activeDice;
        const rollsOnly = parsedRolls.map(r => r.value);
        const isAdvantageRoll = advantageMode === 'advantage';
        const isDisadvantageRoll = advantageMode === 'disadvantage';
        activeMode = (isAdvantageRoll || isDisadvantageRoll) ? advantageMode : 'none';

        if (activeMode === 'advantage' && rollsOnly.length >= 2) {
          rolledValue = Math.max(...rollsOnly);
        } else if (activeMode === 'disadvantage' && rollsOnly.length >= 2) {
          rolledValue = Math.min(...rollsOnly);
        } else {
          rolledValue = rollsOnly[0] || totalSum;
        }

        finalTotal = rolledValue + modifier;
        isCriticalSuccess = dt === 'd20' && rolledValue === 20;
        isCriticalFailure = dt === 'd20' && rolledValue === 1;

        displayNotation = `${count}${dt}`;
        if (activeMode === 'advantage') displayNotation = `${dt} with Advantage`;
        else if (activeMode === 'disadvantage') displayNotation = `${dt} with Disadvantage`;
      } else {
        // Pool roll
        displayNotation = (Object.entries(selectedPool) as [DiceType, number][])
          .filter(([_, count]) => count > 0)
          .map(([type, count]) => `${count}${type}`)
          .join(' + ');
      }

      const sidesOfFirst = parseInt(parsedRolls[0]?.type.substring(1) || '20', 10);

      const rollData: RollResult = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        diceType: isPoolRoll ? (parsedRolls[0]?.type || 'd20') : (singleDiceType || activeDice),
        modifier: modifier,
        notation: displayNotation + (modifier > 0 ? ` + ${modifier}` : modifier < 0 ? ` - ${Math.abs(modifier)}` : ''),
        rolls: parsedRolls.map(r => r.value),
        total: finalTotal,
        isCriticalSuccess,
        isCriticalFailure,
        advantageMode: activeMode,
        allDiceRolls: parsedRolls
      };

      // Show result delay: 1000ms if 3D ran, 200ms if we used fallback
      const showDelay = result ? 1000 : 200;

      setTimeout(() => {
        setCurrentRoll(rollData);
        saveHistory([rollData, ...history]);
        setLastRollWasPool(isPoolRoll);
        
        // Narrative based on normalized percentage
        if (isPoolRoll) {
          const maxPossible = parsedRolls.reduce((sum, r) => sum + parseInt(r.type.substring(1), 10), 0);
          setNarration(getNarrativeForRoll(totalSum, maxPossible));
        } else {
          setNarration(getNarrativeForRoll(rolledValue, sidesOfFirst));
        }
        setIsRolling(false);

        if (rollData.isCriticalSuccess) {
          triggerCriticalEffects();
        } else if (rollData.isCriticalFailure) {
          // Critical failure logic (if any)
        }
      }, showDelay);

    } catch (err) {
      console.error("Roll failed:", err);
      setIsRolling(false);
    }
  };

  const handleClear = () => {
    if (isPhysicsReady && physicsDiceRef.current) {
      physicsDiceRef.current.clear();
    }
    setCurrentRoll(null);
    setNarration('');
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button') || 
      target.closest('input') || 
      target.closest('.selection-rail') || 
      target.closest('.settings-modal') || 
      target.closest('.history-modal') ||
      target.closest('.interactive-card') ||
      target.closest('header') ||
      target.closest('footer')
    ) {
      return;
    }
    handleClear();
  };

  const activeTint = BACKGROUND_TINTS.find(t => t.id === bgTint) || BACKGROUND_TINTS[0];

  return (
    <div 
      onClick={handleBackgroundClick}
      className={cn(
        "min-h-screen text-slate-200 font-sans overflow-hidden flex flex-col relative cursor-default transition-colors duration-1000", 
        activeTint.bgClass,
        shouldShake && "animate-shake"
      )}
    >
      {/* Mystical Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ 
          backgroundImage: `url("${bgImage}")`,
          opacity: bgOpacity
        }}
      />
      <div className={cn("absolute inset-0 z-0 bg-gradient-to-t transition-all duration-1000", activeTint.class)} />
      
      {/* Particles/Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]" />

      {/* Header */}
      <header className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Dices className="w-8 h-8 text-slate-400 drop-shadow-md" />
          <h1 className="text-4xl font-serif tracking-widest text-slate-200 uppercase font-bold drop-shadow-lg">
            Arcane Dice
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center justify-center w-12 h-12 bg-slate-900/60 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-500 rounded-full text-slate-300 transition-all duration-300 backdrop-blur-md shadow-lg"
            title="Customization"
          >
            <Settings2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900/60 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-500 rounded-full text-slate-300 transition-all duration-300 backdrop-blur-md shadow-lg"
          >
            <History className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider hidden md:inline">Chronicles</span>
          </button>
        </div>
      </header>

      {/* Physics Dice Canvas Overlay */}
      <PhysicsDice ref={physicsDiceRef} onReady={() => setIsPhysicsReady(true)} />

      {/* Main Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 max-w-5xl mx-auto w-full">
        
        {/* Central Dice Display */}
        <div className="relative w-72 h-72 md:w-[350px] md:h-[350px] flex items-center justify-center mb-8 perspective-[1000px]">
          {/* Ambient Glow based on Material */}
          <div className={cn(
            "absolute inset-0 rounded-full blur-3xl transition-colors duration-1000",
            material === 'prismatic' ? "bg-indigo-500 shadow-[0_0_50px_rgba(255,100,255,0.4)] opacity-25 animate-pulse" :
            material === 'ruby' ? "bg-red-600 opacity-20" :
            material === 'emerald' ? "bg-emerald-600 opacity-20" :
            material === 'amethyst' ? "bg-purple-600 opacity-20" :
            material === 'gold' ? "bg-yellow-600 opacity-20" :
            material === 'rust' ? "bg-orange-700 opacity-20" :
            material === 'wooden' ? "bg-amber-800 opacity-20" :
            material === 'gemstone' ? "bg-teal-500 opacity-20" :
            material === 'marble' ? "bg-fuchsia-600 opacity-20" :
            material === 'metal_bg' ? "bg-cyan-600 opacity-20" :
            material === 'smooth' ? "bg-rose-500 opacity-20" :
            material === 'smooth_pip' ? "bg-emerald-400 opacity-20" :
            material === 'rolling' ? "bg-amber-500 opacity-20" :
            "bg-slate-400 opacity-10",
            currentRoll?.isCriticalSuccess ? "bg-slate-100 opacity-30" : 
            currentRoll?.isCriticalFailure ? "bg-red-700 opacity-30" : 
            isRolling ? "opacity-40 animate-pulse" : ""
          )} />
          
          {isMultiMode ? (
            <motion.div
              animate={{
                opacity: (isRolling || currentRoll) ? 0 : 1,
                scale: (isRolling || currentRoll) ? 0.8 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: (isRolling || currentRoll) ? 'none' : 'auto' }}
              className="w-full h-full relative flex flex-col items-center justify-center"
            >
              {(Object.values(selectedPool) as number[]).reduce((a, b) => a + b, 0) === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center rounded-full border border-dashed border-slate-700/60 bg-slate-950/40 w-64 h-64 md:w-80 md:h-80 shadow-inner group hover:border-indigo-500/50 transition-all duration-300">
                  <Dices className="w-12 h-12 text-slate-500 mb-4 group-hover:scale-110 group-hover:text-indigo-400 transition-all duration-300" />
                  <p className="font-serif text-slate-300 text-xs tracking-wider uppercase mb-1">Arcane Pool</p>
                  <p className="text-[10px] text-slate-500 max-w-[180px] leading-relaxed">
                    Click on the dice below to add them to your mystical rolling pool.
                  </p>
                </div>
              ) : (
                <div 
                  onClick={() => handleRoll()}
                  className="flex flex-col items-center justify-center p-6 text-center rounded-full border-2 border-indigo-500/30 bg-slate-900/20 w-64 h-64 md:w-80 md:h-80 shadow-[0_0_30px_rgba(99,102,241,0.05)] group hover:border-indigo-500/60 hover:bg-slate-900/40 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[180px] mb-3 max-h-[140px] overflow-y-auto p-1 hide-scrollbar">
                    {(Object.entries(selectedPool) as [DiceType, number][])
                      .filter(([_, count]) => count > 0)
                      .map(([type, count]) => (
                        <div 
                          key={type} 
                          className="flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-800/80 shadow-inner"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="font-mono text-[10px] font-bold text-indigo-400">{count}x</span>
                          <span className="text-[9px] font-serif text-slate-400 uppercase tracking-tight">{type}</span>
                          <button 
                            onClick={() => {
                              setSelectedPool(prev => {
                                const next = { ...prev };
                                if (next[type] > 1) {
                                  next[type]--;
                                } else {
                                  delete next[type];
                                }
                                return next;
                              });
                            }}
                            className="text-slate-500 hover:text-rose-400 p-0.5 rounded transition-colors ml-0.5"
                            title="Remove one"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                  </div>
                  
                  <span className="text-[10px] font-serif uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors">
                    Roll Pool
                  </span>
                  <span className="text-2xl font-mono font-bold text-indigo-400 mt-0.5 drop-shadow-[0_0_10px_rgba(99,102,241,0.2)] group-hover:scale-105 transition-transform">
                    {(Object.values(selectedPool) as number[]).reduce((a, b) => a + b, 0)} Dice
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPool({});
                    }}
                    className="mt-3 px-2.5 py-0.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[9px] font-serif uppercase tracking-widest rounded-full border border-rose-500/20 transition-all"
                  >
                    Clear Pool
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              animate={{
                opacity: (isRolling || currentRoll) ? 0 : 1,
                scale: (isRolling || currentRoll) ? 0.8 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: (isRolling || currentRoll) ? 'none' : 'auto' }}
              className="w-full h-full relative cursor-pointer group flex items-center justify-center transform-style-3d"
              onClick={() => handleRoll(activeDice)}
            >
              <DiceIcon 
                type={activeDice}
                material={material}
                isRolling={isRolling} 
                value={undefined}
                className={cn(
                  "transition-transform duration-500 group-hover:scale-105",
                  "opacity-90 drop-shadow-2xl"
                )}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-slate-900 font-bold font-serif text-2xl bg-slate-200/90 px-4 py-1 rounded-full shadow-xl">Roll</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Roll Result & Narration */}
        <div className="h-48 flex flex-col items-center justify-start text-center w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {currentRoll && !isRolling && (
              <motion.div
                key={currentRoll.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-4 w-full relative z-50"
              >
                <div className="flex items-center justify-center gap-6">
                  <div className="text-slate-500 font-serif text-2xl tracking-widest bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-800">
                    {currentRoll.notation}
                  </div>
                  <div className={cn(
                    "text-7xl font-serif font-bold drop-shadow-2xl relative",
                    currentRoll.isCriticalSuccess ? "text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.65)] font-extrabold" :
                    currentRoll.isCriticalFailure ? "text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" :
                    "text-slate-200"
                  )}>
                    {currentRoll.total}
                    
                    {/* Golden celebratory particles burst */}
                    {particles.length > 0 && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
                        {particles.map((p) => (
                          <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
                            animate={{
                              x: Math.cos(p.angle) * p.speed * 32,
                              y: Math.sin(p.angle) * p.speed * 32 + (p.duration * 20), // drift downwards (gravity)
                              scale: [1, 1.4, 0],
                              opacity: [1, 1, 0],
                              rotate: p.angle * 180 / Math.PI + (Math.random() * 360),
                            }}
                            transition={{
                              duration: p.duration,
                              ease: "easeOut",
                              delay: p.delay,
                            }}
                            style={{
                              position: 'absolute',
                              width: p.size,
                              height: p.size,
                              backgroundColor: p.color,
                              borderRadius: Math.random() > 0.4 ? '50%' : '2px', // circles + confetti paper
                              boxShadow: `0 0 10px ${p.color}, 0 0 4px rgba(255, 255, 255, 0.4)`,
                              pointerEvents: 'none',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {currentRoll.allDiceRolls && currentRoll.allDiceRolls.length > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 max-w-lg shadow-inner">
                    {currentRoll.allDiceRolls.map((dieRoll, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-850 shadow-sm animate-scale-in">
                        <DiceIcon type={dieRoll.type} material={material} className="w-3.5 h-3.5 text-slate-400" />
                        <span className={cn(
                          "font-mono text-xs font-bold",
                          dieRoll.value === 20 ? "text-amber-400 font-extrabold drop-shadow-[0_0_5px_rgba(245,158,11,0.6)] animate-pulse" : "text-slate-300"
                        )}>{dieRoll.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {currentRoll.advantageMode && currentRoll.advantageMode !== 'none' && currentRoll.rolls.length >= 2 && (
                  <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800/60 text-xs font-mono shadow-inner">
                    <span className="text-slate-500 uppercase tracking-wider text-[10px] font-serif mr-1">Rolls:</span>
                    {currentRoll.rolls.map((r, idx) => {
                      const isKept = currentRoll.advantageMode === 'advantage' 
                        ? r === Math.max(...currentRoll.rolls) && idx === currentRoll.rolls.indexOf(Math.max(...currentRoll.rolls))
                        : r === Math.min(...currentRoll.rolls) && idx === currentRoll.rolls.indexOf(Math.min(...currentRoll.rolls));
                      return (
                        <span 
                          key={idx} 
                          className={cn(
                            "px-2 py-0.5 rounded text-sm font-semibold transition-all duration-300",
                            isKept 
                              ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 font-bold" 
                              : "text-slate-600 line-through decoration-slate-700 bg-slate-950/40"
                          )}
                        >
                          {r}
                        </span>
                      );
                    })}
                    <span className="text-slate-400 text-[10px] font-serif uppercase tracking-wider ml-1">
                      ({currentRoll.advantageMode === 'advantage' ? 'Highest Kept' : 'Lowest Kept'})
                    </span>
                  </div>
                )}
                
                {narration && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-2"
                  >
                    <p className="font-serif text-lg md:text-xl leading-relaxed text-slate-300 italic px-6 py-4 bg-slate-900/40 border border-slate-700/30 rounded-xl backdrop-blur-sm shadow-inner">
                      "{narration}"
                    </p>
                  </motion.div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => lastRollWasPool ? handleRoll() : handleRoll(activeDice)}
                    className="mt-4 px-8 py-2 border border-slate-600/50 rounded-full font-serif text-slate-300 tracking-widest uppercase hover:bg-slate-800/50 transition-colors bg-slate-950/80 backdrop-blur-sm shadow-xl cursor-pointer"
                  >
                    Reroll
                  </button>
                  <button
                    onClick={handleClear}
                    className="mt-4 px-8 py-2 border border-rose-950/30 rounded-full font-serif text-rose-400 hover:text-rose-300 tracking-widest uppercase hover:bg-rose-950/20 transition-colors bg-rose-950/10 backdrop-blur-sm shadow-xl cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </motion.div>
            )}
            {isRolling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-slate-500 font-serif text-2xl tracking-widest uppercase animate-pulse mt-8"
              >
                Determining Fate...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="relative z-20 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-2xl p-6 mt-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Modifier & Fate (Advantage/Disadvantage) Controls */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            {/* Modifier Control */}
            <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-inner">
              <span className="text-slate-400 font-serif uppercase tracking-widest text-xs px-2">Modifier</span>
              <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800/80">
                <button 
                  onClick={() => setModifier(m => m - 1)}
                  className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Decrease Modifier"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-lg w-8 text-center text-slate-200">
                  {modifier > 0 ? `+${modifier}` : modifier}
                </span>
                <button 
                  onClick={() => setModifier(m => m + 1)}
                  className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Increase Modifier"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Fate / Advantage Controls */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-inner">
              <span className="text-slate-400 font-serif uppercase tracking-widest text-xs px-2">Fate</span>
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 gap-1">
                <button
                  onClick={() => setAdvantageMode(prev => prev === 'advantage' ? 'none' : 'advantage')}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-serif uppercase tracking-wider transition-all duration-200 flex items-center gap-1 border",
                    advantageMode === 'advantage' 
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.15)] font-bold" 
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-800 border-transparent"
                  )}
                  title={`Roll ${activeDice} with Advantage (Take highest of 2)`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500/70" />
                  Adv
                </button>
                <button
                  onClick={() => setAdvantageMode(prev => prev === 'disadvantage' ? 'none' : 'disadvantage')}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-serif uppercase tracking-wider transition-all duration-200 flex items-center gap-1 border",
                    advantageMode === 'disadvantage' 
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.15)] font-bold" 
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-800 border-transparent"
                  )}
                  title={`Roll ${activeDice} with Disadvantage (Take lowest of 2)`}
                >
                  <TrendingDown className="w-3.5 h-3.5 text-amber-500/70" />
                  Dis
                </button>
              </div>
            </div>

            {/* Multi-Dice Pool Toggle */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl shadow-inner">
              <span className="text-slate-400 font-serif uppercase tracking-widest text-xs px-2">Pool</span>
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 gap-1">
                <button
                  onClick={() => {
                    setIsMultiMode(prev => {
                      const next = !prev;
                      if (!next) setSelectedPool({});
                      return next;
                    });
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-serif uppercase tracking-wider transition-all duration-200 flex items-center gap-1 border",
                    isMultiMode 
                      ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.15)] font-bold" 
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-800 border-transparent"
                  )}
                  title="Toggle Multi-Dice Selection Mode"
                >
                  <Dices className="w-3.5 h-3.5 text-indigo-500/70" />
                  Multi
                </button>
                {isMultiMode && (
                  <button
                    onClick={() => setSelectedPool({})}
                    className="px-3 py-1.5 rounded-lg text-[10px] font-serif uppercase tracking-wider transition-all duration-200 flex items-center gap-1 border border-transparent text-rose-500 hover:text-rose-300 hover:bg-rose-950/20"
                    title="Reset selected dice pool"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Dice Selector Rail */}
          <div className="flex gap-3 sm:gap-6 overflow-x-auto pb-2 md:pb-0 w-full justify-start md:justify-center px-4 md:px-0 hide-scrollbar">
            {(['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'] as DiceType[]).map((dice) => {
              const countInPool = selectedPool[dice] || 0;
              const isSelected = isMultiMode ? countInPool > 0 : activeDice === dice;
              return (
                <motion.button
                  key={dice}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (isMultiMode) {
                      setSelectedPool(prev => ({
                        ...prev,
                        [dice]: (prev[dice] || 0) + 1
                      }));
                    } else {
                      handleRoll(dice);
                    }
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 relative group outline-none cursor-pointer"
                >
                  <AnimatePresence>
                    {isMultiMode && countInPool > 0 && (
                      <motion.div
                        key={`${dice}-count-${countInPool}`}
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ 
                          scale: 1,
                          opacity: 1
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="absolute -top-1.5 -right-1.5 bg-indigo-500 text-slate-100 font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-slate-950 z-20 shadow-md"
                      >
                        {countInPool}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div 
                    initial={{ rotate: 3, scale: 1 }}
                    animate={{
                      scale: isSelected ? 1.05 : 1,
                      rotate: isSelected ? 6 : 3,
                      borderColor: isSelected ? "rgb(226, 232, 240)" : "rgb(51, 65, 85)",
                      backgroundColor: isSelected ? "rgb(30, 41, 59)" : "rgb(15, 23, 42)",
                    }}
                    whileHover={{ 
                      rotate: isSelected ? 8 : 6,
                      scale: isSelected ? 1.08 : 1.03,
                      backgroundColor: "rgb(30, 41, 59)",
                      borderColor: isSelected ? "rgb(226, 232, 240)" : "rgb(100, 116, 139)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className={cn(
                      "absolute inset-0 rounded-2xl border shadow-lg",
                      isSelected ? "shadow-[0_0_15px_rgba(148,163,184,0.3)]" : ""
                    )}
                  />
                  <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
                    <motion.div
                      animate={{
                        scale: isSelected ? 1.15 : 1,
                        rotate: isSelected ? [0, 15, -10, 0] : 0,
                        y: isSelected ? -2 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        rotate: {
                          duration: 0.4,
                          ease: "easeOut"
                        }
                      }}
                    >
                      <DiceIcon 
                        type={dice} 
                        material={material}
                        className={cn(
                          "w-10 h-10 sm:w-12 sm:h-12 transition-opacity duration-300", 
                          isSelected ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                        )} 
                      />
                    </motion.div>
                    <span className={cn("text-xs font-bold mt-2 tracking-widest transition-colors", isSelected ? "text-slate-200" : "text-slate-500 group-hover:text-slate-300")}>{dice}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </footer>

      {/* History Sidebar */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 h-full w-80 md:w-96 bg-slate-900 z-50 border-l border-slate-800 shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                <h2 className="font-serif text-2xl text-slate-200 uppercase tracking-widest drop-shadow-md">Chronicles</h2>
                <button 
                  onClick={clearHistory}
                  className="text-slate-500 hover:text-red-400 transition-colors p-2 hover:bg-slate-800/50 rounded-full"
                  title="Clear History"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
                {history.length === 0 ? (
                  <p className="text-slate-500 text-center font-serif italic mt-12">Your fate has yet to be written.</p>
                ) : (
                  history.map((roll) => (
                    <div key={roll.id} className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-slate-400 font-mono text-sm bg-slate-900/80 px-2 py-1 rounded">{roll.notation}</span>
                        <span className="text-xs text-slate-500 font-serif">
                          {new Date(roll.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "text-4xl font-serif font-bold",
                          roll.isCriticalSuccess ? "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] font-bold" :
                          roll.isCriticalFailure ? "text-red-500" :
                          "text-slate-300"
                        )}>
                          {roll.total}
                        </span>
                        {roll.advantageMode && roll.advantageMode !== 'none' && roll.rolls.length >= 2 ? (
                          <span className="text-slate-500 text-sm font-mono flex items-center gap-1">
                            <span>[</span>
                            {roll.rolls.map((r, idx) => {
                              const isKept = roll.advantageMode === 'advantage'
                                ? r === Math.max(...roll.rolls) && idx === roll.rolls.indexOf(Math.max(...roll.rolls))
                                : r === Math.min(...roll.rolls) && idx === roll.rolls.indexOf(Math.min(...roll.rolls));
                              return (
                                <span key={idx} className="flex items-center">
                                  <span className={isKept ? "text-emerald-400 font-bold" : "text-slate-600 line-through"}>
                                    {r}
                                  </span>
                                  {idx < roll.rolls.length - 1 && <span className="text-slate-600 mx-0.5">,</span>}
                                </span>
                              );
                            })}
                            <span>]</span>
                            {roll.modifier > 0 ? `+${roll.modifier}` : roll.modifier < 0 ? `-${Math.abs(roll.modifier)}` : ''}
                          </span>
                        ) : (
                          (roll.modifier !== 0 || roll.rolls.length > 1) && (
                            <span className="text-slate-500 text-sm font-mono">
                              [{roll.rolls.join('+')}]{roll.modifier > 0 ? '+' : ''}{roll.modifier !== 0 ? roll.modifier : ''}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Sidebar */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 h-full w-[90vw] sm:w-[480px] md:w-[560px] bg-slate-900 z-50 border-l border-slate-800 shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                <h2 className="font-serif text-2xl text-slate-200 uppercase tracking-widest drop-shadow-md">Forge</h2>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-slate-500 hover:text-slate-300 transition-colors p-2 hover:bg-slate-800/50 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
                
                {/* Fate & Modifier Control */}
                <section className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-3">
                    <Dices className="w-5 h-5 text-slate-400" />
                    <h3 className="text-lg font-serif tracking-widest text-slate-300 uppercase">Roll Modifiers</h3>
                  </div>
                  
                  {/* Modifier in Forge */}
                  <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800/80 shadow-inner">
                    <span className="text-slate-400 font-serif uppercase tracking-wider text-xs">Modifier</span>
                    <div className="flex items-center gap-3 bg-slate-900 p-1 rounded-lg border border-slate-800/50">
                      <button 
                        onClick={() => setModifier(m => m - 1)}
                        className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-md transition-colors"
                        title="Decrease Modifier"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-mono text-lg w-8 text-center text-slate-200">
                        {modifier > 0 ? `+${modifier}` : modifier}
                      </span>
                      <button 
                        onClick={() => setModifier(m => m + 1)}
                        className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-md transition-colors"
                        title="Increase Modifier"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Advantage / Disadvantage Toggle in Forge */}
                  <div className="space-y-2">
                    <span className="text-slate-400 font-serif uppercase tracking-wider text-xs block">D20 Roll Fate</span>
                    <div className="grid grid-cols-3 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 gap-1.5 shadow-inner">
                      <button
                        onClick={() => setAdvantageMode('none')}
                        className={cn(
                          "py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all duration-200 border",
                          advantageMode === 'none'
                            ? "bg-slate-800 border-slate-700 text-slate-200 shadow-inner font-bold"
                            : "text-slate-500 hover:text-slate-300 border-transparent"
                        )}
                      >
                        Normal
                      </button>
                      <button
                        onClick={() => setAdvantageMode('advantage')}
                        className={cn(
                          "py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 border",
                          advantageMode === 'advantage'
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold"
                            : "text-slate-500 hover:text-slate-300 border-transparent"
                        )}
                      >
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500/70" />
                        Advantage
                      </button>
                      <button
                        onClick={() => setAdvantageMode('disadvantage')}
                        className={cn(
                          "py-2 rounded-lg text-xs font-serif uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 border",
                          advantageMode === 'disadvantage'
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/40 font-bold"
                            : "text-slate-500 hover:text-slate-300 border-transparent"
                        )}
                      >
                        <TrendingDown className="w-3.5 h-3.5 text-amber-500/70" />
                        Disadv
                      </button>
                    </div>
                  </div>

                  {/* Multi-Dice Pool Control in Forge */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/40">
                    <span className="text-slate-400 font-serif uppercase tracking-wider text-xs block">Multi-Dice Pool</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setIsMultiMode(prev => {
                            const next = !prev;
                            if (!next) setSelectedPool({});
                            return next;
                          });
                        }}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-xs font-serif uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 border",
                          isMultiMode 
                            ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/40 font-bold shadow-[0_0_10px_rgba(99,102,241,0.15)]" 
                            : "bg-slate-950 text-slate-500 hover:text-slate-300 border-slate-800/80"
                        )}
                      >
                        <Dices className="w-3.5 h-3.5" />
                        {isMultiMode ? "Multi Enabled" : "Enable Multi"}
                      </button>
                      {isMultiMode && (
                        <button
                          onClick={() => setSelectedPool({})}
                          className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/20 text-xs font-serif uppercase tracking-wider transition-all"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </section>
                

                {/* Bardic Soundscapes */}
                <BardicSoundscapes />
                {/* Material Selection */}
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="w-5 h-5 text-slate-400" />
                    <h3 className="text-lg font-serif tracking-widest text-slate-300 uppercase">Dice Material</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {MATERIALS.map(mat => (
                      <button
                        key={mat.id}
                        onClick={() => setMaterial(mat.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300",
                          material === mat.id ? "bg-slate-800 border-slate-400 shadow-inner" : "bg-slate-950 border-slate-800 hover:border-slate-600 hover:bg-slate-900"
                        )}
                      >
                        <div className={cn("w-6 h-6 rounded-full shadow-md", mat.color)} />
                        <span className="text-xs font-serif tracking-wider text-slate-400">{mat.name}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Background Selection */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3 mb-1">
                    <ImageIcon className="w-5 h-5 text-slate-400" />
                    <h3 className="text-lg font-serif tracking-widest text-slate-300 uppercase">Environment</h3>
                  </div>

                  {/* Environment Opacity Control */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-serif uppercase tracking-wider text-slate-400">Backdrop Opacity</span>
                      <span className="text-xs font-mono text-slate-300 font-bold bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                        {Math.round(bgOpacity * 100)}%
                      </span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={bgOpacity}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setBgOpacity(val);
                        localStorage.setItem('arcane_dice_bg_opacity', String(val));
                      }}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-300 border-none outline-none focus:ring-1 focus:ring-slate-500"
                    />
                  </div>

                  {/* Environment Tint Control */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-4">
                    <span className="text-xs font-serif uppercase tracking-wider text-slate-400">Backdrop Tint</span>
                    <div className="grid grid-cols-3 gap-2">
                      {BACKGROUND_TINTS.map(tint => (
                        <button
                          key={tint.id}
                          onClick={() => {
                            setBgTint(tint.id);
                            localStorage.setItem('arcane_dice_bg_tint', tint.id);
                          }}
                          className={cn(
                            "py-2 px-3 rounded-lg text-xs font-serif tracking-wider transition-all duration-300 border flex items-center justify-center gap-2",
                            bgTint === tint.id 
                              ? `bg-slate-800 text-slate-200 ${tint.border}`
                              : "bg-slate-900/50 text-slate-400 border-slate-800 hover:bg-slate-900"
                          )}
                        >
                          <div className={cn("w-3 h-3 rounded-full border border-white/20", tint.bgClass)} />
                          {tint.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Background Upload & List */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs font-serif uppercase tracking-wider text-slate-400 block">Custom Backdrops</span>
                    
                    <label className="flex flex-col items-center justify-center border border-dashed border-slate-700 hover:border-slate-500 rounded-xl p-4 cursor-pointer hover:bg-slate-900/40 transition-all group">
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <Upload className="w-5 h-5 text-slate-400 group-hover:text-slate-200 transition-colors" />
                        <span className="text-xs text-slate-300 font-serif">Upload Image or GIF</span>
                        <span className="text-[10px] text-slate-500 font-sans">GIF, PNG, JPG supported</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleBgUpload} 
                        className="hidden" 
                      />
                    </label>

                    {customBgs.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {customBgs.map(bg => (
                          <div
                            key={bg.id}
                            onClick={() => {
                              setBgImage(bg.url);
                              localStorage.setItem('arcane_dice_bg_image', bg.url);
                            }}
                            className={cn(
                              "relative h-16 rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer group flex items-center justify-center",
                              bgImage === bg.url ? "border-slate-300 shadow-[0_0_10px_rgba(255,255,255,0.15)]" : "border-slate-800 hover:border-slate-600"
                            )}
                          >
                            <div 
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                              style={{ backgroundImage: `url(${bg.url})` }}
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                            <span className="relative z-10 px-2 text-center text-[10px] font-sans text-slate-200 font-medium truncate w-full drop-shadow">
                              {bg.name}
                            </span>
                            <button
                              onClick={(e) => handleDeleteCustomBg(bg.id, e)}
                              className="absolute top-1 right-1 z-20 p-1 bg-black/75 hover:bg-rose-500/90 text-slate-400 hover:text-white rounded-md transition-colors opacity-0 group-hover:opacity-100 shadow"
                              title="Delete Backdrop"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-serif uppercase tracking-wider text-slate-400 block px-1">Preset Environments</span>
                    <div className="flex flex-col gap-3">
                      {BACKGROUNDS.map(bg => (
                        <button
                          key={bg.id}
                          onClick={() => {
                            setBgImage(bg.url);
                            localStorage.setItem('arcane_dice_bg_image', bg.url);
                          }}
                          className={cn(
                            "relative h-20 rounded-xl overflow-hidden border transition-all duration-300 group flex items-center justify-center",
                            bgImage === bg.url ? "border-slate-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "border-slate-800 hover:border-slate-500"
                          )}
                        >
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${bg.url})` }}
                          />
                          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                          <span className="relative z-10 font-serif tracking-widest text-slate-200 font-bold drop-shadow-md">
                            {bg.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Code Sanctum Section */}
                <section className="pt-4 border-t border-slate-800/60">
                  <div className="bg-indigo-950/20 border border-indigo-700/30 hover:border-indigo-500/50 rounded-2xl p-5 space-y-4 transition-all duration-300 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
                        <Binary className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-indigo-300 font-serif tracking-widest uppercase">Esoteric Code Sanctum</h3>
                        <p className="text-[10px] text-slate-500 font-sans mt-0.5">Explore multiverse compilation algorithms & unlock esoteric dice skins.</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsVaultOpen(true);
                        setIsSettingsOpen(false);
                      }}
                      className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 border border-indigo-500/30"
                    >
                      <Terminal className="w-4 h-4" />
                      Enter Code Sanctum
                    </button>
                  </div>
                </section>
                
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ArcaneVault 
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onApplySkin={(newMat) => {
          setMaterial(newMat);
        }}
        currentMaterial={material}
      />

    </div>
  );
}


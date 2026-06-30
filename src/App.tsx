import React, { useState, useEffect, useRef } from 'react';
import { History, Dices, RotateCcw, Plus, Minus, Settings2, X, Palette, Image as ImageIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils';
import { RollResult, DiceType } from './gameLogic';
import { DiceIcon, DiceMaterial } from './components/DiceIcons';
import { getNarrativeForRoll } from './narrations';
import { PhysicsDice, PhysicsDiceRef } from './components/PhysicsDice';
import { playDiceSound } from './utils/audio';

const BACKGROUNDS = [
  { id: 'dungeon', name: 'Deep Dungeon', url: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2700&auto=format&fit=crop' },
  { id: 'forest', name: 'Enchanted Forest', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2574&auto=format&fit=crop' },
  { id: 'mountain', name: 'Misty Peaks', url: 'https://images.unsplash.com/photo-1519077224424-d2e8eb63eb9b?q=80&w=2600&auto=format&fit=crop' },
  { id: 'cathedral', name: 'Gothic Cathedral', url: 'https://images.unsplash.com/photo-1614314115162-80db267677ea?q=80&w=2670&auto=format&fit=crop' },
  { id: 'tavern', name: 'Cozy Tavern', url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop' },
  { id: 'volcanic', name: 'Volcanic Forge', url: 'https://images.unsplash.com/photo-1578593139888-39622e2047de?q=80&w=2600&auto=format&fit=crop' },
  { id: 'library', name: "Wizard's Library", url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2600&auto=format&fit=crop' },
  { id: 'astral', name: 'Astral Void', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2600&auto=format&fit=crop' },
  { id: 'abyss', name: 'Abyssal Depths', url: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=2600&auto=format&fit=crop' },
  { id: 'desert', name: 'Scorching Sands', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2600&auto=format&fit=crop' },
  { id: 'frozen', name: 'Frozen Keep', url: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=2600&auto=format&fit=crop' },
  { id: 'dragon', name: "Dragon's Lair", url: 'https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?q=80&w=2600&auto=format&fit=crop' },
  { id: 'celestial', name: 'Celestial Temple', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2600&auto=format&fit=crop' },
  { id: 'elven', name: 'Elven Sanctuary', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop' },
  { id: 'neon', name: 'Neon Sanctum', url: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?q=80&w=2600&auto=format&fit=crop' }
];

const MATERIALS: { id: DiceMaterial, name: string, color: string, hex: string, theme: string }[] = [
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
  { id: 'rolling', name: 'Gold-Flecked Rolling', color: 'bg-yellow-600', hex: '#eab308', theme: 'diceOfRolling' }
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
  
  // Randomly select background and material on load
  const [bgImage, setBgImage] = useState(() => BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)].url);
  const [material, setMaterial] = useState<DiceMaterial>('gold');

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPhysicsReady, setIsPhysicsReady] = useState(false);
  
  const physicsDiceRef = useRef<PhysicsDiceRef>(null);

  useEffect(() => {
    if (!isPhysicsReady || !physicsDiceRef.current) return;
    const selectedMaterial = MATERIALS.find(m => m.id === material) || MATERIALS[0];
    physicsDiceRef.current.updateConfig(selectedMaterial.hex, selectedMaterial.theme);
  }, [material, isPhysicsReady]);

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

  const saveHistory = (newHistory: RollResult[]) => {
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
      
      let notation = '';
      if (isPoolRoll) {
        // Construct composite notation from selectedPool
        const parts = (Object.entries(selectedPool) as [DiceType, number][])
          .filter(([_, count]) => count > 0)
          .map(([type, count]) => `${count}${type}`);
        notation = parts.join('+');
      } else {
        const diceType = singleDiceType || activeDice;
        const isAdvantageRoll = diceType === 'd20' && advantageMode === 'advantage';
        const isDisadvantageRoll = diceType === 'd20' && advantageMode === 'disadvantage';
        const actualCount = (isAdvantageRoll || isDisadvantageRoll) ? 2 : count;
        notation = `${actualCount}${diceType}`;
        setActiveDice(diceType);
      }

      if (!notation) {
        setIsRolling(false);
        return;
      }
      
      let result = null;
      if (is3DReady && physicsDiceRef.current) {
        try {
          result = await physicsDiceRef.current.roll(notation, selectedMaterial.hex, selectedMaterial.theme);
          playDiceSound();
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
        result.forEach((group: any) => {
          if (group && Array.isArray(group.rolls)) {
            const sides = group.sides || 20;
            const groupType: DiceType = `d${sides}` as DiceType;
            group.rolls.forEach((r: any) => {
              parsedRolls.push({
                type: groupType,
                value: r.value
              });
              totalSum += r.value;
            });
          } else if (group && group.value !== undefined) {
            const sides = group.sides || 20;
            const groupType: DiceType = `d${sides}` as DiceType;
            parsedRolls.push({
              type: groupType,
              value: group.value
            });
            totalSum += group.value;
          }
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
          const isAdvantageRoll = dt === 'd20' && advantageMode === 'advantage';
          const isDisadvantageRoll = dt === 'd20' && advantageMode === 'disadvantage';
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
        const isAdvantageRoll = dt === 'd20' && advantageMode === 'advantage';
        const isDisadvantageRoll = dt === 'd20' && advantageMode === 'disadvantage';
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
        if (activeMode === 'advantage') displayNotation = `d20 with Advantage`;
        else if (activeMode === 'disadvantage') displayNotation = `d20 with Disadvantage`;
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

  return (
    <div 
      onClick={handleBackgroundClick}
      className="min-h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden flex flex-col relative selection:bg-indigo-900/50 cursor-default"
    >
      {/* Mystical Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity transition-all duration-1000 grayscale-[40%]"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/20" />
      
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
                    "text-7xl font-serif font-bold drop-shadow-2xl",
                    currentRoll.isCriticalSuccess ? "text-slate-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" :
                    currentRoll.isCriticalFailure ? "text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" :
                    "text-slate-200"
                  )}>
                    {currentRoll.total}
                  </div>
                </div>
                
                {currentRoll.allDiceRolls && currentRoll.allDiceRolls.length > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 max-w-lg shadow-inner">
                    {currentRoll.allDiceRolls.map((dieRoll, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-850 shadow-sm animate-scale-in">
                        <DiceIcon type={dieRoll.type} material={material} className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono text-xs font-bold text-slate-300">{dieRoll.value}</span>
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
                  title="Roll d20 with Advantage (Take highest of 2)"
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
                  title="Roll d20 with Disadvantage (Take lowest of 2)"
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
          <div className="flex gap-3 sm:gap-6 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto justify-center hide-scrollbar">
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
                          scale: [0.4, 1.25, 1],
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
                          "w-8 h-8 transition-opacity duration-300", 
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
                          roll.isCriticalSuccess ? "text-slate-200 drop-shadow-md" :
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
              className="absolute top-0 right-0 h-full w-80 md:w-[400px] bg-slate-900 z-50 border-l border-slate-800 shadow-2xl flex flex-col"
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
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <ImageIcon className="w-5 h-5 text-slate-400" />
                    <h3 className="text-lg font-serif tracking-widest text-slate-300 uppercase">Environment</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {BACKGROUNDS.map(bg => (
                      <button
                        key={bg.id}
                        onClick={() => setBgImage(bg.url)}
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
                </section>
                
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}


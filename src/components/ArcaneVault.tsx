import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Copy, Check, Terminal, Code, Cpu, Sparkles, Binary, CheckCircle2, Monitor } from 'lucide-react';
import { EASTER_EGG_LANGUAGES, EasterEggLanguage } from '../data/easterEggs';
import { DiceMaterial } from './DiceIcons';

interface ArcaneVaultProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySkin: (material: DiceMaterial) => void;
  currentMaterial: DiceMaterial;
}

export default function ArcaneVault({ isOpen, onClose, onApplySkin, currentMaterial }: ArcaneVaultProps) {
  const [selectedLang, setSelectedLang] = useState<EasterEggLanguage>(EASTER_EGG_LANGUAGES[0]);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'editor' | 'terminal'>('terminal');
  
  // Terminal state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [progressLine, setProgressLine] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Reset terminal logs when switching languages
  useEffect(() => {
    setTerminalLogs([
      `Arcane Compiler v6.7.2 initialized for target ${selectedLang.name.toUpperCase()}...`,
      `Type "run" or press the COMPILE button above to execute.`
    ]);
    setIsCompiling(false);
    setProgressLine('');
  }, [selectedLang]);

  // Scroll to bottom of terminal when logs change
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, progressLine]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(selectedLang.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const runSimulatedCompilation = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setTerminalLogs([]);
    
    let currentLogIndex = 0;
    const logs = selectedLang.simulatedOutput;
    
    const printNextLine = () => {
      if (currentLogIndex < logs.length) {
        const nextLine = logs[currentLogIndex];
        
        // Simulate compilation spinner for lines starting with $ or zig build or nim c
        if (nextLine.startsWith('$') || nextLine.startsWith('HC_JIT:')) {
          setProgressLine(`[COMPILING] Please wait... ⏳`);
          setTimeout(() => {
            setTerminalLogs(prev => [...prev, nextLine]);
            setProgressLine('');
            currentLogIndex++;
            printNextLine();
          }, 800);
        } else {
          setTerminalLogs(prev => [...prev, nextLine]);
          currentLogIndex++;
          // Faster printing for normal program outputs
          setTimeout(printNextLine, 250);
        }
      } else {
        setIsCompiling(false);
        // Automatically check if there is an associated dice skin and apply it or suggest it!
        const associatedSkin = getAssociatedSkin(selectedLang.id);
        if (associatedSkin) {
          setTerminalLogs(prev => [
            ...prev,
            '',
            `💡 System: Connected Dice Skin Detected! "[${selectedLang.name}] Skin" can now be linked to your material drawer.`
          ]);
        }
      }
    };

    printNextLine();
  };

  const getAssociatedSkin = (id: string): DiceMaterial | null => {
    if (id === 'holyc') return 'holyc';
    if (id === 'zig') return 'zig';
    if (id === 'cobol') return 'cobol';
    return null;
  };

  const associatedSkin = getAssociatedSkin(selectedLang.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Backdrop click to close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-pointer" 
            onClick={onClose} 
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-6xl h-[85vh] flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-slate-800 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-400">
                  <Binary className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold font-serif text-slate-100 tracking-wide flex items-center gap-2">
                    Arcane Code Sanctum & Terminal
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 font-mono">
                      v2.0
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">Run simulated physical compilers and execute esoteric dice models.</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar + Workspace layout */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left Sidebar: Language Tabs */}
              <div className="w-full md:w-64 bg-slate-900/40 border-r border-slate-900 p-4 overflow-y-auto flex md:flex-col gap-2 shrink-0 border-b md:border-b-0">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 mb-2 hidden md:block">
                  Ancient Multiverse
                </div>
                {EASTER_EGG_LANGUAGES.map((lang) => {
                  const isActive = selectedLang.id === lang.id;
                  const hasSkin = getAssociatedSkin(lang.id) !== null;
                  
                  return (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLang(lang)}
                      className={`flex items-center justify-between w-full p-2.5 rounded-xl transition-all text-left group ${
                        isActive 
                          ? 'bg-slate-800 border border-slate-700/60 text-indigo-400' 
                          : 'hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                          isActive 
                            ? 'bg-indigo-500/20 text-indigo-300' 
                            : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                        }`}>
                          .{lang.extension}
                        </span>
                        <span className="font-medium truncate text-sm">{lang.name}</span>
                      </div>
                      
                      {hasSkin && (
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-indigo-400 animate-ping' : 'bg-slate-600'} hidden md:inline-block`} title="Dice Skin Available" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Central Workspace */}
              <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
                {/* Language Info Header */}
                <div className="p-5 bg-slate-900/20 border-b border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-200 flex items-center gap-2">
                      {selectedLang.name} Architecture
                      <span className="text-xs font-mono text-slate-500">
                        (file: arcane_dice.{selectedLang.extension})
                      </span>
                    </h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-2xl font-light">
                      {selectedLang.description}
                    </p>
                    <p className="text-xs text-slate-500 italic mt-1">
                      &ldquo;{selectedLang.philosophy}&rdquo;
                    </p>
                  </div>

                  {/* Mode Selector + Direct apply */}
                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    <button
                      onClick={() => setViewMode('terminal')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                        viewMode === 'terminal' 
                          ? 'bg-indigo-600/25 border border-indigo-500/40 text-indigo-300 shadow-sm' 
                          : 'bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      Simulated Terminal
                    </button>
                    <button
                      onClick={() => setViewMode('editor')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                        viewMode === 'editor' 
                          ? 'bg-indigo-600/25 border border-indigo-500/40 text-indigo-300 shadow-sm' 
                          : 'bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      View Code
                    </button>
                  </div>
                </div>

                {/* Workspace Panels */}
                <div className="flex-1 overflow-hidden relative">
                  {viewMode === 'editor' ? (
                    /* Syntax Highlighted Code Viewer (Idea 1) */
                    <div className="absolute inset-0 flex flex-col p-4">
                      <div className="flex items-center justify-between mb-2 bg-slate-900 px-4 py-2 rounded-t-lg border border-slate-800 border-b-0 shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-red-500/30" />
                          <span className="w-3 h-3 rounded-full bg-yellow-500/30" />
                          <span className="w-3 h-3 rounded-full bg-green-500/30" />
                          <span className="text-xs font-mono text-slate-500 ml-2">arcane_dice.{selectedLang.extension}</span>
                        </div>
                        <button
                          onClick={handleCopyCode}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded bg-slate-800 border border-slate-700/80 hover:bg-slate-700 hover:text-slate-100 text-slate-300 transition-all"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Source</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="flex-1 overflow-auto bg-slate-950 border border-slate-800 rounded-b-lg p-4 font-mono text-xs leading-relaxed text-slate-300 select-text selection:bg-indigo-500/30">
                        <pre className="whitespace-pre">{selectedLang.code}</pre>
                      </div>
                    </div>
                  ) : (
                    /* Interactive Compiler Terminal (Idea 4) */
                    <div className="absolute inset-0 flex flex-col p-4 gap-4">
                      {/* Terminal Run Bar */}
                      <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800 shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 animate-ping" />
                            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Terminal Ready</span>
                          </div>
                        </div>

                        <button
                          onClick={runSimulatedCompilation}
                          disabled={isCompiling}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md ${
                            isCompiling 
                              ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed' 
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-95 border border-indigo-500/50 shadow-indigo-950/20'
                          }`}
                        >
                          <Play className="w-4 h-4 fill-current" />
                          Compile & Execute Fate
                        </button>
                      </div>

                      {/* Black Terminal Screen */}
                      <div className="flex-1 bg-black rounded-xl border border-slate-900 p-5 font-mono text-sm overflow-y-auto shadow-inner relative flex flex-col justify-between selection:bg-emerald-500/20">
                        {/* Terminal CRT Scan Line overlay effect */}
                        <div className="absolute inset-0 pointer-events-none bg-radial-gradient opacity-10" />
                        
                        <div className="space-y-1.5 flex-1 pb-4">
                          {terminalLogs.map((log, index) => {
                            let textClass = 'text-slate-300';
                            if (log.startsWith('$') || log.startsWith('HC_JIT:')) {
                              textClass = 'text-indigo-400 font-semibold';
                            } else if (log.includes('CRITICAL TRIUMPH') || log.includes('Success') || log.includes('SUCCESS') || log.includes('complete') || log.includes('compiled') || log.includes('Smite') || log.includes('Approved!')) {
                              textClass = 'text-emerald-400 font-bold';
                            } else if (log.includes('ERROR') || log.includes('CRITICAL FAILURE')) {
                              textClass = 'text-rose-400 font-bold';
                            } else if (log.startsWith('💡 System:')) {
                              textClass = 'text-yellow-400 font-medium italic';
                            } else if (log.startsWith('---') || log.startsWith('===')) {
                              textClass = 'text-indigo-300 font-semibold tracking-wider';
                            } else if (log.startsWith('/') || log.startsWith('\\') || log.startsWith('|') || log.startsWith('+') || log.startsWith('v-') || log.startsWith('.')) {
                              textClass = 'text-slate-400 font-bold'; // ASCII Art
                            }
                            
                            return (
                              <div key={index} className={`${textClass} leading-relaxed whitespace-pre-wrap`}>
                                {log}
                              </div>
                            );
                          })}
                          
                          {/* Active typing / compiling spinner */}
                          {isCompiling && progressLine && (
                            <div className="text-yellow-400 font-bold flex items-center gap-2 animate-pulse">
                              <span>{progressLine}</span>
                            </div>
                          )}

                          <div ref={terminalEndRef} />
                        </div>

                        {/* Prompt command line */}
                        <div className="pt-2 border-t border-slate-950/40 flex items-center gap-2 text-indigo-400 shrink-0 font-bold">
                          <span>$</span>
                          <span className="text-slate-300 font-normal">
                            {isCompiling ? (
                              <span className="animate-pulse">compiling arcane_dice.{selectedLang.extension}...</span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <span className="opacity-60">select {selectedLang.id} _</span>
                                <span className="w-1.5 h-4 bg-indigo-400 animate-[blink_1s_infinite]" />
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Controls: Connect to Dice Material (Idea 3) */}
                {associatedSkin && (
                  <div className="px-6 py-4 bg-slate-900/60 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-slate-300">
                          Dice Skin Unlockable:
                        </span>
                        <span className="text-sm font-semibold text-slate-100 ml-1">
                          {selectedLang.name} Style
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onApplySkin(associatedSkin);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all border ${
                        currentMaterial === associatedSkin 
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' 
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500/30 shadow-lg active:scale-95'
                      }`}
                    >
                      {currentMaterial === associatedSkin ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Linked & Active!
                        </>
                      ) : (
                        <>
                          <Monitor className="w-4 h-4" />
                          Apply Skin to Dice
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

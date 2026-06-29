import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import DiceBox from '@3d-dice/dice-box';

export interface PhysicsDiceRef {
  roll: (notation: string, themeColor: string, theme?: string) => Promise<any>;
  clear: () => void;
  isReady: boolean;
}

export const PhysicsDice = forwardRef<PhysicsDiceRef, {}>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diceBoxRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  const loadingThemesRef = useRef<Record<string, Promise<any>>>({});

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.id = 'physics-dice-box';
    
    // Initialize the dice box
    const box = new DiceBox('#physics-dice-box', {
      assetPath: '/assets/',
      theme: 'rust',
      preloadThemes: ['rust', 'diceOfRolling', 'gemstone', 'gemstoneMarble'],
      scale: 14,
      spinForce: 15,
      throwForce: 6,
      gravity: 4,
      delay: 50,
      lightIntensity: 1.2,
    });

    box.init().then(() => {
      diceBoxRef.current = box;
      setIsReady(true);
      // Ensure immediate correct sizing on initialization
      box.resizeWorld();
    });

    return () => {
      if (diceBoxRef.current) {
        diceBoxRef.current.clear();
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    roll: async (notation: string, themeColor: string, theme?: string) => {
      if (!diceBoxRef.current) return null;
      const targetTheme = theme || 'rust';
      
      // If theme is not loaded, load it. Avoid concurrent/duplicate loads for the same theme.
      if (!diceBoxRef.current.themesLoadedData?.[targetTheme]?.diceAvailable) {
        if (!loadingThemesRef.current[targetTheme]) {
          loadingThemesRef.current[targetTheme] = diceBoxRef.current.loadTheme(targetTheme)
            .catch((err: any) => {
              console.error(`Failed to load theme ${targetTheme}:`, err);
            })
            .finally(() => {
              delete loadingThemesRef.current[targetTheme];
            });
        }
        await loadingThemesRef.current[targetTheme];
      }
      
      // Secondary fallback: if still not loaded, fall back to 'rust' which is preloaded
      const activeTheme = diceBoxRef.current.themesLoadedData?.[targetTheme]?.diceAvailable ? targetTheme : 'rust';
      
      return diceBoxRef.current.roll(notation, { themeColor, theme: activeTheme });
    },
    clear: () => {
      if (diceBoxRef.current) {
        diceBoxRef.current.clear();
      }
    },
    isReady
  }));

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-screen h-screen z-40 pointer-events-none mix-blend-normal overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
});

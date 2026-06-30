import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import DiceBox from '@3d-dice/dice-box';

export interface PhysicsDiceRef {
  roll: (notation: string, themeColor?: string, theme?: string) => Promise<any>;
  clear: () => void;
  updateConfig: (themeColor?: string, theme?: string) => Promise<void>;
  isReady: boolean;
}

interface PhysicsDiceProps {
  onReady?: () => void;
}

export const PhysicsDice = forwardRef<PhysicsDiceRef, PhysicsDiceProps>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diceBoxRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  const loadingThemesRef = useRef<Record<string, Promise<any>>>({});

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.id = 'physics-dice-box';
    
    // Calculate asset path dynamically based on Vite's base URL for GitHub Pages support
    const baseUrl = import.meta.env.BASE_URL || '/';
    const assetPath = baseUrl.endsWith('/') ? `${baseUrl}assets/` : `${baseUrl}/assets/`;

    // Initialize the dice box
    const box = new DiceBox('#physics-dice-box', {
      assetPath,
      theme: 'default',
      preloadThemes: ['default'],
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
      if (props.onReady) {
        props.onReady();
      }
    });

    return () => {
      if (diceBoxRef.current) {
        diceBoxRef.current.clear();
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    roll: async (notation: string, themeColor?: string, theme?: string) => {
      if (!diceBoxRef.current) return null;
      
      const options: any = {};
      if (theme) options.theme = theme;
      if (themeColor) options.themeColor = themeColor;
      
      // Update config first to ensure theme is loaded and ready before rolling
      if (theme || themeColor) {
        await diceBoxRef.current.updateConfig(options);
      }
      
      return diceBoxRef.current.roll(notation, options);
    },
    clear: () => {
      if (diceBoxRef.current) {
        diceBoxRef.current.clear();
      }
    },
    updateConfig: async (themeColor?: string, theme?: string) => {
      if (!diceBoxRef.current) return;
      const options: any = {};
      if (theme) options.theme = theme;
      if (themeColor) options.themeColor = themeColor;
      await diceBoxRef.current.updateConfig(options);
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

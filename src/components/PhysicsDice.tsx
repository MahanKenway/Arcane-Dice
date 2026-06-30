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
  const initializingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if (initializingRef.current) return;
    initializingRef.current = true;

    containerRef.current.id = 'physics-dice-box';
    containerRef.current.innerHTML = ''; // Clear container to prevent duplicate canvas elements
    
    // Calculate asset path dynamically based on window.location for robust GitHub Pages and Web Worker support
    let basePath = window.location.pathname;
    if (basePath.endsWith('.html') || basePath.endsWith('.htm')) {
      const lastSlash = basePath.lastIndexOf('/');
      basePath = basePath.substring(0, lastSlash + 1);
    }
    if (!basePath.endsWith('/')) {
      basePath += '/';
    }
    const assetPath = `${basePath}assets/`;
    console.log('DiceBox Dynamic Asset Path:', assetPath, 'Origin:', window.location.origin);

    // Initialize the dice box
    const box = new DiceBox('#physics-dice-box', {
      assetPath,
      origin: window.location.origin,
      theme: 'default',
      preloadThemes: ['default'],
      scale: 14,
      spinForce: 15,
      throwForce: 6,
      gravity: 4,
      delay: 50,
      lightIntensity: 1.2,
    });

    box.init()
      .then(() => {
        diceBoxRef.current = box;
        setIsReady(true);
        // Ensure immediate correct sizing on initialization
        box.resizeWorld();
        if (props.onReady) {
          props.onReady();
        }
      })
      .catch((err: any) => {
        console.error('Failed to initialize DiceBox:', err);
      });

    return () => {
      if (diceBoxRef.current) {
        try {
          diceBoxRef.current.clear();
        } catch (e) {
          console.warn('Error during DiceBox cleanup:', e);
        }
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
      
      // Clear right before rolling to avoid any leftover dice or race conditions
      diceBoxRef.current.clear();
      
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

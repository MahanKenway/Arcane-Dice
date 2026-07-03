import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import DiceBox from '@3d-dice/dice-box';

export interface PhysicsDiceRef {
  roll: (notation: string | string[], themeColor?: string, theme?: string) => Promise<any>;
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

  useEffect(() => {
    if (!containerRef.current) return;
    
    let active = true;
    let localBox: any = null;
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
    
    // Robust origin detection for sandboxed iframes
    const resolvedOrigin = window.location.origin === 'null' || !window.location.origin ? '' : window.location.origin;
    console.log('DiceBox Dynamic Asset Path:', assetPath, 'Origin:', resolvedOrigin);

    // Initialize the dice box
    const box = new DiceBox('#physics-dice-box', {
      assetPath,
      origin: resolvedOrigin,
      theme: 'default',
      preloadThemes: ['default'],
      offscreen: false, // Disable offscreen worker to ensure standard main-thread texture fetching in sandboxed iframes
      scale: 14,
      spinForce: 6,
      throwForce: 5,
      gravity: 1,
      mass: 1,
      friction: 0.8,
      restitution: 0,
      linearDamping: 0.5,
      angularDamping: 0.4,
      startingHeight: 8,
      settleTimeout: 5000,
      delay: 10,
      lightIntensity: 1,
    });

    box.init()
      .then(() => {
        if (!active) {
          try {
            box.clear();
          } catch (e) {}
          return;
        }
        localBox = box;
        diceBoxRef.current = box;
        setIsReady(true);
        // Ensure immediate correct sizing on initialization
        box.resizeWorld();
        if (props.onReady) {
          props.onReady();
        }
      })
      .catch((err: any) => {
        if (active) {
          console.error('Failed to initialize DiceBox:', err);
        }
      });

    return () => {
      active = false;
      setIsReady(false);
      if (localBox) {
        try {
          localBox.clear();
        } catch (e) {}
      }
      if (diceBoxRef.current === localBox) {
        diceBoxRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Prefetch themes in the background to avoid initial load delay
    const themesToPreload = ['rock', 'wooden', 'rust', 'diceOfRolling', 'gemstone', 'gemstoneMarble', 'blueGreenMetal', 'smooth', 'smooth-pip'];
    
    // Dynamically calculate basePath inside prefetch as well
    let basePath = window.location.pathname;
    if (basePath.endsWith('.html') || basePath.endsWith('.htm')) {
      const lastSlash = basePath.lastIndexOf('/');
      basePath = basePath.substring(0, lastSlash + 1);
    }
    if (!basePath.endsWith('/')) {
      basePath += '/';
    }

    const prefetchThemes = async () => {
      for (const theme of themesToPreload) {
        try {
          const res = await fetch(`${basePath}assets/themes/${theme}/theme.config.json`);
          if (res.ok) {
            const config = await res.json();
            // Preload maps explicitly by recursively finding string assets
            const assets: string[] = [];
            const addAsset = (val: any) => {
              if (typeof val === 'string' && val.length > 0) {
                if (!val.startsWith('data:') && val.includes('.')) {
                  assets.push(val);
                }
              } else if (typeof val === 'object' && val !== null) {
                Object.values(val).forEach(addAsset);
              }
            };

            addAsset(config.texture);
            addAsset(config.material);
            addAsset(config.bump);
            addAsset(config.colorMap);
            addAsset(config.normalMap);
            addAsset(config.roughnessMap);
            addAsset(config.metalnessMap);

            for (const asset of assets) {
              // Preload in cache without evaluating
              fetch(`${basePath}assets/themes/${theme}/${asset}`).catch(() => {});
            }
          }
        } catch (e) {
          // Silent fail for prefetch
        }
        // Small delay to prevent blocking network
        await new Promise(r => setTimeout(r, 500));
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => prefetchThemes());
    } else {
      setTimeout(prefetchThemes, 2000);
    }
  }, [isReady]);

  useImperativeHandle(ref, () => ({
    roll: async (notation: string | string[], themeColor?: string, theme?: string) => {
      if (!diceBoxRef.current) return null;
      
      const targetTheme = theme || 'default';
      
      const options: any = {
        theme: targetTheme
      };
      
      // Only apply themeColor if the theme is color-based (relying on grayscale textures for tinting)
      const colorThemes = ['default', 'rock', 'rust', 'gemstone', 'smooth', 'smooth-pip'];
      if (colorThemes.includes(targetTheme)) {
        if (themeColor) options.themeColor = themeColor;
      }
      
      // Update config first to ensure theme is loaded and ready before rolling
      await diceBoxRef.current.updateConfig(options);
      
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
      
      const targetTheme = theme || 'default';
      
      const options: any = {
        theme: targetTheme
      };
      
      // Only apply themeColor if the theme is color-based (relying on grayscale textures for tinting)
      const colorThemes = ['default', 'rock', 'rust', 'gemstone', 'smooth', 'smooth-pip'];
      if (colorThemes.includes(targetTheme)) {
        if (themeColor) options.themeColor = themeColor;
      }
      
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

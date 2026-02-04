import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { WindowState, DesktopApp } from '../types';

interface WindowContextType {
  windows: WindowState[];
  openWindow: (app: DesktopApp) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  getNextZIndex: () => number;
}

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const getNextZIndex = useCallback(() => {
    setMaxZIndex(prev => prev + 1);
    return maxZIndex + 1;
  }, [maxZIndex]);

  const openWindow = useCallback((app: DesktopApp) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === app.id);
      if (existing) {
        // If window exists, just restore and focus it
        return prev.map(w =>
          w.id === app.id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZIndex + 1 }
            : w
        );
      }
      // Create new window
      const newWindow: WindowState = {
        id: app.id,
        title: app.title,
        icon: app.icon,
        isOpen: true,
        isMinimized: false,
        position: { x: 50 + prev.length * 30, y: 50 + prev.length * 30 },
        size: app.defaultSize,
        zIndex: maxZIndex + 1,
      };
      setMaxZIndex(prev => prev + 1);
      return [...prev, newWindow];
    });
  }, [maxZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w
    ));
    setMaxZIndex(prev => prev + 1);
  }, [maxZIndex]);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
    ));
    setMaxZIndex(prev => prev + 1);
  }, [maxZIndex]);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, position } : w
    ));
  }, []);

  return (
    <WindowContext.Provider value={{
      windows,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      updateWindowPosition,
      getNextZIndex,
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
}

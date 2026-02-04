export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface DesktopApp {
  id: string;
  title: string;
  icon: string;
  defaultSize: { width: number; height: number };
}

import { useRef, useCallback, type ReactNode } from 'react';
import styled from 'styled-components';
import { Window as Win95Window, WindowHeader, WindowContent, Button } from 'react95';
import type { WindowState } from '../types';
import { useWindows } from '../context/WindowContext';

const StyledWindow = styled(Win95Window)<{ $zIndex: number }>`
  position: absolute;
  z-index: ${props => props.$zIndex};
`;

const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: move;
  user-select: none;
`;

const HeaderTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HeaderIcon = styled.span`
  font-size: 14px;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 2px;
`;

const HeaderButton = styled(Button)`
  padding: 0;
  min-width: 20px;
  height: 20px;
  font-size: 10px;
  font-weight: bold;
`;

const StyledWindowContent = styled(WindowContent)`
  overflow: auto;
`;

interface WindowProps {
  windowState: WindowState;
  children: ReactNode;
}

export default function Window({ windowState, children }: WindowProps) {
  const { closeWindow, minimizeWindow, focusWindow, updateWindowPosition } = useWindows();
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;

    focusWindow(windowState.id);
    dragOffset.current = {
      x: e.clientX - windowState.position.x,
      y: e.clientY - windowState.position.y,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, e.clientX - dragOffset.current.x);
      const newY = Math.max(0, e.clientY - dragOffset.current.y);
      updateWindowPosition(windowState.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [windowState.id, windowState.position, focusWindow, updateWindowPosition]);

  const handleWindowClick = useCallback(() => {
    focusWindow(windowState.id);
  }, [windowState.id, focusWindow]);

  if (windowState.isMinimized) {
    return null;
  }

  return (
    <StyledWindow
      ref={windowRef}
      $zIndex={windowState.zIndex}
      style={{
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
      }}
      onClick={handleWindowClick}
    >
      <StyledWindowHeader onMouseDown={handleMouseDown}>
        <HeaderTitle>
          <HeaderIcon>{windowState.icon}</HeaderIcon>
          {windowState.title}
        </HeaderTitle>
        <HeaderButtons>
          <HeaderButton onClick={() => minimizeWindow(windowState.id)}>_</HeaderButton>
          <HeaderButton onClick={() => closeWindow(windowState.id)}>X</HeaderButton>
        </HeaderButtons>
      </StyledWindowHeader>
      <StyledWindowContent style={{ height: `calc(100% - 33px)` }}>
        {children}
      </StyledWindowContent>
    </StyledWindow>
  );
}

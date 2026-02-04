import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Button } from 'react95';
import StartMenu from './StartMenu';
import { useWindows } from '../context/WindowContext';

const StyledAppBar = styled(AppBar)`
  top: auto;
  bottom: 0;
  z-index: 9000;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding: 4px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  position: relative;
`;

const StartButton = styled(Button)<{ $active?: boolean }>`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
  ${props => props.$active && `
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.4);
    background: #d0d0d0;
  `}
`;

const StartIcon = styled.span`
  font-size: 18px;
`;

const WindowButtons = styled.div`
  display: flex;
  gap: 2px;
  margin-left: 8px;
  flex: 1;
  overflow: hidden;
`;

const WindowButton = styled(Button)<{ $active?: boolean }>`
  min-width: 120px;
  max-width: 160px;
  justify-content: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  ${props => props.$active && `
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.4);
    background: #d0d0d0;
  `}
`;

const WindowButtonIcon = styled.span`
  margin-right: 4px;
  font-size: 12px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Clock = styled.div`
  padding: 4px 12px;
  border: 1px solid;
  border-color: #868686 #ffffff #ffffff #868686;
  background: #c0c0c0;
  font-size: 12px;
  min-width: 70px;
  text-align: center;
`;

export default function Taskbar() {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const { windows, restoreWindow, focusWindow, minimizeWindow } = useWindows();
  const startButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (startMenuOpen && startButtonRef.current && !startButtonRef.current.contains(e.target as Node)) {
        const menu = document.querySelector('[class*="MenuList"]');
        if (menu && !menu.contains(e.target as Node)) {
          setStartMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [startMenuOpen]);

  const handleWindowButtonClick = (windowId: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(windowId);
    } else {
      // Check if this window is the focused one (highest z-index among open windows)
      const openWindows = windows.filter(w => w.isOpen && !w.isMinimized);
      const maxZ = Math.max(...openWindows.map(w => w.zIndex));
      const clickedWindow = windows.find(w => w.id === windowId);

      if (clickedWindow && clickedWindow.zIndex === maxZ) {
        minimizeWindow(windowId);
      } else {
        focusWindow(windowId);
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <StyledAppBar>
      <StyledToolbar>
        <LeftSection>
          <div style={{ position: 'relative' }}>
            <StartButton
              ref={startButtonRef}
              $active={startMenuOpen}
              onClick={() => setStartMenuOpen(!startMenuOpen)}
            >
              <StartIcon>🪟</StartIcon>
              Start
            </StartButton>
            {startMenuOpen && <StartMenu onClose={() => setStartMenuOpen(false)} />}
          </div>
          <WindowButtons>
            {windows.filter(w => w.isOpen).map(window => (
              <WindowButton
                key={window.id}
                $active={!window.isMinimized}
                onClick={() => handleWindowButtonClick(window.id, window.isMinimized)}
              >
                <WindowButtonIcon>{window.icon}</WindowButtonIcon>
                {window.title}
              </WindowButton>
            ))}
          </WindowButtons>
        </LeftSection>
        <RightSection>
          <Clock>{formatTime(time)}</Clock>
        </RightSection>
      </StyledToolbar>
    </StyledAppBar>
  );
}

import styled from 'styled-components';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import { desktopApps } from '../apps/apps';
import { useWindows } from '../context/WindowContext';
import MyCareer from '../apps/MyCareer';

const DesktopContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 37px; /* Leave space for taskbar */
  background: #008080;
  overflow: hidden;
`;

const IconsGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 8px;
  padding: 16px;
  height: 100%;
`;

const WindowsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

const getWindowContent = (appId: string) => {
  switch (appId) {
    case 'my-career':
      return <MyCareer />;
    default:
      return <div>Unknown application</div>;
  }
};

export default function Desktop() {
  const { windows, openWindow } = useWindows();

  return (
    <DesktopContainer>
      <IconsGrid>
        {desktopApps.map(app => (
          <DesktopIcon
            key={app.id}
            app={app}
            onDoubleClick={() => openWindow(app)}
          />
        ))}
      </IconsGrid>
      <WindowsContainer>
        {windows.filter(w => w.isOpen).map(windowState => (
          <Window key={windowState.id} windowState={windowState}>
            {getWindowContent(windowState.id)}
          </Window>
        ))}
      </WindowsContainer>
    </DesktopContainer>
  );
}

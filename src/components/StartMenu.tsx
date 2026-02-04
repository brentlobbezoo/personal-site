import styled from 'styled-components';
import { MenuList, MenuListItem, Separator } from 'react95';
import { desktopApps } from '../apps/apps';
import { useWindows } from '../context/WindowContext';

const StyledMenuList = styled(MenuList)`
  position: absolute;
  left: 0;
  bottom: 100%;
  min-width: 200px;
  z-index: 9999;
`;

const MenuIcon = styled.span`
  margin-right: 8px;
  font-size: 16px;
`;

const SideBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 24px;
  background: linear-gradient(to bottom, #000080, #1084d0);
  display: flex;
  align-items: flex-end;
  padding-bottom: 8px;
`;

const SideBarText = styled.span`
  color: #c0c0c0;
  font-weight: bold;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 18px;
  letter-spacing: 2px;
`;

const MenuContent = styled.div`
  margin-left: 24px;
`;

interface StartMenuProps {
  onClose: () => void;
}

export default function StartMenu({ onClose }: StartMenuProps) {
  const { openWindow } = useWindows();

  const handleAppClick = (app: typeof desktopApps[0]) => {
    openWindow(app);
    onClose();
  };

  return (
    <StyledMenuList>
      <SideBar>
        <SideBarText>Windows 95</SideBarText>
      </SideBar>
      <MenuContent>
        {desktopApps.map(app => (
          <MenuListItem key={app.id} onClick={() => handleAppClick(app)}>
            <MenuIcon>{app.icon}</MenuIcon>
            {app.title}
          </MenuListItem>
        ))}
        <Separator />
        <MenuListItem disabled>
          <MenuIcon>🔧</MenuIcon>
          Settings
        </MenuListItem>
        <MenuListItem disabled>
          <MenuIcon>📄</MenuIcon>
          Documents
        </MenuListItem>
        <Separator />
        <MenuListItem disabled>
          <MenuIcon>🔌</MenuIcon>
          Shut Down...
        </MenuListItem>
      </MenuContent>
    </StyledMenuList>
  );
}

import styled from 'styled-components';
import type { DesktopApp } from '../types';

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  padding: 8px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: rgba(0, 0, 128, 0.3);
  }

  &:active {
    background: rgba(0, 0, 128, 0.5);
  }
`;

const IconImage = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 4px;
`;

const IconLabel = styled.span`
  color: white;
  text-align: center;
  font-size: 12px;
  text-shadow: 1px 1px 1px black;
  word-wrap: break-word;
  max-width: 100%;
`;

interface DesktopIconProps {
  app: DesktopApp;
  onDoubleClick: () => void;
}

export default function DesktopIcon({ app, onDoubleClick }: DesktopIconProps) {
  return (
    <IconWrapper onDoubleClick={onDoubleClick}>
      <IconImage>{app.icon}</IconImage>
      <IconLabel>{app.title}</IconLabel>
    </IconWrapper>
  );
}

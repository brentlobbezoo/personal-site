import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { styleReset } from 'react95';
import { createGlobalStyle } from 'styled-components';
import { WindowProvider } from './context/WindowContext';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';

const GlobalStyles = createGlobalStyle`
  ${styleReset}

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('https://unpkg.com/react95@4.0.0/dist/fonts/ms_sans_serif.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'ms_sans_serif';
    src: url('https://unpkg.com/react95@4.0.0/dist/fonts/ms_sans_serif_bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  * {
    font-family: 'ms_sans_serif', sans-serif;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

function App() {
  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <WindowProvider>
        <Desktop />
        <Taskbar />
      </WindowProvider>
    </ThemeProvider>
  );
}

export default App;

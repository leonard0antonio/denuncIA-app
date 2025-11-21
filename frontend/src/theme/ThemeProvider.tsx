
import React, { type ReactNode, useState, useEffect } from 'react';
import { ThemeProvider as StyledProvider, createGlobalStyle } from 'styled-components';
import { light, dark } from './theme';

const Global = createGlobalStyle<{theme: any}>`
  :root {
    --bg: ${(p) => p.theme.bg};
    --card: ${(p) => p.theme.card};
    --text: ${(p) => p.theme.text};
    --primary: ${(p) => p.theme.primary};
    --muted: ${(p) => p.theme.muted};
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--bg);
    color: var(--text);
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial;
  }
`;

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <StyledProvider theme={isDark ? dark : light}>
      <Global />
      {React.cloneElement(children as React.ReactElement, { toggleTheme: () => setIsDark((s) => !s), isDark })}
    </StyledProvider>
  );
}

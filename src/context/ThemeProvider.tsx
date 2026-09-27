import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ThemeContext, type Theme, type ThemePreference, type ThemeContextValue } from './themeContext';

const THEME_STORAGE_KEY = 'soquibat-theme';

function getInitialPreference(): ThemePreference {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
  return 'system';
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(getInitialPreference);
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);
  const theme = preference === 'system' ? systemTheme : preference;
  const previousThemeRef = useRef(theme);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const updateSystemTheme = () => setSystemTheme(mediaQuery.matches ? 'light' : 'dark');
    mediaQuery.addEventListener('change', updateSystemTheme);
    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    if (previousThemeRef.current === theme) return;

    root.classList.add('theme-transition');
    const transitionTimeout = window.setTimeout(() => root.classList.remove('theme-transition'), 350);
    previousThemeRef.current = theme;
    return () => window.clearTimeout(transitionTimeout);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => ({
    theme,
    toggleTheme: () => {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      setPreference(nextTheme);
    },
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

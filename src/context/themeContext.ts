import { createContext } from 'react';

export type Theme = 'dark' | 'light';
export type ThemePreference = Theme | 'system';

export type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

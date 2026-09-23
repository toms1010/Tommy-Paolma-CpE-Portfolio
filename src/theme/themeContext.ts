import { createContext } from 'react';
import type { Theme } from '../types/portfolio';

export interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggle: () => undefined,
});

export const THEME_STORAGE_KEY = 'tp-theme';

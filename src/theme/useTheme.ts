import { useContext } from 'react';
import type { Theme } from '../types/portfolio';
import { ThemeContext } from './themeContext';

export function useTheme(): { theme: Theme; toggle: () => void } {
  return useContext(ThemeContext);
}

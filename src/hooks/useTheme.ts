import { useState } from 'react';
import { useTheme as useThemeName } from '@gravity-ui/uikit';
import type { Theme } from '@gravity-ui/uikit';

export type AppTheme = Extract<Theme, 'light' | 'dark'>;

export const useTheme = () => {
  const defaultTheme = useThemeName();

  const [theme, setTheme] = useState<AppTheme>(
    (['dark', 'light'] as AppTheme[]).includes(defaultTheme as AppTheme) ? (defaultTheme as AppTheme) : 'light',
  );

  const switchTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    document.querySelector('body')?.classList.replace(`g-root_theme_${theme}`, `g-root_theme_${newTheme}`);

    setTheme(newTheme);
  };

  return { theme, switchTheme };
};

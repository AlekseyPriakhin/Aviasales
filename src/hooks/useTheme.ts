import { useState } from 'react';
import type { Theme } from '@gravity-ui/uikit';

export type AppTheme = Extract<Theme, 'light' | 'dark'>;

export const useTheme = () => {
  const [theme, setTheme] = useState<AppTheme>('dark');
  const [bodyClassName, setBodyClassName] = useState(`g-root g-root_theme_${theme}`);

  const switchTheme = () => {
    // const prevTheme = theme;

    if (theme === 'dark') setTheme('light');
    else setTheme('dark');

    setBodyClassName(`g-root g-root_theme_${theme}`);
  };

  return { theme, switchTheme, bodyClassName };
};

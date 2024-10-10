import type { Metadata } from 'next';

import '@/styles/globals.scss';
import styles from './layout.module.scss';

import { ThemeProvider } from '@gravity-ui/uikit';
import type { Theme } from '@gravity-ui/uikit';

export const metadata: Metadata = {
  title: 'Aviasales app',
  description: 'SPA development course',
};

const DEFAULT_THEME: Theme = 'dark';
const DEFAULT_BODY_CLASSNAME = `g-root g-root_theme_${DEFAULT_THEME}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={DEFAULT_BODY_CLASSNAME}>
        <ThemeProvider theme={DEFAULT_THEME}>
          <main className={styles['main']}>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

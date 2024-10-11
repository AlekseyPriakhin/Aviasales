import type { Metadata } from 'next';

import '@/styles/globals.scss';
import styles from './layout.module.scss';

import { ThemeProvider } from '@gravity-ui/uikit';
import type { Theme } from '@gravity-ui/uikit';
import ReactQueryProvider from '@/providers/reactQuery';
import Header from '@/components/header/header';

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
    <html>
      <ReactQueryProvider>
        <body className={[DEFAULT_BODY_CLASSNAME, styles['body']].join(' ')}>
          <ThemeProvider theme={DEFAULT_THEME}>
            <Header />
            <main className={styles['main']}>{children}</main>
          </ThemeProvider>
        </body>
      </ReactQueryProvider>
    </html>
  );
}

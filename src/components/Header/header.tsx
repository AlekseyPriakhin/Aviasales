'use client';
import UIContainer from '@/ui/UIContainer/UIContainer';
import styles from './header.module.scss';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@gravity-ui/uikit';

// eslint-disable-next-line camelcase
type THref = __next_route_internal_types__.RouteImpl<''>;
interface ILink {
  href: THref | null;
  label: string;
}

export default function Header() {
  const { t } = useI18n();

  const { switchTheme } = useTheme();

  const links: ILink[] = [
    { label: t('routes', '/'), href: '/' },
    { label: 'вот сюды', href: null },
    { label: 'вот туды', href: null },
  ] as const;

  return (
    <header className={styles['header']}>
      <UIContainer>
        <div className={styles['links']}>
          {links.map(({ label, href }) => {
            return href ? (
              <Link
                href={href}
                key={label}
                className={styles['link']}>
                {label}
              </Link>
            ) : (
              <span key={label}> {label} </span>
            );
          })}
        </div>
        <Button onClick={switchTheme}> switch </Button>
      </UIContainer>
    </header>
  );
}

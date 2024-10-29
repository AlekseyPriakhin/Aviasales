'use client';
import UIContainer from '@/ui/UIContainer/UIContainer';
import styles from './header.module.scss';
import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import HeaderLoginOrUser from '../HeaderLoginOrUser/headerLoginOrUser';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

// eslint-disable-next-line camelcase
type THref = __next_route_internal_types__.RouteImpl<''>;
interface ILink {
  href: THref | null;
  label: string;
}

export default function Header() {
  const { t } = useI18n();

  const links: ILink[] = [
    { label: t('routes', '/'), href: '/' },
    { label: t('routes', '/flights'), href: '/flights' },
  ] as const;

  return (
    <header className={styles['header']}>
      <UIContainer className={styles['content']}>
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
        <ThemeToggler />
        <HeaderLoginOrUser className={styles['login-or-user']} />
      </UIContainer>
    </header>
  );
}

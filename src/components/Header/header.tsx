'use client';
import UIContainer from '@/ui/UIContainer';
import styles from './header.module.scss';
import Link from 'next/link';
import HeaderLoginOrUser from '@/components/Header/headerLoginOrUser';
import { useI18n } from '@/hooks/useI18n';
import { useSession } from 'next-auth/react';

// eslint-disable-next-line camelcase
type THref = __next_route_internal_types__.RouteImpl<''>;
interface ILink {
  href: THref | null;
  label: string;
}

export default function Header() {
  const { t } = useI18n();
  const { status } = useSession();

  const links: ILink[] = [
    { label: t('routes', '/'), href: '/' },
    // { label: t('routes', '/flights'), href: '/flights' },
  ];

  if (status === 'authenticated') links.push({ label: t('routes', '/tickets'), href: '/tickets' });

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
        <div className={styles['actions']}>
          <HeaderLoginOrUser className={styles['login-or-user']} />
        </div>
      </UIContainer>
    </header>
  );
}

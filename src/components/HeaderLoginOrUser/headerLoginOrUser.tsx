'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ArrowRightFromSquare } from '@gravity-ui/icons';
import styles from './headerLoginOrUser.module.scss';
import { Avatar, Button, Icon } from '@gravity-ui/uikit';
import type { INodeProps } from '@/types';

const HeaderLoginOrUser = ({ className }: INodeProps) => {
  const { data, status } = useSession();

  return (
    <section className={[styles['section'], className].join(' ')}>
      {status === 'authenticated' && data.user?.name ? (
        <div className={styles['user']}>
          <Avatar
            size="xl"
            text={data.user.name[0]}
          />
          <Button
            size="xl"
            onClick={() => signOut()}>
            <Icon
              data={ArrowRightFromSquare}
              size={18}></Icon>
          </Button>
        </div>
      ) : (
        <Button onClick={() => signIn()}> Войти </Button>
      )}
    </section>
  );
};

export default HeaderLoginOrUser;

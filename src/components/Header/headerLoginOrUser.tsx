'use client';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar, Button, IconButton } from '@mui/material';

import styles from './headerLoginOrUser.module.scss';
import { deepPurple } from '@mui/material/colors';

import { signIn, signOut, useSession } from 'next-auth/react';

import type { INodeProps } from '@/types';

const HeaderLoginOrUser = ({ className }: INodeProps) => {
  const { data, status } = useSession();

  return (
    <section className={[styles['section'], className].join(' ')}>
      {status === 'authenticated' && data.user?.name ? (
        <div className={styles['user']}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}> {data.user.name[0]} </Avatar>
          <IconButton onClick={() => signOut()}>
            <ExitToAppIcon color="primary" />
          </IconButton>
        </div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => signIn()}>
          {' '}
          Войти{' '}
        </Button>
      )}
    </section>
  );
};

export default HeaderLoginOrUser;

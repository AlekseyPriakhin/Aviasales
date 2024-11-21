'use client';
// import { NotificationsProvider as Provider } from '@toolpad/core/useNotifications';
import { SnackbarProvider as Provider } from 'notistack';
import type { INodeProps } from '@/types';

const NotificationsProvider = ({ children }: INodeProps) => {
  return <Provider>{children}</Provider>;
};

export default NotificationsProvider;

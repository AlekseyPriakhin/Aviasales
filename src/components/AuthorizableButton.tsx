import { Button } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useI18n } from '@/hooks/useI18n';
import type { INodeProps } from '@/types';

const AuthorizableButton = ({ children }: INodeProps) => {
  const { t } = useI18n();
  const { status } = useSession();

  if (status === 'unauthenticated')
    return (
      <Button
        variant="contained"
        onClick={() => signIn()}>
        {t('common', 'authorizeAction')}
      </Button>
    );

  return children;
};

export default AuthorizableButton;

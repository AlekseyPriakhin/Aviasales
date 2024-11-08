'use client';
import UIContainer from '@/ui/UIContainer';
import { Button } from '@mui/material';

import { useFlight } from '@/queries/flights';
import { useI18n } from '@/hooks/useI18n';
import { signIn, useSession } from 'next-auth/react';

interface IProps {
  params: {
    id: number;
  };
}

const Flight = ({ params: { id } }: IProps) => {
  const { t } = useI18n();
  const { flight } = useFlight(id);

  const { status } = useSession();

  if (!flight) return <UIContainer> {t('common', 'loading')} </UIContainer>;

  return (
    <div>
      <UIContainer>
        {' '}
        {t('common', 'flight')} {flight.route?.from}
        {' ---> '}
        {flight.route?.to}
      </UIContainer>
      <UIContainer>
        {flight.route?.description}
        <div>
          {flight.availableSeatsCount > 0 ? (
            status === 'unauthenticated' ? (
              <Button
                variant="contained"
                onClick={() => signIn()}>
                Авторизоваться
              </Button>
            ) : (
              <Button variant="contained"> Оформить </Button>
            )
          ) : (
            <span> Места кончились </span>
          )}
        </div>
      </UIContainer>
    </div>
  );
};

export default Flight;

'use client';
import PageContent from '@/components/PageContent/PageContent';
import PageHeader from '@/components/PageHeader/PageHeader';
import PageTemplate from '@/templates/PageTemplate/PageTemplate';
import UIContainer from '@/ui/UIContainer/UIContainer';
import { useFlight } from '@/queries/flights';
import { useI18n } from '@/hooks/useI18n';
import { Button } from '@gravity-ui/uikit';
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
    <PageTemplate>
      <PageHeader background="accent">
        {' '}
        {t('common', 'flight')} {flight.route.from}
        {' ---> '}
        {flight.route.to}
      </PageHeader>
      <PageContent background="secondary">
        {flight.route.description}
        <div>
          {flight.availableSeatsCount > 0 ? (
            status === 'unauthenticated' ? (
              <Button onClick={() => signIn()}> Авторизоваться </Button>
            ) : (
              <Button view="normal-contrast"> Оформить </Button>
            )
          ) : (
            <span> Места кончились </span>
          )}
        </div>
      </PageContent>
    </PageTemplate>
  );
};

export default Flight;

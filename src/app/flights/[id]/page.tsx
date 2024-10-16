'use client';

import { useFlight } from '@/api/flights';
import PageContent from '@/components/PageContent/PageContent';
import PageHeader from '@/components/PageHeader/PageHeader';
import { useI18n } from '@/hooks/useI18n';
import PageTemplate from '@/templates/PageTemplate/PageTemplate';
import UIContainer from '@/ui/UIContainer/UIContainer';

interface IProps {
  params: {
    id: number;
  };
}

const Flight = ({ params: { id } }: IProps) => {
  const { t } = useI18n();
  const { flight } = useFlight(id);

  if (!flight) return <UIContainer> {t('common', 'loading')} </UIContainer>;

  return (
    <PageTemplate>
      <PageHeader background="accent">
        {' '}
        {t('common', 'flight')} {flight.route.from}
        {' ---> '}
        {flight.route.to}
      </PageHeader>
      <PageContent background="accent">{flight.route.description}</PageContent>
      <PageContent background="primary">{flight.route.description}</PageContent>
      <PageContent background="secondary">{flight.route.description}</PageContent>
    </PageTemplate>
  );
};

export default Flight;

'use client';
import UIPageHeader from '@/ui/UIPageHeader';
import UIPageContent from '@/ui/UIPageContent';
import UIIcon from '@/ui/UIIcon';
import FlightClasses from '@/components/FlightClasses';

import styles from './page.module.scss';

import { useFlight } from '@/queries/flights';
import { useI18n } from '@/hooks/useI18n';
import { useInfiniteTickets } from '@/queries/tickets';

interface IProps {
  params: {
    id: number;
  };
}

const Flight = ({ params: { id } }: IProps) => {
  const { t } = useI18n();
  const { flight } = useFlight(id);
  const { tickets } = useInfiniteTickets({ flightId: id });

  if (!flight) return <UIPageContent> {t('common', 'loading')} </UIPageContent>;

  const { ticketClasses = [] } = flight;

  return (
    <>
      <UIPageHeader>
        <h1>
          <span className={styles['title-content']}>
            {t('common', 'flight')} <UIIcon name="arrow-right" /> {flight.route?.from}{' '}
          </span>
        </h1>
        <p> {flight.route?.description}</p>
      </UIPageHeader>
      <UIPageContent>
        <FlightClasses
          ticketClasses={ticketClasses}
          tickets={tickets}
          flightId={id}
        />
      </UIPageContent>
    </>
  );
};

export default Flight;

'use client';
import UIPageHeader from '@/ui/UIPageHeader';
import UIPageContent from '@/ui/UIPageContent';
import UIIcon from '@/ui/UIIcon';
import FlightClasses from '@/components/FlightClasses';
import SeatSelectModal from '@/components/SeatSelectModal';
import { Button } from '@mui/material';

import styles from './page.module.scss';

import { useFlight } from '@/queries/flights';
import { useI18n } from '@/hooks/useI18n';
import { useBookTicket, useInfiniteTickets } from '@/queries/tickets';
import { useState } from 'react';

interface IProps {
  params: {
    id: string;
  };
}

const Flight = ({ params: { id } }: IProps) => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const { flight } = useFlight(Number(id));
  const { tickets } = useInfiniteTickets({ flightId: Number(id) });
  const { bookTicket } = useBookTicket();

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
        <div>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}>
            {t('flightPage', 'chooseSeatAction')}
          </Button>
        </div>

        <FlightClasses
          ticketClasses={ticketClasses}
          tickets={tickets}
          onBook={({ ticketClass, seat }) => {
            bookTicket({
              params: {
                flightId: Number(id),
                ticketClass: ticketClass.name,
                ticketClassId: ticketClass.id,
                seat,
              },
            });
          }}
        />
      </UIPageContent>

      <SeatSelectModal
        open={open}
        ticketClasses={ticketClasses}
        tickets={tickets}
        flightId={Number(id)}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default Flight;

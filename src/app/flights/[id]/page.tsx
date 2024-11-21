'use client';
import { Button } from '@mui/material';
import UIPageHeader from '@/ui/UIPageHeader';
import UIPageContent from '@/ui/UIPageContent';
import UIIcon from '@/ui/UIIcon';
import TicketSelect from '@/components/TicketSelect/TicketSelect';
import TicketSelectWithSeatModal from '@/components/TicketSelect/TicketSelectWithSeatModal';

import styles from './page.module.scss';

import { useFlight } from '@/queries/flights';
import { useI18n } from '@/hooks/useI18n';
import { useBookTicket, useInfiniteTickets } from '@/queries/tickets';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';

import type { IProps as IFlightClassesProps } from '@/components/TicketSelect/TicketSelect';
import type { ITicketClass } from '@/types/ticketClass';

interface IProps {
  params: {
    id: string;
  };
}

interface ISelectedSeat {
  seat: number;
  ticketClass: ITicketClass;
}

const Flight = ({ params: { id } }: IProps) => {
  const { flight, queryKey: flightQueryKey } = useFlight(Number(id));
  const { tickets, queryKey: ticketsQueryKey } = useInfiniteTickets({ flightId: Number(id) });
  const { bookTicket, queryClient } = useBookTicket();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ISelectedSeat | null>(null);

  const { t } = useI18n();
  const { showSuccess } = useToast();

  if (!flight) return <UIPageContent> {t('common', 'loading')} </UIPageContent>;
  const { ticketClasses = [] } = flight;

  const handleBook: IFlightClassesProps['onBook'] = ({ ticketClass, seat }) => {
    bookTicket({
      params: {
        flightId: Number(id),
        ticketClass: ticketClass.name,
        ticketClassId: ticketClass.id,
        seat,
      },
      options: {
        onSuccess: () => {
          [flightQueryKey, ticketsQueryKey].forEach(queryKey => {
            queryClient.invalidateQueries({ queryKey });
          });
          showSuccess('Успех!');
        },
      },
    });
  };

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
        <div className={styles['seat-selection']}>
          <span className={styles['selected']}>
            {selected
              ? t('flightPage', 'selectedSeat', { seat: selected.seat, name: t('tickets', selected.ticketClass.name) })
              : t('flightPage', 'notChosen')}
          </span>
          <Button
            onClick={() => handleBook({ ticketClass: selected?.ticketClass as ITicketClass, seat: selected?.seat })}>
            {t('flightPage', 'book')}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}>
            {t('flightPage', 'chooseSeatAction')}
          </Button>
        </div>

        <TicketSelect
          ticketClasses={ticketClasses}
          tickets={tickets}
          onBook={handleBook}
        />
      </UIPageContent>

      <TicketSelectWithSeatModal
        open={open}
        flight={flight}
        tickets={tickets}
        selectedState={[selected, setSelected]}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      />
    </>
  );
};

export default Flight;

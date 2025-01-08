'use client';
import { Button } from '@mui/material';
import UIPageHeader from '@/ui/UIPageHeader';
import UIPageContent from '@/ui/UIPageContent';
import UIIcon from '@/ui/UIIcon';
import TicketSelect from '@/components/TicketSelect/TicketSelect';
import TicketSelectWithSeatModal from '@/components/TicketSelect/TicketSelectWithSeatModal';
import UITitle from '@/ui/UITitle';
import UIBreadcrumbs from '@/ui/UIBreadcrumbs';
import AuthorizableButton from '@/components/AuthorizableButton';

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
  const {
    tickets,
    isLoading: isLoadingTickets,
    queryKey: ticketsQueryKey,
  } = useInfiniteTickets({ flightId: Number(id) });
  const { bookTicket, queryClient } = useBookTicket();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ISelectedSeat | null>(null);

  const { t } = useI18n();
  const { showSuccess } = useToast();

  if (!flight || isLoadingTickets) return <UIPageContent> {t('common', 'loading')} </UIPageContent>;
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

  const selectedData = selected
    ? t('flightPage', 'selectedSeat', { seat: selected.seat, name: t('tickets', selected.ticketClass.name) })
    : t('flightPage', 'notChosen');

  return (
    <>
      <UIPageHeader>
        <UIBreadcrumbs breadcrumbs={[{ link: '/', label: t('routes', '/') }, { label: id }]} />
        <UITitle>
          <span className={styles['title-content']}>
            {t('common', 'flight')} <UIIcon name="arrow-right" /> {flight.route?.from}{' '}
          </span>
        </UITitle>
        <p> {flight.route?.description}</p>
      </UIPageHeader>
      <UIPageContent>
        <div className={styles['content']}>
          <div className={styles['seat-selection']}>
            {selected ? (
              <p
                className={styles['selected-data']}
                onClick={() => setOpen(true)}>
                {selectedData}
              </p>
            ) : (
              <AuthorizableButton>
                <Button
                  variant="contained"
                  onClick={() => setOpen(true)}>
                  {t('flightPage', 'chooseSeatAction')}
                </Button>
              </AuthorizableButton>
            )}
            <Button
              variant="contained"
              color="success"
              disabled={!selected}
              onClick={() => handleBook({ ticketClass: selected?.ticketClass as ITicketClass, seat: selected?.seat })}>
              {t('flightPage', 'book')}
            </Button>
          </div>

          <p>Или сделать быстрое оформление</p>

          <TicketSelect
            ticketClasses={ticketClasses}
            tickets={tickets}
            onBook={handleBook}
          />
        </div>
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

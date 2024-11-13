import AuthorizableButton from '@/components/AuthorizableButton';
import UIIcon from '@/ui/UIIcon';
import SeatSelectModal from '@/components/SeatSelectModal';
import { Card, Button } from '@mui/material';

import { useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
import styles from './FlightClasses.module.scss';

import type { INodeProps } from '@/types';
import type { ITicketClass } from '@/types/ticketClass';
import type { ITicket } from '@/types/ticket';

interface IProps extends INodeProps {
  ticketClasses: ITicketClass[];
  tickets: ITicket[];
  flightId: number;
}

const FlightClasses = ({ ticketClasses, tickets, flightId }: IProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const bookedClasses = tickets.map(tc => tc.ticketClass);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}>
        {' '}
        {t('flightPage', 'chooseSeatAction')}{' '}
      </Button>
      <div className={styles['cards']}>
        {ticketClasses.map(tc => (
          <Card
            key={tc.id}
            className={styles['card']}>
            <div className={styles['card-content']}>
              <span> {t('tickets', tc.name)} </span>
              <span className={styles['cost']}>
                {tc.cost}
                <UIIcon
                  name={tc.currency}
                  size="16px"
                />
              </span>
              <span>{t('flightPage', 'availableSeats', { available: tc.available })}</span>
              <span>{t('flightPage', 'totalSeats', { total: tc.total })}</span>
            </div>
            <AuthorizableButton>
              <Button
                variant="contained"
                disabled={bookedClasses.includes(tc.name)}>
                {bookedClasses.includes(tc.name) ? t('flightPage', 'booked') : t('flightPage', 'book')}
              </Button>
            </AuthorizableButton>
          </Card>
        ))}
      </div>
      <SeatSelectModal
        open={open}
        ticketClasses={ticketClasses}
        tickets={tickets}
        flightId={flightId}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default FlightClasses;

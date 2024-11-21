import AuthorizableButton from '@/components/AuthorizableButton';
import UIIcon from '@/ui/UIIcon';
import { Card, Button } from '@mui/material';

import { useI18n } from '@/hooks/useI18n';
import styles from './FlightClasses.module.scss';

import type { INodeProps } from '@/types';
import type { ITicketClass } from '@/types/ticketClass';
import type { ITicket } from '@/types/ticket';

interface IProps extends INodeProps {
  ticketClasses: ITicketClass[];
  tickets: ITicket[];
  onBook: (data: { ticketClass: ITicketClass; seat?: number }) => void;
}

const FlightClasses = ({ ticketClasses, tickets, onBook }: IProps) => {
  const { t } = useI18n();

  const bookedClasses = tickets.map(tc => tc.ticketClass);

  return (
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
              disabled={bookedClasses.includes(tc.name)}
              onClick={() => onBook({ ticketClass: tc })}>
              {bookedClasses.includes(tc.name) ? t('flightPage', 'booked') : t('flightPage', 'book')}
            </Button>
          </AuthorizableButton>
        </Card>
      ))}
    </div>
  );
};

export default FlightClasses;

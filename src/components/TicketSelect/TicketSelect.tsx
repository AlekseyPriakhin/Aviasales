import AuthorizableButton from '@/components/AuthorizableButton';
import UIIcon from '@/ui/UIIcon';
import { Card, Button } from '@mui/material';

import { useI18n } from '@/hooks/useI18n';
import styles from './TicketSelect.module.scss';

import { createAppRoute } from '@/helpers/routing';

import type { INodeProps } from '@/types';
import type { ITicketClass } from '@/types/ticketClass';
import type { ITicket } from '@/types/ticket';

export interface IProps extends INodeProps {
  ticketClasses: ITicketClass[];
  tickets: ITicket[];
  onBook: (data: { ticketClass: ITicketClass; seat?: number }) => void;
}

const TicketSelect = ({ ticketClasses, tickets, onBook }: IProps) => {
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
          {bookedClasses.includes(tc.name) && (
            <Button
              href={createAppRoute('/tickets', { searchParams: { flightId: String(tc.flightId) } })}
              variant="contained">
              {t('flightPage', 'toBookedTickets')}
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
};

export default TicketSelect;

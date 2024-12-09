'use client';
import { Button, Card } from '@mui/material';

import styles from './TicketCard.module.scss';

import { useI18n } from '@/hooks/useI18n';

import { createAppRoute } from '@/helpers/routing';
import { parseToDate } from '@/helpers/datetime';

import type { INodeProps } from '@/types';
import type { ITicket } from '@/types/ticket';
import UIIcon from '@/ui/UIIcon';

interface IProps extends INodeProps {
  ticket: ITicket;
}

const TicketCard = ({ ticket }: IProps) => {
  const { t } = useI18n();

  return (
    <Card
      className={styles['card']}
      key={ticket.id}>
      <span className={styles['direction']}>
        {ticket.flight.departureAirport} <UIIcon name="arrow-right" /> {ticket.flight.arrivingAirport}
      </span>
      <br />
      {parseToDate(ticket.flight.date)}
      <br />
      {t('tickets', ticket.ticketClass)} - {ticket.cost} {t('currency', ticket.currency)}
      <Button href={createAppRoute('/flights', { queryParam: String(ticket.flightId) })}>
        {t('ticketCard', 'toFlight')}
      </Button>
    </Card>
  );
};

export default TicketCard;

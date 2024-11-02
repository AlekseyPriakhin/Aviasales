'use client';
import UIContainer from '@/ui/UIContainer';
import { Card } from '@mui/material';

import styles from './page.module.scss'

import { useInfiniteTickets } from '@/queries/tickets';
import { useI18n } from '@/hooks/useI18n';

const Tickets = () => {
  const { tickets, isLoading } = useInfiniteTickets();
  const { t } = useI18n();

  return (
    <UIContainer>
      {isLoading ? (
        <p>Загрузка</p>
      ) : (
        <div style={{ display: 'flex', gap: '12px' }}>
          {tickets?.map(ticket => (
            <Card className={styles['card']} key={ticket.id}>
              {t('tickets', ticket.ticketClass)} - {ticket.cost} {t('currency', ticket.currency)}
            </Card>
          ))}
        </div>
      )}
    </UIContainer>
  );
};

export default Tickets;

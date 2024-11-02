'use client';
import UIContainer from '@/ui/UIContainer';

import { useInfiniteTickets } from '@/queries/tickets';

const Tickets = () => {
  const { tickets, isLoading } = useInfiniteTickets();

  return (
    <UIContainer>
      {isLoading ? (
        <p>Загрузка</p>
      ) : (
        <div style={{ display: 'flex', gap: '12px' }}>
          {tickets?.map(t => (
            <span key={t.id}>
              {t.ticketClass} {t.cost}
            </span>
          ))}
        </div>
      )}
    </UIContainer>
  );
};

export default Tickets;

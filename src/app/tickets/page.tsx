'use client';
import UIContainer from '@/ui/UIContainer';
import Link from 'next/link';

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
            <Link
              href={`/flights/${t.id}`}
              key={t.id}>
              {' '}
              {t.ticketClass} {t.cost}
            </Link>
          ))}
        </div>
      )}
    </UIContainer>
  );
};

export default Tickets;

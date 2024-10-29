'use client';
import { useInfiniteFlights } from '@/queries/flights';
import FlightCard from '@/components/FlightCard/FlightCard';
import PageContent from '@/components/PageContent/PageContent';
import Link from 'next/link';

const Flights = () => {
  const { flights, isLoading } = useInfiniteFlights();

  return (
    <PageContent>
      <>
        {isLoading ? (
          <p>Загрузка</p>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            {flights?.map(f => (
              <Link
                href={`/flights/${f.id}`}
                key={f.id}>
                <FlightCard flight={f} />
              </Link>
            ))}
          </div>
        )}
      </>
    </PageContent>
  );
};

export default Flights;

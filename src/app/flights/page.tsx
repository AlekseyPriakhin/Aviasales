'use client';
import UIContainer from '@/ui/UIContainer';
import FlightCard from '@/components/FlightCard';
import LoadableListTemplate from '@/templates/LoadableListTemplate';
import Link from 'next/link';

import styles from './page.module.scss';

import { useInfiniteFlights } from '@/queries/flights';

import type { IFlight } from '@/types/flight';

const flightsLayout = (flights: IFlight[]) => {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {flights.map(f => (
        <Link
          href={`/flights/${f.id}`}
          key={f.id}>
          <FlightCard flight={f} />
        </Link>
      ))}
    </div>
  );
};

const Flights = () => {
  const { flights, isLoading, isNothingFound, hasNextPage, fetchNextPage } = useInfiniteFlights();

  return (
    <UIContainer>
      <LoadableListTemplate
        className={styles['items']}
        isLoading={isLoading}
        isNothingFound={isNothingFound}
        items={flights}
        itemsLayout={flightsLayout}
        hasNextPage={hasNextPage}
        onLoadMore={fetchNextPage}
      />
    </UIContainer>
  );
};

export default Flights;

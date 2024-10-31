'use client';
import UIContainer from '@/ui/UIContainer';
import FlightCard from '@/components/FlightCard';
import LoadableListTemplate from '@/templates/LoadableListTemplate';
import Link from 'next/link';

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
  const { flights, isLoading, isNothingFound } = useInfiniteFlights();

  return (
    <UIContainer>
      <LoadableListTemplate
        isLoading={isLoading}
        isNothingFound={isNothingFound}
        items={flights}
        itemsLayout={flightsLayout}
      />
    </UIContainer>
  );
};

export default Flights;

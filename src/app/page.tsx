'use client';
import UIContainer from '@/ui/UIContainer';
import AirportInputSearch from '@/components/AirportInputSearch';
import LocalizationProvider from '@/providers/LocalizationProvider';
import LoadableListTemplate from '@/templates/LoadableListTemplate';
import FlightCard from '@/components/FlightCard';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';

import styles from './page.module.scss';

import dayjs from 'dayjs';
import { useState } from 'react';
import { useInfiniteFlights } from '@/queries/flights';

import type { IFlight } from '@/types/flight';
import Link from 'next/link';

const flightsLayout = (flights: IFlight[]) => {
  return (
    <div className={styles['flights']}>
      {flights.map(f => (
        <Link
          key={f.id}
          href={`/flights/${f.id}`}>
          <FlightCard flight={f} />
        </Link>
      ))}
    </div>
  );
};

const Page = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState<string | null>(null);

  const { flights, isLoading, isNothingFound, hasNextPage, isFetching, setParams, fetchNextPage } =
    useInfiniteFlights();

  const handleSearch = () => setParams({ from, to, date: date || '' });

  return (
    <UIContainer className={styles['container']}>
      <div className={styles['inputs']}>
        <AirportInputSearch
          label="Откуда:"
          value={from}
          setValue={setFrom}
        />

        <AirportInputSearch
          label="Куда:"
          value={to}
          setValue={setTo}
        />

        <LocalizationProvider>
          <DatePicker
            views={['year', 'month', 'day']}
            format="DD.MM.YYYY"
            onChange={d => setDate(d ? d.toISOString() : null)}
            minDate={dayjs(new Date())}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={handleSearch}>
          Искать
        </Button>
      </div>
      <section>
        <div> Результаты поиска: </div>
        <LoadableListTemplate
          isLoading={isLoading}
          isNothingFound={isNothingFound}
          items={flights}
          itemsLayout={flightsLayout}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          onLoadMore={fetchNextPage}
        />
      </section>
    </UIContainer>
  );
};

export default Page;

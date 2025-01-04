'use client';
import UIContainer from '@/ui/UIContainer';
import InputWithHints from '@/components/InputWithHints';
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
import { useSearchRoutesQuery } from '@/queries/routes';
import { useI18n } from '@/hooks/useI18n';

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

  const handleSearch = () => setParams({ from, to, date: date ? [date] : [] });

  const { items: itemsFrom, search: searchFrom, isLoading: isLoadingSearchFrom } = useSearchRoutesQuery('from');
  const { items: itemsTo, search: searchTo, isLoading: isLoadingSearchTo } = useSearchRoutesQuery('to');

  const { t } = useI18n();

  return (
    <UIContainer className={styles['container']}>
      <div className={styles['inputs']}>
        <InputWithHints
          items={itemsFrom}
          isLoading={isLoadingSearchFrom}
          label={t('mainPage', 'routesFrom')}
          value={from}
          setValue={v => (setFrom(v), searchFrom(v))}
          selectValue={v => (setFrom(v), searchFrom(v))}
        />
        <InputWithHints
          items={itemsTo}
          isLoading={isLoadingSearchTo}
          label={t('mainPage', 'routesTo')}
          value={to}
          setValue={v => (setTo(v), searchTo(v))}
          selectValue={v => (setTo(v), searchTo(v))}
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
          {t('mainPage', 'search:action')}
        </Button>
      </div>
      <section>
        <div> {t('mainPage', 'results')} </div>
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

'use client';

import UIContainer from '@/ui/UIContainer/UIContainer';
import FlightCard from '@/components/FlightCard/FlightCard';
import PageContent from '@/components/PageContent/PageContent';

import styles from './page.module.scss';
import { useInfiniteFlights } from '@/api/flights';
import ListTemplate from '@/templates/ListTemplate/ListTemplate';
import Link from 'next/link';

const Page = () => {
  const { flights, isLoading, isFetchingNextPage, isFetchNextPageAvailable, fetchNextPage } = useInfiniteFlights();

  if (isLoading) return <UIContainer> Данные загружаются... </UIContainer>;
  else
    return (
      <PageContent background="secondary">
        <ListTemplate
          isLoading={isFetchingNextPage}
          isLoadMoreAvailable={isFetchNextPageAvailable}
          listClass={styles['cards']}
          onLoadMore={fetchNextPage}>
          {flights?.map(e => (
            <Link
              key={e.id}
              href={`/flights/${e.id}`}>
              <FlightCard flight={e} />
            </Link>
          ))}
        </ListTemplate>
      </PageContent>
    );
};

export default Page;

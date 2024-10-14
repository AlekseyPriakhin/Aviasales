'use client';

import UIContainer from '@/ui/ui-container/ui-container';
import FlightCard from '@/components/FlightCard/FlightCard';

import styles from './page.module.scss';
import { useInfiniteFlights } from '@/api/flights';

const Page = () => {
  const { flights, isLoading } = useInfiniteFlights();

  if (isLoading) return <UIContainer> Данные загружаются... </UIContainer>;
  else
    return (
      <UIContainer>
        <div className={styles['cards']}>
          {flights?.map(e => (
            <FlightCard
              key={e.id}
              flight={e}
            />
          ))}
        </div>
      </UIContainer>
    );
};

export default Page;

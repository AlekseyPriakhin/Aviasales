'use client';

import UIContainer from '@/ui/ui-container/ui-container';
import { useInfiniteFlights } from '@/api/flights';
import { useUser } from '@/api/users';
import { Button } from '@gravity-ui/uikit';
import { useI18n } from '@/hooks/useI18n';

const Page = () => {
  const { flights, fetchNextPage, isFetchNextPageAvailable } = useInfiniteFlights({ per: 1 });
  const { user } = useUser(1);
  const { t } = useI18n();
  return (
    <UIContainer>
      Hi, {user?.name}
      {flights?.map(e => (
        <p key={e.id}>
          {e.route.from} --- {e.route.to}
        </p>
      ))}
      <Button
        disabled={!isFetchNextPageAvailable}
        view="action"
        onClick={() => fetchNextPage()}>
        {' '}
        {t('common', 'loadMore')}{' '}
      </Button>
    </UIContainer>
  );
};

export default Page;

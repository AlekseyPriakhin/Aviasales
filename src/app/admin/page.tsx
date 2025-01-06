'use client';
import UIPageContent from '@/ui/UIPageContent';
import UIPageHeader from '@/ui/UIPageHeader';
import { Button } from '@mui/material';

import styles from './page.module.scss';

import { createAppRoute, type AppRoute } from '@/helpers/routing';
import { useI18n } from '@/hooks/useI18n';

const AdminPage = () => {
  // const { flights, isLoading, params, setParams, pagination } = usePaginatedFlights({ per: 1 });

  const { t } = useI18n();
  const links = ['/admin/flights', '/admin/routes'] as const satisfies AppRoute[];

  return (
    <>
      <UIPageHeader>Панель админа</UIPageHeader>
      <UIPageContent>
        <div className={styles['links-container']}>
          {links.map(l => (
            <Button
              key={l}
              href={createAppRoute(l)}>
              {t('routes', l)}
            </Button>
          ))}
        </div>

        {/* {isLoading ? (
          'loading'
        ) : (
          <TableTemplate
            headers={['id', 'departureAirport', 'arrivingAirport', 'company', 'date']}
            data={flights}
            pagination={pagination}
            per={params.per as number}
            onPageChange={page => setParams({ page })}
            onRowsPerPageChange={per => setParams({ per })}
            formComponent={flight => (
              <DrawerContent title={!!flight ? 'Редактирование рейса' : 'Создание рейса'}>
                <FlightForm flight={flight} />
              </DrawerContent>
            )}
          />
        )}
        <RouteForm /> */}
      </UIPageContent>
    </>
  );
};

export default AdminPage;

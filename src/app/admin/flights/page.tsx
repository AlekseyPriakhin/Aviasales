'use client';
import FlightForm from '@/components/Forms/FlightForm';
import { parseToDateTime } from '@/helpers/datetime';
import { useI18n } from '@/hooks/useI18n';
import { usePaginatedFlights } from '@/queries/flights';
import DrawerContent from '@/templates/DrawerContent';
import TableTemplate from '@/templates/TableTemplate';
import UIBreadcrumbs from '@/ui/UIBreadcrumbs';
import UIPageContent from '@/ui/UIPageContent';
import UIPageHeader from '@/ui/UIPageHeader';

const FlightsAdminPage = () => {
  const { flights, params, pagination, isLoading, setParams } = usePaginatedFlights({ per: 10 });
  const { t } = useI18n();

  return (
    <>
      <UIPageHeader>
        <UIBreadcrumbs
          breadcrumbs={[{ link: '/admin', label: t('routes', '/admin') }, { label: t('routes', '/admin/flights') }]}
        />
        <h1> Рейсы </h1>
      </UIPageHeader>
      <UIPageContent>
        <TableTemplate
          headers={[
            ['id', 'id'],
            ['company', 'Компания'],
            ['departureAirport', 'Аэропорт вылета'],
            ['arrivingAirport', 'Аэропорт прибытия'],
            ['date', 'Дата'],
          ]}
          formatters={{
            date: v => parseToDateTime(v as string),
          }}
          data={flights}
          pagination={pagination}
          per={params.per}
          isLoading={isLoading}
          onPageChange={page => setParams({ page })}
          onRowsPerPageChange={per => setParams({ per })}
          formComponent={(toggleDrawer, f) => (
            <DrawerContent title={!f ? 'Создать' : 'Редактировать'}>
              <FlightForm
                flight={f}
                onSubmit={toggleDrawer}
              />
            </DrawerContent>
          )}
        />
      </UIPageContent>
    </>
  );
};

export default FlightsAdminPage;

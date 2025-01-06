'use client';
import RouteForm from '@/components/Forms/RouteForm';
import { useI18n } from '@/hooks/useI18n';
import { usePaginatedRoutes } from '@/queries/routes';
import DrawerContent from '@/templates/DrawerContent';
import TableTemplate from '@/templates/TableTemplate';
import UIBreadcrumbs from '@/ui/UIBreadcrumbs';
import UIPageContent from '@/ui/UIPageContent';
import UIPageHeader from '@/ui/UIPageHeader';

const RoutesAdminPage = () => {
  const { routes, params, pagination, setParams } = usePaginatedRoutes({ per: 10 });
  const { t } = useI18n();

  return (
    <>
      <UIPageHeader>
        <UIBreadcrumbs
          breadcrumbs={[{ link: '/admin', label: t('routes', '/admin') }, { label: t('routes', '/admin/routes') }]}
        />
        <h1> Маршруты </h1>
      </UIPageHeader>
      <UIPageContent>
        <TableTemplate
          headers={['id', 'from', 'to', 'description']}
          data={routes}
          pagination={pagination}
          per={params.per}
          onPageChange={page => setParams({ page })}
          onRowsPerPageChange={per => setParams({ per })}
          formComponent={(toggleDrawer, r) => (
            <DrawerContent title={!r ? 'Создать' : 'Редактировать'}>
              <RouteForm
                route={r}
                onSubmitCb={toggleDrawer}
              />
            </DrawerContent>
          )}
        />
      </UIPageContent>
    </>
  );
};

export default RoutesAdminPage;

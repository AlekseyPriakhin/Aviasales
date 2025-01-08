'use client';
import LoadableListTemplate from '@/templates/LoadableListTemplate';

import styles from './page.module.scss';

import { useInfiniteTickets } from '@/queries/tickets';

import { useSearchParams } from '@/hooks/searchParams';
import TicketCard from '@/components/TicketCard';
import type { ITicket } from '@/types/ticket';
import type { ITicketsParams } from '@api/tickets/route';
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useI18n } from '@/hooks/useI18n';
import UIPageContent from '@/ui/UIPageContent';
import UIPageHeader from '@/ui/UIPageHeader';
import UIBreadcrumbs from '@/ui/UIBreadcrumbs';
import UITitle from '@/ui/UITitle';

export type TICKET_TAB = 'active' | 'elapsed';
const mapTabToTicketParam = (tab: TICKET_TAB): ITicketsParams['status'] => tab;

const TABS = {
  ACTIVE: 'active',
  ELAPSED: 'elapsed',
} as const satisfies Record<string, TICKET_TAB>;

const Tickets = () => {
  const [tab, setTab] = useState<TICKET_TAB>(TABS.ACTIVE);

  const { getSearchParam } = useSearchParams();
  const flightId = getSearchParam('flightId');

  const { tickets, isLoading, isNothingFound, hasNextPage, isFetching, setParams } = useInfiniteTickets({
    flightId: flightId ? Number(flightId) : undefined,
    status: mapTabToTicketParam(tab),
  });

  const { t } = useI18n();

  const TicketsLayout = (tickets: ITicket[]) => (
    <div className={styles['tickets']}>
      {tickets?.map(ticket => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
        />
      ))}
    </div>
  );

  const handleTabClick = (tab: TICKET_TAB) => {
    setTab(tab);
    setParams({ status: mapTabToTicketParam(tab) });
  };

  return (
    <>
      <UIPageHeader>
        <UIBreadcrumbs breadcrumbs={[{ link: '/', label: t('routes', '/') }, { label: t('routes', '/tickets') }]} />
        <UITitle title="Мои билеты" />
      </UIPageHeader>
      <UIPageContent>
        <Tabs value={tab}>
          <Tab
            value={TABS.ACTIVE}
            label={t('tickets', TABS.ACTIVE)}
            onClick={() => handleTabClick(TABS.ACTIVE)}
          />
          <Tab
            value={TABS.ELAPSED}
            label={t('tickets', TABS.ELAPSED)}
            onClick={() => handleTabClick(TABS.ELAPSED)}
          />
        </Tabs>
        <LoadableListTemplate
          isLoading={isLoading}
          isNothingFound={isNothingFound}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          items={tickets}
          itemsLayout={TicketsLayout}
        />
      </UIPageContent>
    </>
  );
};

export default Tickets;

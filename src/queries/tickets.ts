import { useCreateInfiniteQuery, useCreateMutation } from '@/queries';
import { useSession } from 'next-auth/react';
import type { ITicket } from '@/types/ticket';
import type { ITicketCreateParams, ITicketsParams } from '@/app/api/tickets/route';

const URL = '/tickets';
export const useInfiniteTickets = (params?: ITicketsParams) => {
  const { status } = useSession();

  const { data, ...query } = useCreateInfiniteQuery<ITicket, ITicketsParams>({
    key: ['tickets'],
    url: URL,
    initParams: params,
    options: {
      enabled: status === 'authenticated',
    },
  });

  return { tickets: data, ...query };
};

export const useCreateTicket = () => {
  const { mutate, ...query } = useCreateMutation<ITicket, ITicketCreateParams, ITicket>({
    url: URL,
    method: 'post',
  });

  return { createTicket: mutate, ...query };
};

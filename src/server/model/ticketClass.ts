import { Prisma } from '@prisma/client';

export const updateCountersAfterNewTicket = (): Prisma.TicketClassUpdateInput => {
  return {
    available: { decrement: 1 },
    reserved: { increment: 1 },
  };
};

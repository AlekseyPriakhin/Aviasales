import { Prisma } from '@prisma/client';

export const updateCounters = (): Prisma.TicketClassUpdateInput => {
  return {
    available: { decrement: 1 },
    reserved: { increment: 1 },
  };
};

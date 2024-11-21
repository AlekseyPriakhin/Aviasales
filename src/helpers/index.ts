import type { IFlight } from '@/types/flight';
import { TicketClassName } from '@/types/ticketClass';

export const getSkipByTicketClass = (flight: IFlight) => {
  const data = {} as Record<TicketClassName, number>;

  const classes = flight.ticketClasses ? [...flight.ticketClasses] : [];
  let acc = 0;

  while (classes.length) {
    const c = classes.pop();
    if (!c) continue;

    acc += c.total;
    data[c.name] = flight.totalSeatsCount - acc + 1;
  }

  return data;
};

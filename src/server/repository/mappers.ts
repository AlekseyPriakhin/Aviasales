import type { ITicketClass } from '@/types/ticketClass';
import type { IFlight } from '@/types/flight';
import type { IRoute } from '@/types/route';
import type { ITicket } from '@/types/ticket';

import type { Flight, Route, Ticket, TicketClass } from '@prisma/client';

export const mapRoute = (route: Route): IRoute => ({
  ...route,
});

export const mapTicketClass = (ticketClass: TicketClass): ITicketClass => ({
  ...ticketClass,
  name: ticketClass.name as ITicketClass['name'],
  currency: ticketClass.currency as ITicketClass['currency'],
});

export const mapFlight = (flight: Flight & { ticketClasses?: TicketClass[]; route?: Route }): IFlight => ({
  ...flight,
  route: flight.route ? mapRoute(flight.route) : undefined,
  ticketClasses: flight.ticketClasses ? flight.ticketClasses.map(mapTicketClass) : undefined,
});

export const mapTicket = (
  ticket: Ticket & { ticketClass: TicketClass & { flight: Flight & { route: Route } } },
): ITicket => ({
  ...ticket,
  currency: ticket.ticketClass.currency as ITicket['currency'],
  cost: ticket.ticketClass.cost,
  ticketClass: ticket.ticketClass.name as ITicket['ticketClass'],
  flightId: ticket.ticketClass.flightId,
  flight: {
    ...ticket.ticketClass.flight,
    route: mapRoute(ticket.ticketClass.flight.route),
  },
});

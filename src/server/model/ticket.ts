import type { IError } from '@/server/repository';
import type { TicketClassName } from '@/types/ticketClass';
import type { Ticket, TicketClass } from '@prisma/client';

export const errors = {
  noSeatsAvailable: {
    message: 'No seats available',
  },
  seatAlreadyTaken: {
    message: 'Seat already taken',
    code: 400,
  },
} as const satisfies Record<string, IError>;

export const validateSeat = (
  seat: number,
  ticketClass: TicketClassName,
  tickets: (Ticket & { ticketClass: TicketClass })[],
): [boolean, IError | null] => {
  const ticketsWithSameClass = tickets.filter(t => t.ticketClass.name === ticketClass);

  return ticketsWithSameClass.some(t => t.seat === seat) ? [false, errors.seatAlreadyTaken] : [true, null];
};

const getAllPreviousTicketClasses = (ticketClasses: TicketClass[], required: TicketClassName) => {
  const reqIndex = ticketClasses.findIndex(tc => tc.name === required);

  return ticketClasses.slice(0, reqIndex);
};

export const getNextSeat = (
  ticketClass: TicketClassName,
  tickets: (Ticket & { ticketClass: TicketClass })[],
  ticketsClasses: TicketClass[],
): [number, IError | null] => {
  const ticketsWithSameClass = tickets.filter(t => t.ticketClass.name === ticketClass);
  const reqTicketClass = ticketsClasses.find(tc => tc.name === ticketClass);

  if (!reqTicketClass) return [0, { message: 'Ticket class not found' }];

  if (reqTicketClass.reserved === reqTicketClass.total) return [0, errors.noSeatsAvailable];

  const previousTicketClasses = getAllPreviousTicketClasses(ticketsClasses, ticketClass);

  let skip = 0;
  previousTicketClasses.forEach(tc => (skip += tc.total));

  const reservedSeats = ticketsWithSameClass.map(t => t.seat);

  for (let i = skip + 1; i <= reqTicketClass.total; i++) {
    if (!reservedSeats.includes(i)) return [i, null];
  }

  return [0, errors.noSeatsAvailable];
};

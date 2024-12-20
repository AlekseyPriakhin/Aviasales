import type { TError } from '@/server/repository';
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
  availableSeatsLessThanZero: {
    message: 'Available seats less than zero',
  },
  seatDoesNotExist: {
    message: 'Seat does not exist',
    code: 400,
  },
} as const satisfies Record<string, TError>;

const getAllPreviousTicketClasses = (ticketClasses: TicketClass[], required: TicketClassName) => {
  const reqIndex = ticketClasses.findIndex(tc => tc.name === required);

  return ticketClasses.slice(0, reqIndex);
};

export const validateSeat = (
  seat: number,
  ticketClass: TicketClassName,
  tickets: (Ticket & { ticketClass: TicketClass })[],
  ticketClasses: TicketClass[],
): [boolean, TError] => {
  const prev = getAllPreviousTicketClasses(ticketClasses, ticketClass);
  const current = ticketClasses.find(tc => tc.name === ticketClass) as TicketClass;

  const prevSeats = prev.reduce((acc, tc) => acc + tc.total, 1);
  const range = { min: prevSeats, max: current.total + prevSeats - 1 };

  if (seat < range.min || seat > range.max) return [false, errors.seatDoesNotExist];

  const ticketsWithSameClass = tickets.filter(t => t.ticketClass.name === ticketClass);

  return ticketsWithSameClass.some(t => t.seat === seat) ? [false, errors.seatAlreadyTaken] : [true, null];
};

export const getNextSeat = (
  ticketClass: TicketClassName,
  tickets: (Ticket & { ticketClass: TicketClass })[],
  ticketsClasses: TicketClass[],
): [number, TError] => {
  const ticketsWithSameClass = tickets.filter(t => t.ticketClass.name === ticketClass);
  const reqTicketClass = ticketsClasses.find(tc => tc.name === ticketClass);

  if (!reqTicketClass) return [0, { message: 'Ticket class not found' }];

  if (reqTicketClass.reserved === reqTicketClass.total) return [0, errors.noSeatsAvailable];

  const previousTicketClasses = getAllPreviousTicketClasses(ticketsClasses, ticketClass);

  const skip = previousTicketClasses.reduce((acc, tc) => acc + tc.total, 0);

  const reservedSeats = ticketsWithSameClass.map(t => t.seat);

  for (let i = skip + 1; i <= reqTicketClass.total; i++) {
    if (!reservedSeats.includes(i)) return [i, null];
  }

  return [0, errors.noSeatsAvailable];
};

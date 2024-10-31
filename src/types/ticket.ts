import type { IFlight } from '@/types/flight';
import type { ITicketClass } from '@/types/ticketClass';

export interface ITicket {
  id: number;
  createdAt: Date;
  seat: number;
  userId: string;
  flightId: number;

  cost: number;
  currency: ITicketClass['currency'];
  ticketClass: ITicketClass['name'];

  flight: IFlight;
  // ticketClass: ITicketClass;
}

import { IRoute } from '@/types/route';
import { ITicketClass } from '@/types/ticketClass';

export interface IFlight {
  id: number;
  company: string;
  date: Date;
  duration: number;
  departureAirport: string;
  departureAirportCode: string;
  arrivingAirport: string;
  arrivingAirportCode: string;
  routeId: number;
  reservedSeatsCount: number;
  totalSeatsCount: number;
  availableSeatsCount: number;

  route?: IRoute;
  ticketClasses?: ITicketClass[];
}

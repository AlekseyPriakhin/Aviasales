import { IRoute } from '@/types/route';

export interface IFlight {
  id: number;
  company: string;
  date: Date;
  duration: number;
  departureAirport: string;
  departureAirportCode: string;
  arrivingAirport: string;
  arrivingAirportCode: string;
  route: IRoute;
  routeId: number;
  reservedSeatsCount: number;
  totalSeatsCount: number;
  availableSeatsCount: number;
}

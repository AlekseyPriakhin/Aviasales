import { IRoute } from '@/types/route';
import { Currency } from '@/types/ticket';

export interface IFlight {
  id: number;
  company: string;
  date: Date;
  duration: number;
  minCost: number;
  currency: Currency;
  fromCode: string;
  toCode: string;
  route: IRoute;
  routeId: number;
  reservedSeatsCount: number;
  totalSeatsCount: number;
  availableSeatsCount: number;
}

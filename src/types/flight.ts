import { IRoute } from '@/types/route';

export interface IFlight {
  id: number;
  company: string;
  date: Date;
  duration: Date;
  fromCode: string;
  toCode: string;
  route: IRoute;
  routeId: number;
  reservedSeatsCount: number;
  totalSeatsCount: number;
  availableSeatsCount: number;
}

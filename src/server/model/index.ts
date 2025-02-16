import { Role } from '@/types/user';

export type Currency = 'EUR' | 'USD' | 'RUB';

export const Currency = {
  EUR: 'EUR',
  USD: 'USD',
  RUB: 'RUB',
};

export interface Route {
  id: number;
  from: string;
  to: string;
  description: string;
}

export interface Flight {
  id: number;
  company: string;
  date: Date;
  duration: number;
  fromCode: string;
  toCode: string;
  route: Route;
  routeId: number;
  reservedSeatsCount: number;
  totalSeatsCount: number;
  availableSeatsCount: number;
}

export interface User {
  id?: number;
  name: string;
  secondName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: Role;
}

export interface Ticket {
  id: number;
  createdAt: Date;
  currency: Currency;
  cost: number;
  seat: number;
  userId: number;
  user?: User;
  flightId: number;
  flight?: Flight;
}

export const MODEL_NAMES = {
  ROUTE: 'Route',
  FLIGHT: 'Flight',
  USER: 'User',
  TICKET: 'Ticket',
} as const;

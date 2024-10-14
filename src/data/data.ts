import usersJson from '@/data/users.json';
import ticketsJson from '@/data/tickets.json';
import flightJson from '@/data/flights.json';
import routesJson from '@/data/routes.json';

import type { ArrayElement } from '@/types';

type Currency = 'EUR' | 'USD' | 'RUB';

export interface IDataRoute {
  id: number;
  from: string;
  to: string;
  description: string;
}

export interface IDataFlight {
  id: number;
  company: string;
  date: Date;
  duration: Date;
  fromCode: string;
  toCode: string;
  route: IDataRoute;
  routeId: number;
  reservedSeatsCount: number;
  totalSeatsCount: number;
  availableSeatsCount: number;
}

export interface IDataUser {
  id: number;
  name: string;
  secondName: string;
  phoneNumber: string;
  mail: string;
  password: string;
}

export interface IDataTicket {
  id: number;
  createdAt: Date;
  currency: Currency;
  cost: number;
  seat: number;
  userId: number;
  user?: IDataUser;
  flightId: number;
  flight?: IDataFlight;
}

export type Entity = IDataRoute | IDataTicket | IDataUser | IDataFlight;
export type EntityName = 'users' | 'routes' | 'flights' | 'tickets';

const users: IDataUser[] = usersJson;
const routes: IDataRoute[] = routesJson;
const tickets: IDataTicket[] = ticketsJson as unknown as IDataTicket[];
const flights: IDataFlight[] = flightJson as unknown as IDataFlight[];

const storageAccess = {
  users,
  routes,
  tickets,
  flights,
} as const satisfies Record<EntityName, Entity[]>;

export const addNewEntity = <T extends EntityName>(entityName: T, entity: ArrayElement<(typeof storageAccess)[T]>) => {
  storageAccess[entityName].push(entity as any);
};

export const getEntities = <T extends EntityName>(name: T) => [...storageAccess[name]];

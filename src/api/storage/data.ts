import usersJson from '@/api/storage/users.json';

import type { ArrayElement } from '@/types';

type Currency = 'EUR' | 'USD' | 'RUB';

export interface IDataAviaroute {
  id: number;
  name: string;
  description: string;
  from: string;
  to: string;
  duration: Date;
  passengerNumber: number;
}

export interface IDataUser {
  id: number;
  name: string;
  secondName: string;
  phoneNumber: string;
  mail: string;
}

export interface IDataTicket {
  id: number;
  createdAt: Date;
  currency: Currency;
  cost: number;
  seat: number;
  user: IDataUser;
  route: IDataAviaroute;
}

export type Entity = IDataAviaroute | IDataTicket | IDataUser;
export type EntityName = 'users' | 'aviaroutes' | 'tickets';

// const files = {
//   users: 'users.json',
//   aviaroutes: 'aviaroutes.json',
//   tickets: 'tickets.json',
// } as const satisfies Record<EntityName, string>;

export const users: IDataUser[] = usersJson;
export const aviaroutes: IDataAviaroute[] = [];
export const tickets: IDataTicket[] = [];

const storageAccess = {
  users,
  aviaroutes,
  tickets,
} as const satisfies Record<EntityName, Entity[]>;

export const addNewEntity = <T extends EntityName>(entityName: T, entity: ArrayElement<(typeof storageAccess)[T]>) => {
  storageAccess[entityName].push(entity as any);
};

export const getEntities = <T extends EntityName>(name: T) => [...storageAccess[name]];

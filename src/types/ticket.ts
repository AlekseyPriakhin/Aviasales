import type { IUser } from '@/types/user';
import type { IAviaroute } from '@/types/aviaroute';

type Currency = 'EUR' | 'USD' | 'RUB';

export interface ITicket {
  id: number;
  createdAt: Date;
  currency: Currency;
  cost: number;
  seat: number;
  user: IUser;
  route: IAviaroute;
}

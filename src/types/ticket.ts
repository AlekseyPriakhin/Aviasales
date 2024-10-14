export type Currency = 'EUR' | 'USD' | 'RUB';

export interface ITicket {
  id: number;
  createdAt: Date;
  currency: Currency;
  cost: number;
  seat: number;
  userId: number;
  flightId: number;
}

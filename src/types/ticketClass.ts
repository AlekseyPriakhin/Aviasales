export type Currency = 'EUR' | 'USD' | 'RUB';
export type TicketClassName = 'First' | 'Business' | 'Economy';

export interface ITicketClass {
  id: number;
  name: TicketClassName;
  total: number;
  reserved: number;
  available: number;
  cost: number;
  currency: Currency;
  flightId: number;
}

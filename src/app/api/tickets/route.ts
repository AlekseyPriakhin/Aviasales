import type { IParams } from '@api/index';

export interface ITicketsParams extends IParams {
  status: 'active' | 'elapsed' | 'all';
}

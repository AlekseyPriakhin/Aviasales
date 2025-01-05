export type Role = 'user' | 'admin';

export interface IUser {
  id: string;
  name: string;
  secondName: string;
  phoneNumber: string;
  email: string;
  role: Role;
}

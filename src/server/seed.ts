import type { User } from '@/server/model';
import { PrismaClient } from '@prisma/client';
import { SHA256 as sha256 } from 'crypto-js';

const encrypt = (text: string) => sha256(text).toString();

const users: User[] = [
  {
    name: 'Alex',
    secondName: 'P',
    email: 'alex@mail.com',
    phoneNumber: '79845672341',
    password: encrypt('Qwerty123'),
  },
  {
    name: 'Alice',
    secondName: 'P',
    email: 'alice@mail.com',
    phoneNumber: '79845672342',
    password: encrypt('Qwerty123'),
  },
  {
    name: 'Bob',
    secondName: 'P',
    email: 'bob@mail.com',
    phoneNumber: '79845672343',
    password: encrypt('Qwerty123'),
  },
];

const client = new PrismaClient();

const main = () => {
  return client.user.createMany({
    data: users.map(user => ({
      name: user.name,
      secondName: user.secondName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
    })),
  });
};

main().finally(() => client.$disconnect());

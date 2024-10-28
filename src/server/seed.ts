import type { User } from '@/server/model';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { SHA256 as sha256 } from 'crypto-js';
import { exit } from 'process';

const encrypt = (text: string) => sha256(text).toString();

const prisma = new PrismaClient();

const adapter = PrismaAdapter(prisma);

const seedUsers = async () => {
  const usersCount = await prisma.user.count();
  if (!usersCount) {
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

    const createPromises = () => {
      const list: Array<Promise<void>> = [];

      users.forEach(async u => {
        const creator = await (adapter as any).createUser(u);
        list.push(creator);
      });

      return list;
    };

    Promise.all(createPromises()).catch(e => {
      // eslint-disable-next-line no-console
      console.log(e);
      prisma.$disconnect();
      exit(1);
    });
  }
};

const seedRoutes = async () => {
  await prisma.route.createMany({
    data: [
      {
        from: 'Москва',
        to: 'Санкт-Петербург',
        description: 'Из Москвы в Расчлениград',
      },
      {
        from: 'Санкт-Петербург',
        to: 'Москва',
        description: 'Из Болотогрда в Москву',
      },
    ],
  });
};
const seedFlights = async () => {
  const route1 = await prisma.route.findFirst({ where: { from: 'Москва' } });
  const route2 = await prisma.route.findFirst({ where: { to: 'Москва' } });

  if (!route1 || !route2) return;

  await prisma.flight.createMany({
    data: [
      {
        company: 'Пупа аирлаинс',
        date: new Date('2024-10-28 14:00:00').toISOString(),
        duration: 150,
        reservedSeatsCount: 45,
        totalSeatsCount: 190,
        availableSeatsCount: 145,
        departureAirport: 'Шереметьево',
        departureAirportCode: 'SVO',
        arrivingAirport: 'Пулково',
        arrivingAirportCode: 'LED',
        routeId: route1.id,
      },
      {
        company: 'Лупа аирлаинс',
        date: new Date('2024-10-28 14:00:00').toISOString(),
        duration: 145,
        reservedSeatsCount: 55,
        totalSeatsCount: 180,
        availableSeatsCount: 125,
        arrivingAirport: 'Шереметьево',
        arrivingAirportCode: 'SVO',
        departureAirport: 'Пулково',
        departureAirportCode: 'LED',
        routeId: route2.id,
      },
    ],
  });
};
const seedTickets = async () => {
  const flight = await prisma.flight.findFirst();
  const user = await prisma.user.findFirst({ where: { email: 'alex@mail.com' } });

  if (!flight || !user) return;

  await prisma.ticket.create({
    data: {
      createdAt: new Date(),
      cost: 2500,
      currency: 'RUB',
      seat: 25,
      flightId: flight.id,
      userId: user.id,
    },
  });
};

const getSeedConstraints = async () => {
  const user = Boolean(await prisma.user.count());
  const ticket = Boolean(await prisma.ticket.count());
  const route = Boolean(await prisma.route.count());
  const flight = Boolean(await prisma.flight.count());

  return { user, ticket, route, flight };
};

const main = async () => {
  const seedConstraints = await getSeedConstraints();

  const seedMap = {
    user: seedUsers,
    ticket: seedTickets,
    flight: seedFlights,
    route: seedRoutes,
  };

  for (const c in seedConstraints) {
    if (!seedConstraints[c as keyof typeof seedConstraints]) await seedMap[c as keyof typeof seedMap]();
  }

  // eslint-disable-next-line no-console
  console.log('Seed completed');
};

main().finally(() => {
  prisma.$disconnect();
});

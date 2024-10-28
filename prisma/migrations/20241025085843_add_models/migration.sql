-- CreateTable
CREATE TABLE "Route" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    "departureAirport" TEXT NOT NULL,
    "departureAirportCode" TEXT NOT NULL,
    "arrivingAirport" TEXT NOT NULL,
    "arrivingAirportCode" TEXT NOT NULL,
    "routeId" INTEGER NOT NULL,
    "reservedSeatsCount" INTEGER NOT NULL,
    "totalSeatsCount" INTEGER NOT NULL,
    "availableSeatsCount" INTEGER NOT NULL,
    CONSTRAINT "Flight_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL,
    "currency" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "seat" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "flightId" INTEGER NOT NULL,
    CONSTRAINT "Ticket_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

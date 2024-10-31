/*
  Warnings:

  - You are about to drop the column `cost` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `flightId` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `ticketClassId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TicketClass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "reserved" INTEGER NOT NULL,
    "available" INTEGER NOT NULL,
    "flightId" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    CONSTRAINT "TicketClass_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL,
    "seat" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "ticketClassId" INTEGER NOT NULL,
    CONSTRAINT "Ticket_ticketClassId_fkey" FOREIGN KEY ("ticketClassId") REFERENCES "TicketClass" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ticket" ("createdAt", "id", "seat", "userId") SELECT "createdAt", "id", "seat", "userId" FROM "Ticket";
DROP TABLE "Ticket";
ALTER TABLE "new_Ticket" RENAME TO "Ticket";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

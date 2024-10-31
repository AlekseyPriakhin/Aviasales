/*
  Warnings:

  - Added the required column `order` to the `TicketClass` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TicketClass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "reserved" INTEGER NOT NULL,
    "available" INTEGER NOT NULL,
    "flightId" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "TicketClass_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TicketClass" ("available", "cost", "currency", "flightId", "id", "name", "reserved", "total") SELECT "available", "cost", "currency", "flightId", "id", "name", "reserved", "total" FROM "TicketClass";
DROP TABLE "TicketClass";
ALTER TABLE "new_TicketClass" RENAME TO "TicketClass";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

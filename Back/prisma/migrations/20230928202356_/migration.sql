/*
  Warnings:

  - You are about to drop the column `lodgingId` on the `Reservation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checkInDate" DATETIME NOT NULL,
    "checkOutDate" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("checkInDate", "checkOutDate", "id", "userId") SELECT "checkInDate", "checkOutDate", "id", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE TABLE "new_Lodging" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "colorId" TEXT NOT NULL,
    CONSTRAINT "Lodging_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lodging" ("colorId", "id", "name") SELECT "colorId", "id", "name" FROM "Lodging";
DROP TABLE "Lodging";
ALTER TABLE "new_Lodging" RENAME TO "Lodging";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

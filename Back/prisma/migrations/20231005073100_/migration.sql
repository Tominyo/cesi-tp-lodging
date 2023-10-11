-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checkInDate" DATETIME NOT NULL,
    "checkOutDate" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "lodgingId" INTEGER,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_lodgingId_fkey" FOREIGN KEY ("lodgingId") REFERENCES "Lodging" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("checkInDate", "checkOutDate", "id", "userId") SELECT "checkInDate", "checkOutDate", "id", "userId" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE UNIQUE INDEX "Reservation_lodgingId_key" ON "Reservation"("lodgingId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

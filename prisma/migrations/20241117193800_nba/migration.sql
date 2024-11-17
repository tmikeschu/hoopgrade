/*
  Warnings:

  - You are about to drop the `NBAGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "NBAGame";

-- CreateTable
CREATE TABLE "NbaGame" (
    "id" TEXT NOT NULL,
    "json" JSONB NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NbaGame_pkey" PRIMARY KEY ("id")
);

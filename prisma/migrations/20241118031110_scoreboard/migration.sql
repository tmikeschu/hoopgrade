/*
  Warnings:

  - You are about to drop the `NbaGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "NbaGame";

-- CreateTable
CREATE TABLE "ScoreboardSummary" (
    "id" TEXT NOT NULL,
    "json" JSONB NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScoreboardSummary_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `ScoreboardSummary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ScoreboardSummary_date_key" ON "ScoreboardSummary"("date");

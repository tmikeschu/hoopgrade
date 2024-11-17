-- CreateTable
CREATE TABLE "NBAGame" (
    "id" TEXT NOT NULL,
    "json" JSONB NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NBAGame_pkey" PRIMARY KEY ("id")
);

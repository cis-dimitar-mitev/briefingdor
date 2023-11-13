-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "initialText" TEXT NOT NULL,
    "resultText" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

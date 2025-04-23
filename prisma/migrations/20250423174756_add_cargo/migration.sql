-- CreateTable
CREATE TABLE "Cargo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trackingNo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cargo_trackingNo_key" ON "Cargo"("trackingNo");

-- CreateIndex
CREATE INDEX "Cargo_trackingNo_idx" ON "Cargo"("trackingNo");

-- CreateIndex
CREATE INDEX "Cargo_status_idx" ON "Cargo"("status");

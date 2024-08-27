/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "published" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Article_title_key" ON "Article"("title");

/*
  Warnings:

  - You are about to drop the `UserRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserInGroupRole" AS ENUM ('CHEF', 'USER');

-- DropForeignKey
ALTER TABLE "UserRoles" DROP CONSTRAINT "UserRoles_groupId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoles" DROP CONSTRAINT "UserRoles_userId_fkey";

-- DropTable
DROP TABLE "UserRoles";

-- CreateTable
CREATE TABLE "UserInGroupRoles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "role" INTEGER NOT NULL,

    CONSTRAINT "UserInGroupRoles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInGroupRoles" ADD CONSTRAINT "UserInGroupRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInGroupRoles" ADD CONSTRAINT "UserInGroupRoles_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

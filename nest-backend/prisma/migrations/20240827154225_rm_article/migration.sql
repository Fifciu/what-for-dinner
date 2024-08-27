/*
  Warnings:

  - The `role` column on the `UserInGroupRoles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "UserInGroupRoles" DROP COLUMN "role",
ADD COLUMN     "role" "UserInGroupRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Article";

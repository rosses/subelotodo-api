/*
  Warnings:

  - You are about to alter the column `length` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `width` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `height` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `weight` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the `refreshtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `refreshToken_userId_fkey`;

-- AlterTable
ALTER TABLE `dimensions` MODIFY `length` DECIMAL NOT NULL DEFAULT 0,
    MODIFY `width` DECIMAL NOT NULL DEFAULT 0,
    MODIFY `height` DECIMAL NOT NULL DEFAULT 0,
    MODIFY `weight` DECIMAL NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `refreshtoken`;

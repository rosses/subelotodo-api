/*
  Warnings:

  - You are about to alter the column `length` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `weight` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `width` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `height` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the `refreshtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `refreshToken_userId_fkey`;

-- AlterTable
ALTER TABLE `products` MODIFY `length` DECIMAL NULL,
    MODIFY `weight` DECIMAL NULL,
    MODIFY `width` DECIMAL NULL,
    MODIFY `height` DECIMAL NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `account` VARCHAR(225) NULL DEFAULT '',
    ADD COLUMN `accountType` VARCHAR(225) NULL DEFAULT '',
    ADD COLUMN `bank` VARCHAR(225) NULL DEFAULT '',
    MODIFY `document` VARCHAR(225) NULL DEFAULT '';

-- DropTable
DROP TABLE `refreshtoken`;

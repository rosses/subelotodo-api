/*
  Warnings:

  - You are about to alter the column `length` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `width` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `height` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `weight` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `dimensions` MODIFY `length` DECIMAL NOT NULL DEFAULT 0,
    MODIFY `width` DECIMAL NOT NULL DEFAULT 0,
    MODIFY `height` DECIMAL NOT NULL DEFAULT 0,
    MODIFY `weight` DECIMAL NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `products` ALTER COLUMN `categoryId` DROP DEFAULT,
    ALTER COLUMN `stateId` DROP DEFAULT;

/*
  Warnings:

  - You are about to alter the column `length` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `weight` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `width` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `height` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `length` DECIMAL NOT NULL,
    MODIFY `weight` DECIMAL NOT NULL,
    MODIFY `width` DECIMAL NOT NULL,
    MODIFY `height` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `outstanding` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sales` INTEGER NOT NULL DEFAULT 0;

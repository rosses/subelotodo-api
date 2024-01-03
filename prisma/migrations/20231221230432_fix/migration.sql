/*
  Warnings:

  - You are about to alter the column `length` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `weight` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `width` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `height` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `length` DECIMAL NULL,
    MODIFY `weight` DECIMAL NULL,
    MODIFY `width` DECIMAL NULL,
    MODIFY `height` DECIMAL NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `Products_title_description_idx` ON `products`(`title`, `description`);

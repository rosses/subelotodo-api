/*
  Warnings:

  - You are about to alter the column `length` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `width` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `height` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `weight` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `dimensions` MODIFY `length` DECIMAL NOT NULL,
    MODIFY `width` DECIMAL NOT NULL,
    MODIFY `height` DECIMAL NOT NULL,
    MODIFY `weight` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `categoryId` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `stateId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `states`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

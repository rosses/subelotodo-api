/*
  Warnings:

  - You are about to alter the column `length` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `weight` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `width` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `height` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the `refreshtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cities` DROP FOREIGN KEY `cities_stateId_fkey`;

-- DropForeignKey
ALTER TABLE `productimages` DROP FOREIGN KEY `productImages_productId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_stateId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_subcategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_userId_fkey`;

-- DropForeignKey
ALTER TABLE `producttags` DROP FOREIGN KEY `productTags_productId_fkey`;

-- DropForeignKey
ALTER TABLE `producttags` DROP FOREIGN KEY `productTags_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `refreshToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `subcategories` DROP FOREIGN KEY `subcategories_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_stateId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_type_fkey`;

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

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_type_fkey` FOREIGN KEY (`type`) REFERENCES `UserTypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `Cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcategories` ADD CONSTRAINT `Subcategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cities` ADD CONSTRAINT `Cities_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductTags` ADD CONSTRAINT `ProductTags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductTags` ADD CONSTRAINT `ProductTags_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `Subcategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `Cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImages` ADD CONSTRAINT `ProductImages_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `categoryName` on the `subcategories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `subcategories` DROP FOREIGN KEY `Subcategories_categoryId_categoryName_fkey`;

-- DropIndex
DROP INDEX `Categories_id_name_key` ON `categories`;

-- AlterTable
ALTER TABLE `subcategories` DROP COLUMN `categoryName`;

-- AddForeignKey
ALTER TABLE `Subcategories` ADD CONSTRAINT `Subcategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

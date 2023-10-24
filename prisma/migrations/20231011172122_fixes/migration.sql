/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `Subcategories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `subcategories` DROP FOREIGN KEY `subcategories_categoryId_fkey`;

-- AlterTable
ALTER TABLE `subcategories` ADD COLUMN `categoryName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `categories_id_name_key` ON `Categories`(`id`, `name`);

-- AddForeignKey
ALTER TABLE `subcategories` ADD CONSTRAINT `subcategories_categoryId_categoryName_fkey` FOREIGN KEY (`categoryId`, `categoryName`) REFERENCES `categories`(`id`, `name`) ON DELETE RESTRICT ON UPDATE CASCADE;

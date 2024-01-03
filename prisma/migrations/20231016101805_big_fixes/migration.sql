/*
  Warnings:

  - You are about to drop the `dimensions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hight` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dimensions` DROP FOREIGN KEY `dimensions_productId_fkey`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `hight` DECIMAL NOT NULL,
    ADD COLUMN `length` DECIMAL NOT NULL,
    ADD COLUMN `weight` DECIMAL NOT NULL,
    ADD COLUMN `width` DECIMAL NOT NULL;

-- DropTable
DROP TABLE `dimensions`;

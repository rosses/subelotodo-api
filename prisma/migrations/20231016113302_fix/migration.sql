/*
  Warnings:

  - You are about to drop the column `hight` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `length` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `weight` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `width` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `height` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `hight`,
    ADD COLUMN `height` DECIMAL NOT NULL,
    MODIFY `length` DECIMAL NOT NULL,
    MODIFY `weight` DECIMAL NOT NULL,
    MODIFY `width` DECIMAL NOT NULL;

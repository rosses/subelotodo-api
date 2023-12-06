/*
  Warnings:

  - You are about to alter the column `length` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `weight` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `width` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `height` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `userId` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersId` to the `Shipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `sellerPaid` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `products` MODIFY `length` DECIMAL NOT NULL,
    MODIFY `weight` DECIMAL NOT NULL,
    MODIFY `width` DECIMAL NOT NULL,
    MODIFY `height` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `shipments` ADD COLUMN `userId` INTEGER NOT NULL,
    ADD COLUMN `usersId` INTEGER NOT NULL,
    ADD COLUMN `valid` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Shipments` ADD CONSTRAINT `Shipments_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

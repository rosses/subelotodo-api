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

-- CreateTable
CREATE TABLE `Orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `shipmentId` INTEGER NOT NULL,
    `orderStateId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `sellerPaid` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shipments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `token` VARCHAR(225) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderStates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stateOrder` VARCHAR(225) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_shipmentId_fkey` FOREIGN KEY (`shipmentId`) REFERENCES `Shipments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_orderStateId_fkey` FOREIGN KEY (`orderStateId`) REFERENCES `OrderStates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

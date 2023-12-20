/*
  Warnings:

  - You are about to alter the column `length` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `weight` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `width` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `height` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the column `valid` on the `shipments` table. All the data in the column will be lost.
  - Added the required column `rejectedDescription` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rejectedTitle` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountingDate` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autorizationCode` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyOrder` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardNumber` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installmentsNumber` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentTypeCode` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseCode` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionDate` to the `Shipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vci` to the `Shipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `rejectedDescription` VARCHAR(225) NOT NULL,
    ADD COLUMN `rejectedTitle` VARCHAR(225) NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `length` DECIMAL NULL,
    MODIFY `weight` DECIMAL NULL,
    MODIFY `width` DECIMAL NULL,
    MODIFY `height` DECIMAL NULL;

-- AlterTable
ALTER TABLE `shipments` DROP COLUMN `valid`,
    ADD COLUMN `accountingDate` VARCHAR(225) NOT NULL,
    ADD COLUMN `autorizationCode` VARCHAR(225) NOT NULL,
    ADD COLUMN `buyOrder` VARCHAR(225) NOT NULL,
    ADD COLUMN `cardNumber` VARCHAR(225) NOT NULL,
    ADD COLUMN `installmentsNumber` INTEGER NOT NULL,
    ADD COLUMN `paymentTypeCode` VARCHAR(225) NOT NULL,
    ADD COLUMN `responseCode` INTEGER NOT NULL,
    ADD COLUMN `sessionId` VARCHAR(225) NOT NULL,
    ADD COLUMN `status` VARCHAR(225) NOT NULL,
    ADD COLUMN `transactionDate` DATETIME(3) NOT NULL,
    ADD COLUMN `vci` VARCHAR(225) NOT NULL;

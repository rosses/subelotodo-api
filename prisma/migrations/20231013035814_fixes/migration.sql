/*
  Warnings:

  - You are about to alter the column `length` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `width` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `height` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `weight` on the `dimensions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to drop the column `city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `users` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dimensions` MODIFY `length` DECIMAL NOT NULL,
    MODIFY `width` DECIMAL NOT NULL,
    MODIFY `height` DECIMAL NOT NULL,
    MODIFY `weight` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `city`,
    DROP COLUMN `state`,
    ADD COLUMN `cityId` INTEGER NOT NULL,
    ADD COLUMN `stateId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_stateId_fkey` FOREIGN KEY (`stateId`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `Cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

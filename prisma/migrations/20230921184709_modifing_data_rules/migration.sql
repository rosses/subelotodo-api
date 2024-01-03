/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `address` VARCHAR(255) NULL,
    MODIFY `state` VARCHAR(255) NULL,
    MODIFY `city` VARCHAR(255) NULL,
    MODIFY `zipcode` INTEGER NULL,
    MODIFY `type` TINYINT NULL,
    MODIFY `phone` INTEGER NULL,
    MODIFY `birthday` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `users`(`email`);

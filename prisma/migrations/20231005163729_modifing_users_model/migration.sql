/*
  Warnings:

  - Made the column `address` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthday` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `gender` VARCHAR(255) NULL,
    MODIFY `address` VARCHAR(255) NOT NULL,
    MODIFY `state` VARCHAR(255) NOT NULL,
    MODIFY `city` VARCHAR(255) NOT NULL,
    MODIFY `type` TINYINT NOT NULL,
    MODIFY `phone` INTEGER NOT NULL,
    MODIFY `birthday` DATETIME(3) NOT NULL;

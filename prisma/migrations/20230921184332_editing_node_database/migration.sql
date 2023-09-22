-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `zipcode` INTEGER NOT NULL,
    `type` TINYINT NOT NULL,
    `phone` INTEGER NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sexbots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `botName` VARCHAR(191) NOT NULL,
    `botOwner` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `sexbots_botName_key`(`botName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

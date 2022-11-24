-- CreateTable
CREATE TABLE `DonationProfile` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `recurrence` ENUM('WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL DEFAULT 'WEEKLY',
    `recurrenceExpirationDate` DATETIME(3) NOT NULL,
    `institutionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `creatorId` VARCHAR(191) NOT NULL,
    `updaterId` VARCHAR(191) NULL,
    `deleterId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DonationProfile` ADD CONSTRAINT `DonationProfile_institutionId_fkey` FOREIGN KEY (`institutionId`) REFERENCES `Institution`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonationProfile` ADD CONSTRAINT `DonationProfile_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DonationProfile` ADD CONSTRAINT `DonationProfile_updaterId_fkey` FOREIGN KEY (`updaterId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `DonationProfile` ADD CONSTRAINT `DonationProfile_deleterId_fkey` FOREIGN KEY (`deleterId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

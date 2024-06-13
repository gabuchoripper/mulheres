-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NULL,
    `cnpj` VARCHAR(191) NULL,
    `banner` VARCHAR(191) NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `inactivedate` DATETIME(3) NULL,
    `created_at` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `associadas` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `razaosocial` VARCHAR(191) NULL,
    `ramo` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `description` LONGTEXT NULL,
    `discount` VARCHAR(191) NULL,
    `imagepath` VARCHAR(191) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventos` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `descricao` TEXT NULL,
    `palestrante` VARCHAR(191) NULL,
    `local` TEXT NULL,
    `data` DATETIME(3) NULL,
    `vagas` INTEGER NULL,
    `label` TEXT NULL,
    `created_at` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `midias` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `path` TEXT NOT NULL,
    `id_evento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inscricoeseventos` (
    `id` VARCHAR(191) NOT NULL,
    `id_evento` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participacoeseventos` (
    `id` VARCHAR(191) NOT NULL,
    `name` TEXT NOT NULL,
    `evento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `descricao` TEXT NULL,
    `professor` VARCHAR(191) NULL,
    `local` TEXT NULL,
    `data` DATETIME(3) NULL,
    `vagas` INTEGER NULL,
    `label` TEXT NULL,
    `created_at` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `midias_curso` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `path` TEXT NOT NULL,
    `id_curso` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inscricoescursos` (
    `id` VARCHAR(191) NOT NULL,
    `id_curso` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detel_user_request` (
    `id` VARCHAR(191) NOT NULL,
    `userkey` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `midias` ADD CONSTRAINT `midias_id_evento_fkey` FOREIGN KEY (`id_evento`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscricoeseventos` ADD CONSTRAINT `inscricoeseventos_id_evento_fkey` FOREIGN KEY (`id_evento`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscricoeseventos` ADD CONSTRAINT `inscricoeseventos_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participacoeseventos` ADD CONSTRAINT `participacoeseventos_evento_fkey` FOREIGN KEY (`evento`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `midias_curso` ADD CONSTRAINT `midias_curso_id_curso_fkey` FOREIGN KEY (`id_curso`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscricoescursos` ADD CONSTRAINT `inscricoescursos_id_curso_fkey` FOREIGN KEY (`id_curso`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscricoescursos` ADD CONSTRAINT `inscricoescursos_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detel_user_request` ADD CONSTRAINT `detel_user_request_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

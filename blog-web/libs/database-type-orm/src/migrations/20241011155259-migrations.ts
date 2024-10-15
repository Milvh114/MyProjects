import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations20241011155259 implements MigrationInterface {
    name = 'Migrations20241011155259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                \`email\` varchar(255) NOT NULL,
                \`password\` varchar(100) NULL,
                \`name\` varchar(100) NULL,
                \`status\` tinyint UNSIGNED NOT NULL DEFAULT '1',
                \`is_super_admin\` tinyint NOT NULL DEFAULT '0',
                \`jwt_token\` varchar(100) NULL,
                \`refresh_token\` varchar(500) NULL,
                \`deleted_at\` datetime(6) NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`blog\` (
                \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
                \`content\` varchar(255) NOT NULL,
                \`name\` varchar(100) NULL,
                \`deleted_at\` datetime(6) NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`user_id\` bigint UNSIGNED NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`blog\`
            ADD CONSTRAINT \`FK_08dfe0c802192ba0c499d4cdb9c\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`blog\` DROP FOREIGN KEY \`FK_08dfe0c802192ba0c499d4cdb9c\`
        `);
        await queryRunner.query(`
            DROP TABLE \`blog\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
    }

}

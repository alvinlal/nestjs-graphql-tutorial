import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1659719960470 implements MigrationInterface {
    name = 'initial1659719960470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NULL, \`ownerId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`owner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pet\` ADD CONSTRAINT \`FK_20acc45f799c122ec3735a3b8b1\` FOREIGN KEY (\`ownerId\`) REFERENCES \`owner\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pet\` DROP FOREIGN KEY \`FK_20acc45f799c122ec3735a3b8b1\``);
        await queryRunner.query(`DROP TABLE \`owner\``);
        await queryRunner.query(`DROP TABLE \`pet\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}

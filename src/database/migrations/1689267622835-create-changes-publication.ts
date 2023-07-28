import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChangesPublication1689267622835 implements MigrationInterface {
    name = 'CreateChangesPublication1689267622835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "hour"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication" ADD "hour" TIME`);
        await queryRunner.query(`ALTER TABLE "publication" ADD "date" date`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTransaction1686109912974 implements MigrationInterface {
    name = 'UpdateTransaction1686109912974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "UQ_eb1268c28ca3152f02f97100bbd"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "UQ_eb1268c28ca3152f02f97100bbd" UNIQUE ("value")`);
    }

}

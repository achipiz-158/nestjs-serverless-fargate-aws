import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWallet1684733089136 implements MigrationInterface {
    name = 'UpdateWallet1684733089136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "UQ_b62bc0ea503eca754ae217a3c68"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "UQ_b62bc0ea503eca754ae217a3c68" UNIQUE ("balance")`);
    }

}

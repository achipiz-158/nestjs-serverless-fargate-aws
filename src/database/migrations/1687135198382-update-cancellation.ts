import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCancellation1687135198382 implements MigrationInterface {
    name = 'UpdateCancellation1687135198382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cancellation" ADD "booking_id" uuid`);
        await queryRunner.query(`ALTER TABLE "cancellation" ADD CONSTRAINT "UQ_4af1f78a574d5bb39d8f2835b48" UNIQUE ("booking_id")`);
        await queryRunner.query(`ALTER TABLE "cancellation" ADD CONSTRAINT "FK_4af1f78a574d5bb39d8f2835b48" FOREIGN KEY ("booking_id") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cancellation" DROP CONSTRAINT "FK_4af1f78a574d5bb39d8f2835b48"`);
        await queryRunner.query(`ALTER TABLE "cancellation" DROP CONSTRAINT "UQ_4af1f78a574d5bb39d8f2835b48"`);
        await queryRunner.query(`ALTER TABLE "cancellation" DROP COLUMN "booking_id"`);
    }

}

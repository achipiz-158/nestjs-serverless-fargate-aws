import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEmailUnique1686098948875 implements MigrationInterface {
    name = 'UserEmailUnique1686098948875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ADD "payment" uuid`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "UQ_fc746e08b5ef8fe45c22425a8db" UNIQUE ("payment")`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_fc746e08b5ef8fe45c22425a8db" FOREIGN KEY ("payment") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_fc746e08b5ef8fe45c22425a8db"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "UQ_fc746e08b5ef8fe45c22425a8db"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "payment"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEmailUnique1686098685353 implements MigrationInterface {
    name = 'UserEmailUnique1686098685353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_41c6a6359db01ac92a0e2559a2c"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "UQ_41c6a6359db01ac92a0e2559a2c"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "booking"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "booking" uuid`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "UQ_41c6a6359db01ac92a0e2559a2c" UNIQUE ("booking")`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_41c6a6359db01ac92a0e2559a2c" FOREIGN KEY ("booking") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

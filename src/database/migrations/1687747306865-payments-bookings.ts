import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentsBookings1687747306865 implements MigrationInterface {
    name = 'PaymentsBookings1687747306865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_fc746e08b5ef8fe45c22425a8db"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "UQ_fc746e08b5ef8fe45c22425a8db"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_fc746e08b5ef8fe45c22425a8db" FOREIGN KEY ("payment") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_fc746e08b5ef8fe45c22425a8db"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "UQ_fc746e08b5ef8fe45c22425a8db" UNIQUE ("payment")`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_fc746e08b5ef8fe45c22425a8db" FOREIGN KEY ("payment") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

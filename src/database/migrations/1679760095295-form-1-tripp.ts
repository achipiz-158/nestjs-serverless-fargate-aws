import { MigrationInterface, QueryRunner } from 'typeorm';

export class form1Tripp1679760095295 implements MigrationInterface {
  name = 'form1Tripp1679760095295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP COLUMN "care_start_date"`,
    );
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "care_end_date"`);
    await queryRunner.query(`ALTER TABLE "category" ADD "trippsId" uuid`);
    await queryRunner.query(`ALTER TABLE "tripp" ADD "language" uuid`);
    await queryRunner.query(`ALTER TABLE "tripp" ADD "category" uuid`);
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_29f278f27d1e6d91f16247eaa71" FOREIGN KEY ("trippsId") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD CONSTRAINT "FK_d83d76204e0f4f56fec390fec1d" FOREIGN KEY ("language") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD CONSTRAINT "FK_a4840930c4c8eefed534c45d82a" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP CONSTRAINT "FK_a4840930c4c8eefed534c45d82a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP CONSTRAINT "FK_d83d76204e0f4f56fec390fec1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_29f278f27d1e6d91f16247eaa71"`,
    );
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "category"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "language"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "trippsId"`);
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "care_end_date" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "care_start_date" TIMESTAMP WITH TIME ZONE`,
    );
  }
}

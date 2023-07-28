import { MigrationInterface, QueryRunner } from 'typeorm';

export class nullFieldsTripps1668721404103 implements MigrationInterface {
  name = 'nullFieldsTripps1668721404103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "duration" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "location_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "care_start_date" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "care_end_date" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "care_end_date" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "care_start_date" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "location_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "duration" SET NOT NULL`,
    );
  }
}

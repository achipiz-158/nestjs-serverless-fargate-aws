import { MigrationInterface, QueryRunner } from 'typeorm';

export class profileNulls1670354782963 implements MigrationInterface {
  name = 'profileNulls1670354782963';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "lastname" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "gender" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "date_of_birth" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "date_of_birth" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "gender" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "lastname" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "name" SET NOT NULL`,
    );
  }
}

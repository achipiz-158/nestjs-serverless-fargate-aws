import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeAccountToEmail1670354689529 implements MigrationInterface {
  name = 'changeAccountToEmail1670354689529';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" RENAME COLUMN "account" TO "email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" RENAME CONSTRAINT "UQ_78abc93b408b6b6019d40ff9afb" TO "UQ_3825121222d5c17741373d8ad13"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" RENAME CONSTRAINT "UQ_3825121222d5c17741373d8ad13" TO "UQ_78abc93b408b6b6019d40ff9afb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" RENAME COLUMN "email" TO "account"`,
    );
  }
}

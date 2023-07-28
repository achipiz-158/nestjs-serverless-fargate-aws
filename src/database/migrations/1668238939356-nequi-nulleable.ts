import { MigrationInterface, QueryRunner } from 'typeorm';

export class nequiNulleable1668238939356 implements MigrationInterface {
  name = 'nequiNulleable1668238939356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "nequi" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "nequi" SET NOT NULL`,
    );
  }
}

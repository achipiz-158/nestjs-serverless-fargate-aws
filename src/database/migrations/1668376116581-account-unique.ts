import { MigrationInterface, QueryRunner } from 'typeorm';

export class accountUnique1668376116581 implements MigrationInterface {
  name = 'accountUnique1668376116581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "UQ_78abc93b408b6b6019d40ff9afb" UNIQUE ("account")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "UQ_78abc93b408b6b6019d40ff9afb"`,
    );
  }
}

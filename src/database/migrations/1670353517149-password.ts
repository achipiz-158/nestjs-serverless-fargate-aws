import { MigrationInterface, QueryRunner } from 'typeorm';

export class password1670353517149 implements MigrationInterface {
  name = 'password1670353517149';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "password" text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "password"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewsFieldsHoost1684945055195 implements MigrationInterface {
  name = 'NewsFieldsHoost1684945055195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "host" ADD "company" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "host" ADD "NIT" integer`);
    await queryRunner.query(`ALTER TABLE "host" ADD "RUT" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "host" DROP COLUMN "RUT"`);
    await queryRunner.query(`ALTER TABLE "host" DROP COLUMN "NIT"`);
    await queryRunner.query(`ALTER TABLE "host" DROP COLUMN "company"`);
  }
}

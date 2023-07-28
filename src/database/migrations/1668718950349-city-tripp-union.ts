import { MigrationInterface, QueryRunner } from 'typeorm';

export class cityTrippUnion1668718950349 implements MigrationInterface {
  name = 'cityTrippUnion1668718950349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "city"`);
    await queryRunner.query(`ALTER TABLE "tripp" ADD "city" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD CONSTRAINT "FK_09bc97963ba5b977ba23ec40583" FOREIGN KEY ("city") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP CONSTRAINT "FK_09bc97963ba5b977ba23ec40583"`,
    );
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "city"`);
    await queryRunner.query(`ALTER TABLE "tripp" ADD "city" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "country" character varying(150) NOT NULL`,
    );
  }
}

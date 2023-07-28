import { MigrationInterface, QueryRunner } from 'typeorm';

export class tableCategoryTrippUnion1668715227604
  implements MigrationInterface
{
  name = 'tableCategoryTrippUnion1668715227604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_05cd8f4b2182762357feb8d0203"`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories_tripps" ("tripp_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_d34e3df4f423e1e691b0efa6ee7" PRIMARY KEY ("tripp_id", "category_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5d536e6c69f2f5e12711f6ded2" ON "categories_tripps" ("tripp_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_95a92da1d6bdb87c5e056488c3" ON "categories_tripps" ("category_id") `,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "tripp"`);
    await queryRunner.query(
      `ALTER TABLE "categories_tripps" ADD CONSTRAINT "FK_5d536e6c69f2f5e12711f6ded2e" FOREIGN KEY ("tripp_id") REFERENCES "tripp"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_tripps" ADD CONSTRAINT "FK_95a92da1d6bdb87c5e056488c3b" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories_tripps" DROP CONSTRAINT "FK_95a92da1d6bdb87c5e056488c3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_tripps" DROP CONSTRAINT "FK_5d536e6c69f2f5e12711f6ded2e"`,
    );
    await queryRunner.query(`ALTER TABLE "category" ADD "tripp" uuid`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_95a92da1d6bdb87c5e056488c3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5d536e6c69f2f5e12711f6ded2"`,
    );
    await queryRunner.query(`DROP TABLE "categories_tripps"`);
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_05cd8f4b2182762357feb8d0203" FOREIGN KEY ("tripp") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

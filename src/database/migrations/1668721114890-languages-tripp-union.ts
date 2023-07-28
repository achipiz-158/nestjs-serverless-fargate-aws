import { MigrationInterface, QueryRunner } from 'typeorm';

export class languagesTrippUnion1668721114890 implements MigrationInterface {
  name = 'languagesTrippUnion1668721114890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tripps_languages" ("tripps_id" uuid NOT NULL, "language_id" uuid NOT NULL, CONSTRAINT "PK_c208b97405f031c4ed7cadf89b6" PRIMARY KEY ("tripps_id", "language_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_89006680dd7e3a51b9a6dd2070" ON "tripps_languages" ("tripps_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7e8dd2302088b7189bfb631c21" ON "tripps_languages" ("language_id") `,
    );
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "languages"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "meeting_point" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripps_languages" ADD CONSTRAINT "FK_89006680dd7e3a51b9a6dd20709" FOREIGN KEY ("tripps_id") REFERENCES "tripp"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripps_languages" ADD CONSTRAINT "FK_7e8dd2302088b7189bfb631c21a" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tripps_languages" DROP CONSTRAINT "FK_7e8dd2302088b7189bfb631c21a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripps_languages" DROP CONSTRAINT "FK_89006680dd7e3a51b9a6dd20709"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "meeting_point" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "tripp" ADD "name" text`);
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "languages" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7e8dd2302088b7189bfb631c21"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_89006680dd7e3a51b9a6dd2070"`,
    );
    await queryRunner.query(`DROP TABLE "tripps_languages"`);
  }
}

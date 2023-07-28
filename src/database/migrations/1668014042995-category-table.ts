import { MigrationInterface, QueryRunner } from 'typeorm';

export class categoryTable1668014042995 implements MigrationInterface {
  name = 'categoryTable1668014042995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "tripp" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "start_time"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "minutes"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "quotas" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "time_table" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "duration" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "location_name" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_05cd8f4b2182762357feb8d0203" FOREIGN KEY ("tripp") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_05cd8f4b2182762357feb8d0203"`,
    );
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "location_name"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "duration"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "time_table"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "quotas"`);
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "minutes" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "start_time" TIME NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "category"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class entityGallerySchedule1666980428108 implements MigrationInterface {
  name = 'entityGallerySchedule1666980428108';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "day" text NOT NULL, "start_time" TIME NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "trippId" uuid, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gallery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, "type" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "trippId" uuid, CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_03f227c93edde8b957e0a6c7c07" FOREIGN KEY ("trippId") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ADD CONSTRAINT "FK_16ea92d3096eeb52e572b7c3d3a" FOREIGN KEY ("trippId") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gallery" DROP CONSTRAINT "FK_16ea92d3096eeb52e572b7c3d3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_03f227c93edde8b957e0a6c7c07"`,
    );
    await queryRunner.query(`DROP TABLE "gallery"`);
    await queryRunner.query(`DROP TABLE "schedule"`);
  }
}

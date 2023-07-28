import { MigrationInterface, QueryRunner } from 'typeorm';

export class paymentsScheduleBookingFavorites1668714492040
  implements MigrationInterface
{
  name = 'paymentsScheduleBookingFavorites1668714492040';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "follower" uuid, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" boolean DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "tripp" ADD "favorite" uuid`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "schedule" uuid`);
    await queryRunner.query(
      `ALTER TABLE "favorite" ADD CONSTRAINT "FK_dcc07db15c21779a7b4eb477bd8" FOREIGN KEY ("follower") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD CONSTRAINT "FK_e54ad94ccc21a358be279626e51" FOREIGN KEY ("favorite") REFERENCES "favorite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_bc66bc89c14c42e3274e919796f" FOREIGN KEY ("schedule") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_bc66bc89c14c42e3274e919796f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP CONSTRAINT "FK_e54ad94ccc21a358be279626e51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite" DROP CONSTRAINT "FK_dcc07db15c21779a7b4eb477bd8"`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "schedule"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "favorite"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "favorite"`);
  }
}

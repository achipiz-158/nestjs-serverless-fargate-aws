import { MigrationInterface, QueryRunner } from 'typeorm';

export class scheduleWeek1675224792508 implements MigrationInterface {
  name = 'scheduleWeek1675224792508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_bc66bc89c14c42e3274e919796f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" RENAME COLUMN "schedule" TO "week"`,
    );
    await queryRunner.query(
      `CREATE TABLE "week" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hour" TIME NOT NULL, "day" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "schedule" uuid, CONSTRAINT "PK_1f85dfadd5f363a1d0bce2b9664" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "day"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "time_table"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "start_date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "end_date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_5750fd2446aca8d258d6a72975a" FOREIGN KEY ("week") REFERENCES "week"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "week" ADD CONSTRAINT "FK_6a1010ff104a06c49d08a21bafb" FOREIGN KEY ("schedule") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "week" DROP CONSTRAINT "FK_6a1010ff104a06c49d08a21bafb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_5750fd2446aca8d258d6a72975a"`,
    );
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "end_date"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "start_date"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "time_table" character varying(50) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schedule" ADD "day" text NOT NULL`);
    await queryRunner.query(`DROP TABLE "week"`);
    await queryRunner.query(
      `ALTER TABLE "booking" RENAME COLUMN "week" TO "schedule"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_bc66bc89c14c42e3274e919796f" FOREIGN KEY ("schedule") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

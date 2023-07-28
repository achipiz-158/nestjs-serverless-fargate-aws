import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRatingToTrippHost1684998586530
  implements MigrationInterface
{
  name = 'CreateRatingToTrippHost1684998586530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rating" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying NOT NULL, "rating" integer NOT NULL, "profileId" uuid, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tripp_rating" ("tripp_id" uuid NOT NULL, "rating_id" uuid NOT NULL, CONSTRAINT "PK_7decdeab9203273ba8ab8747d00" PRIMARY KEY ("tripp_id", "rating_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_47221affd55bf11664d0abae7c" ON "tripp_rating" ("tripp_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5cf95251bda132626a7e0213f6" ON "tripp_rating" ("rating_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "host_ratings" ("host_id" uuid NOT NULL, "rating_id" uuid NOT NULL, CONSTRAINT "PK_63db006a02158601ab0bbdd5f17" PRIMARY KEY ("host_id", "rating_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eceb5015ec3a66415a09b639fd" ON "host_ratings" ("host_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_055bacc77063d3e3759c72bd2f" ON "host_ratings" ("rating_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" ADD CONSTRAINT "FK_6b8a3e3a56ccc4d95532ed22fdc" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp_rating" ADD CONSTRAINT "FK_47221affd55bf11664d0abae7c7" FOREIGN KEY ("tripp_id") REFERENCES "tripp"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp_rating" ADD CONSTRAINT "FK_5cf95251bda132626a7e0213f66" FOREIGN KEY ("rating_id") REFERENCES "rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "host_ratings" ADD CONSTRAINT "FK_eceb5015ec3a66415a09b639fd7" FOREIGN KEY ("host_id") REFERENCES "host"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "host_ratings" ADD CONSTRAINT "FK_055bacc77063d3e3759c72bd2f1" FOREIGN KEY ("rating_id") REFERENCES "rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "host_ratings" DROP CONSTRAINT "FK_055bacc77063d3e3759c72bd2f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "host_ratings" DROP CONSTRAINT "FK_eceb5015ec3a66415a09b639fd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp_rating" DROP CONSTRAINT "FK_5cf95251bda132626a7e0213f66"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp_rating" DROP CONSTRAINT "FK_47221affd55bf11664d0abae7c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rating" DROP CONSTRAINT "FK_6b8a3e3a56ccc4d95532ed22fdc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_055bacc77063d3e3759c72bd2f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_eceb5015ec3a66415a09b639fd"`,
    );
    await queryRunner.query(`DROP TABLE "host_ratings"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5cf95251bda132626a7e0213f6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_47221affd55bf11664d0abae7c"`,
    );
    await queryRunner.query(`DROP TABLE "tripp_rating"`);
    await queryRunner.query(`DROP TABLE "rating"`);
  }
}

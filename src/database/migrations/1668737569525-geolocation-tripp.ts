import { MigrationInterface, QueryRunner } from 'typeorm';

export class geolocationTripp1668737569525 implements MigrationInterface {
  name = 'geolocationTripp1668737569525';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "meeting_point"`);
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "meeting_point" geography(Point,4326)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e14ab7d562147a30c57a61b457" ON "tripp" USING GiST ("meeting_point") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e14ab7d562147a30c57a61b457"`,
    );
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "meeting_point"`);
    await queryRunner.query(`ALTER TABLE "tripp" ADD "meeting_point" point`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class DistanceNearby1681882055364 implements MigrationInterface {
  name = 'DistanceNearby1681882055364';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "metadata" ADD "distance_nearby" integer NOT NULL DEFAULT '20000'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "metadata" DROP COLUMN "distance_nearby"`,
    );
  }
}

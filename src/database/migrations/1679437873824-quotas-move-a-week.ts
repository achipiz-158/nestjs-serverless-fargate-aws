import { MigrationInterface, QueryRunner } from 'typeorm';

export class quotasMoveAWeek1679437873824 implements MigrationInterface {
  name = 'quotasMoveAWeek1679437873824';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "quotas"`);
    await queryRunner.query(`ALTER TABLE "week" ADD "quotas" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "week" DROP COLUMN "quotas"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "quotas" integer NOT NULL`,
    );
  }
}

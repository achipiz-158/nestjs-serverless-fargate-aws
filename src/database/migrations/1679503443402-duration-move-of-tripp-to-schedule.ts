import { MigrationInterface, QueryRunner } from 'typeorm';

export class durationMoveOfTrippToSchedule1679503443402
  implements MigrationInterface
{
  name = 'durationMoveOfTrippToSchedule1679503443402';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "duration"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "duration" TIME NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "duration"`);
    await queryRunner.query(`ALTER TABLE "tripp" ADD "duration" integer`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class trippAddLocationDescription1679803545360
  implements MigrationInterface
{
  name = 'trippAddLocationDescription1679803545360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "location_description" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP COLUMN "location_description"`,
    );
  }
}

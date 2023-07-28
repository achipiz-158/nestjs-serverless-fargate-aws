import { MigrationInterface, QueryRunner } from 'typeorm';

export class FieldImgkey1685032868244 implements MigrationInterface {
  name = 'FieldImgkey1685032868244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" ADD "imgKey" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "imgKey"`);
  }
}

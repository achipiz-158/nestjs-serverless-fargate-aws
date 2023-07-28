import { MigrationInterface, QueryRunner } from 'typeorm';

export class profileNulleableImg1668238793866 implements MigrationInterface {
  name = 'profileNulleableImg1668238793866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "img" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "img" SET NOT NULL`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class enumGalleryAndPublishedTripp1680059177674
  implements MigrationInterface
{
  name = 'enumGallery-AndPublishedTripp1680059177674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."gallery_name_enum" AS ENUM('SECUNDARY', 'PRIMARY', 'DEFAULT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ADD "name" "public"."gallery_name_enum" NOT NULL DEFAULT 'DEFAULT'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "published" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "published"`);
    await queryRunner.query(`ALTER TABLE "gallery" DROP COLUMN "name"`);
    await queryRunner.query(`DROP TYPE "public"."gallery_name_enum"`);
  }
}

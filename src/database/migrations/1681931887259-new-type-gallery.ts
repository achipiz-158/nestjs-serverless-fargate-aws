import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewTypeGallery1681931887259 implements MigrationInterface {
  name = 'NewTypeGallery1681931887259';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."gallery_type_enum" RENAME TO "gallery_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."gallery_type_enum" AS ENUM('SECUNDARY', 'PRIMARY', 'FRONT', 'DEFAULT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ALTER COLUMN "type" TYPE "public"."gallery_type_enum" USING "type"::"text"::"public"."gallery_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ALTER COLUMN "type" SET DEFAULT 'DEFAULT'`,
    );
    await queryRunner.query(`DROP TYPE "public"."gallery_type_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."gallery_type_enum_old" AS ENUM('SECUNDARY', 'PRIMARY', 'DEFAULT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ALTER COLUMN "type" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ALTER COLUMN "type" TYPE "public"."gallery_type_enum_old" USING "type"::"text"::"public"."gallery_type_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ALTER COLUMN "type" SET DEFAULT 'DEFAULT'`,
    );
    await queryRunner.query(`DROP TYPE "public"."gallery_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."gallery_type_enum_old" RENAME TO "gallery_type_enum"`,
    );
  }
}

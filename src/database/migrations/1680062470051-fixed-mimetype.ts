import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixedMimetype1680062470051 implements MigrationInterface {
  name = 'fixedMimetype1680062470051';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "gallery" DROP COLUMN "name"`);
    await queryRunner.query(`DROP TYPE "public"."gallery_name_enum"`);
    await queryRunner.query(
      `ALTER TABLE "gallery" ADD "mimeType" text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "gallery" DROP COLUMN "type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."gallery_type_enum" AS ENUM('SECUNDARY', 'PRIMARY', 'DEFAULT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ADD "type" "public"."gallery_type_enum" NOT NULL DEFAULT 'DEFAULT'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "gallery" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."gallery_type_enum"`);
    await queryRunner.query(`ALTER TABLE "gallery" ADD "type" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "gallery" DROP COLUMN "mimeType"`);
    await queryRunner.query(
      `CREATE TYPE "public"."gallery_name_enum" AS ENUM('SECUNDARY', 'PRIMARY', 'DEFAULT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ADD "name" "public"."gallery_name_enum" NOT NULL DEFAULT 'DEFAULT'`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class GalleryProfile1687922627931 implements MigrationInterface {
  name = 'GalleryProfile1687922627931';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."gallery_profile_type_enum" AS ENUM('SECUNDARY', 'PRIMARY', 'DEFAULT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "gallery_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text, "type" "public"."gallery_profile_type_enum" NOT NULL DEFAULT 'DEFAULT', "key" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "profile_id" uuid, CONSTRAINT "PK_0c52fd24adf1fd55d647668a4d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery_profile" ADD CONSTRAINT "FK_31cd31008120638ff5bad73a369" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gallery_profile" DROP CONSTRAINT "FK_31cd31008120638ff5bad73a369"`,
    );
    await queryRunner.query(`DROP TABLE "gallery_profile"`);
    await queryRunner.query(`DROP TYPE "public"."gallery_profile_type_enum"`);
  }
}
